import Api from '@/api/modules';
import inJoinImg from '@/assets/images/default/injoin-project.png';
import { history, useRequest } from '@umijs/max';
import { Avatar, Button, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type StateType = {
  tipsMsg?: string;
  inviteInfo?: Partial<API.GetProjectInviteInfoRes>;
};

const InvitePage = () => {
  const params = useParams();
  const [state, setState] = useState<StateType>({});

  const toProjectDetail = (projectId?: string) => {
    history.push(`/project/detail?id=${projectId}`);
  };

  const { run: getInviteInfo, loading } = useRequest(
    () =>
      Api.ProjectInvite.getInviteInfo({ code: String(params.id) }).then((res) => {
        if (res.success) {
          setState({ inviteInfo: res.data });
          if (res.data?.joined) {
            toProjectDetail(res.data?.projectId);
          }
        } else {
          setState({ tipsMsg: res.message });
        }
      }),
    {
      manual: true,
    },
  );

  const onJoin = () => {
    Api.ProjectInvite.inJoinInvite({ code: String(params.id) }).then((res) => {
      if (res.success) {
        toProjectDetail(state.inviteInfo?.projectId);
      }
    });
  };

  useEffect(() => {
    getInviteInfo();
  }, []);

  const InviteContent = () => {
    if (state.tipsMsg) {
      return (
        <div>
          {!!state.inviteInfo && (
            <div>
              发起人: <Avatar src={state.inviteInfo?.inviterAvatar} size={24} /> {state.inviteInfo?.inviterName}
            </div>
          )}
          <p className={'text-zinc-500'}>{state.tipsMsg}</p>
        </div>
      );
    }
    return (
      <div>
        <p className={'space-x-2'}>
          <Avatar src={state.inviteInfo?.inviterAvatar} size={24} />
          <span>{state.inviteInfo?.inviterName}</span>
          <span className={'text-zinc-500'}>邀请你加入项目</span>
          <span>{state.inviteInfo?.projectName}</span>
        </p>
        <div className={'mt-4'}>
          <Button type={'primary'} onClick={onJoin}>
            立即加入：{state.inviteInfo?.projectName}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={'flex h-full w-full items-center justify-center pb-10'}>
      <div className={'text-center'}>
        <Avatar src={inJoinImg} size={280}></Avatar>
        <div className={'h-[80px]'}>{loading ? <Spin spinning={loading} /> : <InviteContent />}</div>
      </div>
    </div>
  );
};

export default InvitePage;
