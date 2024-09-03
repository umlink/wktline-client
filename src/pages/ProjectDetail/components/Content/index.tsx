import { EVENTS, projectContentTypeMap } from '@/constants';
import useQueryParams from '@/hooks/useQueryParams';
import EventBus from '@/utils/event-bus';
import { useModel } from '@umijs/max';
import { Empty } from 'antd';
import { useEffect } from 'react';
import Setting from './Setting';
import Statistics from './Statistics';
import Task from './Task';
import Test from './Test';

const ProjectDetailContent = () => {
  const { filterData, setData, resetProjectData } = useModel('ProjectDetail.model');
  const { TASK, STATISTIC, SETTING, TEST } = projectContentTypeMap;
  const [query] = useQueryParams();

  // 第一次进来获取项目详情 关闭后清空项目数据
  useEffect(() => {
    setData({ projectId: query.id });
    if (query.taskId) {
      EventBus.emit(EVENTS.OPEN_TASK_DETAIL, query.taskId);
    }
    return () => {
      resetProjectData();
    };
  }, []);

  const ViewMap = {
    [TASK]: Task,
    [STATISTIC]: Statistics,
    [SETTING]: Setting,
    [TEST]: Test,
  };
  const SettingView = ViewMap[filterData.contentType] || Empty;
  return <div className={'h-[calc(100vh-56px)] overflow-y-auto'}>{<SettingView />}</div>;
};

export default ProjectDetailContent;
