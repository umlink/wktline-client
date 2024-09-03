import { Avatar } from 'antd';
import dayjs from 'dayjs';

const CommentLog = (props: { comment: API.TaskOperationLogItem }) => {
  const { avatar, content, username, createdAt } = props.comment;
  return (
    <div className={'mt-3 flex text-[13px]'}>
      <Avatar src={avatar} size={28} />
      <div className={'ml-2 w-2 flex-grow'}>
        <div className={'flex items-center justify-between pt-1 text-zinc-400'}>
          <span>{username}</span>
          <span className={'font-light'}>{dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</span>
        </div>
        <div
          className={'mt-3 break-all text-sm [&_.tribute-mention]:text-primary'}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default CommentLog;
