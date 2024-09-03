import useScrollMove from '@/hooks/useScrollMove';
import { useModel } from '@umijs/max';
import { useRef } from 'react';
import ProjectItem from './ProjectItem';

export default () => {
  const ref = useRef(null);
  const { projectData, params, resetMenuParams } = useModel('Project.model');
  const onScroll = useScrollMove(ref, () => {
    if (projectData.finished) return;
    resetMenuParams({ pageNo: params.pageNo! + 1 });
  });

  return (
    <div className={'h-[calc(100vh-50px)]'}>
      <div className={'box-border h-full overflow-y-auto'} ref={ref} onScroll={onScroll}>
        <div className={`grid w-auto grid-cols-[repeat(auto-fit,240px)] gap-5 p-5`}>
          {projectData.projectList.map((item) => (
            <ProjectItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
