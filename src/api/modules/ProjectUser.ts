// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 项目项目人员 POST /project/addProjectUserByIds */
export async function addProjectUserByIds(
  body: API.AddProjectUserByIdsReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/project/addProjectUserByIds',
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

/** 删除项目内人员 POST /project/delProjectUserByIds */
export async function delProjectUserByIds(
  body: API.DelProjectUserByIdsReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/project/delProjectUserByIds',
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

/** 获取项目下的用户列表 GET /project/getProjectUser */
export async function getProjectUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProjectUserParams,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
    data?: { list?: API.ProjectUserItem[]; pageNo?: number; pageSize?: number; total?: number };
    success: boolean;
  }>('/project/getProjectUser', {
    method: 'GET',
    params: {
      // pageNo has a default value: 1
      pageNo: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新项目成员角色 POST /project/updateProjectUserRole */
export async function updateProjectUserRole(
  body: API.UpdateProjectUserRoleReq,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/project/updateProjectUserRole',
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
