import { ViewTypeFilterKey } from '@/constants';
import { useModel } from '@umijs/max';
import React from 'react';
import CardList from './components/Card';
import Gantt from './components/Gantt';
import Table from './components/Table';
import Filter from './Filter';

const ProjectDetailContent: React.FC = () => {
  const { filterData } = useModel('ProjectDetail.model');

  /**
   * 视图类型
   * */
  const viewMap: { [key in ViewTypeFilterKey]: any } = {
    CARD: CardList,
    TABLE: Table,
    GANTT: Gantt,
  };

  const ContainerView = viewMap[filterData.viewType];

  return (
    <div className={'h-full'}>
      <Filter />
      <div className={'box-border h-[calc(100%-40px)] py-2 shadow-inner'}>
        <ContainerView />
      </div>
    </div>
  );
};

export default ProjectDetailContent;
