import tipsViewImg from '@/assets/images/home/tips-view.png';
import { Avatar } from 'antd';

const HomeIntroduce = () => {
  const blockCommonClass = 'border border-zinc-100 rounded-lg';
  const modules = [
    {
      name: '项目管理',
      desc: '',
    },
    {
      name: '任务管理',
      desc: '',
    },
    {
      name: '工时管理',
      desc: '',
    },
    {
      name: '更多工具',
      desc: '',
    },
  ];
  return (
    <div className={'mb-4 space-x-4'}>
      <div className={`${blockCommonClass} flex space-x-4 bg-white/80`}>
        <div className={'flex-1 p-4 '}>
          <h2 className={'mb-3 text-lg font-bold'}>💡 办公利器：一站式工作工具</h2>
          <p className={'font-light text-zinc-400'}>
            全面的项目管理工具，集任务、项目、工时、办公、文档等功能于一体。高效管理任务进度，协调团队合作，记录工时消耗，提供办公工具支持，便捷管理文档。完美解决项目管理需求。
          </p>
          <div className={'mt-4 grid grid-cols-2 gap-3'}>
            {modules.map((item) => {
              return (
                <div key={item.name} className={'rounded-md bg-gray-50 px-3 py-2'}>
                  <h4>{item.name}</h4>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Avatar src={tipsViewImg} size={250} />
        </div>
      </div>
    </div>
  );
};

export default HomeIntroduce;
