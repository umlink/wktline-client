import { DocSuccess, FilePdf, Zip } from '@icon-park/react';
import { Avatar } from 'antd';
import dayjs from 'dayjs';

type CommentAttachmentItem = {
  /** 文件名 */
  name: string;
  /** 文件类型 */
  type: string;
  /** 文件地址 */
  url: string;
  /** 文件大小-（kb） */
  size: number;
};

const AttachmentLog = (props: { comment: API.TaskOperationLogItem }) => {
  const { avatar, content, username, createdAt, desc } = props.comment;
  let list: CommentAttachmentItem[] = [];
  try {
    list = JSON.parse(desc);
  } catch (e) {
    console.warn(e);
  }
  const fileIconMap = (type?: string) => {
    let Icon = <DocSuccess theme="outline" size="20" fill="#333" />;
    switch (type) {
      case 'application/pdf':
        Icon = <FilePdf theme="outline" size="20" fill="#333" />;
        break;
      case 'application/zip':
        Icon = <Zip theme="outline" size="20" fill="#333" />;
        break;
    }
    return Icon;
  };

  return (
    <div className={'mt-3 flex'}>
      <Avatar src={avatar} size={28} />
      <div className={'ml-2 w-2 flex-grow text-[13px]'}>
        <div className={'flex items-center justify-between pt-1 text-zinc-400'}>
          <span>{username}</span>
          <span className={'font-light'}>{dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</span>
        </div>
        <p className={'mt-3 text-sm [&_.tribute-mention]:text-primary'} dangerouslySetInnerHTML={{ __html: content }} />
        <div>
          {list.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  'mt-2 flex items-center justify-between border border-zinc-50 bg-zinc-50 p-2 hover:bg-zinc-100'
                }
              >
                <div className={'flex items-center space-x-2'}>
                  <Avatar className={'bg-white'} icon={fileIconMap(item.type)} shape="square" src={item.url} />
                  <a
                    rel={'noopener noreferrer'}
                    href={item.url}
                    title={item.name}
                    target={'_blank'}
                    className={'max-w-[200px] truncate whitespace-nowrap text-zinc-400'}
                  >
                    {item.name}
                  </a>
                </div>
                <span className={'text-xs text-gray-400'}>{((item.size || 0) / 1024).toFixed(2)}KB</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttachmentLog;
