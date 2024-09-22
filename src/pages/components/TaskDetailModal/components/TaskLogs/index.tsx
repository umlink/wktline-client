import { EVENTS } from '@/constants';
import EventBus from '@/utils/event-bus';
import { More } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { useResetState, useUpdateEffect } from 'ahooks';
import { Empty, Segmented, Spin } from 'antd';
import { useEffect, useRef } from 'react';
import AttachmentLog from './components/AttachmentLog';
import CommentLog from './components/CommentLog';
import TextLog from './components/TextLog';
export default () => {
  const { data, setData, logLoading, getMoreTaskLog } = useModel('taskDetail');
  const logRef = useRef<HTMLDivElement>(null);

  const tabs = [
    {
      label: '动态',
      value: 'DYNAMIC',
    },
    {
      label: '仅评论',
      value: 'COMMENT',
    },
    {
      label: '含附件',
      value: 'ATTACHMENT',
    },
  ];

  const [activeTab, setActiveTab, resetActiveTab] = useResetState('DYNAMIC');

  useUpdateEffect(() => {
    resetActiveTab();
  }, [data.taskId]);

  useEffect(() => {
    try {
      EventBus.on(EVENTS.TASK_LOG_SCROLL, (isTop) => {
        let scrollHeight = isTop ? 0 : logRef.current?.clientHeight || 0;
        setTimeout(() => {
          if (logRef.current) {
            logRef.current.scrollTop = scrollHeight;
          }
        }, 100);
      });
    } catch (e) {
      console.log('调试出现，忽略', e);
    }
  }, []);

  const onChange = (value: any) => {
    setActiveTab(value);
    setData({
      taskLogParams: {
        ...data.taskLogParams,
        type: value === 'DYNAMIC' ? '' : value,
      },
    });
  };

  const getLogItemByType = (log: API.TaskOperationLogItem) => {
    if (log.type === 'COMMENT') {
      return <CommentLog comment={log} key={log.id} />;
    }
    if (log.type === 'ATTACHMENT') {
      return <AttachmentLog comment={log} key={log.id} />;
    }
    return <TextLog log={log} key={log.id} />;
  };

  return (
    <div className={'flex h-0 flex-grow flex-col'}>
      <div className={'p-2'}>
        <Segmented options={tabs} value={activeTab} onChange={onChange} />
      </div>
      <div
        ref={logRef}
        className={'h-[calc(100vh-100px)]] hidden-scrollbar relative flex-1 overflow-y-scroll pb-4 pl-4 pr-5'}
      >
        {data.taskLog.total > data.taskLog.list.length && (
          <div
            className={
              'sticky top-0 z-[10] flex cursor-pointer items-center space-x-1 bg-white py-2 text-zinc-400 hover:text-primary'
            }
            onClick={() => getMoreTaskLog()}
          >
            <More theme="outline" size="16" fill="#999" />
            <span>查看更多动态 总 {data.taskLog.total - data.taskLog.list.length} 条</span>
          </div>
        )}
        <div className={'text-center'}>
          <Spin size={'small'} spinning={logLoading} />
        </div>
        {data.taskLog.list.map((log) => {
          return getLogItemByType(log);
        })}
        {!data.taskLog.list.length && !logLoading && <Empty className={'mt-10'} description={''} />}
      </div>
    </div>
  );
};
