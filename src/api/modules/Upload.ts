// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 上传文件（任意文件类型） POST /common/upload */
export async function upload(body: API.UploadFileReq, options?: { [key: string]: any }) {
  const formData = new FormData();

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<{
    code: number;
    message: string;
    data?: { id?: string; name?: string; type?: string; url?: string };
    success: boolean;
  }>('/common/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
