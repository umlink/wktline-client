import Api from '@/api/modules';
import { useModel } from '@umijs/max';
import { useDebounceFn, useRequest, useSetState, useUpdateEffect } from 'ahooks';
import { App } from 'antd';
import { useEffect, useState } from 'react';

const useService = () => {
  const { notification } = App.useApp();
  const { data: projectData } = useModel('ProjectDetail.model');
  const [groupList, setGroupList] = useState<API.TaskGroupItem[]>([]);
  const [params, setParams] = useSetState<API.GetTaskGroupListReq & { finished: boolean }>({
    finished: false,
    projectId: projectData.projectId,
    keywords: '',
    pageSize: 20,
    pageNo: 1,
  });

  const { loading, run: getTaskGroupList } = useRequest(
    () => {
      params.projectId = projectData.projectId;
      return Api.TaskGroup.getTaskGroupList(params).then((res) => {
        if (res.data) {
          const tpList = res.data.list || [];
          const currentList = res.data.pageNo === 1 ? tpList : [...groupList, ...tpList];
          setGroupList(currentList);
          setParams({
            pageNo: params.pageNo! + 1,
            finished: currentList.length === res.data.total,
          });
        }
      });
    },
    {
      manual: true,
    },
  );

  const { run: reloadTaskGroupList } = useDebounceFn(
    () => {
      if (params.finished) return;
      getTaskGroupList();
    },
    { wait: 200 },
  );

  const delGroup = (id: string, index: number) => {
    Api.TaskGroup.delTaskGroup({ id, projectId: projectData.projectId }).then((res) => {
      if (res.success) {
        groupList.splice(index, 1);
        setGroupList([...groupList]);
      } else {
        notification.error({
          message: '温馨提示',
          description: res.message,
        });
      }
    });
  };

  const updateGroupRow = (data: API.UpdateTaskGroupReq, index: number) => {
    groupList[index].groupName = data.groupName!;
    groupList[index].description = data.description!;
    setGroupList([...groupList]);
  };

  const resetPageNo = () => {
    params.pageNo = 1;
    params.finished = false;
    getTaskGroupList();
  };

  useUpdateEffect(() => {
    reloadTaskGroupList();
  }, [params.keywords, params.finished]);

  useEffect(() => {
    params.pageNo = 1;
    getTaskGroupList();
  }, [projectData.project?.id]);

  return {
    loading,
    params,
    resetPageNo,
    setParams,
    delGroup,
    groupList,
    setGroupList,
    updateGroupRow,
    reloadTaskGroupList,
    getTaskGroupList,
  };
};

export default useService;
