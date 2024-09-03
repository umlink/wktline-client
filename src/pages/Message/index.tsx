import MsgContent from '@/pages/Message/components/MsgContent';
import MsgMenu from '@/pages/Message/components/MsgMenu';

const MessagePage = () => {
  return (
    <div className={'flex h-full'}>
      <MsgMenu />
      <MsgContent />
    </div>
  );
};

export default MessagePage;
