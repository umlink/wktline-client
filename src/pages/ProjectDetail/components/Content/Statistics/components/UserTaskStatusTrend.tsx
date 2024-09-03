import { Column } from '@ant-design/plots';
import {useEffect, useState} from "react";
import {ProjectStatisticsParams} from "@/pages/ProjectDetail/components/Content/Statistics";
import Api from "@/api/modules";
type PropsType = {
  params: ProjectStatisticsParams;
};
const UserTaskStatusTrend = ({params}: PropsType) => {
  const [data, setData] = useState<API.ProjectUserTaskStatusStatisticsItem[]>([])
  const config: any = {
    data,
    height: 350,
    xField: 'userName',
    yField: 'taskCount',
    colorField: 'statusName',
    stack: true,
    sort: {
      reverse: true,
      by: 'y',
    },
    style: {
      maxWidth: 50,
      radiusTopLeft: 4,
      radiusTopRight: 4,
    },
    axis: {
      y: { labelFormatter: '~s' },
      x: {
        labelSpacing: 4,
        labelTransform: 'rotate(45)',
      },
    },
  };
  const getData = () => {
    Api.ProjectOverview.getUserTaskStatusStat(params).then((res) => {
      if (res.success && res.data) {
        setData(res.data || []);
      }
    });
  };
  useEffect(getData, [params]);
  return (
    <div className={'flex-1 bg-white p-4 rounded'}>
      <h3 className={'mb-4 font-semibold'}>任务数按任务状态排行</h3>
      <Column {...config} />
    </div>
  );
};

export default UserTaskStatusTrend;
