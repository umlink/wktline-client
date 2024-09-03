import Api from '@/api/modules';
import { useRequest } from 'ahooks';
import { App } from 'antd';
import { useEffect, useState } from 'react';

const useService = () => {
  const { notification } = App.useApp();
  const [priorityList, setPriorityList] = useState<API.TaskPriorityItem[]>([]);

  const { loading, run: getTaskPriority } = useRequest(
    async () => {
      const res = await Api.TaskPriority.getTaskPriorityList({
        pageNo: 1,
        pageSize: 10,
      });
      if (res.data) {
        const tpList = res.data.list || [];
        setPriorityList(tpList);
      }
    },
    {
      manual: true,
    },
  );

  const delPriority = (id: string, index: number) => {
    Api.TaskPriority.delTaskPriority({ id }).then((res) => {
      if (res.success) {
        priorityList.splice(index, 1);
        setPriorityList([...priorityList]);
      } else {
        notification.error({
          message: '温馨提示',
          description: res.message,
        });
      }
    });
  };

  const updatePriorityRow = (data: API.UpdateTaskPriorityReq, index: number) => {
    priorityList[index].name = data.name!;
    priorityList[index].color = data.color!;
    setPriorityList([...priorityList]);
  };

  useEffect(() => {
    getTaskPriority();
  }, []);

  return {
    loading,
    delPriority,
    priorityList,
    getTaskPriority,
    setPriorityList,
    updatePriorityRow,
  };
};

export default useService;
