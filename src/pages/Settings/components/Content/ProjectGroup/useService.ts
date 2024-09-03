import Api from '@/api/modules';
import { useDebounceFn, useRequest, useSetState } from 'ahooks';
import { App } from 'antd';
import { useEffect, useState } from 'react';

const useService = () => {
  const { notification } = App.useApp();
  const [groupList, setGroupList] = useState<API.ProjectGroupItem[]>([]);
  const [params, setParams] = useSetState<API.GetProjectGroupListReq & { finished: boolean }>({
    finished: false,
    keywords: '',
    pageSize: 20,
    pageNo: 1,
  });

  const { loading, run: getGroupList } = useRequest(
    async () => {
      const res = await Api.ProjectGroup.getProjectGroupList(params);
      if (res.data) {
        const tpList = res.data.list || [];
        const currentList = res.data.pageNo === 1 ? tpList : [...groupList, ...tpList];
        setGroupList(currentList);
        setParams({
          pageNo: params.pageNo! + 1,
          finished: currentList.length === res.data.total,
        });
      }
    },
    {
      manual: true,
    },
  );

  const { run: reloadGroupList } = useDebounceFn(
    () => {
      if (params.finished) return;
      getGroupList();
    },
    { wait: 200 },
  );

  const delGroup = (id: string, index: number) => {
    Api.ProjectGroup.delProjectGroup({ id }).then((res) => {
      if (res.success) {
        groupList.splice(index, 1);
        setGroupList([...groupList]);
      } else {
        notification.error({
          message: '温馨提示',
          description: res.message,
        });
      }
    });
  };

  const updateGroupRow = (data: API.UpdateProjectGroupReq, index: number) => {
    groupList[index].name = data.name!;
    groupList[index].description = data.description!;
    setGroupList([...groupList]);
  };

  const resetPageNo = () => {
    params.pageNo = 1;
    params.finished = false;
    reloadGroupList();
  };

  useEffect(() => {
    getGroupList();
  }, []);

  return {
    loading,
    params,
    resetPageNo,
    setParams,
    delGroup,
    groupList,
    setGroupList,
    updateGroupRow,
    reloadGroupList,
  };
};

export default useService;
