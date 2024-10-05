import EmptyLoading from '@/components/EmptyLoading';
import { ViewTypeFilterKey } from '@/constants';
import { useModel } from '@umijs/max';
import React, { Suspense } from 'react';
import Filter from './Filter';

/**
 * 视图类型
 * */
const viewMap: { [key in ViewTypeFilterKey]: any } = {
  CARD: React.lazy(() => import('./components/Card')),
  TABLE: React.lazy(() => import('./components/Gantt')),
  GANTT: React.lazy(() => import('./components/Gantt')),
};

const ProjectDetailContent: React.FC = () => {
  const { filterData } = useModel('ProjectDetail.model');

  const ContainerView = viewMap[filterData.viewType];

  return (
    <div className={'h-full'}>
      <Filter />
      <div className={'box-border h-[calc(100%-40px)] py-2 shadow-inner'}>
        <Suspense fallback={<EmptyLoading />}>
          <ContainerView />
        </Suspense>
      </div>
    </div>
  );
};

export default ProjectDetailContent;
