// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 测试 GET /test */
export async function test(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.testParams,
  options?: { [key: string]: any },
) {
  return request<{ code: number; message: string; data?: Record<string, any>; success: boolean }>(
    '/test',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
