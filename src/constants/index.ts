export type projectContentType = 'TASK' | 'TEST' | 'STATISTIC' | 'SETTING';

// 任务卡片数据类型：状态 | 优先级 | 类型 【根据筛选属性作为key】
export type panelCardTypeFilterKey = 'statusId' | 'priority' | 'typeId';
// 任务展示方式：卡片 | 表格 | 甘特图
export type ViewTypeFilterKey = 'CARD' | 'TABLE' | 'GANTT';
//项目内容类型： 任务 | 文件 | 统计 | 设置
// 项目下-任务归属
export type TaskBelongKey = 'creatorId' | 'handlerId' | 'actorId' | 'all';

// 任务视图类型
export const ViewTypeFilterMap: {
  [key in ViewTypeFilterKey]: ViewTypeFilterKey;
} = {
  CARD: 'CARD',
  TABLE: 'TABLE',
  GANTT: 'GANTT',
};

// 任务卡片面板数据类型
export const panelCardTypeFilterMap: {
  [key in panelCardTypeFilterKey]: panelCardTypeFilterKey;
} = {
  statusId: 'statusId',
  typeId: 'typeId',
  priority: 'priority',
};

export const TaskBelongFilterMap: { [key in TaskBelongKey]: TaskBelongKey } = {
  all: 'all',
  creatorId: 'creatorId',
  handlerId: 'handlerId',
  actorId: 'actorId',
};
// *****************************************************************************
export const PROJECT_SHOW_TYPE = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
};
// *****************************************************************************
/** 任务状态枚举一种三个类型，其它状态都是在此基础上进行扩展，如，开发中、测试中、调研中统一为 PROCESSING */
export const TASK_STATUS_ENUM = {
  PADDING: 'PADDING',
  PROCESSING: 'PROCESSING',
  DONE: 'DONE',
};

export const TASK_STATUS_ENUM_LIST = [
  {
    name: '待开始',
    value: TASK_STATUS_ENUM.PADDING,
  },
  {
    name: '进行中',
    value: TASK_STATUS_ENUM.PROCESSING,
  },
  {
    name: '已结束',
    value: TASK_STATUS_ENUM.DONE,
  },
];
// *****************************************************************************
export const PROJECT_SHOW_TYPE_LIST = [
  {
    name: '公开',
    value: PROJECT_SHOW_TYPE.PUBLIC,
    descriptionP: '所有人可见',
  },
  {
    name: '私有',
    value: PROJECT_SHOW_TYPE.PRIVATE,
    descriptionP: '成员可见',
  },
];

export const LOCAL_KEY = {
  PROJECT_ID_LIST: 'PROJECT_ID_LIST',
  ACTIVE_PROJECT_TYPE: 'ACTIVE_PROJECT_TYPE',
};
// *****************************************************************************
export const projectContentTypeMap: {
  [key in projectContentType]: projectContentType;
} = {
  TASK: 'TASK',
  TEST: 'TEST',
  STATISTIC: 'STATISTIC',
  SETTING: 'SETTING',
};

export const EVENTS = {
  UPDATE_TASK_CALLBACK: 'UPDATE_TASK_CALLBACK',
  DELETE_TASK_CALLBACK: 'DELETE_TASK_CALLBACK',
  OPEN_TASK_DETAIL: 'OPEN_TASK_DETAIL',
  GET_TASK_CARD_LIST: 'GET_TASK_CARD_LIST',
  GET_TASK_TABLE_LIST: 'GET_TASK_TABLE_LIST',
  TASK_LOG_SCROLL: 'TASK_LOG_SCROLL',
  SHOW_NEW_TASK_LABOR_HOUR_MODAL: 'SHOW_NEW_TASK_LABOR_HOUR_MODAL',
};
// *****************************************************************************
export enum TASK_OPERATE_LOG_ENUM {
  COMMENT = 'COMMENT',
  ATTACHMENT = 'ATTACHMENT',
  DYNAMIC_ADD_ACTOR = 'DYNAMIC_ADD_ACTOR',
  DYNAMIC_TASK_NAME = 'DYNAMIC_TASK_NAME',
  DYNAMIC_TASK_STATUS = 'DYNAMIC_TASK_STATUS',
  DYNAMIC_TASK_TYPE = 'DYNAMIC_TASK_TYPE',
  DYNAMIC_TASK_PRIORITY = 'DYNAMIC_TASK_PRIORITY',
  DYNAMIC_TASK_TIME = 'DYNAMIC_TASK_TIME',
  DYNAMIC_TASK_GROUP = 'DYNAMIC_TASK_GROUP',
  DYNAMIC_TASK_DESCRIPTION = 'DYNAMIC_TASK_DESCRIPTION',
  DYNAMIC_TASK_HANDLER = 'DYNAMIC_TASK_HANDLER',
}

/**
 * SUPER_ADMIN: 项目负责人
 * ADMIN：项目管理员
 * USER：普通用户
 * */
export enum PROJECT_USER_ROLE {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}
/**
 * 系统角色
 * SUPER_ADMIN： 超级管理员
 * ADMIN: 管理员
 * USER：普通用户
 * */
export enum SYSTEM_ROLE {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const PRESET_COLORS = [
  '#000000',
  '#000000E0',
  '#000000A6',
  '#00000073',
  '#00000040',
  '#00000026',
  '#0000001A',
  '#00000012',
  '#0000000A',
  '#00000005',
  '#F5222D',
  '#FA8C16',
  '#FADB14',
  '#8BBB11',
  '#52C41A',
  '#13A8A8',
  '#1677FF',
  '#2F54EB',
  '#722ED1',
  '#EB2F96',
];
