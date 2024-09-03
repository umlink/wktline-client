import { panelCardTypeFilterMap, ViewTypeFilterMap } from '@/constants';
import { ConnectionBox } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Dropdown, MenuProps, Tooltip } from 'antd';

export default () => {
  const { setFilterData, filterData } = useModel('ProjectDetail.model');

  const panelTypeFilter: MenuProps['items'] = [
    { label: '任务状态', key: panelCardTypeFilterMap.statusId },
    { label: '任务类型', key: panelCardTypeFilterMap.typeId },
    { label: '任务优先级', key: panelCardTypeFilterMap.priority },
  ];
  const keyMap = {
    [panelCardTypeFilterMap.statusId]: '任务状态',
    [panelCardTypeFilterMap.typeId]: '任务类型',
    [panelCardTypeFilterMap.priority]: '任务优先级',
  };
  const onSelectPanelType: MenuProps['onClick'] = ({ key }: { key: any }) => {
    setFilterData({ cardType: key });
  };
  return (
    <>
      {filterData.viewType === ViewTypeFilterMap.CARD && (
        <Dropdown menu={{ items: panelTypeFilter, onClick: onSelectPanelType }} trigger={['click']}>
          <Tooltip title="卡片类型">
            <span className={'g-filter-btn'}>
              <ConnectionBox theme="outline" size="13" fill="#999" />
              <span className={'whitespace-nowrap'}>{keyMap[filterData.cardType]}</span>
            </span>
          </Tooltip>
        </Dropdown>
      )}
    </>
  );
};
