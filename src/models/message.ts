import Api from '@/api/modules';
import { useModel } from '@@/exports';
import { useRequest } from '@umijs/max';
import { useSetState, useUpdateEffect } from 'ahooks';

type StateProps = {
  msgList: API.MessageItem[];
  pageNo: number;
  finished: boolean;
  activeTab: string;
  openId?: string;
  unreadCount: number;
  msgDetail?: Partial<API.GetMessageDetailRes>;
  params: {
    status?: string;
    type?: string;
  };
};

const useMessageModel = () => {
  const { getUnreadMsgCount } = useModel('global');
  const [state, setState] = useSetState<StateProps>({
    msgList: [],
    pageNo: 1,
    finished: false,
    params: {},
    activeTab: 'all',
    unreadCount: 0,
  });

  const { loading, run: getMessageList } = useRequest(
    () =>
      Api.Message.getMsgList({
        ...state.params,
        pageNo: state.pageNo,
      }),
    {
      manual: true,
      onSuccess: (res) => {
        if (res) {
          const _list = res.list || [];
          const list = state.pageNo === 1 ? _list : [...state.msgList, ..._list];
          setState({
            msgList: list,
            finished: res.total === list.length,
            pageNo: state.pageNo + 1,
          });
        }
      },
    },
  );

  const getData = (): void => {
    if (state.finished || loading) return;
    getMessageList();
  };
  const readMsg = (id: string, index: number) => {
    Api.Message.readMsg({ id }).then((res) => {
      if (res.success) {
        getUnreadMsgCount();
        state.msgList[index].status = 1;
        setState({ msgList: [...state.msgList] });
      }
    });
  };
  const getMsgDetail = (msg: API.MessageItem, index: number) => {
    setState({ openId: msg.id });
    if (!msg.status) {
      readMsg(msg.id, index);
    }
    Api.Message.getMsgDetail({ id: msg.id }).then((res) => {
      if (res.success) {
        setState({ msgDetail: res.data });
      }
    });
  };

  useUpdateEffect(getData, [state.params]);

  return {
    loading,
    getData,
    state,
    setState,
    getMsgDetail,
  };
};

export default useMessageModel;
