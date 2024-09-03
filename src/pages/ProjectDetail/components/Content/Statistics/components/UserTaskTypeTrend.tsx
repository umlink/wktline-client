import { Column } from '@ant-design/plots';
import {useEffect, useState} from "react";
import {ProjectStatisticsParams} from "@/pages/ProjectDetail/components/Content/Statistics";
import Api from "@/api/modules";
type PropsType = {
  params: ProjectStatisticsParams;
};
const UserTaskStatusTrend = ({params}: PropsType) => {
  const [data, setData] = useState<API.ProjectUserTaskTypeStatisticsItem[]>([])
  const config: any = {
    data,
    height: 350,
    xField: 'userName',
    yField: 'taskCount',
    colorField: 'typeName',
    stack: true,
    sort: {
      reverse: true,
      by: 'y',
    },
    scale: {
      x: { padding: 0.2 },
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
        style: {
          labelTransform: 'rotate(45)',
        },
      },
    },
  };
  const getData = () => {
    Api.ProjectOverview.getUserTaskTypeStat(params).then((res) => {
      if (res.success && res.data) {
        setData(res.data || []);
      }
    });
  };
  useEffect(getData, [params]);
  return (
    <div className={'flex-1 bg-white p-4 rounded'}>
      <h3 className={'mb-4 font-semibold'}>任务数按任务类型排行</h3>
      <Column {...config} />
    </div>
  );
};

export default UserTaskStatusTrend;
