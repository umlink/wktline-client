import useScrollMove from '@/hooks/useScrollMove';
import { Search } from '@icon-park/react';
import { useClickAway } from 'ahooks';
import type { MenuProps } from 'antd';
import { Avatar, Button, Checkbox, Divider, Dropdown, Empty, Input, Space, Spin, theme } from 'antd';
import React, { useRef } from 'react';
import useService from './useService';

const { useToken } = theme;

interface IPropsSelect {
  children: React.ReactNode;
  placeholder?: string;
  onChange: (user: API.WorkPanelUserItem) => void;
}
const UserSelect = (props: IPropsSelect) => {
  const container = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { data, open, setOpen, loading, adLoading, onUserChange, loadMore, addProjectUser, onKeywordsChange } =
    useService();

  useClickAway(() => setOpen(false), [container]);

  const items: MenuProps['items'] = data.userList.map((item) => {
    return {
      key: item.id,
      label: (
        <Checkbox
          key={item.id}
          className="w-full"
          checked={data.selectedUserIds.includes(item.id)}
          onChange={(e) => onUserChange(e, item.id)}
        >
          <Space>
            <Avatar src={item.avatar} />
            <span>{item.username}</span>
          </Space>
        </Checkbox>
      ),
    };
  });

  const onScroll = useScrollMove(listRef, loadMore);

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };

  return (
    <span ref={container}>
      <Dropdown
        open={open}
        menu={{ items }}
        arrow={true}
        className={'w-[240px]'}
        placement="bottomRight"
        getPopupContainer={() => container.current!}
        dropdownRender={(menu) => (
          <div style={contentStyle} className={'w-[240px]'}>
            <div className={'p-2'}>
              <Input
                placeholder="根据用户名查询"
                onChange={onKeywordsChange}
                suffix={<Search theme="outline" size="16" fill="#999" />}
              />
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={'max-h-[240px] overflow-y-auto'} ref={listRef} onScroll={onScroll}>
              {loading && !data.userList.length ? (
                <div className={'p-4 text-center'}>
                  <Spin />
                </div>
              ) : !!data.userList.length ? (
                <div>
                  {React.cloneElement(menu as React.ReactElement, {
                    style: menuStyle,
                  })}
                  {loading && (
                    <div className={'p-4 text-center'}>
                      <Spin />
                    </div>
                  )}
                </div>
              ) : (
                <div className={'py-4 text-center'}>
                  <Empty description={'未找到用户'} />
                </div>
              )}
            </div>
            <div className={'border-t border-t-gray-100 p-1'}>
              <Button type={'text'} className={'text-primary'} block onClick={addProjectUser} loading={adLoading}>
                添加订阅
              </Button>
            </div>
          </div>
        )}
      >
        <span onClick={() => setOpen(true)}>{props.children}</span>
      </Dropdown>
    </span>
  );
};

export default UserSelect;
