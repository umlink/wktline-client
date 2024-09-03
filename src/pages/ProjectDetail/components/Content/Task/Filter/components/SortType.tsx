import { CheckSmall, SortAmountDown, SortAmountUp, SortOne } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { useClickAway } from 'ahooks';
import { Dropdown, MenuProps, Segmented, Space, Tooltip } from 'antd';
import { useRef, useState } from 'react';
export default () => {
  const { setTaskParams, taskParams } = useModel('ProjectDetail.model');
  const container = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  useClickAway(() => {
    setOpen(false);
  }, [container]);

  const onSelectView: MenuProps['onClick'] = ({ key }: { key: any }) => {
    setTaskParams({
      sortMode: {
        sortKey: key,
        mode: 'Desc',
      },
    });
  };
  const onSortChange = (val: any): void => {
    setTaskParams({
      sortMode: {
        sortKey: taskParams.sortMode?.sortKey,
        mode: val,
      },
    });
  };
  const sortMap: { [key: string]: string } = {
    start_time: '按开始时间',
    end_time: '按截止时间',
    updated_at: '按更新时间',
    created_at: '按创建时间',
    finished_time: '按完成时间',
  };
  const viewList = Object.keys(sortMap).map((key) => ({
    key,
    label: (
      <Space size={10} className="g-flex-center">
        {taskParams.sortMode?.sortKey === key ? (
          <CheckSmall theme="outline" size="14" fill="#0089FFFF" />
        ) : (
          <span className={'inline-block w-[14px]'} />
        )}
        <span>{sortMap[key]}</span>
        <span onClick={(e) => e.stopPropagation()}>
          {taskParams.sortMode?.sortKey === key && (
            <Segmented
              block={false}
              size="small"
              value={taskParams.sortMode.mode}
              onChange={onSortChange}
              options={[
                {
                  label: <SortAmountUp theme="outline" size="12" fill="#999" />,
                  value: 'Desc',
                },
                {
                  label: <SortAmountDown theme="outline" size="12" fill="#999" />,
                  value: 'Asc',
                },
              ]}
            />
          )}
        </span>
      </Space>
    ),
  }));
  return (
    <span ref={container}>
      <Dropdown
        open={open}
        menu={{ items: viewList, onClick: onSelectView }}
        trigger={['click']}
        getPopupContainer={() => container.current!}
      >
        <Tooltip title="排序">
          <span className={'g-filter-btn'} onClick={() => setOpen(!open)}>
            <SortOne theme="outline" size="14" fill="#999" />
            <span className={'whitespace-nowrap'}>
              {!!taskParams.sortMode?.sortKey && sortMap[taskParams.sortMode.sortKey]}
            </span>
          </span>
        </Tooltip>
      </Dropdown>
    </span>
  );
};
