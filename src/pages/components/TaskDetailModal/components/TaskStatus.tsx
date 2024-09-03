import TaskStatusSelect from '@/pages/components/TaskStatusSelect';
import { useModel } from '@umijs/max';

export default () => {
  const { data, updateTaskInfo } = useModel('taskDetail');
  return (
    <TaskStatusSelect
      projectId={data.task!.projectId!}
      onChange={(statusId) => {
        updateTaskInfo({ statusId });
      }}
    >
      <span style={{ color: data.task?.statusColor }}>
        {data.task?.statusName || <span className={'font-300 text-zinc-400'}>{'设置任务状态'}</span>}
      </span>
    </TaskStatusSelect>
  );
};
