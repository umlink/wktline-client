import { panelCardTypeFilterKey, projectContentType, TaskBelongKey, ViewTypeFilterKey } from '@/constants';

export type CardDataType = API.TaskPriorityItem | API.TaskTypeItem | API.TaskStatusItem;

export interface ITaskCardItem {
  cardTypeId: string; // panelCardTypeFilterKey 为分类
  cardTypeName: string;
  cardTypeColor: string;
  cardTypeData: CardDataType;
  taskList: API.TaskDetailItem[];
  loading: boolean;
  finished: boolean;
  pageNo: number;
  pageSize: number;
  total: number;
}

export type GanttDataItem = {
  id: string;
  taskName: string;
  startDate: string;
  endDate: string;
  disabled: boolean;
  content: API.TaskDetailItem;
  children: GanttDataItem[];
};
type TaskSubProps<T> = {
  list: T[];
  kv: Record<string, T>;
};
export interface IData {
  projectId: string;
  project?: Partial<API.GetProjectInfoRes>;
  projectListData?: API.GetProjectListRes;
  taskCardList: ITaskCardItem[];
  taskPriority: TaskSubProps<API.TaskPriorityItem>;
  taskStatus: TaskSubProps<API.TaskStatusItem>;
  taskType: TaskSubProps<API.TaskTypeItem>;
  ganttData: {
    finished: boolean;
    list: GanttDataItem[];
    pageNo: number;
    pageSize: number;
    total: number;
  };
  tableData: {
    finished: boolean;
    pageNo: number;
    pageSize: number;
    total?: number;
    list: API.TaskDetailItem[];
  };
}

export interface IFilterType {
  cardType: panelCardTypeFilterKey;
  viewType: ViewTypeFilterKey;
  contentType: projectContentType;
  belongKey: TaskBelongKey | string;
  typeId?: string;
  group: {
    id: any;
    name: string;
  };
}
