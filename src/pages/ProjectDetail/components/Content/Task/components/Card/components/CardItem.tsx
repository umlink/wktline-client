import { EVENTS, panelCardTypeFilterMap } from '@/constants';
import EventBus from '@/utils/event-bus';
import { useModel } from '@umijs/max';
import { Avatar } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

export default (props: { item: API.TaskDetailItem; groupIndex: number; cardIndex: number }) => {
  const { item, cardIndex } = props;

  const openTaskDetail = (id: string) => EventBus.emit(EVENTS.OPEN_TASK_DETAIL, id);

  const { filterData, data } = useModel('ProjectDetail.model');
  return (
    <Draggable draggableId={String(item.id)} index={cardIndex} key={cardIndex}>
      {(provided: any) => {
        return (
          <div
            className={'mb-2 rounded-lg shadow-sm shadow-zinc-200 hover:shadow-lg'}
            data-task-id={item.id}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              style={{ borderLeft: `1px solid ${data.taskPriority.kv[item.priority]?.color}` }}
              onClick={() => openTaskDetail(item.id)}
              className={'w-full cursor-pointer rounded-lg bg-white p-3'}
            >
              <div className={'w-full space-y-2'}>
                <div className={'flex justify-between space-x-2'}>
                  <h3 className="min-h-[24px] w-full break-all text-zinc-900">{item.name}</h3>
                  {!!item.handlerId && <Avatar size={24} src={item.handlerAvatar} />}
                </div>
                {!!item.groupId && <p className={'text-xs text-zinc-400'}>{item.groupName}</p>}

                <div className="flex items-center space-x-2">
                  {!!item.priority && filterData.cardType !== panelCardTypeFilterMap.priority && (
                    <span style={{ color: data.taskPriority.kv[item.priority]?.color }}>{item.priority}</span>
                  )}
                  {!!item.statusId && filterData.cardType !== panelCardTypeFilterMap.statusId && (
                    <span style={{ color: item.statusColor }} className={'g-small-tag'}>
                      {item.statusName}
                    </span>
                  )}
                  {!!item.typeId && filterData.cardType !== panelCardTypeFilterMap.typeId && (
                    <span style={{ color: item.typeColor }} className={'g-small-tag'}>
                      {item.typeName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
