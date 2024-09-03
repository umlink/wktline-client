import { CloseOne, Help, Plus } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { App, Avatar, Button, Space, Tooltip } from 'antd';
import ActorUserSelect from './ActorUserSelect';

const TaskActor = () => {
  const { modal } = App.useApp();
  const { data, deleteActorForTask } = useModel('taskDetail');
  // 任务创建者和任务执行者不能被移除
  const disabledIds = [data.task?.handlerId, data.task?.creatorId];

  const onDeleteActor = (item: API.TaskActorItem) => {
    modal.confirm({
      title: `移除任务参与者`,
      content: `确认移除任务参与者：${item.username}?`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteActorForTask([item.id]);
      },
    });
  };

  return (
    <div className={'border-b border-b-gray-100 p-4 pr-5'}>
      <div>
        <Space align={'center'}>
          <span className={'text-zinc-500'}>参与者</span>
          <span className={'text-zinc-500'}>·</span>
          <span className={'text-zinc-600'}>{data.actorList.length}</span>
          <Tooltip placement={'right'} title={'参与者将收到评论和更新通知'}>
            <Help className={'flex cursor-pointer'} theme="filled" size="14" fill="#999" />
          </Tooltip>
        </Space>
      </div>
      <div className={'mt-4'}>
        <Space className={'flex-wrap'}>
          {data.actorList.map((item: API.TaskActorItem, index: number) => (
            <Tooltip
              key={item.id}
              placement="top"
              title={`${item.username}${index === 0 ? '，创建者' : data.task?.handlerId === item.id ? '，负责人' : ''}`}
            >
              <span className={'group relative'}>
                <Avatar src={item.avatar} className={'align-middle'} />
                {!disabledIds.includes(item.id) && (
                  <span
                    onClick={() => onDeleteActor(item)}
                    className={`absolute right-[-6px] top-[-10px] hidden
                    cursor-pointer rounded-xl bg-white text-zinc-300
                    hover:text-zinc-400 group-hover:inline-flex`}
                  >
                    <CloseOne theme="filled" size="16" />
                  </span>
                )}
              </span>
            </Tooltip>
          ))}
          <ActorUserSelect>
            <Tooltip placement="top" title={'添加参与者'}>
              <Button type={'primary'} shape="circle" icon={<Plus />} />
            </Tooltip>
          </ActorUserSelect>
        </Space>
      </div>
    </div>
  );
};

export default TaskActor;
