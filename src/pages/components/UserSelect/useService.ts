import Api from '@/api/modules';
import { useRequest } from '@umijs/max';
import { useSetState, useUpdateEffect } from 'ahooks';
import { useState } from 'react';

const useUserSelect = (props: any) => {
  const [data, setData] = useSetState<{
    userList: API.ProjectUserItem[];
    projectId?: string;
    keywords: string;
    finished: boolean;
    pageNo: number;
    pageSize: number;
  }>({
    userList: [],
    projectId: props.projectId,
    keywords: '',
    finished: false,
    pageNo: 1,
    pageSize: 10,
  });

  const [open, setOpen] = useState(false);

  const { loading: pLoading, run: getProjectUserList } = useRequest(
    () =>
      Api.ProjectUser.getProjectUser({
        projectId: data.projectId!,
        keywords: data.keywords,
        pageNo: data.pageNo,
        pageSize: data.pageSize,
      }),
    {
      onSuccess(res) {
        const dataList = res?.list || [];
        const list = data.pageNo === 1 ? dataList : [...data.userList, ...dataList];
        setData({
          userList: list,
          pageNo: ++data.pageNo,
          finished: list.length === res?.total,
        });
      },
      manual: true,
    },
  );
  const { loading: uLoading, run: getAllUserList } = useRequest(
    () =>
      Api.User.getUserList({
        keywords: data.keywords,
        pageNo: data.pageNo,
        pageSize: data.pageSize,
      }),
    {
      onSuccess(res) {
        const dataList = res?.list || [];
        const list = data.pageNo === 1 ? dataList : [...data.userList, ...dataList];
        setData({
          pageNo: ++data.pageNo,
          userList: list as API.ProjectUserItem[],
          finished: list.length === res?.total,
        });
      },
      manual: true,
    },
  );

  const getUserList = (isMore = false) => {
    if (!isMore) {
      data.pageNo = 1;
    }
    if (data.finished) return;

    // 有项目 id 则只查询项目下的用户
    if (data.projectId) {
      getProjectUserList();
    } else {
      getAllUserList();
    }
  };

  const loadMore = () => getUserList(true);

  useUpdateEffect(getUserList, [data.keywords]);

  useUpdateEffect(() => {
    if (open) {
      getUserList();
    }
  }, [open]);

  return {
    data,
    setData,
    pLoading,
    uLoading,
    loadMore,
    open,
    setOpen,
  };
};

export default useUserSelect;
