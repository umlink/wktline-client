import useScrollMove from '@/hooks/useScrollMove';
import MsgMenuItem from '@/pages/Message/components/MsgMenuItem';
import { Down } from '@icon-park/react';
import { useModel } from '@umijs/max';
import type { MenuProps, TabsProps } from 'antd';
import { Badge, Dropdown, Empty, Spin, Tabs } from 'antd';
import { useEffect, useRef } from 'react';

const tabStatusObj: Record<string, any> = {
  all: undefined,
  unread: 0,
  read: 1,
};

const menuItems: MenuProps['items'] = [
  {
    key: '1',
    label: '@我的',
  },
  {
    key: '2',
    label: '系统消息',
  },
];

const MsgMenu = () => {
  const { globalData } = useModel('global');
  const { state, getData, setState, loading, getMsgDetail } = useModel('Message.model');
  const listRef = useRef<any>(null);

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

  useEffect(getData, []);

  return (
    <div className={'w-[320px] overflow-y-auto border-r border-r-zinc-100 bg-white shadow-rl'}>
      <div className={'py-2'}>
        <Tabs
          activeKey={state.activeTab}
          tabBarStyle={{
            marginBottom: 0,
            paddingLeft: 16,
          }}
          items={tabItems}
          onChange={(v) =>
            setState({
              activeTab: v,
              pageNo: 1,
              finished: false,
              params: {
                ...state.params,
                status: tabStatusObj[v],
              },
            })
          }
          tabBarExtraContent={
            <Dropdown placement={'bottomRight'} menu={{ items: menuItems }}>
              <span className={'flex cursor-pointer items-center space-x-[2px] pr-3 text-zinc-500 hover:text-primary'}>
                <span>全部</span>
                <Down size={18} fill={'#bbb'} />
              </span>
            </Dropdown>
          }
        />
      </div>
      <Spin spinning={loading}>
        <div className={'h-[calc(100%-47px)] min-h-[200px] overflow-y-auto'} ref={listRef} onScroll={onScroll}>
          {state.msgList.map((item, index) => (
            <div key={item.id} onClick={() => getMsgDetail(item, index)}>
              <MsgMenuItem item={item} openId={state.openId} />
            </div>
          ))}
          {state.finished && !state.msgList.length && <Empty />}
        </div>
      </Spin>
    </div>
  );
};

export default MsgMenu;
