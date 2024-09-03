/**
 * 滑到底部
 * */
import { useThrottleFn } from 'ahooks';

const useScrollMove = (ref: any, callback: (params?: any) => any) => {
  const { run } = useThrottleFn(
    () => {
      try {
        const target = ref.current;
        const clientHeight = parseInt(target.clientHeight + target.scrollTop);
        const scrollHeight = parseInt(target.scrollHeight);
        if (scrollHeight - clientHeight < 2) callback();
      } catch (e) {
        console.warn(e);
      }
    },
    {
      wait: 100,
    },
  );
  return run;
};

export default useScrollMove;
