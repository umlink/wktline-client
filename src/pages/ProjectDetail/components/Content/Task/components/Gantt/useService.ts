import Api from '@/api/modules';
import { useModel } from '@umijs/max';

const useService = () => {
  const { data, updateTaskDetail } = useModel('ProjectDetail.model');

  const updateTaskInfo = (params: Partial<API.UpdateTaskReq>) => {
    params.projectId = data.projectId;
    Api.Task.updateTask(params as API.UpdateTaskReq).then(() => {
      updateTaskDetail(params.id!);
    });
  };
  return {
    updateTaskInfo,
  };
};
export default useService;
