import { Down } from '@icon-park/react';
import { useClickAway, useUpdateEffect } from 'ahooks';
import { Dropdown, MenuProps, Spin, theme } from 'antd';
import React, { memo, useEffect, useRef } from 'react';
import useService from './userService';

const { useToken } = theme;

type PropsType = {
  mount?: boolean;
  children: JSX.Element;
  icon?: React.ReactNode;
  projectId: string;
  id?: string;
  disabled?: boolean;
  onChange: (item: API.TaskTypeItem) => void;
  onSelect?: (item: API.TaskTypeItem) => void;
};
const TaskTypeSelect = memo((props: PropsType) => {
  const { data, loading, getData, open, setOpen } = useService(props.projectId);

  const container = useRef<HTMLSpanElement>(null);
  useClickAway(() => {
    setOpen(false);
  }, [container]);

  const items: MenuProps['items'] = data?.list?.map((item, index) => {
    return {
      label: <span style={{ color: item.color }}>{item.name}</span>,
      key: index,
    };
  });

  const onClickItem: MenuProps['onClick'] = ({ key }) => {
    const item = data?.list?.[+key];
    if (item) props.onChange(item);
    setOpen(false);
  };

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  useEffect(() => {
    if (props.id) {
      getData();
    }
  }, []);

  useUpdateEffect(() => {
    if (data?.list?.length && props.id) {
      data.list.unshift({
        id: '',
        color: '',
        name: '全部',
      });
      data?.list.forEach((item) => {
        if (item.id === props.id) {
          props.onSelect?.(item);
        }
      });
    }
  }, [data?.list]);

  useUpdateEffect(() => {
    if (open) getData();
  }, [open]);

  return (
    <span ref={props.mount ? container : null}>
      <Dropdown
        open={open}
        menu={{ items, onClick: onClickItem }}
        trigger={['click']}
        placement="bottomLeft"
        arrow={true}
        onOpenChange={(v) => setOpen(v)}
        getPopupContainer={() => container.current!}
        dropdownRender={(menu) => (
          <div style={contentStyle}>
            {loading ? (
              <div className={'p-4 text-center'}>
                <Spin />
              </div>
            ) : (
              menu
            )}
          </div>
        )}
      >
        <span
          className={`flex items-center space-x-1 ${props.disabled ? '!cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => {
            if (props.disabled) return;
            setOpen(true);
          }}
        >
          {props.children}
          {props.icon || <Down className={'align-middle'} theme="filled" size="16" fill="#999" />}
        </span>
      </Dropdown>
    </span>
  );
});
export default TaskTypeSelect;
