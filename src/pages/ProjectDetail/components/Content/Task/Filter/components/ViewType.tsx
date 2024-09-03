import { ViewTypeFilterKey } from '@/constants';
import { TableFile, Timeline, ViewGridCard } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Dropdown, MenuProps, Space, Tooltip } from 'antd';

export default () => {
  const { filterData, setFilterData } = useModel('ProjectDetail.model');

  const fontSize = 13;
  const onSelectView: MenuProps['onClick'] = ({ key }: { key: any }) => {
    setFilterData({ viewType: key });
  };
  const viewTypeMap: {
    [key in ViewTypeFilterKey | string]: {
      name: string;
      icon: JSX.Element;
    };
  } = {
    CARD: {
      name: '卡片视图',
      icon: <ViewGridCard theme="outline" size={fontSize} fill="#999" />,
    },
    TABLE: {
      name: '表格视图',
      icon: <TableFile theme="outline" size={fontSize} fill="#999" />,
    },
    GANTT: {
      name: '甘特图',
      icon: <Timeline theme="outline" size={fontSize} fill="#999" />,
    },
  };
  const viewList: MenuProps['items'] = Object.keys(viewTypeMap).map((key) => ({
    key,
    label: (
      <Space size={4} className="g-flex-center">
        {viewTypeMap[key].icon}
        <span>{viewTypeMap[key].name}</span>
      </Space>
    ),
  }));
  return (
    <Dropdown menu={{ items: viewList, onClick: onSelectView }} placement={'bottom'} trigger={['click']}>
      <Tooltip title="视图">
        <div className={'g-filter-btn'}>
          {viewTypeMap[filterData.viewType].icon}
          <span className={'inline-block'}>{viewTypeMap[filterData.viewType].name}</span>
        </div>
      </Tooltip>
    </Dropdown>
  );
};
