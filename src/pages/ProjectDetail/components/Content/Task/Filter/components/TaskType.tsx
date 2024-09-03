import { panelCardTypeFilterMap } from '@/constants';
import TaskTypeSelect from '@/pages/components/TaskTypeSelect';
import { CategoryManagement } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { useUpdateEffect } from 'ahooks';
import { Tooltip } from 'antd';
import { useState } from 'react';
const defaultTaskType: API.TaskTypeItem = { id: '', name: '全部', color: '' };
export default () => {
  const { data, filterData, setTaskParams } = useModel('ProjectDetail.model');
  const [taskType, setTaskType] = useState<API.TaskTypeItem>(defaultTaskType);

  useUpdateEffect(() => {
    if (data.projectId) {
      setTaskType(defaultTaskType);
    }
  }, [data.projectId]);

  if (filterData.cardType === panelCardTypeFilterMap.typeId) return null;

  return (
    <TaskTypeSelect
      icon={<></>}
      id={taskType?.id}
      projectId={data.projectId}
      onSelect={(item) => setTaskType(item)}
      onChange={(item) => {
        setTaskParams({ typeId: item.id || undefined });
        setTaskType(item);
      }}
    >
      <Tooltip title="任务类型">
        <span className={'g-filter-btn whitespace-nowrap'}>
          <CategoryManagement style={{ color: taskType?.color }} theme="outline" />
          <span>{taskType?.name}类型</span>
        </span>
      </Tooltip>
    </TaskTypeSelect>
  );
};
