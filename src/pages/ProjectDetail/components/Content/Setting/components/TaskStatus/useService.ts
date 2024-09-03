import Api from '@/api/modules';
import { useModel } from '@umijs/max';
import { useMemoizedFn, useSetState } from 'ahooks';
import { App } from 'antd';
import { useEffect, useState } from 'react';

type SettingDataType = {
  pageSize: number;
  pageNo: number;
  finished: boolean;
};
const useService = () => {
  const { notification } = App.useApp();
  const [statusList, setStatusList] = useState<API.TaskStatusItem[]>([]);
  const [data, setData] = useSetState<SettingDataType>({
    pageSize: 20,
    pageNo: 1,
    finished: false,
  });

  const { data: projectData } = useModel('ProjectDetail.model');

  const getTaskStatusList = () => {
    Api.TaskStatus.getTaskStatusList({
      projectId: projectData.projectId,
      pageSize: 100,
    }).then((res) => {
      if (res.data) {
        setStatusList(res.data.list || []);
      }
    });
  };

  const updateStatusSort = useMemoizedFn(() => {
    const list: API.SortMapItem[] = statusList.map((item, index) => {
      return {
        id: item.id,
        sort: index + 1,
      };
    });
    Api.TaskStatus.updateTaskStatusSort({
      projectId: projectData.projectId,
      sortMapList: list,
    }).then((res) => {
      if (res.success) {
      }
    });
  });

  const delStatus = (id: string) => {
    Api.TaskStatus.delTaskStatus({ projectId: projectData.projectId, id }).then((res) => {
      if (res.success) {
        getTaskStatusList();
      } else {
        notification.error({
          message: '温馨提示',
          description: res.message,
        });
      }
    });
  };

  useEffect(() => {
    if (projectData.projectId) getTaskStatusList();
  }, [projectData.projectId]);

  return {
    data,
    setData,
    delStatus,
    statusList,
    setStatusList,
    updateStatusSort,
    getTaskStatusList,
  };
};

export default useService;
