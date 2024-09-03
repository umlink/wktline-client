import Api from '@/api/modules';
import { useDebounceFn, useRequest, useSetState, useUpdateEffect } from 'ahooks';
import { message } from 'antd';
import { useEffect } from 'react';

type SettingDataType = {
  userList: API.UserBaseInfo[];
  pageSize: number;
  pageNo: number;
  total: number;
  keywords?: string;
  role?: string;
};
const useService = () => {
  const [data, setData] = useSetState<SettingDataType>({
    userList: [],
    pageSize: 15,
    pageNo: 1,
    total: 0,
  });

  // 项目任务分组列表
  const { loading, run: getUserList } = useRequest(
    () =>
      Api.User.getUserList({
        pageNo: data.pageNo,
        pageSize: data.pageSize,
        keywords: data.keywords,
        role: data.role,
      }).then((res) => {
        if (res.data) {
          const userList = res.data.list || [];
          setData({
            userList,
            total: res.data.total || 0,
          });
        }
      }),
    { manual: true },
  );

  const delUser = (userId: string, index: number) => {
    Api.User.delUserById({
      id: userId,
    }).then((res) => {
      if (res.success) {
        message.success('删除成功');
        data.userList.splice(index, 1);
        setData({ userList: [...data.userList] });
      }
    });
  };

  const updateUserInfo = (params: API.UpdateUserInfoReq, index: number) => {
    Api.User.updateUserInfo(params).then((res) => {
      if (res.success) {
        data.userList[index].role = params.role!;
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

  useUpdateEffect(getUserList, [data.pageSize, data.pageNo]);

  useEffect(() => {
    data.pageNo = 1;
    getUserList();
  }, [data.keywords, data.role]);

  return {
    data,
    setData,
    loading,
    delUser,
    updateUserInfo,
    getUserList,
    onKeywordsChange,
  };
};

export default useService;
