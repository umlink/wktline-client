import TaskGroupSelect from '@/pages/components/TaskGroupSelect';
import { CategoryManagement } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Tooltip } from 'antd';

export default () => {
  const { data, filterData, setFilterData, setTaskParams } = useModel('ProjectDetail.model');
  return (
    <TaskGroupSelect
      projectId={data.projectId}
      onChange={(item) => {
        setTaskParams({ groupId: item.id });
        setFilterData({ group: { id: item.id, name: item.groupName } });
      }}
      onSelectAll={() => {
        setTaskParams({ groupId: undefined });
        setFilterData({
          group: {
            id: '',
            name: '全部迭代',
          },
        });
      }}
    >
      <Tooltip title="迭代">
        <span className={'g-filter-btn'}>
          <CategoryManagement theme="outline" size="14" fill="#999" />
          <span className={'whitespace-nowrap'}>{filterData.group.name}</span>
        </span>
      </Tooltip>
    </TaskGroupSelect>
  );
};
