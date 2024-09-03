import { Down } from '@icon-park/react';
import { useClickAway, useUpdateEffect } from 'ahooks';
import { Dropdown, MenuProps, Spin, theme } from 'antd';
import React, { memo, useRef } from 'react';
import useService from './useService';
const { useToken } = theme;
type PropsType = {
  mount?: boolean;
  projectId: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onChange: (id: string, item: API.TaskStatusItem) => void;
};
const TaskStatusSelect = memo((props: PropsType) => {
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

  const onClickItem: MenuProps['onClick'] = ({ key }: any) => {
    const item = data?.list?.[key];
    if (item) {
      props.onChange(item.id, item);
    }
  };

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

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
        getPopupContainer={() => container.current!}
        onOpenChange={(v) => setOpen(v)}
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
        <a onClick={() => setOpen(true)}>
          <span className={`g-tag-btn items-center space-x-1`}>
            {props.children}
            {props.icon || <Down className={'align-middle'} theme="filled" size="16" fill="#999" />}
          </span>
        </a>
      </Dropdown>
    </span>
  );
});
export default TaskStatusSelect;
