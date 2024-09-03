import useScrollMove from '@/hooks/useScrollMove';
import { Search } from '@icon-park/react';
import { useClickAway, useDebounceFn } from 'ahooks';
import { Divider, Dropdown, DropdownProps, Empty, Input, MenuProps, Spin, theme } from 'antd';
import React, { useRef } from 'react';
import useService from './useService';

const { useToken } = theme;

interface IPropsSelect {
  mount?: boolean;
  children: React.ReactNode;
  projectId?: string;
  placeholder?: string;
  trigger?: DropdownProps['trigger'];
  placement?: DropdownProps['placement'];
  onChange: (item: API.TaskDetailItem) => void;
}

const TaskSelect = (props: IPropsSelect) => {
  const { data, loading, setData, getTaskList, open, setOpen } = useService(props.projectId);

  const container = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const onScroll = useScrollMove(listRef, () => {
    if (loading) return;
    getTaskList();
  });

  useClickAway(() => {
    setOpen(false);
  }, [container]);

  const { run: onKeywords } = useDebounceFn((e) => setData({ keywords: e.target.value, taskList: [], pageNo: 1 }), {
    wait: 300,
  });

  const items: MenuProps['items'] = data.taskList.map((item, index) => {
    return {
      key: index,
      label: <span>{item.name}</span>,
    };
  });

  const onClickItem = ({ key }: any) => {
    const item = data.taskList[key];
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
        menu={{ items, onClick: onClickItem }}
        arrow={true}
        onOpenChange={(v) => setOpen(v)}
        placement={props.placement || 'bottomLeft'}
        trigger={props.trigger}
        getPopupContainer={() => container.current!}
        dropdownRender={(menu) => (
          <div style={contentStyle} className={'w-full max-w-[372px]'}>
            <div className={'p-2'}>
              <Input
                placeholder="根据任务名搜索任务"
                onChange={onKeywords}
                suffix={<Search theme="outline" size="16" fill="#999" />}
              />
            </div>
            <Divider style={{ margin: 0 }} />
            <div className={'max-h-[260px] overflow-y-auto rounded-b-lg bg-white'} ref={listRef} onScroll={onScroll}>
              {loading && !data.taskList.length ? (
                <div className={'p-4 text-center'}>
                  <Spin />
                </div>
              ) : !!data.taskList.length ? (
                <div>
                  {React.cloneElement(menu as React.ReactElement, {
                    style: menuStyle,
                  })}
                  {loading && !data.finished && (
                    <div className={'p-4 text-center'}>
                      <Spin />
                    </div>
                  )}
                </div>
              ) : (
                <div className={'py-4 text-center'}>
                  <Empty description={'未找到任务'} />
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

export default TaskSelect;
