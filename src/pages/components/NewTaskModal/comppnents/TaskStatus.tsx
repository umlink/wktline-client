import TaskStatusSelect from '@/pages/components/TaskStatusSelect';
import { useModel } from '@umijs/max';

export default () => {
  const { data, selectData, setSelectData, setParams } = useModel('newTask');
  return (
    <TaskStatusSelect
      projectId={data.projectId!}
      onChange={(statusId, taskStatus) => {
        setParams({ statusId });
        setSelectData({ taskStatus });
      }}
    >
      <span style={{ color: selectData.taskStatus?.color }}>
        {selectData.taskStatus?.name || <span className={'font-300 text-zinc-400'}>{'任务状态'}</span>}
      </span>
    </TaskStatusSelect>
  );
};
