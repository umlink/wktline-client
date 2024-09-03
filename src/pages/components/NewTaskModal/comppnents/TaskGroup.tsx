import TaskGroupSelect from '@/pages/components/TaskGroupSelect';
import { CloseOne, Down, Help } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Space, Tooltip } from 'antd';

export default () => {
  const { data, selectData, setSelectData, setParams } = useModel('newTask');
  return (
    <TaskGroupSelect
      projectId={data.projectId!}
      onChange={(taskGroup) => {
        setSelectData({ taskGroup });
        setParams({ groupId: taskGroup.id });
      }}
    >
      <Space>
        <Space className={'group rounded-md bg-zinc-50 p-2 py-1 hover:bg-zinc-100'}>
          <span className={'text-zinc-600'}>
            {selectData.taskGroup?.groupName || <span className={'font-300 text-zinc-400'}>设置任务分组</span>}
          </span>
          <span className={'align-middle text-zinc-400'}>
            <Down
              className={`${selectData.taskGroup ? 'group-hover:hidden' : ''}`}
              theme="filled"
              size="16"
              fill="#999"
            />
            {!!selectData.taskGroup && (
              <CloseOne
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectData({ taskGroup: undefined });
                  setParams({ groupId: undefined });
                }}
                className={'hidden text-zinc-300 hover:text-zinc-400 group-hover:inline-flex'}
                theme="filled"
                size="16"
              />
            )}
          </span>
        </Space>
        <Tooltip placement="right" title="场景：版本迭代、自定义分组等">
          <Help className={'g-grey-bg-hover'} theme="outline" size="14" fill="#999" />
        </Tooltip>
      </Space>
    </TaskGroupSelect>
  );
};
