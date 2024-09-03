import Api from '@/api/modules';
import { useModel } from '@umijs/max';
import { useDebounceFn, useRequest, useSetState } from 'ahooks';
import { message } from 'antd';
import { useEffect } from 'react';

type SettingDataType = {
  userList: API.ProjectUserItem[];
  pageSize: number;
  pageNo: number;
  total: number;
  keywords: string;
  role: string;
};
const useService = () => {
  const [data, setData] = useSetState<SettingDataType>({
    userList: [],
    pageSize: 30,
    pageNo: 1,
    total: 0,
    keywords: '',
    role: '',
  });

  const { data: projectData } = useModel('ProjectDetail.model');

  // 项目任务分组列表
  const { loading, run: getUserList } = useRequest(
    () =>
      Api.ProjectUser.getProjectUser({
        projectId: projectData.projectId,
        pageNo: data.pageNo,
        pageSize: data.pageSize,
        keywords: data.keywords,
        role: data.role,
      }).then((res) => {
        if (res.data) {
          const dataList = res.data.list || [];
          const userList = data.pageNo === 1 ? dataList : [...data.userList, ...dataList];
          setData({
            userList,
            total: res.data.total || 0,
          });
        }
      }),
    { manual: true },
  );

  const delUser = (userId: string, index: number) => {
    Api.ProjectUser.delProjectUserByIds({
      projectId: projectData.projectId,
      userIds: [userId],
    }).then((res) => {
      if (res.success) {
        message.success('移除成功');
        data.userList.splice(index, 1);
        setData({ userList: [...data.userList] });
      }
    });
  };

  const updateUserRole = (params: API.UpdateProjectUserRoleReq, index: number) => {
    Api.ProjectUser.updateProjectUserRole(params).then((res) => {
      if (res.success) {
        data.userList[index].role = params.role;
        setData({ userList: [...data.userList] });
        message.success('更新成功');
      } else {
        message.warning(res.message || '更新失败');
      }
    });
  };

  const { run: onKeywordsChange } = useDebounceFn(
    (e) => {
      setData({
        pageNo: 1,
        keywords: e.target.value,
      });
    },
    { wait: 300 },
  );

  useEffect(() => {
    data.pageNo = 1;
    getUserList();
  }, [projectData.projectId, data.keywords, data.role]);

  return {
    data,
    setData,
    loading,
    delUser,
    updateUserRole,
    getUserList,
    onKeywordsChange,
  };
};

export default useService;
