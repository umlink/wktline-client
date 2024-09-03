import UserInfo from '@/layouts/LeftMenu/components/UserInfo';
import Message from './Message';

export default () => {
  return (
    <div
      className={
        'z-1 absolute inset-x-0 bottom-0 flex w-full flex-col items-center border-t border-t-gray-100 bg-white pb-5 pt-2'
      }
    >
      <Message />
      <span className={`mt-2 inline-block cursor-pointer`}>
        <UserInfo />
      </span>
    </div>
  );
};
