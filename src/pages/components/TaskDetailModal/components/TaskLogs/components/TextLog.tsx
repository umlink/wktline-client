import RickEditor from '@/components/RickEditor';
import { Avatar } from 'antd';
import dayjs from 'dayjs';
export default (props: { log: API.TaskOperationLogItem }) => {
  const { username, avatar, name, type, content, createdAt } = props.log;

  const genContent = (): JSX.Element => {
    let retContent: JSX.Element;
    switch (type) {
      case 'DYNAMIC_TASK_DESCRIPTION':
        retContent = (
          <>
            {!!content ? (
              <details className={'mt-2'}>
                <summary className={'cursor-pointer select-none'}>详情</summary>
                <div className={'ml-1 border-l border-l-zinc-100 bg-zinc-50'}>
                  <RickEditor readOnly={true} content={content}></RickEditor>
                </div>
              </details>
            ) : (
              <span>空</span>
            )}
          </>
        );
        break;
      default:
        retContent = <span className={'[&_.pre-text]:text-zinc-800'} dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return retContent;
  };

  return (
    <div className={'mt-3 flex justify-between text-[13px]'}>
      <Avatar className={'inline-block min-w-[25px]'} src={avatar} size={28} />
      <div className={'ml-2 flex-1'}>
        <div className={'flex items-center justify-between pt-1'}>
          <span className={'space-x-2'}>
            <span className={'text-zinc-400'}>{username}</span>
            <span className={'text-zinc-500'}>{name}</span>
          </span>
          <span className={'min-w-[140px] text-right font-light text-zinc-400'}>
            {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}
          </span>
        </div>
        <div className={'mt-3 text-zinc-500'}>{genContent()}</div>
      </div>
    </div>
  );
};
