import Api from '@/api/modules';
import { useRequest } from '@umijs/max';
import { useSetState } from 'ahooks';
import { useEffect, useState } from 'react';

const useProjectList = () => {
  const [data, setData] = useSetState<{
    projectList: API.ProjectInfoItem[];
    total: number;
    finished: boolean;
  }>({
    total: 0,
    finished: false,
    projectList: [],
  });
  const [params, setParams] = useSetState<API.GetProjectListReq>({
    keywords: '',
    pageNo: 1,
    pageSize: 50,
  });
  const [open, setOpen] = useState(false);

  const { loading, run: getProjectList } = useRequest(
    () =>
      Api.Project.getProjectList(params).then((res) => {
        if (res.success) {
          let list = res.data?.list || [];
          list = params.pageNo === 1 ? list : [...data.projectList, ...list];
          const total = res.data?.total || 0;
          setData({
            projectList: list,
            total,
            finished: total === list.length,
          });
          setParams({
            pageNo: ++params.pageNo!,
          });
        }
      }),
    {
      manual: true,
    },
  );

  const loadMore = () => {
    if (data.finished) return;
    getProjectList();
  };

  useEffect(() => {
    if (data.finished) return;
    getProjectList();
  }, [params.keywords]);

  return {
    data,
    open,
    setData,
    setOpen,
    setParams,
    loading,
    loadMore,
  };
};

export default useProjectList;
