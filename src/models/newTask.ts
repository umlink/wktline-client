import Api from '@/api/modules';
import { useRequest } from '@umijs/max';
import { useSetState, useUpdateEffect } from 'ahooks';
import { notification } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';
import { useState } from 'react';

type SelectDataType = {
  taskType?: API.TaskTypeItem;
  taskStatus?: API.TaskStatusItem;
  taskGroup?: API.TaskGroupItem;
  taskHandler?: API.ProjectUserItem;
  taskPriority?: API.TaskPriorityItem;
};

type NewTaskDataType = {
  show: boolean;
  projectId: string;
  groupKeywords: string;
  userKeywords: string;
  statusList: API.TaskStatusItem[];
  priorityList: API.TaskPriorityItem[];
  userList: API.UserBaseInfo[];
  taskTypeList: API.TaskTypeItem[];
  taskGroup: API.TaskGroupItem[];
  updateCallback?: (taskId: string) => void /*共用回调*/;
  childTaskCallback?: (taskId: string) => void /*创建子任务时更新父任务中任务队列*/;
};

const defaultParams = () => ({
  show: false,
  name: '',
  startTime: dayjs().startOf('day').add(9, 'h').toString(),
  projectId: '',
  description: '',
  typeId: '',
  statusId: '',
});

const defaultData = (next = false) => ({
  show: next,
  statusId: '',
  projectId: '',
  groupKeywords: '',
  userKeywords: '',
  statusList: [],
  priorityList: [],
  userList: [],
  taskTypeList: [],
  taskGroup: [],
});

const noData = () => {
  return {
    taskType: undefined,
    taskStatus: undefined,
    taskGroup: undefined,
    taskHandler: undefined,
    taskPriority: undefined,
  };
};

const useNewTask = () => {
  const [data, setData] = useSetState<NewTaskDataType>(defaultData());
  const [params, setParams] = useSetState<API.CreateTaskReq>(defaultParams());
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectData, setSelectData] = useSetState<SelectDataType>(noData());
  // 关键词搜索 - so 不需要分页，pageSize直接20即可

  // 清空数据 状态重置
  const resetDataAndParams = (next?: boolean) => {
    setParams(defaultParams());
    setFileList([]);
    setData(defaultData(next));
    setSelectData(noData());
  };

  // 新建任务
  const { loading: createLoading, run: addTask } = useRequest(
    async (params: API.CreateTaskReq, next?: boolean) => {
      if (params.startTime) {
        params.startTime = dayjs(params.startTime).format('YYYY-MM-DD');
      }
      if (params.endTime) {
        params.endTime = dayjs(params.endTime).format('YYYY-MM-DD');
      }
      const res = await Api.Task.createTask(params);
      if (res.success) {
        notification.success({
          message: '创建成功',
          description: `任务名：${params.name}`,
        });
        const taskId = res.data!.id!;
        data.updateCallback?.(taskId);
        data.childTaskCallback?.(taskId);
        resetDataAndParams(next);
      }
      return res;
    },
    {
      manual: true,
    },
  );
  // 对外暴露的创建任务接口，创建成功后回调 taskId
  const createTask = (next?: boolean) => {
    if (!params.name) {
      notification.error({
        message: '温馨提示',
        description: '任务名称不能为空',
      });
      return;
    }
    if (!params.statusId) {
      notification.error({
        message: '温馨提示',
        description: '请设置任务初始状态',
      });
      return;
    }
    params.projectId = data.projectId;
    addTask(params, next);
  };

  // updateEffect
  useUpdateEffect(() => {
    if (!data.show) {
      resetDataAndParams();
    }
  }, [data.show]);

  return {
    data,
    setData,
    selectData,
    setSelectData,
    fileList,
    setFileList,
    createLoading,
    params,
    setParams,
    createTask,
  };
};

export default useNewTask;
