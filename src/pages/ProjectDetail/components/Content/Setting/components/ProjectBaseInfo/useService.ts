import Api from '@/api/modules';
import { useModel } from '@umijs/max';
import { useDebounceFn, useSetState } from 'ahooks';
import { FormInstance } from 'antd/es/form';
import { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useRef } from 'react';

type SettingDataType = {
  groupList: API.ProjectGroupItem[];
  groupKeywords: string;
  project?: Partial<API.GetProjectInfoRes>;
};
const useSettingService = () => {
  const { data: projectData, updateProjectBaseInfo } = useModel('ProjectDetail.model');
  const [data, setData] = useSetState<SettingDataType>({
    groupList: [],
    groupKeywords: '',
  });

  const formRef = useRef<FormInstance>(null);
  const onFileChange = (file: UploadFile) => {
    if (data.project && file.url) {
      data.project = {
        ...data.project,
        headerImg: file.url,
      };
      setData({ project: { ...data.project } });
    }
  };
  const { run: onFormLayoutChange } = useDebounceFn(
    (d: Partial<API.UpdateProjectReq>) => {
      if (data.project) {
        data.project = {
          ...data.project,
          ...d,
        };
        setData({ project: { ...data.project } });
      }
    },
    { wait: 100 },
  );

  const updateCurrentOwner = (user: API.ProjectUserItem) => {
    if (data.project) {
      setData({
        project: {
          ...data.project,
          ownerId: user.id,
          ownerName: user.username,
        },
      });
    }
  };

  // 项目分组 无需分页
  const getProjectGroupList = () => {
    Api.ProjectGroup.getProjectGroupList({
      keywords: data.groupKeywords,
    }).then((res) => {
      if (res.success) {
        setData({ groupList: res.data?.list || [] });
      }
    });
  };

  const onSubmit = () => {
    formRef
      .current!.validateFields()
      .then(() => {
        const params = data.project!;
        updateProjectBaseInfo({
          projectId: params.id!,
          name: params.name,
          headerImg: params.headerImg,
          ownerId: params.ownerId,
          showType: params.showType,
          description: params.description,
          groupId: params.groupId,
        });
      })
      .catch((e) => {
        console.log('validateFields error', e);
      });
  };

  useEffect(() => {
    setData({ project: projectData.project });
  }, [projectData.project]);

  useEffect(() => {
    getProjectGroupList();
  }, [data.groupKeywords]);

  return {
    data,
    setData,
    formRef,
    onFileChange,
    onSubmit,
    onFormLayoutChange,
    updateCurrentOwner,
  };
};

export default useSettingService;
