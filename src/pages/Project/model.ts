import Api from '@/api/modules/index';
import { useRequest, useSetState, useUpdateEffect } from 'ahooks';
import { notification } from 'antd';

type DataType = {
  total: number;
  finished: boolean;
  projectList: API.ProjectInfoItem[];
  groupList: API.ProjectGroupItem[];
  currentGroup?: API.ProjectGroupItem;
};

const defaultParams = () => ({
  isJoined: false,
  isOwner: false,
  isCreator: false,
  pageNo: 1,
  pageSize: 50,
});

const useProjectService = () => {
  const [projectData, setProjectData] = useSetState<DataType>({
    total: 0,
    finished: false,
    projectList: [],
    groupList: [],
  });
  const [params, setParams] = useSetState<API.GetProjectListReq>(defaultParams());
  const { run: getProjectList, loading } = useRequest(
    async (params: API.GetProjectListReq) => {
      const res = await Api.Project.getProjectList(params);
      if (res.success) {
        let list: API.ProjectInfoItem[] = [];
        const total = res.data?.total || 0;
        if (total) {
          list = res.data?.list || [];
          list = params.pageNo === 1 ? list : [...projectData.projectList, ...list];
        }
        setProjectData({
          projectList: list,
          total: total,
          finished: total === list.length,
        });
      }
    },
    {
      manual: true,
    },
  );

  // 获取项目分组
  const getProjectGroupList = () => {
    Api.ProjectGroup.getProjectGroupList({ pageSize: 888 }).then((res) => {
      if (res.success) {
        const list = res.data?.list || [];
        list.unshift({
          id: '',
          name: '全部迭代',
          description: '',
        });
        setProjectData({ groupList: list });
      }
    });
  };

  useUpdateEffect(() => {
    if (params.pageNo === 1) {
      projectData.finished = false;
    }
    getProjectList(params);
  }, [params]);

  // 重置
  const resetMenuParams = (pm: API.GetProjectListReq) => {
    setProjectData({ finished: false });
    if (params.showType) {
      pm.showType = params.showType;
    }
    if (params.groupId) {
      pm.groupId = params.groupId;
    }
    setParams(Object.assign(defaultParams(), pm));
  };

  const deleteProject = (id: string) => {
    Api.Project.delProject({ projectId: id }).then((res) => {
      if (res.success) {
        notification.success({
          message: '删除成功',
        });
        let list = projectData.projectList.filter((item) => item.id !== id);
        setProjectData({ projectList: [...list] });
      }
    });
  };

  return {
    loading,
    params,
    setParams,
    resetMenuParams,
    projectData,
    setProjectData,
    deleteProject,
    getProjectGroupList,
  };
};

export default useProjectService;
