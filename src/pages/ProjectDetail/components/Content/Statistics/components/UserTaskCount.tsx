import { Column } from '@ant-design/plots';
import {ProjectStatisticsParams} from "@/pages/ProjectDetail/components/Content/Statistics";
import Api from "@/api/modules";
import {useEffect, useState} from "react";
type PropsType = {
  params: ProjectStatisticsParams;
};
const UserTask = ({params}: PropsType) => {
  const [data, setData] = useState<API.ProjectUserTaskCountItem[]>([])
  const config: any = {
    data,
    height: 320,
    xField: 'userName',
    yField: '任务数',
    sort: {
      reverse: true,
      by: 'y',
    },
    style: {
      maxWidth: 50,
      radiusTopLeft: 4,
      radiusTopRight: 4,
    },
    label: {
      text: (d: API.ProjectUserTaskCountItem) => d['任务数'],
      textBaseline: 'bottom',
    },
    legend: false,
  };
  const getData = () => {
    Api.ProjectOverview.getUserTaskCountStat(params).then((res) => {
      if (res.success && res.data) {
        setData(res.data || []);
      }
    });
  };
  useEffect(getData, [params]);
  return (
    <div className={'flex-1 rounded-md bg-white p-3'}>
      <h3 className={'mb-4 font-semibold'}>任务数量分布</h3>
      <Column {...config} />
    </div>
  );
};

export default UserTask;
