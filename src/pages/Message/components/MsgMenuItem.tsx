import { Avatar } from 'antd';

type PropsType = {
  item: API.MessageItem;
  openId?: string;
};

const MsgMenuItem = ({ item, openId }: PropsType) => {
  const isActive = openId === item.id;
  return (
    <div
      className={`${isActive ? '!bg-primary-100' : ''} flex flex-1 cursor-pointer border-b border-b-zinc-100/80 px-4 py-3 hover:bg-primary-50`}
    >
      <Avatar size={26} src={item.senderAvatar} />
      <div className={'ml-2 flex-1'}>
        <h3 className={`mb-2 ${item.status ? 'text-zinc-500' : 'font-bold'}`}>{item.title}</h3>
        <div className={'flex items-center justify-between text-xs text-zinc-400'}>
          <span>{item.senderName}</span>
          <span className={'font-light'}>{item.createdAt}</span>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default MsgMenuItem;
