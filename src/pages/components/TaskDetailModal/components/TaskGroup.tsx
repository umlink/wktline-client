import TaskGroupSelect from '@/pages/components/TaskGroupSelect';
import { CloseOne, Down, Help } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Space, Tooltip } from 'antd';

export default () => {
  const { data, updateTaskInfo } = useModel('taskDetail');
  return (
    <TaskGroupSelect projectId={data.projectId} onChange={(item) => updateTaskInfo({ groupId: item.id })}>
      <Space className={'group rounded-md bg-zinc-50 p-2 py-1 hover:bg-zinc-100'}>
        <span>{data.task?.groupName || <span className={'font-300 text-zinc-400'}>{'设置任务分组'}</span>}</span>
        <span className={'align-middle text-zinc-300'}>
          <Down className={`${data.task?.groupId ? 'group-hover:hidden' : ''}`} theme="filled" size="16" fill="#999" />
          {!!data.task?.groupId && (
            <CloseOne
              onClick={(e) => {
                e.stopPropagation();
                updateTaskInfo({ groupId: undefined });
              }}
              className={'!hidden !text-zinc-300 hover:!text-zinc-400 group-hover:!inline-flex'}
              theme="filled"
              size="16"
            />
          )}
        </span>
      </Space>
      <Tooltip placement="right" title="版本迭代、任务分组等">
        <Help className={'g-grey-bg-hover ml-2'} theme="outline" size="14" fill="#999" />
      </Tooltip>
    </TaskGroupSelect>
  );
};
