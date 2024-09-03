import projectAvatar from '@/assets/images/default/project-avatar.jpeg';
import useScrollMove from '@/hooks/useScrollMove';
import { Search } from '@icon-park/react';
import { useClickAway, useDebounceFn } from 'ahooks';
import { Avatar, Divider, Dropdown, DropdownProps, Empty, Input, MenuProps, Space, Spin, theme } from 'antd';
import React, { useRef } from 'react';
import useService from './useService';

const { useToken } = theme;
interface IPropsSelect {
  mount?: boolean;
  children: React.ReactNode;
  placement?: DropdownProps['placement'];
  onChange: (v: any) => void;
}
const ProjectSelect = (props: IPropsSelect) => {
  const { data, setData, setParams, loading, loadMore, open, setOpen } = useService();

  const container = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const onScroll = useScrollMove(listRef, loadMore);

  useClickAway(() => {
    setOpen(false);
  }, [container]);

  const { run: onKeywords } = useDebounceFn(
    (e) => {
      setData({ finished: false,
      });
      setParams({
        keywords: e.target.value,
        pageNo: 1,
      });
    },
    { wait: 300 },
  );

  const items: MenuProps['items'] = data.projectList.map((item) => {
    return {
      key: item.id,
      label: (
        <Space>
          <Avatar shape="square" src={item.headerImg || projectAvatar} />
          <span>{item.name}</span>
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
    setOpen(false);
    props.onChange(key);
  };

  return (
    <span ref={props.mount ? container : null}>
      <Dropdown
        open={open}
        menu={{ items, onClick: onClickItem }}
        arrow={true}
        placement={props.placement || 'bottom'}
        onOpenChange={(v) => setOpen(v)}
        getPopupContainer={() => container.current!}
        dropdownRender={(menu) => (
          <div style={contentStyle} className={'w-[250px]'}>
            <div className={'p-2'}>
              <Input
                placeholder="根据项目名查询"
                onChange={onKeywords}
                suffix={<Search theme="outline" size="16" fill="#999" />}
              />
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={'h-auto max-h-[260px] overflow-y-auto rounded-b-lg'} ref={listRef} onScroll={onScroll}>
              {loading && !data.projectList.length ? (
                <div className={'p-4 text-center'}>
                  <Spin />
                </div>
              ) : !!data.projectList.length ? (
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
                  <Empty description={'未找到项目'} />
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
};

export default ProjectSelect;
