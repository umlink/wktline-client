import Api from '@/api/modules';
import { useModel, useRequest } from '@umijs/max';
import { useDebounceFn, useSetState, useUpdateEffect } from 'ahooks';
import { useEffect, useState } from 'react';

const useProjectList = () => {
  const { data: taskDetail } = useModel('taskDetail');
  const [data, setData] = useSetState<{
    userList: API.ProjectUserItem[]; // 可选用户列表 - 当前项目下的用户
    defaultActorIds: string[]; // 保存原有参与者id
    selectedUserIds: string[]; // 选择变动数组
    insertUserIds: string[]; // 新增参与者表列
    deleteUserIds: string[]; // 删除参数者
    finished: boolean;
  }>({
    userList: [],
    defaultActorIds: [],
    selectedUserIds: [],
    insertUserIds: [],
    deleteUserIds: [],
    finished: false,
  });

  const [open, setOpen] = useState(false);

  const [params, setParams] = useSetState<API.GetProjectUserReq>({
    projectId: taskDetail.projectId,
    keywords: '',
    pageNo: 1,
    pageSize: 10,
  });

  const { data: taskDetailData, getTaskActorList } = useModel('taskDetail');

  const { loading, run: getProjectUserList } = useRequest(
    () =>
      Api.ProjectUser.getProjectUser({
        ...params,
        projectId: taskDetail.projectId,
      }).then((res) => {
        if (res.data) {
          let list = res.data.list || [];
          list = params.pageNo === 1 ? list : [...data.userList, ...list];
          const finished = res.data.total === list.length;
          setData({
            userList: list,
            finished,
          });

          setParams({
            pageNo: ++params.pageNo!,
          });
        }
      }),
    {
      manual: true,
    },
  );

  const loadMore = () => {
    if (!data.finished) {
      getProjectUserList();
    }
  };

  const { loading: adLoading, run: updateTaskActor } = useRequest(
    () => {
      const list = [];
      if (data.insertUserIds.length) {
        list.push(
          Api.TaskActor.addTaskActor({
            projectId: taskDetail.projectId,
            taskId: taskDetail.taskId,
            userIds: data.insertUserIds,
          }),
        );
      }
      if (data.deleteUserIds.length) {
        list.push(
          Api.TaskActor.delTaskActor({
            projectId: taskDetail.projectId,
            taskId: taskDetail.taskId,
            userIds: data.deleteUserIds,
          }),
        );
      }
      return Promise.all(list);
    },
    {
      manual: true,
      onSuccess: () => {
        setOpen(false);
        getTaskActorList(taskDetail.taskId);
        setData({
          insertUserIds: [],
          deleteUserIds: [],
        });
      },
    },
  );

  // 选择用户
  const onUserChange = (e: any, key: string) => {
    const index = data.selectedUserIds.indexOf(key);
    if (index >= 0) {
      data.selectedUserIds.splice(index, 1);
      // 删除已有
      if (data.defaultActorIds.includes(key) && !data.deleteUserIds.includes(key)) {
        data.deleteUserIds.push(key);
      }
      // 需要删除的禁止重新添加，防止冲突
      const i = data.insertUserIds.indexOf(key);
      if (i >= 0) {
        data.insertUserIds.splice(i, 1);
      }
    } else {
      data.selectedUserIds.push(key);
      // 添加
      if (!data.defaultActorIds.includes(key) && !data.insertUserIds.includes(key)) {
        data.insertUserIds.push(key);
      }
      // 需要添加 则禁止删除操作
      const i = data.deleteUserIds.indexOf(key);
      if (i >= 0) {
        data.deleteUserIds.splice(i, 1);
      }
    }
    setData({
      selectedUserIds: [...data.selectedUserIds],
      insertUserIds: [...data.insertUserIds],
      deleteUserIds: [...data.deleteUserIds],
    });
  };

  const { run: onKeywordsChange } = useDebounceFn(
    (e) => {
      setParams({
        pageNo: 1,
        keywords: e.target.value,
      });
    },
    {
      wait: 200,
    },
  );

  const resetSelectUserIds = () => {
    const userIds: string[] = taskDetailData.actorList.map((item: API.TaskActorItem) => item.id);
    setData({ selectedUserIds: userIds, defaultActorIds: [...userIds] });
    setParams({ pageNo: 1, keywords: '' });
  };

  useEffect(() => {
    resetSelectUserIds();
  }, [taskDetailData.actorList]);

  // 隐藏后重置生效的选择项
  useUpdateEffect(() => {
    if (!open) {
      resetSelectUserIds();
    } else {
      getProjectUserList();
    }
  }, [open]);

  useUpdateEffect(() => {
    params.pageNo = 1;
    getProjectUserList();
  }, [params.keywords]);

  return {
    data,
    open,
    setOpen,
    setData,
    params,
    setParams,
    loading,
    adLoading,
    loadMore,
    onUserChange,
    onKeywordsChange,
    updateTaskActor,
  };
};

export default useProjectList;
