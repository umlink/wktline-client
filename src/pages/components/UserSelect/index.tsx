import useScrollMove from '@/hooks/useScrollMove';
import { Search } from '@icon-park/react';
import { useClickAway, useDebounceFn } from 'ahooks';
import { Avatar, Divider, Dropdown, DropdownProps, Empty, Input, MenuProps, Space, Spin, theme } from 'antd';
import React, { memo, useRef } from 'react';
import useService from './useService';

const { useToken } = theme;
interface IPropsSelect {
  mount?: boolean;
  children: React.ReactNode;
  projectId?: string;
  placeholder?: string;
  trigger?: DropdownProps['trigger'];
  placement?: DropdownProps['placement'];
  onChange: (item: API.ProjectUserItem) => void;
}
const UserSelect = memo((props: IPropsSelect) => {
  const { data, pLoading, uLoading, setData, loadMore, open, setOpen } = useService(props);

  const container = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const onScroll = useScrollMove(listRef, loadMore);

  useClickAway(() => {
    setOpen(false);
  }, [container]);

  const { run: onKeywords } = useDebounceFn(
    (e) =>
      setData({
        keywords: e.target.value,
        userList: [],
        pageNo: 1,
        finished: false,
      }),
    { wait: 300 },
  );

  const items: MenuProps['items'] = data.userList.map((item, index) => {
    return {
      key: index,
      label: (
        <Space>
          <Avatar size={28} src={item.avatar} />
          <span>{item.username}</span>
        </Space>
      ),
    };
  });

  const { token } = useToken();

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
  };

  const onClickItem = ({ key }: any) => {
    const item = data.userList[key];
    props.onChange(item);
    setOpen(false);
  };

  return (
    <span ref={props.mount ? container : null}>
      <Dropdown
        open={open}
        menu={{ items, onClick: onClickItem }}
        arrow={true}
        trigger={props.trigger || ['click']}
        onOpenChange={(v) => setOpen(v)}
        getPopupContainer={() => container.current!}
        placement={props.placement || 'bottomLeft'}
        dropdownRender={(menu) => (
          <div style={contentStyle} className={'w-[200px]'}>
            <div className={'p-2'}>
              <Input
                placeholder="根据用户名查询"
                onChange={onKeywords}
                suffix={<Search theme="outline" size="16" fill="#999" />}
              />
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={'h-auto max-h-[260px] overflow-y-auto rounded-b-lg'} ref={listRef} onScroll={onScroll}>
              {(pLoading || uLoading) && !data.userList.length ? (
                <div className={'p-4 text-center'}>
                  <Spin />
                </div>
              ) : !!data.userList.length ? (
                <div>
                  {React.cloneElement(menu as React.ReactElement, {
                    style: menuStyle,
                  })}
                  {(pLoading || uLoading) && (
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
          </div>
        )}
      >
        <span className="cursor-pointer" onClick={() => setOpen(true)}>
          {props.children}
        </span>
      </Dropdown>
    </span>
  );
});

export default UserSelect;
