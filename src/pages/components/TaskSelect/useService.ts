import Api from '@/api/modules';
import { useModel, useRequest } from '@umijs/max';
import { useSetState, useUpdateEffect } from 'ahooks';
import { useState } from 'react';

const useProjectList = (projectId?: string) => {
  const { initialState } = useModel('@@initialState');
  const [data, setData] = useSetState<{
    taskList: API.TaskDetailItem[];
    projectId?: string;
    keywords: string;
    finished: boolean;
    pageNo: number;
    pageSize: number;
  }>({
    taskList: [],
    projectId,
    keywords: '',
    finished: false,
    pageNo: 1,
    pageSize: 10,
  });

  const [open, setOpen] = useState(false);

  const { loading, run: getTaskList } = useRequest(
    () =>
      Api.Task.getTaskList({
        handlerId: initialState?.id,
        keywords: data.keywords || undefined,
        pageNo: data.pageNo,
        pageSize: data.pageSize,
      }).then((res) => {
        if (res.success) {
          const dataList = res?.data?.list || [];
          const list = data.pageNo === 1 ? dataList : [...data.taskList, ...dataList];
          setData({
            taskList: list,
            pageNo: ++data.pageNo,
            finished: list.length === res.data?.total,
          });
        }
      }),
    {
      manual: true,
    },
  );

  useUpdateEffect(() => {
    getTaskList();
  }, [data.keywords]);

  useUpdateEffect(() => {
    if (open) {
      getTaskList();
    }
  }, [open]);

  return {
    data,
    setData,
    getTaskList,
    loading,
    open,
    setOpen,
  };
};

export default useProjectList;
