import { EVENTS } from '@/constants';
import EventBus from '@/utils/event-bus';
import { useModel } from '@umijs/max';
import { Avatar } from 'antd';

const MsgContent = () => {
  const { state } = useModel('Message.model');
  if (!state.msgDetail) {
    return <div>no msg</div>;
  }

  const openTaskDetail = () => EventBus.emit(EVENTS.OPEN_TASK_DETAIL, state.msgDetail?.taskId);

  const keywordsClass = `[&_.last-text]:font-bold [&_.last-text]:text-zinc-800 [&_.pre-text]:font-bold [&_.pre-text]:text-zinc-800`;

  return (
    <div className={'flex-1 p-6'}>
      <h1 className={'text-lg font-bold'}>{state.msgDetail?.title}</h1>
      <div className={'mt-2 flex items-center space-x-2 text-zinc-400'}>
        <Avatar size={26} src={state.msgDetail?.senderAvatar} />
        <span>{state.msgDetail?.senderName}</span>
        <span>{state.msgDetail?.createdAt}</span>
      </div>
      <p
        className={`mt-4 text-zinc-500 ${keywordsClass}`}
        dangerouslySetInnerHTML={{ __html: state.msgDetail?.content || '' }}
      />
      {!!state.msgDetail?.taskId && (
        <div className={'mt-5'}>
          <span className={'cursor-pointer text-primary'} onClick={openTaskDetail}>
            查看任务
          </span>
        </div>
      )}
    </div>
  );
};

export default MsgContent;
