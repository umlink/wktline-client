import Api from '@/api/modules';
import useQueryParams from '@/hooks/useQueryParams';
import { useRequest } from '@umijs/max';
import { useDebounceFn, useSetState, useUpdateEffect } from 'ahooks';
import { useState } from 'react';

const useProjectList = (props: { onRefresh: () => void }) => {
  const [data, setData] = useSetState<{
    userList: API.UserBaseInfo[]; // 可选用户列表 - 当前项目下的用户
    selectedUserIds: string[]; // 选择变动数组
    finished: boolean;
  }>({
    userList: [],
    selectedUserIds: [],
    finished: false,
  });

  const [open, setOpen] = useState(false);
  const [query] = useQueryParams();

  const [params, setParams] = useSetState<API.GetUserListReq>({
    keywords: '',
    pageNo: 1,
    pageSize: 10,
  });

  const { loading, run: getUserList } = useRequest(
    () =>
      Api.User.getUserList(params).then((res) => {
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
      getUserList();
    }
  };

  const { loading: adLoading, run: addProjectUser } = useRequest(
    () =>
      Api.ProjectUser.addProjectUserByIds({
        projectId: query.id,
        userIds: data.selectedUserIds,
      }),
    {
      manual: true,
      onSuccess: () => {
        setOpen(false);
        setData({
          selectedUserIds: [],
        });
        props.onRefresh();
      },
    },
  );

  // 选择用户
  const onUserChange = (e: any, key: string) => {
    const index = data.selectedUserIds.indexOf(key);
    if (index >= 0) {
      data.selectedUserIds.splice(index, 1);
    } else {
      data.selectedUserIds.push(key);
    }
    setData({
      selectedUserIds: [...data.selectedUserIds],
    });
  };

  const { run: onKeywordsChange } = useDebounceFn(
    (e) => {
      setParams({
        keywords: e.target.value,
        pageNo: 1,
      });
    },
    {
      wait: 500,
    },
  );

  useUpdateEffect(() => {
    if (open) {
      getUserList();
    } else {
      setData({
        userList: [],
        finished: false,
        selectedUserIds: [],
      });
      setParams({ pageNo: 1, keywords: '' });
    }
  }, [open]);

  useUpdateEffect(() => {
    getUserList();
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
    addProjectUser,
  };
};

export default useProjectList;
