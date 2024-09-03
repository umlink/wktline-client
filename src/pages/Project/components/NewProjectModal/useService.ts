import Api from '@/api/modules';
import { useRequest } from '@umijs/max';
import { App } from 'antd';
import { useEffect, useState } from 'react';

const useService = (onSuccess: (res: any) => void) => {
  const { message } = App.useApp();
  const [projectGroupList, setProjectGroupList] = useState<API.ProjectGroupItem[]>([]);

  useEffect(() => {
    Api.ProjectGroup.getProjectGroupList({}).then((res) => {
      if (res.success) {
        setProjectGroupList(res.data!.list!);
      }
    });
  }, []);

  const { loading, run: createProject } = useRequest(
    (params: API.CreateProjectReq) =>
      Api.Project.createProject(params).then((res) => {
        if (res.success) {
          onSuccess(res.data);
        } else {
          message.error(res.message);
        }
      }),
    {
      manual: true,
    },
  );

  return {
    projectGroupList,
    loading,
    createProject,
  };
};

export default useService;
