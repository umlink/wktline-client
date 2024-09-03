import { ITaskCardItem } from '@/pages/ProjectDetail/types';
import { useModel } from '@umijs/max';

export default () => {
  const { data: projectData, setData, filterData, updateTaskInfo } = useModel('ProjectDetail.model');

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    // 子节点拖拽
    const list: ITaskCardItem[] = projectData.taskCardList;
    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;

    let sourceIndex = 0;
    let destinationIndex = 0;

    list.forEach((item: ITaskCardItem, index: number) => {
      if (item.cardTypeId === sourceDroppableId) sourceIndex = index;
      if (item.cardTypeId === destinationDroppableId) destinationIndex = index;
    });
    const sourceList = list[sourceIndex].taskList || [];
    const destinationList = list[destinationIndex].taskList || [];
    const [delItem] = sourceList.splice(result.source.index, 1);
    destinationList.splice(result.destination.index, 0, delItem);

    // 当前拖拽任务ID
    const taskId = result.draggableId;
    updateTaskInfo({
      id: taskId,
      projectId: projectData.projectId,
      [filterData.cardType]: list[destinationIndex].cardTypeId,
    });
    // 插入到新列表中 - 含顺序
    setData({
      taskCardList: [...list],
    });
  };

  return {
    onDragEnd,
  };
};
