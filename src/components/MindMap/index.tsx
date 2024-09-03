import { useEffect, useRef } from 'react';
import MindMap from 'simple-mind-map';

type PropsType = {
  readonly?: boolean;
  value: string;
  onChange: (v: string) => void;
};
export default (props: PropsType) => {
  const ref = useRef(null);
  let mindMapInstance;
  useEffect(() => {
    const data = props.value
      ? JSON.parse(props.value)
      : {
          data: {
            text: '根节点',
          },
          children: [],
        };
    const defaultParams: any = {
      el: ref.current,
      readonly: props.readonly,

      data,
    };
    mindMapInstance = new MindMap(defaultParams);
    mindMapInstance.on('data_change', (data: any) => {
      props.onChange(JSON.stringify(data));
    });
  }, []);
  return (
    <div className={'h-full w-full'}>
      <div ref={ref} className={'h-full min-h-[200px] w-full'}></div>
    </div>
  );
};
