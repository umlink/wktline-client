import { Plus } from '@icon-park/react';
import { useModel } from '@umijs/max';
export default () => {
  const { setData } = useModel('newTask');
  const { data, updateDataForNewTask } = useModel('ProjectDetail.model');
  return (
    <span
      className={'g-filter-btn text-primary'}
      onClick={() =>
        setData({
          show: true,
          projectId: data.projectId,
          updateCallback: updateDataForNewTask,
        })
      }
    >
      <Plus theme="outline" size={14} />
      <span>新建任务</span>
    </span>
  );
};
