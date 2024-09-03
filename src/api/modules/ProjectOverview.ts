// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取项目下各个指标数量 GET /project/overview/getStatistics */
export async function getStatistics(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStatisticsParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: {
      taskCount?: number;
      userCount?: number;
      groupCount?: number;
      overTimeDoneCount?: number;
      overTimeNoDoneCount?: number;
      laborHour?: number;
      planHour?: number;
    };
    success: boolean;
  }>('/project/overview/getStatistics', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取项目维度的（任务数：按状态） GET /project/overview/getTaskStatusStat */
export async function getTaskStatusStat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskStatusStatParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: API.ProjectTaskStatusStatItem[];
    success: boolean;
  }>('/project/overview/getTaskStatusStat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取项目维度的（任务数：按类型） GET /project/overview/getTaskTypeStat */
export async function getTaskTypeStat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTaskTypeStatParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: API.ProjectTaskTypeStatItem[];
    success: boolean;
  }>('/project/overview/getTaskTypeStat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取项目维度的（各用户工时） GET /project/overview/getUserLaborHourStat */
export async function getUserLaborHourStat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserLaborHourStatParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: API.ProjectUserLaborHourStatItem[];
    success: boolean;
  }>('/project/overview/getUserLaborHourStat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取项目维度的（各用户任务数） GET /project/overview/getUserTaskCountStat */
export async function getUserTaskCountStat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserTaskCountStatParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: API.ProjectUserTaskCountItem[];
    success: boolean;
  }>('/project/overview/getUserTaskCountStat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户维度的（任务数：按状态） GET /project/overview/getUserTaskStatusStat */
export async function getUserTaskStatusStat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserTaskStatusStatParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: API.ProjectUserTaskStatusStatisticsItem[];
    success: boolean;
  }>('/project/overview/getUserTaskStatusStat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户维度的（任务数：按类型） GET /project/overview/getUserTaskTypeStat */
export async function getUserTaskTypeStat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserTaskTypeStatParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: API.ProjectUserTaskTypeStatisticsItem[];
    success: boolean;
  }>('/project/overview/getUserTaskTypeStat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
