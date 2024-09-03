import projectAvatar from '@/assets/images/default/project-avatar.jpeg';
import ProjectSelect from '@/pages/components/ProjectSelect';
import InviteModal from '@/pages/ProjectDetail/components/InviteModal';
import { DownOne, Left } from '@icon-park/react';
import { history, useModel } from '@umijs/max';
import { Button, Image } from 'antd';
import ContentTypeTab from './ContentTypeTab';

const ProjectDetailHeader = () => {
  const { data, setData } = useModel('ProjectDetail.model');

  return (
    <header className={'z-100 flex h-[56px] justify-between border-b border-b-gray-100 bg-white pr-3'}>
      <div className={'flex h-full items-center'}>
        <span
          className={'flex cursor-pointer items-center self-stretch p-2 text-gray-300'}
          onClick={() => history.go(-1)}
        >
          <Left size={24} fill={'#999'} />
        </span>
        <span className={'flex h-full items-center space-x-3 border-r border-r-zinc-100 pr-4'}>
          <Image
            fallback={projectAvatar}
            src={data.project?.headerImg}
            width={40}
            height={40}
            preview={false}
            className={'rounded-md object-cover'}
          />
          <ProjectSelect onChange={(val) => setData({ projectId: val })}>
            <span className={'flex items-center space-x-1'}>
              <b className={'inline-block min-w-[80px] max-w-[200px] truncate text-zinc-700'}>{data.project?.name}</b>
              <DownOne className={'cursor-pointer'} theme={'filled'} fill={'#666'} size={16} />
            </span>
          </ProjectSelect>
        </span>
        <div className={'ml-5 self-end'}>
          <ContentTypeTab />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <InviteModal>
          <Button type="primary" shape="round" size={'small'} ghost>
            邀请
          </Button>
        </InviteModal>
      </div>
    </header>
  );
};

export default ProjectDetailHeader;
