import Api from '@/api/modules';
import { useRequest } from '@umijs/max';
import { Col, Row, Spin, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import { ProjectStatisticsParams } from '../index';

type PropsType = {
  params: ProjectStatisticsParams;
};

const StatisticsHeader = ({ params }: PropsType) => {
  const [data, setData] = useState<API.GetProjectStatisticsRes>({
    taskCount: 0,
    userCount: 0,
    groupCount: 0,
    laborHour: 0,
    planHour: 0,
    overTimeDoneCount: 0,
    overTimeNoDoneCount: 0,
  });

  const { run: getProjectGroupList, loading } = useRequest(
    () =>
      Api.ProjectOverview.getStatistics(params).then((res) => {
        if (res.success && res.data) {
          setData(res.data as API.GetProjectStatisticsRes);
        }
      }),
    {
      manual: true,
    },
  );

  const renderContent = (content: React.ReactNode) => {
    if (loading || !data.userCount) return <Spin />;
    return content;
  };

  useEffect(() => {
    getProjectGroupList();
  }, [params]);

  return (
    <div className={'mt-3 h-[96px] rounded-md bg-white p-4'}>
      <Row gutter={24} className={'flex h-full items-center text-center'}>
        <Col span={3}>{renderContent(<Statistic title="任务总数" value={data.taskCount} />)}</Col>
        <Col span={3}>{renderContent(<Statistic title="延期-完成" value={data.overTimeDoneCount} />)}</Col>
        <Col span={3}>{renderContent(<Statistic title="延期-未完成" value={data.overTimeNoDoneCount} />)}</Col>
        <Col span={3}>{renderContent(<Statistic title="迭代数" value={data.groupCount} />)}</Col>
        <Col span={3}>{renderContent(<Statistic title="成员总数" value={data.userCount} />)}</Col>
        <Col span={3}>{renderContent(<Statistic title="实际工时" suffix="h" value={data.laborHour} />)}</Col>
        <Col span={3}>{renderContent(<Statistic title="计划工时" suffix="h" value={data.planHour} />)}</Col>
      </Row>
    </div>
  );
};

export default StatisticsHeader;
