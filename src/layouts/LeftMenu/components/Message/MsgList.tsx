import useScrollMove from '@/hooks/useScrollMove';
import { Down } from '@icon-park/react';
import { useModel } from '@umijs/max';
import type { MenuProps, TabsProps } from 'antd';
import { Badge, Dropdown, Empty, Spin, Tabs } from 'antd';
import { useEffect, useRef } from 'react';
import MsgItem from './MsgItem';

const tabStatusObj: Record<string, any> = {
  all: undefined,
  unread: 0,
  read: 1,
};

const menuItems: MenuProps['items'] = [
  {
    key: 'task',
    label: '任务消息',
  },
  {
    key: 'system',
    label: '系统消息',
  },
];

const MsgList = () => {
  const { state, setState, loading, getMsgDetail, getData } = useModel('message');
  const { globalData } = useModel('global');
  const listRef = useRef<HTMLDivElement>(null);
  const onScroll = useScrollMove(listRef, getData);

  const tabItems: TabsProps['items'] = [
    {
      key: 'all',
      label: '全部',
    },
    {
      key: 'unread',
      label:
        globalData.unreadCount > 0 ? (
          <Badge size={'small'} count={globalData.unreadCount}>
            <span className={'px-2'}>未读</span>
          </Badge>
        ) : (
          '未读'
        ),
    },
    {
      key: 'read',
      label: '已读',
    },
  ];

  const onTabChange = (v: string) =>
    setState({
      activeTab: v,
      pageNo: 1,
      finished: false,
      params: {
        ...state.params,
        status: tabStatusObj[v],
      },
    });

  useEffect(getData, []);

  return (
    <div className={'w-[300px] overflow-y-auto border-r border-r-zinc-100 bg-white'}>
      <div>
        <Tabs
          activeKey={state.activeTab}
          tabBarStyle={{
            marginBottom: 0,
            paddingLeft: 16,
            paddingRight: 10,
          }}
          items={tabItems}
          onChange={onTabChange}
          tabBarExtraContent={
            <Dropdown placement={'bottomRight'} menu={{ items: menuItems }}>
              <span className={'flex cursor-pointer items-center space-x-[2px] text-primary'}>
                <span>全部</span>
                <Down size={18} fill={'#bbb'} />
              </span>
            </Dropdown>
          }
        />
      </div>
      <div className={'h-[calc(100%-47px)] overflow-y-auto'} ref={listRef} onScroll={onScroll}>
        <Spin spinning={loading}>
          <div className={'min-h-[200px]'}>
            {state.msgList.map((item, index) => (
              <div key={item.id} onClick={() => getMsgDetail(item, index)}>
                <MsgItem item={item} openId={state.openId} />
              </div>
            ))}
            {state.finished && !state.msgList.length && <Empty />}
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default MsgList;
