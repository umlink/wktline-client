import TaskTypeSelect from '@/pages/components/TaskTypeSelect';
import { useModel } from '@umijs/max';

export default () => {
  const { data, selectData, setSelectData, setParams } = useModel('newTask');
  return (
    <TaskTypeSelect
      projectId={data.projectId!}
      onChange={(taskType) => {
        setParams({ typeId: taskType.id });
        setSelectData({ taskType });
      }}
    >
      <span style={{ color: selectData.taskType?.color }}>
        {selectData.taskType?.name || <span className={'font-300 text-zinc-400'}>{'任务类型'}</span>}
      </span>
    </TaskTypeSelect>
  );
};
