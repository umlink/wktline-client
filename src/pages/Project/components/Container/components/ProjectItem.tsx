import projectAvatar from '@/assets/images/default/project-avatar.jpeg';
import { PROJECT_SHOW_TYPE } from '@/constants';
import { Lock } from '@icon-park/react';
import { history } from '@umijs/max';
import { Image } from 'antd';

export default (props: { item: API.ProjectInfoItem }) => {
  const goDetail = () => history.push(`/project/detail?id=${props.item.id}`);

  return (
    <div
      className={`hover:scale-102 flex cursor-pointer flex-col rounded-lg border
         border-zinc-100 shadow-md transition-all ease-out hover:-translate-y-1 hover:shadow-xl`}
      onClick={goDetail}
    >
      <div className={'aspect-video w-full flex-1 overflow-hidden rounded-t-md'}>
        <Image
          className={'aspect-video w-full bg-white'}
          preview={false}
          fallback={projectAvatar}
          src={`${props.item.headerImg}?imageView2/0/w/400`}
          alt=""
        />
      </div>
      <div
        className="flex h-[40px] items-center justify-between space-x-2 px-3 text-zinc-900"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <h2 className={'w-0 flex-1 truncate text-sm text-zinc-600'}>{props.item.name}</h2>
        {props.item.showType === PROJECT_SHOW_TYPE.PRIVATE && (
          <span className={'text-[#F7BA1E]'}>
            <Lock theme="outline" />
          </span>
        )}
      </div>
    </div>
  );
};
