import Api from '@/api/modules';
import { EVENTS } from '@/constants';
import useQueryParams from '@/hooks/useQueryParams';
import EventBus from '@/utils/event-bus';
import { useRequest } from '@umijs/max';
import { useSetState, useUpdateEffect } from 'ahooks';
import { message, notification } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

/**
 * 用于全局任务详情页的操作
 * */

export type TasKDataType = {
  show: boolean;
  taskId: string;
  projectId: string;
  taskIdQueue: string[];
  task?: API.GetTaskDetailRes;
  childList: API.TaskDetailItem[];
  resourceList?: UploadFile[];
  subTask?: API.GetTaskDetailRes;
  statusList: API.TaskStatusItem[];
  priorityList: API.TaskPriorityItem[];
  taskTypeList: API.TaskTypeItem[];
  actorList: API.TaskActorItem[];
  taskLogParams: Required<API.GetTaskOperationLogListReq & { type: any }>;
  taskLog: {
    list: API.TaskOperationLogItem[];
    total: number;
    finished: boolean;
  };
  laborHourLogs: API.TaskLaborHourItem[];
  delCallback?: (v?: any) => void;
};

const getDefaultData = () => {
  return {
    show: false,
    projectId: '',
    taskId: '',
    taskIdQueue: [],
    rickEditorReadonly: true,
    task: undefined,
    childList: [],
    resourceList: [],
    statusList: [],
    priorityList: [],
    userList: [],
    taskTypeList: [],
    actorList: [],
    laborHourLogs: [],
    taskLog: {
      list: [],
      total: 0,
      finished: false,
    },
    taskLogParams: {
      taskId: '',
      type: undefined,
      pageNo: 1,
      pageSize: 8,
    },
    delCallback: undefined,
  };
};

const useTaskDetail = () => {
  const [data, setData] = useSetState<TasKDataType>(getDefaultData());

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // 参数注入
  const [, setQuery] = useQueryParams();

  // 获取任务详情（数据格式和列表中的item默认一致）
  const { loading, run: getTaskDetail } = useRequest(
    (id: string) =>
      Api.Task.getTaskDetail({ id }).then((res) => {
        if (res.success && res.data) {
          setData({
            task: res.data as API.GetTaskDetailRes,
            projectId: res.data.projectId!,
          });
        }
      }),
    {
      manual: true,
    },
  );

  // 获取当前任务的附件资源
  const getTaskResource = (taskId: string) => {
    Api.TaskAttachment.getTaskAttachmentList({
      taskId,
      pageNo: 1,
      pageSize: 888,
    }).then((res) => {
      if (res.success) {
        const list: UploadFile[] =
          res.data?.list?.map((item) => {
            return {
              uid: item.id,
              name: item.name,
              fileName: String(item.id), // 临时宝保存资源id
              url: item.url,
              size: +item.size,
            };
          }) || [];
        setData({
          resourceList: list,
        });
      }
    });
  };

  // 获取任务日志
  const { loading: logLoading, run: getTaskLogs } = useRequest(
    (taskId: string, type = data.taskLogParams.type) => {
      return Api.TaskOperationLog.getTaskOperationLogList({
        ...data.taskLogParams,
        taskId,
        type,
      });
    },
    {
      manual: true,
      onSuccess: (d) => {
        const list: API.TaskOperationLogItem[] = d?.list || [];
        setData({
          taskLog: {
            list: data.taskLogParams.pageNo === 1 ? list : [...list, ...data.taskLog.list],
            total: d?.total ?? 0,
            finished: list.length === 0,
          },
          taskLogParams: {
            ...data.taskLogParams,
            pageNo: data.taskLogParams.pageNo!,
          },
        });
        EventBus.emit(EVENTS.TASK_LOG_SCROLL, data.taskLogParams.pageNo !== 1);
      },
    },
  );

  const getMoreTaskLog = (type?: string) => {
    data.taskLogParams.pageNo += 1;
    getTaskLogs(data.taskId, type);
  };

  useUpdateEffect(() => {
    data.taskLogParams.pageNo = 1;
    getTaskLogs(data.taskId, data.taskLogParams.type);
  }, [data.taskLogParams.type]);

  // 删除附件资源
  const removeResource = (file: UploadFile) => {
    Api.TaskAttachment.delTaskAttachment({
      projectId: data.projectId,
      id: file.uid,
    }).then(() => {
      getTaskResource(data.taskId!);
    });
  };

  // 更新附件列表信息
  const uploadAttachment = (file: UploadFile) => {
    if (data.resourceList && file.status === 'done') {
      let flag = false;
      for (let i = 0; i < data.resourceList.length; i++) {
        const item = data.resourceList[i];
        if (item.url === file.url) {
          notification.warning({
            message: '温馨提示',
            description: `【${file.name}】该文件已上传`,
          });
          flag = true;
        }
        if (item.originFileObj && item.name === file.name) {
          getTaskResource(data.taskId!);
          break;
        }
      }
      if (flag) {
        return;
      }
    }
    // 资源关联
    Api.TaskAttachment.addTaskAttachment({
      projectId: data.projectId,
      taskId: data.taskId,
      resourceId: file.uid,
    }).then((res) => {
      if (!res.success) {
        notification.error({
          message: '温馨提示',
          description: '资源关联失败',
        });
      } else {
        getTaskResource(data.taskId!);
      }
    });
  };

  // 获取任务参与者列表 无分页 默认 1000
  const getTaskActorList = (taskId: string) => {
    Api.TaskActor.getTaskActor({ taskId, pageSize: 1000 }).then((res) => {
      if (res.success) {
        const userList = res.data?.list || [];
        let i = 0;
        while (i < userList.length) {
          if (userList[i].id === data.task?.creatorId) {
            const item = userList.splice(i, 1)[0];
            userList.unshift(item);
          }
          i++;
        }
        setData({ actorList: userList });
      }
    });
  };

  const updateActorList = (userIds: string[]) => {
    const list = [...data.actorList];
    let index = 0;
    while (index < list.length) {
      if (userIds.includes(list[index].id)) {
        list.splice(index, 1);
      }
      index++;
    }
    setData({ actorList: list });
  };

  const deleteActorForTask = (userIds: string[]) => {
    if (!userIds.length) return;
    Api.TaskActor.delTaskActor({
      projectId: data.projectId,
      taskId: data.taskId!,
      userIds,
    }).then((res) => {
      if (res.success) {
        updateActorList(userIds);
      } else {
        message.warning(res.message || '删除失败');
      }
    });
  };

  // 更新任务
  const updateTaskInfo = (params: Partial<API.UpdateTaskReq>) => {
    const taskId = data.taskId!;
    params.id = taskId;
    params.projectId = data.projectId;
    if (params.startTime) {
      params.startTime = dayjs(params.startTime).format('YYYY-MM-DD');
    }
    if (params.endTime) {
      params.endTime = dayjs(params.endTime).format('YYYY-MM-DD');
    }
    Api.Task.updateTask(params as API.UpdateTaskReq).then(() => {
      getTaskDetail(taskId);
      getTaskLogs(taskId);
      if (params.handlerId) {
        getTaskActorList(taskId);
      }
    });
  };

  const resetInitData = () => {
    setQuery({ taskId: undefined });
    setData(getDefaultData());
  };

  const delTaskById = () => {
    Api.Task.delTask({ id: data.taskId!, projectId: data.projectId }).then((res) => {
      if (res.success) {
        EventBus.emit(EVENTS.DELETE_TASK_CALLBACK, data.taskId);
        // 清空数据自动关闭
        resetInitData();
      } else {
        message.warning(res.message || '删除失败');
      }
    });
  };

  // 获取子任务列表
  const getChildTaskList = (taskId: string) => {
    Api.Task.getChildTaskList({ parentId: taskId }).then((res) => {
      if (res.success) {
        setData({ childList: res.data?.list || [] });
      }
    });
  };

  /**
   * 获取工作日志 - 工时日志
   * */
  const getTaskLaborHourList = (taskId: string) => {
    Api.TaskLaborHour.getLaborHourList({
      taskId,
    }).then((res) => {
      if (res.success) {
        setData({ laborHourLogs: res.data?.list || [] });
      }
    });
  };

  // 只针对工时更新时的数据获取
  const reloadDataByLaborHour = () => {
    getTaskDetail(data.taskId);
    getTaskLogs(data.taskId);
  };

  // 添加实际工作工时
  const addTaskLaborHour = (params: API.AddTaskLaborHourReq, callback?: () => void) => {
    Api.TaskLaborHour.addLaborHour(params).then((res) => {
      if (res.success) {
        reloadDataByLaborHour();
        getTaskLaborHourList(data.taskId);
        callback?.();
      }
    });
  };
  // 更新工作日志
  const updateTaskLaborHour = (params: API.UpdateTaskLaborHourReq, callback?: () => void) => {
    Api.TaskLaborHour.updateLaborHour(params).then((res) => {
      if (res.success) {
        getTaskLaborHourList(data.taskId);
        callback?.();
      }
    });
  };
  // 删除工作记录
  const delTaskLaborHour = (id: string, index: number) => {
    Api.TaskLaborHour.delLaborHour({
      id,
      taskId: data.taskId,
      projectId: data.projectId,
    }).then((res) => {
      if (res.success) {
        data.laborHourLogs.splice(index, 1);
        setData({ laborHourLogs: [...data.laborHourLogs] });
        reloadDataByLaborHour();
      } else {
        message.error(res.message);
      }
    });
  };

  // 获取任务详情
  const getInitData = (taskId: string) => {
    setQuery({ taskId });
    setData({ taskId });
    getTaskDetail(taskId);
    getChildTaskList(taskId);
    getTaskResource(taskId);
    getTaskActorList(taskId);
    getTaskLogs(taskId);
    getTaskLaborHourList(taskId);
  };

  // 获取任务队列中上一个任务详情
  const getPrevTaskDetail = () => {
    setData({ task: undefined });
    data.taskIdQueue.pop();
    const prevId = data.taskIdQueue[data.taskIdQueue.length - 1];
    setData({ taskIdQueue: [...data.taskIdQueue] });
    getInitData(prevId!);
  };
  // 查看父任务 方法独立 - 方便扩展
  const lookParentTask = (parentId: string) => {
    setData({ task: undefined });
    data.taskIdQueue.push(parentId);
    setData({ taskIdQueue: [...data.taskIdQueue] });
    getInitData(parentId);
  };

  // 添加子任务到任务队列中
  const showChildTaskById = (taskId: string) => {
    setData({ task: undefined });
    data.taskIdQueue.push(taskId);
    setData({ taskIdQueue: [...data.taskIdQueue] });
    getInitData(taskId);
  };

  // 关闭弹窗
  const onHide = () => {
    resetInitData();
    EventBus.emit(EVENTS.UPDATE_TASK_CALLBACK, data.taskId);
  };

  // 显示弹窗 有任务id才开始请求
  const onShow = (taskId: string) => {
    setData({ taskIdQueue: [taskId], show: true });
    getInitData(taskId);
  };

  useEffect(() => {
    EventBus.on(EVENTS.OPEN_TASK_DETAIL, (id) => onShow(id as string));
  }, []);

  return {
    data,
    setData,
    loading,
    logLoading,
    delTaskById,
    fileList,
    setFileList,
    getChildTaskList,
    removeResource,
    uploadAttachment,
    getTaskDetail,
    updateTaskInfo,
    getTaskActorList,
    getPrevTaskDetail,
    showChildTaskById,
    lookParentTask,
    deleteActorForTask,
    getTaskLaborHourList,
    addTaskLaborHour,
    delTaskLaborHour,
    updateTaskLaborHour,
    getTaskLogs,
    getMoreTaskLog,
    onHide,
    onShow,
  };
};

export default useTaskDetail;
