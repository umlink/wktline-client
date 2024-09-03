import { useModel } from '@@/exports';
import { Remind } from '@icon-park/react';
import { Badge, Popover } from 'antd';
import { useRef, useState } from 'react';
import MsgContent from './MsgContent';
import MsgList from './MsgList';

export default () => {
  const { globalData } = useModel('global');
  const [open, setOpen] = useState(false);
  const ref: any = useRef();

  const content = () => {
    return (
      <div className={'flex h-[500px] w-[700px] justify-between overflow-hidden rounded-md bg-white shadow'}>
        <MsgList />
        <MsgContent onClose={() => setOpen(false)} />
      </div>
    );
  };

  return (
    <div className={'[&_.ant-popover]:shadow-lg'} ref={ref}>
      <Popover
        open={open}
        overlayInnerStyle={{ padding: 4 }}
        getPopupContainer={() => ref.current}
        placement="rightBottom"
        title={null}
        content={content}
        trigger="click"
      >
        <div className={'flex flex-col items-center leading-none'} onClick={() => setOpen(true)}>
          <span className={`group inline-block cursor-pointer rounded-lg p-4`}>
            <Badge size="small" count={globalData.unreadCount}>
              <span className={'leading-none group-hover:text-primary'}>
                <Remind theme="outline" size="18" />
              </span>
            </Badge>
          </span>
        </div>
      </Popover>
    </div>
  );
};
