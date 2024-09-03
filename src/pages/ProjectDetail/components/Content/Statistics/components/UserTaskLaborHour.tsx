import { Column } from '@ant-design/plots';
import {ProjectStatisticsParams} from "@/pages/ProjectDetail/components/Content/Statistics";
import Api from "@/api/modules";
import {useEffect, useState} from "react";
type PropsType = {
  params: ProjectStatisticsParams;
};
const UserTask = ({params}: PropsType) => {
  const [data, setData] = useState<API.ProjectUserLaborHourStatItem[]>([])
  const config: any = {
    data,
    height: 320,
    xField: 'userName',
    yField: '工时',
    sort: {
      reverse: true,
      by: 'y',
    },
    label: {
      text: (d: API.ProjectUserLaborHourStatItem) => d['工时'],
      textBaseline: 'bottom',
    },
    style: {
      maxWidth: 50,
      radiusTopLeft: 4,
      radiusTopRight: 4,
    },
    legend: true,
  };
  const getData = () => {
    Api.ProjectOverview.getUserLaborHourStat(params).then((res) => {
      if (res.success && res.data) {
        setData(res.data || []);
      }
    });
  };
  useEffect(getData, [params]);
  return (
    <div className={'flex-1 rounded-md bg-white p-3'}>
      <h3 className={'mb-4 font-semibold'}>用户工时统计</h3>
      <Column {...config} />
    </div>
  );
};

export default UserTask;
