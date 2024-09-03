// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新建项目 POST /project/createProject */
export async function createProject(body: API.CreateProjectReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: { id?: string }; success: boolean }>(
    '/project/createProject',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 删除项目 POST /project/delProject */
export async function delProject(body: API.DelProjectReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/project/delProject',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 获取项目详情 GET /project/getProjectInfo */
export async function getProjectInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProjectInfoParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: {
      id?: string;
      name?: string;
      description?: string;
      headerImg?: string;
      operatorId?: string;
      operatorName?: string;
      ownerId?: string;
      ownerName?: string;
      ownerAvatar?: string;
      groupId?: string;
      groupName?: string;
      showType?: string;
      status?: number;
      isJoined?: boolean;
      canEdit?: boolean;
      createdAt?: string;
      updatedAt?: string;
    };
    success: boolean;
  }>('/project/getProjectInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取项目列表 POST /project/getProjectList */
export async function getProjectList(
  body: API.GetProjectListReq,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.ProjectInfoItem[]; pageNo?: number; pageSize?: number; total?: number };
    success: boolean;
  }>('/project/getProjectList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新项目 POST /project/updateProject */
export async function updateProject(body: API.UpdateProjectReq, options?: { [key: string]: any }) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/project/updateProject',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}
