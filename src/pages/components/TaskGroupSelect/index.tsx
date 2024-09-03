import useScrollMove from '@/hooks/useScrollMove';
import { Search } from '@icon-park/react';
import { useClickAway } from 'ahooks';
import { Button, Divider, Dropdown, DropdownProps, Input, MenuProps, Spin, theme } from 'antd';
import React, { memo, useRef } from 'react';
import useService from './useService';

const { useToken } = theme;
interface IPropsSelect {
  mount?: boolean; // 是否挂载到当前父结点
  arrow?: boolean;
  children: React.ReactNode;
  projectId: string;
  placeholder?: string;
  trigger?: DropdownProps['trigger'];
  placement?: DropdownProps['placement'];
  onChange: (item: API.TaskGroupItem) => void;
  onSelectAll?: () => void;
}
const TaskGroupSelect = memo((props: IPropsSelect) => {
  const { data, loading, keywordsChange, getMoreGroup, open, setOpen } = useService(props.projectId);

  const container = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const onScroll = useScrollMove(listRef, getMoreGroup);

  useClickAway(() => setOpen(false), [container]);

  const items: MenuProps['items'] = data.groupList.map((item, index) => {
    return {
      key: index,
      label: <span>{item.groupName}</span>,
    };
  });

  const onClickItem = ({ key }: any) => {
    const item = data.groupList[key];
    props.onChange(item);
    setOpen(false);
  };

  const { token } = useToken();

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
    textAlign: 'left',
  };

  return (
    <span ref={props.mount ? container : null}>
      <Dropdown
        open={open}
        trigger={props.trigger || ['click']}
        menu={{ items, onClick: onClickItem }}
        arrow={props.arrow ?? true}
        onOpenChange={(v) => setOpen(v)}
        placement={props.placement || 'bottomLeft'}
        getPopupContainer={() => container.current!}
        dropdownRender={(menu) => (
          <div style={contentStyle} className={'w-[200px]'}>
            <div className={'p-2'}>
              <Input
                placeholder="任务迭代名称"
                onChange={keywordsChange}
                suffix={<Search theme="outline" size="16" fill="#999" />}
              />
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={'max-h-[200px] overflow-y-auto rounded-b-lg bg-white'} ref={listRef} onScroll={onScroll}>
              {loading && !data.groupList.length ? (
                <div className={'p-4 text-center'}>
                  <Spin />
                </div>
              ) : !!data.groupList.length ? (
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
                <div className={'py-4 text-center'}>暂无数据</div>
              )}
            </div>
            {!!props.onSelectAll && (
              <>
                <Divider style={{ margin: 0 }} />
                <div className={'p-1'}>
                  <Button
                    type={'text'}
                    block
                    onClick={() => {
                      setOpen(false);
                      props.onSelectAll?.();
                    }}
                  >
                    <span className={'text-primary'}>全部迭代</span>
                  </Button>
                </div>
              </>
            )}
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

export default TaskGroupSelect;
