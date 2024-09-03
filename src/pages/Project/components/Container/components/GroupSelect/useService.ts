import Api from '@/api/modules';
import { useRequest } from '@umijs/max';
import { useDebounceFn, useSetState, useUpdateEffect } from 'ahooks';
import { useState } from 'react';

const useProjectList = () => {
  const [data, setData] = useSetState<{
    groupList: API.ProjectGroupItem[];
    projectId?: string;
    keywords: string | undefined;
    finished: boolean;
    pageNo: number;
    pageSize: number;
  }>({
    groupList: [],
    keywords: '',
    finished: false,
    pageNo: 1,
    pageSize: 10,
  });

  const [open, setOpen] = useState(false);

  const { loading, run: getGroupList } = useRequest(
    () =>
      Api.ProjectGroup.getProjectGroupList({
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
    getGroupList();
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
    getGroupList();
  }, [data.keywords]);

  useUpdateEffect(() => {
    if (open) {
      getGroupList();
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
