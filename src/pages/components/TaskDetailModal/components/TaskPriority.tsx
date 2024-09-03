import TaskPrioritySelect from '@/pages/components/TaskPrioritySelect';
import { useModel } from '@umijs/max';

export default () => {
  const { data, updateTaskInfo } = useModel('taskDetail');
  return (
    <TaskPrioritySelect onChange={(priority) => updateTaskInfo({ priority: priority.id })}>
      <span style={{ color: data.task?.priority }}>
        {!!data.task?.priority ? (
          <span>{data.task?.priority}</span>
        ) : (
          <span className={'font-300 text-zinc-400'}>{'设置优先级'}</span>
        )}
      </span>
    </TaskPrioritySelect>
  );
};
