import Api from '@/api/modules';
import { useModel } from '@umijs/max';
import { useSetState } from 'ahooks';
import { App } from 'antd';
import { useEffect, useState } from 'react';

type SettingDataType = {
  pageSize: number;
  pageNo: number;
  finished: boolean;
};
const useService = () => {
  const { notification } = App.useApp();
  const [typeList, setTypeList] = useState<API.TaskTypeItem[]>([]);
  const [data, setData] = useSetState<SettingDataType>({
    pageSize: 20,
    pageNo: 1,
    finished: false,
  });

  const { data: projectData } = useModel('ProjectDetail.model');

  const getTaskTypeList = () => {
    Api.TaskType.getTaskTypeList({
      projectId: projectData.projectId,
      pageSize: 888,
    }).then((res) => {
      if (res.data) {
        setTypeList(res.data.list || []);
      }
    });
  };

  const delType = (id: string) => {
    Api.TaskType.delTaskType({
      id,
      projectId: projectData.projectId,
    }).then((res) => {
      if (res.success) {
        getTaskTypeList();
      } else {
        notification.error({
          message: '温馨提示',
          description: res.message,
        });
      }
    });
  };

  useEffect(() => {
    getTaskTypeList();
  }, [projectData.projectId]);

  return {
    data,
    setData,
    delType,
    typeList,
    setTypeList,
    getTaskTypeList,
  };
};

export default useService;
