import Api from '@/api/modules';
import { ProjectStatisticsParams } from '@/pages/ProjectDetail/components/Content/Statistics';
import { Pie } from '@ant-design/plots';
import { FullScreenOne } from '@icon-park/react';
import { useEffect, useState } from 'react';

type PropsType = {
  params: ProjectStatisticsParams;
};

const TaskStatusPie = ({ params }: PropsType) => {
  const [data, setData] = useState([]);
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
    style: {
      stroke: '#fff',
      inset: 1,
      radius: 4,
    },
    legend: {
      color: {
        title: false,
        position: 'top',
        rowPadding: 5,
      },
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
          text: '任务状态\n数量分布',
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
    Api.ProjectOverview.getTaskStatusStat(params).then((res) => {
      if (res.success && res.data) {
        const list: any = res.data.map((item) => {
          return { type: item.statusName, value: item.taskCount };
        });
        setData(list);
      }
    });
  };
  useEffect(getData, [params]);
  return (
    <div className={'w-[350px] rounded-md bg-white p-4'}>
      <div className={'mb-4 flex justify-between'}>
        <h3 className={'font-semibold'}>任务状态分布</h3>
        <span className={'cursor-pointer leading-none text-zinc-500 hover:text-primary'}>
          <FullScreenOne theme="outline" size="16" />
        </span>
      </div>
      <Pie {...config} />
    </div>
  );
};

export default TaskStatusPie;
