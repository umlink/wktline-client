import { Info } from '@icon-park/react';
import { Avatar } from 'antd';

type PropsType = {
  item: API.MessageItem;
  openId?: string;
};

const MsgItem = ({ item, openId }: PropsType) => {
  const isActive = openId === item.id;
  return (
    <div
      className={`${isActive ? '!bg-primary-50' : ''} flex cursor-pointer border-b border-b-zinc-100/80 px-4 py-3 hover:bg-primary-50`}
    >
      <Info theme="outline" size="16" fill={item.status ? '#999' : '#666'} strokeWidth={3} />
      <div className={'ml-2 w-0 flex-1'}>
        <h2 className={`mb-2 truncate leading-none ${item.status ? 'text-zinc-400' : 'font-bold'}`}>
          {item.msgType === 'TASK' ? item.taskName : item.content}
        </h2>
        <h3 className={`mb-2 text-xs font-light text-zinc-400`}>{item.title}</h3>
        <div className={'flex items-center justify-between text-xs text-zinc-400'}>
          <span className={'flex space-x-1'}>
            <Avatar size={18} src={item.senderAvatar} />
            <span>{item.senderName}</span>
          </span>
          <span className={'font-light text-zinc-300'}>{item.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default MsgItem;
