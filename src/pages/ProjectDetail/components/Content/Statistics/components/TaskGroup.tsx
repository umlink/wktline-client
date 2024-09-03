import TaskGroupSelect from '@/pages/components/TaskGroupSelect';
import { Down } from '@icon-park/react';
import { useModel } from '@umijs/max';

type PropsType = {
  group: API.TaskGroupItem;
  setGroup: (v: API.TaskGroupItem) => void;
};

export default ({ group, setGroup }: PropsType) => {
  const { projectData } = useModel('ProjectDetail.model', (m) => {
    return {
      projectData: m.data,
    };
  });
  return (
    <TaskGroupSelect
      arrow={false}
      projectId={projectData.projectId}
      onChange={(item) => setGroup(item)}
      onSelectAll={() => {
        setGroup({
          id: '',
          groupName: '全部迭代',
          description: '',
        });
      }}
    >
      <div className={'space-x-1 rounded-md px-2 py-1'}>
        <span className={'text-zinc-400'}>迭代：</span>
        <span className={'whitespace-nowrap'}>{group.groupName}</span>
        <Down theme="outline" size="14" fill="#999" />
      </div>
    </TaskGroupSelect>
  );
};
