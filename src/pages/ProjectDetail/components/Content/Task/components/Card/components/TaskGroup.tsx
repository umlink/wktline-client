import useScrollMove from '@/hooks/useScrollMove';
import { ITaskCardItem } from '@/pages/ProjectDetail/types';
import { useModel } from '@umijs/max';
import { Spin } from 'antd';
import { useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import CardItem from './CardItem';

export default (props: { prefix: any; index: number; group: ITaskCardItem }) => {
  const ref = useRef(null);
  const { prefix, group, index: groupIndex } = props;
  const { loadMoreTaskByPanelType } = useModel('ProjectDetail.model');
  return (
    <div
      ref={ref}
      className={'hidden-scrollbar h-[calc(100vh-162px)] w-[320px] overflow-y-auto overflow-x-hidden'}
      onScroll={useScrollMove(ref, () => loadMoreTaskByPanelType(groupIndex))}
    >
      <Droppable droppableId={`${prefix}`} key={groupIndex} isCombineEnabled={true}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={'min-h-full pl-3 pr-4'}>
            {group.taskList?.map((item, i: number) => {
              return <CardItem key={item.id} item={item} groupIndex={groupIndex} cardIndex={i} />;
            })}
            {group.loading && (
              <div className={'py-2 text-center'}>
                <Spin size={'small'} />
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
