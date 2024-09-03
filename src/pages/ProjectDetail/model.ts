import Api from '@/api/modules';
import {
  EVENTS,
  panelCardTypeFilterMap,
  projectContentTypeMap,
  TaskBelongFilterMap,
  TASK_STATUS_ENUM,
  ViewTypeFilterMap,
} from '@/constants';
import useQueryParams from '@/hooks/useQueryParams';
import EventBus from '@/utils/event-bus';
import { useRequest } from '@umijs/max';
import { useBoolean, useMemoizedFn, useSetState, useUpdateEffect } from 'ahooks';
import { notification } from 'antd';
import { useCallback, useEffect } from 'react';
import { CardDataType, GanttDataItem, IData, IFilterType, ITaskCardItem } from './types';

type dataResType = API.TaskStatusItem[] | API.TaskPriorityItem[] | API.TaskTypeItem[];

const initDefaultData = (query?: { [key: string]: any }) => {
  return {
    projectId: query?.id,
    project: undefined,
    projectListData: undefined,
    taskPriority: {
      list: [],
      kv: {},
    },
    taskStatus: {
      list: [],
      kv: {},
    },
    taskType: {
      list: [],
      kv: {},
    },
    taskCardList: [],
    ganttData: {
      list: [],
      total: 0,
      pageNo: 1,
      pageSize: 15,
      finished: false,
    },
    tableData: {
      finished: false,
      pageNo: 1,
      pageSize: 30,
      total: 0,
      list: [],
    },
  };
};

const initDefaultParams = (query: { [key: string]: string }): API.GetTaskListReq => {
  const groupKV = decodeURIComponent(query.group || '-全部迭代').split('-');
  return {
    projectId: query.id,
    groupId: groupKV[0] ? groupKV[0] : undefined,
    typeId: query.typeId,
    pageNo: 1,
    pageSize: 15,
    sortMode: {
      mode: query.sortMode || 'Desc', // Desc|Asc
      sortKey: query.sortKey || 'updated_at',
    },
  };
};

const useProjectDetail = () => {
  // url 参数获取+更新
  const [query, setQuery] = useQueryParams();
  // 总loading
  const [loading, { setTrue: startLoading, setFalse: loadingDone }] = useBoolean(false);
  // 基础重要数据
  const [data, setData] = useSetState<IData>(initDefaultData(query));
  // 筛选任务的参数
  const [taskParams, setTaskParams] = useSetState<API.GetTaskListReq>(initDefaultParams(query));
  // 筛选项
  const groupKV = decodeURIComponent(query.group || '-全部迭代').split('-');
  const [filterData, setFilterData] = useSetState<IFilterType>({
    cardType: query.cardType || panelCardTypeFilterMap.statusId,
    viewType: query.viewType || ViewTypeFilterMap.CARD,
    contentType: query.contentType || projectContentTypeMap.TASK,
    group: { id: groupKV[0], name: groupKV[1] },
    typeId: query.typeId,
    belongKey: query.belongType || TaskBelongFilterMap.all,
  });

  /**
   * 根据 任务状态、类型、分类查询-针对panel模式
   * */
  const getAllTaskByPropType = useMemoizedFn(async <T extends CardDataType>(typeList: dataResType) => {
    if (typeList.length) {
      startLoading();
      let list: ITaskCardItem[] = [];
      const promiseList: Promise<any>[] = [];
      typeList.forEach((item) => {
        list.push({
          cardTypeId: item.id,
          cardTypeName: item.name,
          cardTypeColor: item.color,
          cardTypeData: item as T, // 保存 状态、优先级、类型
          loading: false,
          finished: false,
          taskList: [],
          pageNo: 1,
          pageSize: 15,
          total: 0,
        });
        promiseList.push(
          Api.Task.getTaskList({
            ...taskParams,
            projectId: data.projectId,
            [filterData.cardType]: item.id,
          }),
        );
      });
      await Promise.all(promiseList).then((res: any) => {
        res?.forEach((item: any, index: number) => {
          list[index].taskList = item.data?.list || [];
          list[index].finished = item.data?.total === item.data?.list.length;
          list[index].total = item.data?.total;
        });
      });
      setData({
        taskCardList: [...list],
      });
    } else {
      setData({
        taskCardList: [],
      });
    }
    loadingDone();
    return null;
  });

  // 获取任务列表 - card 模式
  const getTaskListByCard = (list: CardDataType[]) => {
    switch (filterData.cardType) {
      case panelCardTypeFilterMap.statusId:
        getAllTaskByPropType(list);
        break;
      case panelCardTypeFilterMap.priority:
        getAllTaskByPropType(list);
        break;
      case panelCardTypeFilterMap.typeId:
        getAllTaskByPropType(list);
        break;
    }
  };

  const getTaskSubPropsList = async () => {
    const list: Promise<any>[] = [];
    let filterList: CardDataType[] = [];
    switch (filterData.cardType) {
      case panelCardTypeFilterMap.statusId:
        filterList = data.taskStatus.list;
        break;
      case panelCardTypeFilterMap.priority:
        filterList = data.taskPriority.list;
        break;
      case panelCardTypeFilterMap.typeId:
        filterList = data.taskType.list;
        break;
    }
    if (filterList.length) {
      return filterList;
    }
    list.push(
      Api.TaskStatus.getTaskStatusList({
        projectId: data.projectId,
        pageSize: 50,
      }).then((res) => {
        const kv: Record<string, API.TaskStatusItem> = {};
        const list = res.data?.list || [];
        list.forEach((item) => (kv[item.id] = item));
        setData({ taskStatus: { list, kv } });
        if (filterData.cardType === panelCardTypeFilterMap.statusId) {
          filterList = list;
        }
      }),
      Api.TaskPriority.getTaskPriorityList({}).then((res) => {
        const kv: Record<string, API.TaskPriorityItem> = {};
        const list = res.data?.list || [];
        list.forEach((item) => (kv[item.id] = item));
        setData({ taskPriority: { list, kv } });
        if (filterData.cardType === panelCardTypeFilterMap.priority) {
          filterList = list;
        }
      }),
      Api.TaskType.getTaskTypeList({
        projectId: data.projectId,
      }).then((res) => {
        const kv: Record<string, API.TaskTypeItem> = {};
        const list = res.data?.list || [];
        list.forEach((item) => (kv[item.id] = item));
        setData({ taskType: { list, kv } });
        if (filterData.cardType === panelCardTypeFilterMap.typeId) {
          filterList = list;
        }
      }),
    );
    await Promise.all(list);
    return filterList;
  };

  // 获取table 类型数据
  const { run: getTableTaskList } = useRequest(
    (callback?: any) =>
      Api.Task.getTaskList({
        ...taskParams,
        projectId: data.projectId,
        pageNo: data.tableData.pageNo,
        pageSize: data.tableData.pageSize,
      }).then((res) => {
        loadingDone();
        if (res.success) {
          const { pageNo = 1, total = 0, list = [] } = res.data!;
          if (typeof callback === 'function') {
            callback(res.data);
            return;
          }
          setData({
            tableData: {
              ...res,
              pageNo: pageNo + 1,
              pageSize: data.tableData.pageSize,
              finished: list.length === total,
              list,
            },
          });
        }
      }),
    { manual: true },
  );
  const genGanttDataList = (list: API.TaskDetailItem[]): GanttDataItem[] => {
    return list.map((item) => {
      return {
        id: item.id,
        taskName: item.name,
        startDate: item.startTime,
        endDate: item.endTime,
        content: item,
        collapsed: true,
        disabled: item.statusEnum === TASK_STATUS_ENUM.DONE,
        children: [],
      };
    });
  };
  // 获取gantt 类型数据
  const { run: getGanttTaskList } = useRequest(
    (callback?: any) =>
      Api.Task.getTaskList({
        ...taskParams,
        projectId: data.projectId,
        pageNo: data.ganttData.pageNo,
        pageSize: data.ganttData.pageSize,
      }).then((res) => {
        loadingDone();
        if (res.success) {
          const { pageNo = 1, total = 0, list = [] } = res.data!;
          if (typeof callback === 'function') {
            callback(res.data);
            return;
          }
          setData({
            ganttData: {
              ...res,
              pageNo: pageNo + 1,
              pageSize: data.ganttData.pageSize,
              finished: list.length === total,
              total,
              list: genGanttDataList(list),
            },
          });
        }
      }),
    { manual: true },
  );

  // 表格模式加载更多数据
  const loadMoreTableList = () => {
    if (data.tableData.finished) return;
    getTableTaskList((res: API.GetTaskListRes) => {
      const { total, pageNo = 1, list = [] } = res;
      const _list = pageNo === 1 ? list : [...data.tableData.list, ...list];
      setData({
        tableData: {
          ...res,
          list: _list,
          pageNo: pageNo + 1,
          pageSize: data.tableData.pageSize,
          finished: _list.length === total,
        },
      });
    });
  };
  // 下拉加载更多
  const loadMoreGanttList = () => {
    if (data.ganttData.finished) return;
    startLoading();
    getGanttTaskList((res: API.GetTaskListRes) => {
      const { total, pageNo = 1, list = [] } = res;
      const _list = pageNo === 1 ? genGanttDataList(list) : [...data.ganttData.list, ...genGanttDataList(list)];
      setData({
        ganttData: {
          ...res,
          list: _list,
          pageNo: pageNo + 1,
          pageSize: data.ganttData.pageSize,
          finished: _list.length === total,
        },
      });
    });
  };

  // 计算卡片中任务的位置
  const computeTaskPosition = (taskId: string) => {
    let groupIndex = -1;
    let cardIndex = -1;
    let currentGroup: ITaskCardItem | undefined;
    let currentTask: API.TaskDetailItem | undefined;
    // 遍历寻找位置
    for (; groupIndex < data.taskCardList.length; groupIndex++) {
      currentGroup = data.taskCardList[groupIndex];
      if (currentGroup) {
        for (let index = 0; index < currentGroup.taskList.length; index++) {
          const item = currentGroup.taskList[index];
          if (item.id === taskId) {
            currentTask = item;
            cardIndex = index;
            break;
          }
        }
      }
      if (currentTask) break;
    }
    return { groupIndex, cardIndex, currentTask, currentGroup };
  };

  // 根据状态加载更多 = card列表 loadmore
  const loadMoreTaskByPanelType = (groupIndex: number) => {
    const group = data.taskCardList[groupIndex];
    if (group.loading || group.finished) return;
    group.loading = true;
    setData({
      taskCardList: [...data.taskCardList],
    });
    Api.Task.getTaskList({
      ...taskParams,
      projectId: data.projectId,
      [filterData.cardType]: group.cardTypeId,
      pageNo: group.pageNo + 1,
      pageSize: group.pageSize,
    }).then((res) => {
      if (res.success) {
        const list = res.data?.list || [];
        group.taskList.push(...list);
        group.pageNo += 1;
        group.finished = group.taskList.length === res.data?.total;
        group.loading = false;
        setData({
          taskCardList: [...data.taskCardList],
        });
      }
    });
  };

  // 更新任务
  const updateTaskInfo = (params: API.UpdateTaskReq) => {
    Api.Task.updateTask(params).then((res) => {
      if (!res.success) {
        notification.warning({
          message: '提示',
          description: res.message,
        });
      }
    });
  };

  // 获取任务详情 - 替换面板中的列表 - 数据格式和列表保持一致
  const getTaskDetail = async (id: string) => {
    return new Promise<API.GetTaskDetailRes>((resolve, reject) => {
      Api.Task.getTaskDetail({ id }).then((res) => {
        if (res.success && res.data) {
          return resolve(res.data as API.GetTaskDetailRes);
        }
        reject();
      });
    });
  };

  // 插入新的状态面板
  const insertTaskInStatusPanel = useMemoizedFn((taskId: string) => {
    getTaskDetail(taskId).then((task) => {
      if (task) {
        data.taskCardList.forEach((item, index) => {
          const { statusId, typeId, priority } = task;
          let currentTask: API.TaskDetailItem | undefined;
          switch (filterData.cardType) {
            case panelCardTypeFilterMap.statusId:
              if (item.cardTypeId === statusId) {
                currentTask = task;
              }
              break;
            case panelCardTypeFilterMap.priority:
              if (item.cardTypeId === priority) {
                currentTask = task;
              }
              break;
            case panelCardTypeFilterMap.typeId:
              if (item.cardTypeId === typeId) {
                currentTask = task;
              }
              break;
          }
          if (currentTask) {
            data.taskCardList[index].taskList.unshift(currentTask);
            setData({
              taskCardList: [...data.taskCardList],
            });
          }
        });
      }
    });
  });

  // 删除回调 清理卡片
  const delTaskInStatusPanel = useMemoizedFn((taskId: string) => {
    const { groupIndex, cardIndex } = computeTaskPosition(taskId);
    if (groupIndex === -1) return;
    const list = data.taskCardList[groupIndex].taskList;
    list.splice(cardIndex, 1);
    data.taskCardList[groupIndex].taskList = list;
    setData({
      taskCardList: [...data.taskCardList],
    });
  });

  // 任务更新 card
  const updateTaskForCard = useMemoizedFn((taskId: string) => {
    const { cardIndex, currentTask, currentGroup } = computeTaskPosition(taskId);
    if (!currentTask) return;
    getTaskDetail(taskId).then((task: API.TaskDetailItem) => {
      // 状态变更时需要移动列 - 需要移动列
      const statusId = task.statusId;
      if (currentTask.statusId !== statusId) {
        const taskList = currentGroup?.taskList || [];
        taskList.splice(cardIndex, 1);
        data.taskCardList.forEach((item) => {
          if (item.cardTypeId === statusId) {
            item.taskList.unshift(task); // 此处只为填充列表 - 长度保持正确
          }
        });
        setData({
          taskCardList: [...data.taskCardList],
        });
      } else {
        const taskList = currentGroup?.taskList || [];
        taskList[cardIndex] = task;
        setData({
          taskCardList: [...data.taskCardList],
        });
      }
    });
  });

  // 更新列表任务 - table
  const updateTaskForTable = useMemoizedFn((taskId: string) => {
    getTaskDetail(taskId).then((task: API.TaskDetailItem) => {
      if (task && data.tableData.list?.length) {
        const index = data.tableData.list.findIndex((item) => item.id === task.id);
        data.tableData.list![index] = task;
        setData({
          tableData: {
            ...data.tableData,
            list: [...data.tableData.list],
          },
        });
      }
    });
  });
  // 更新gantt其中一项
  const updateTaskForGantt = useMemoizedFn((taskId: string) => {
    getTaskDetail(taskId).then((task: API.TaskDetailItem) => {
      if (task && data.ganttData.list?.length) {
        const index = data.ganttData.list.findIndex((item) => item.content?.id === task.id);
        data.ganttData.list![index] = {
          id: task.id,
          taskName: task.name,
          startDate: task.startTime,
          endDate: task.endTime,
          content: task,
          disabled: task.statusEnum === TASK_STATUS_ENUM.DONE,
          children: [],
        };
        setData({
          ganttData: {
            ...data.ganttData,
            list: [...data.ganttData.list],
          },
        });
      }
    });
  });

  // 列表插入最新的一条数据
  const insertTableNewTask = (taskId: string) => {
    getTaskDetail(taskId).then((task: API.TaskDetailItem) => {
      if (task) {
        const list = data.tableData.list;
        list.unshift(task);
        data.tableData.list = [...list];
        setData({
          tableData: data.tableData,
        });
      }
    });
  };

  // 删除表格数据其中一项
  const delTaskForTable = useCallback(
    (taskId: string) => {
      const list = data.tableData.list;
      let i = 0;
      while (i < list.length) {
        if (list[i].id === taskId) {
          list.splice(i, 1);
          data.tableData.list = [...list];
          setData({
            tableData: data.tableData,
          });
          return;
        }
        i++;
      }
    },
    [data],
  );

  // 获取列表数据 card/table 默认都是从第一页开始，loadMore 另有其他方法
  const getInitData = (list: CardDataType[]) => {
    setData({ taskCardList: [] });
    switch (filterData.viewType) {
      case ViewTypeFilterMap.CARD:
        getTaskListByCard(list);
        break;
      case ViewTypeFilterMap.TABLE:
        data.tableData.pageNo = 1;
        getTableTaskList();
        break;
      case ViewTypeFilterMap.GANTT:
        data.ganttData.pageNo = 1;
        getGanttTaskList();
        break;
    }
  };

  // 更新列表中的任务信息（编辑过的数据进行更新）card/table
  const updateTaskDetail = (taskId: string) => {
    switch (filterData.viewType) {
      case ViewTypeFilterMap.CARD:
        updateTaskForCard(taskId);
        break;
      case ViewTypeFilterMap.TABLE:
        updateTaskForTable(taskId);
        break;
      case ViewTypeFilterMap.GANTT:
        updateTaskForGantt(taskId);
        break;
    }
  };

  // 新增任务后插入到列表中
  const updateDataForNewTask = (taskId: string) => {
    switch (filterData.viewType) {
      case ViewTypeFilterMap.CARD:
        insertTaskInStatusPanel(taskId);
        break;
      case ViewTypeFilterMap.TABLE:
        insertTableNewTask(taskId);
        break;
    }
  };

  // 删除任务后清理当前面板、表格...
  const updateDataForDelTask = (taskId: string) => {
    switch (filterData.viewType) {
      case ViewTypeFilterMap.CARD:
        delTaskInStatusPanel(taskId);
        break;
      case ViewTypeFilterMap.TABLE:
        delTaskForTable(taskId);
        break;
    }
  };

  // 删除任务
  const delTaskById = (taskId: string) => {
    Api.Task.delTask({ id: taskId, projectId: data.projectId }).then(() => {
      notification.success({
        message: '提示',
        description: `任务删除成功`,
      });
      updateDataForDelTask(taskId);
    });
  };

  // 获取项目详情 - 初次进来、切换项目等
  const getProjectDetail = (projectId: string) => {
    if (!projectId) return;
    setQuery({ id: projectId });
    Api.Project.getProjectInfo({ id: projectId }).then((res) => {
      if (res.success) {
        setData({ project: res.data });
      }
    });
  };

  // 更新项目基础信息
  const updateProjectBaseInfo = (params: API.UpdateProjectReq) => {
    Api.Project.updateProject(params).then((res) => {
      if (res.success) {
        notification.success({
          message: '提示',
          description: '修改成功',
        });
        getProjectDetail(params.projectId);
        return;
      }
      notification.error({
        message: '提示',
        description: res.message || '更新失败',
      });
    });
  };

  // 重置项目数据
  const resetProjectData = () => {
    setData(initDefaultData());
    setTaskParams(initDefaultParams({}));
    setFilterData({
      cardType: panelCardTypeFilterMap.statusId,
      viewType: ViewTypeFilterMap.CARD,
    });
  };

  // 修改筛选参数后重新查询数据pageNo=1
  useUpdateEffect(() => {
    if (data.projectId) {
      setQuery({
        ...filterData,
        group: `${filterData.group.id}-${filterData.group.name}`,
      });
      getTaskSubPropsList().then((list) => {
        // 非任务内容面板停止获取任务信息 内容切换重新获取一次
        if (filterData.contentType === projectContentTypeMap.TASK) {
          getInitData(list);
        }
      });
    }
  }, [taskParams, filterData]);

  // 项目id变更则重置部分数据
  useEffect(() => {
    if (data.projectId) {
      startLoading();
      setData(initDefaultData({ id: data.projectId }));
      setTaskParams(initDefaultParams({}));
      getProjectDetail(data.projectId);
    }
  }, [data.projectId]);

  useEffect(() => {
    EventBus.on(EVENTS.UPDATE_TASK_CALLBACK, (id) => {
      updateTaskDetail(id as string);
    });
    EventBus.on(EVENTS.DELETE_TASK_CALLBACK, (id) => {
      updateDataForDelTask(id as string);
    });
  }, []);

  return {
    data,
    loading,
    setData,
    taskParams,
    filterData,
    setFilterData,
    setTaskParams,
    updateTaskInfo,
    getGanttTaskList,
    updateTaskForGantt,
    getTableTaskList,
    loadMoreTableList,
    loadMoreGanttList,
    loadMoreTaskByPanelType,
    updateDataForNewTask,
    updateDataForDelTask,
    updateTaskDetail,
    updateProjectBaseInfo,
    delTaskById,
    resetProjectData,
  };
};

export default useProjectDetail;
