import useScrollMove from '@/hooks/useScrollMove';
import { Search } from '@icon-park/react';
import { useClickAway } from 'ahooks';
import { Divider, Dropdown, DropdownProps, Input, MenuProps, Spin, theme } from 'antd';
import React, { useRef } from 'react';
import useService from './useService';

const { useToken } = theme;
interface IPropsSelect {
  arrow?: boolean;
  children: React.ReactNode;
  placeholder?: string;
  placement?: DropdownProps['placement'];
  onChange: (item: API.ProjectGroupItem) => void;
  onSelectAll?: () => void;
}
const ProjectGroupSelect = (props: IPropsSelect) => {
  const { data, loading, keywordsChange, getMoreGroup, open, setOpen } = useService();

  const container = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const onScroll = useScrollMove(listRef, getMoreGroup);

  useClickAway(() => setOpen(false), [container]);

  const items: MenuProps['items'] = data.groupList.map((item, index) => {
    return {
      key: index,
      label: <span>{item.name}</span>,
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
    borderRadius: 4,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: 'none',
    textAlign: 'left',
  };

  return (
    <span ref={container}>
      <Dropdown
        open={open}
        menu={{ items, onClick: onClickItem }}
        arrow={props.arrow || true}
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
                <div
                  onClick={() => {
                    setOpen(false);
                    props.onSelectAll?.();
                  }}
                  className={'cursor-pointer p-1 text-center text-primary'}
                >
                  <div className={'rounded-lg p-1 hover:bg-zinc-100'}>全部分组</div>
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
};

export default ProjectGroupSelect;
