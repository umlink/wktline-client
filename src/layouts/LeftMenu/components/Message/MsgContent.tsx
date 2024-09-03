import ListEmptyImg from '@/assets/images/default/list-empty.png';
import { EVENTS } from '@/constants';
import EventBus from '@/utils/event-bus';
import { CloseSmall } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Avatar, Image } from 'antd';

const MsgContent = ({ onClose }: { onClose: () => void }) => {
  const { state } = useModel('message');

  const openTaskDetail = () => EventBus.emit(EVENTS.OPEN_TASK_DETAIL, state.msgDetail?.taskId);

  const keywordsClass = `[&_.last-text]:font-bold [&_.last-text]:text-zinc-800 [&_.pre-text]:font-bold [&_.pre-text]:text-zinc-800`;

  const Content = () => {
    if (!state.msgDetail) {
      return (
        <div className={'p-5 text-center'}>
          <Image width={300} src={ListEmptyImg} preview={false} />
        </div>
      );
    }
    return (
      <>
        <h1 className={'text-[16px] font-bold'}>{state.msgDetail?.title}</h1>
        <div className={'mt-2 flex items-center space-x-2 text-zinc-400'}>
          <Avatar size={22} src={state.msgDetail?.senderAvatar} />
          <span>{state.msgDetail?.senderName}</span>
          <span>{state.msgDetail?.createdAt}</span>
        </div>
        {!!state.msgDetail?.taskId && (
          <div className={'ml-[30px] mt-1'}>
            <span className={'text-zinc-500'}>任务：</span>
            <span className={'cursor-pointer text-primary'} onClick={openTaskDetail}>
              {state.msgDetail.taskName}
            </span>
          </div>
        )}
        <p
          className={`mt-3 text-zinc-500 ${keywordsClass}`}
          dangerouslySetInnerHTML={{ __html: state.msgDetail?.content || '' }}
        />
      </>
    );
  };

  return (
    <div className={'relative flex-1 p-5'}>
      <span
        onClick={onClose}
        className={'absolute right-2 top-2 cursor-pointer rounded-md bg-zinc-50 leading-none hover:bg-zinc-100'}
      >
        <CloseSmall theme="outline" size="24" fill="#aaa" strokeWidth={2} />
      </span>
      <Content />
    </div>
  );
};

export default MsgContent;
