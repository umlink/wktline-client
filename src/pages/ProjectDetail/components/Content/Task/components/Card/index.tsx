import { AddFour } from '@icon-park/react';
import NewSimpleTask from './components/NewSimpleTask';
import TaskGroup from './components/TaskGroup';
import useService from './useService';

import { useModel } from '@umijs/max';
import { Tooltip } from 'antd';
import { DragDropContext, Draggable, DraggableProvided, Droppable, DroppableProvided } from 'react-beautiful-dnd';

export default () => {
  const { data: projectData } = useModel('ProjectDetail.model');
  const { onDragEnd } = useService();
  return (
    <div className={'hidden-scrollbar flex h-[calc(100vh-104px)] overflow-y-hidden overflow-x-scroll'}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="COLUMN" isDropDisabled={true} direction="horizontal">
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="flex px-2 pb-3">
              {projectData.taskCardList.map((group, index) => (
                <Draggable
                  draggableId={String(group.cardTypeId)}
                  index={index}
                  key={String(group.cardTypeId)}
                  isDragDisabled={true}
                >
                  {(provided: DraggableProvided) => (
                    <div data-draggable-id={group.cardTypeId} ref={provided.innerRef} {...provided.draggableProps}>
                      <div className={`flex h-[45px] items-center justify-between pl-3`}>
                        <h4
                          {...provided.dragHandleProps}
                          className={`text-md font-500 m-0 flex flex-1 items-center self-stretch `}
                          style={{ color: group.cardTypeColor }}
                        >
                          <span>{group.cardTypeName}</span>
                        </h4>
                        <NewSimpleTask
                          cardTypeId={group.cardTypeId}
                          cardTypeColor={group.cardTypeColor}
                          cardTypeName={group.cardTypeName}
                          projectId={projectData.projectId}
                        >
                          <span className="cursor-pointer pr-4 text-gray-400 hover:text-primary">
                            <Tooltip title="添加任务">
                              <AddFour size="18" />
                            </Tooltip>
                          </span>
                        </NewSimpleTask>
                      </div>
                      <TaskGroup group={group} key={group.cardTypeId} index={index} prefix={group.cardTypeId} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
