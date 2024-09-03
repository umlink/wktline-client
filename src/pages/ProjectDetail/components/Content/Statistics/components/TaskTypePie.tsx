import Api from '@/api/modules';
import { ProjectStatisticsParams } from '@/pages/ProjectDetail/components/Content/Statistics';
import { Pie } from '@ant-design/plots';
import { useEffect, useState } from 'react';

type PropsType = {
  params: ProjectStatisticsParams;
};

type DataItem = {
  type: string;
  value: number;
};

const TaskTypePie = ({ params }: PropsType) => {
  const [data, setData] = useState<DataItem[]>([]);
  const config = {
    data,
    height: 320,
    angleField: 'value',
    colorField: 'type',
    paddingRight: 80,
    innerRadius: 0.6,
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    tooltip: {
      title: 'type',
      items: [{ channel: 'y' }],
    },
    legend: {
      color: {
        position: 'top',
      },
    },
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 4,
    },
    scale: {
      color: {
        offset: (t: number) => t * 0.8 + 0.1,
      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: '任务类型\n数量分布',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 14,
          fontStyle: 'bold',
        },
      },
    ],
  };
  const getData = () => {
    Api.ProjectOverview.getTaskTypeStat(params).then((res) => {
      if (res.success && res.data) {
        const list: DataItem[] = res.data.map((item) => {
          return { type: item.typeName, value: item.taskCount };
        });
        setData(list);
      }
    });
  };
  useEffect(getData, [params]);
  return (
    <div className={'w-[350px] rounded-md bg-white p-4'}>
      <h3 className={'mb-4 font-semibold'}>任务类型分布</h3>
      <Pie {...config} />
    </div>
  );
};

export default TaskTypePie;
