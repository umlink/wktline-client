import { useModel } from '@@/exports';
import { useSetState, useUpdateEffect } from 'ahooks';
import { useState } from 'react';
import DateFilter from './components/DateFilter';
import Header from './components/Header';
import TaskGroup from './components/TaskGroup';
import TaskStatusPie from './components/TaskStatusPie';
import TaskTypePie from './components/TaskTypePie';
import UserTaskCount from './components/UserTaskCount';
import UserTaskLaborHour from './components/UserTaskLaborHour';
import UserTaskStatusTrend from './components/UserTaskStatusTrend';
import UserTaskTypeTrend from './components/UserTaskTypeTrend';

export type DateTypes = 'all' | 'quarter' | 'year' | 'month' | 'week' | 'custom';
export type ProjectStatisticsParams = {
  projectId: string;
  groupId?: string;
  startTime?: string;
  endTime?: string;
};
const ProjectDetailStatistics = () => {
  const { projectData } = useModel('ProjectDetail.model', (m) => {
    return {
      projectData: m.data,
    };
  });
  const [params, setParams] = useSetState<ProjectStatisticsParams>({
    projectId: projectData.projectId,
  });
  const [group, setGroup] = useState<API.TaskGroupItem>({
    id: '',
    groupName: '全部迭代',
    description: '',
  });
  const [dateType, setDateType] = useState<DateTypes>('all');

  const onDateTypeChange = (type: DateTypes) => setDateType(type);
  const updateStartEndDate = (date: { startTime?: string; endTime?: string }) => {
    setParams({
      startTime: date.startTime,
      endTime: date.endTime,
    });
  };

  useUpdateEffect(() => {
    setParams({ groupId: group.id });
  }, [group]);

  useUpdateEffect(() => {
    setParams({ projectId: projectData.projectId });
  }, [projectData.projectId]);

  return (
    <div className={'p-3'}>
      <div className={'flex items-center justify-between space-x-4 rounded-md'}>
        <DateFilter onChange={onDateTypeChange} updateDate={updateStartEndDate} value={dateType} />
        <TaskGroup group={group} setGroup={setGroup} />
      </div>
      <Header params={params} />
      <div className="mt-2 flex justify-between  space-x-2">
        <UserTaskCount params={params} />
        <TaskStatusPie params={params} />
        <TaskTypePie params={params} />
      </div>
      <div className={'mt-2 flex justify-between space-x-2'}>
        <UserTaskLaborHour params={params} />
        <UserTaskStatusTrend params={params} />
        <UserTaskTypeTrend params={params} />
      </div>
    </div>
  );
};

export default ProjectDetailStatistics;
