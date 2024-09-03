import Api from '@/api/modules';
import { useModel } from '@umijs/max';

const useTableService = () => {
  const { data, updateTaskDetail } = useModel('ProjectDetail.model');

  type TempObjType = { [key: string]: string };
  type TempFilterType = { text: any; value: any };

  let tempStatusObj: TempObjType = {};
  let tempGroupObj: TempObjType = {};
  let tempTypeObj: TempObjType = {};
  let tempPriorityObj: TempObjType = {};
  let tempUserObj: TempObjType = {};

  // 供筛选
  data.tableData.list?.forEach((item: API.TaskDetailItem) => {
    if (item.statusId) tempStatusObj[item.statusName!] = item.statusId;
    if (item.groupId) tempGroupObj[item.groupName!] = item.groupId;
    if (item.typeId) tempTypeObj[item.typeName!] = item.typeId;
    if (item.priority) tempPriorityObj[item.priority] = item.priority;
    if (item.handlerId) tempUserObj[item.handlerName!] = item.handlerId;
  });

  const statusFilters: TempFilterType[] = Object.keys(tempStatusObj).map((key) => ({
    text: key,
    value: tempStatusObj[key],
  }));
  const userFilters: TempFilterType[] = Object.keys(tempUserObj).map((key) => ({
    text: key,
    value: tempUserObj[key],
  }));
  const groupFilters: TempFilterType[] = Object.keys(tempGroupObj).map((key) => ({
    text: key,
    value: tempGroupObj[key],
  }));
  const typeFilters: TempFilterType[] = Object.keys(tempTypeObj).map((key) => ({
    text: key,
    value: tempTypeObj[key],
  }));
  const priorityFilters: TempFilterType[] = Object.keys(tempPriorityObj).map((key) => ({
    text: key,
    value: tempPriorityObj[key],
  }));

  const updateTaskInfo = (params: Partial<API.UpdateTaskReq>) => {
    params.projectId = data.projectId;
    Api.Task.updateTask(params as API.UpdateTaskReq).then(() => {
      updateTaskDetail(params.id!);
    });
  };

  return {
    updateTaskInfo,
    statusFilters,
    userFilters,
    groupFilters,
    typeFilters,
    priorityFilters,
  };
};

export default useTableService;
