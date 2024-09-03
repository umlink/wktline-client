import Api from '@/api/modules';
import { useRequest } from '@umijs/max';
import { useDebounceFn, useSetState, useUpdateEffect } from 'ahooks';
import { useState } from 'react';

const useProjectList = (projectId: string) => {
  const [data, setData] = useSetState<{
    groupList: API.TaskGroupItem[];
    projectId?: string;
    keywords: string | undefined;
    finished: boolean;
    pageNo: number;
    pageSize: number;
  }>({
    groupList: [],
    projectId,
    keywords: '',
    finished: false,
    pageNo: 1,
    pageSize: 10,
  });

  const [open, setOpen] = useState(false);

  const { loading, run: getTaskGroupList } = useRequest(
    () =>
      Api.TaskGroup.getTaskGroupList({
        projectId,
        keywords: data.keywords,
        pageNo: data.pageNo,
        pageSize: data.pageSize,
      }),
    {
      onSuccess(res) {
        const dataList = res?.list || [];
        const list = data.pageNo === 1 ? dataList : [...data.groupList, ...dataList];
        setData({
          groupList: list,
          pageNo: ++data.pageNo,
          finished: list.length === res?.total,
        });
      },
      manual: true,
    },
  );

  const getMoreGroup = () => {
    if (data.finished) return;
    getTaskGroupList();
  };

  const resetData = () => {
    setData({
      finished: false,
      pageNo: 1,
      groupList: [],
      keywords: undefined,
    });
  };

  const { run: keywordsChange } = useDebounceFn(
    (e) => {
      resetData();
      setData({ keywords: e.target.value });
    },
    { wait: 200 },
  );

  useUpdateEffect(() => {
    getTaskGroupList();
  }, [data.keywords]);

  useUpdateEffect(() => {
    if (open) {
      getTaskGroupList();
    } else {
      resetData();
    }
  }, [open]);

  return {
    data,
    setData,
    getMoreGroup,
    loading,
    keywordsChange,
    open,
    setOpen,
  };
};

export default useProjectList;
