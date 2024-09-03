import TaskPrioritySelect from '@/pages/components/TaskPrioritySelect';
import { useModel } from '@umijs/max';
import { Space } from 'antd';

export default () => {
  const { selectData, setSelectData, setParams } = useModel('newTask');
  return (
    <TaskPrioritySelect
      onChange={(taskPriority) => {
        setSelectData({ taskPriority });
        setParams({ priorityId: taskPriority.id });
      }}
    >
      <Space className={'group'} style={{ color: selectData.taskPriority?.color }}>
        {!!selectData.taskPriority ? (
          <span>
            {selectData.taskPriority.value}（{selectData.taskPriority.name}）
          </span>
        ) : (
          <span className={'font-300 text-zinc-400'}>任务优先级</span>
        )}
      </Space>
    </TaskPrioritySelect>
  );
};
