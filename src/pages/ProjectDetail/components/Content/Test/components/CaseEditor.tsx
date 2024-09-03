import Api from '@/api/modules';
import MindMap from '@/components/MindMap';
import { Close, FullScreen, OffScreen } from '@icon-park/react';
import { useFullscreen } from 'ahooks';
import { Input } from 'antd';
import { useRef } from 'react';

type PropsType = {
  projectId: string;
  caseDetail?: API.GetTestCaseRes;
  onClose: () => void;
};
const CaseEditor = (props: PropsType) => {
  const ref = useRef(null);
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(ref);
  const onChange = (v: string) => {
    Api.TestCase.updateCase({
      id: props.caseDetail!.id!,
      projectId: props.projectId,
      value: v,
    });
  };

  if (!props.caseDetail) return <></>;
  return (
    <div ref={ref} className={'absolute inset-0 z-10 m-2 overflow-hidden rounded-md'}>
      <div className={'absolute left-0 right-0 top-0 p-3'}>
        <Input
          value={props.caseDetail.name}
          variant={'borderless'}
          style={{ width: 240 }}
          className={'bg-white text-lg'}
          placeholder={'用例名称'}
        />
        <span className={'ml-3 text-red-600'}>完善中。。。</span>
        <div className={'absolute right-3 top-3 flex items-center space-x-2'}>
          <span
            className={'flex cursor-pointer p-2 text-lg text-[color:#666] hover:bg-zinc-100'}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <OffScreen theme="outline" /> : <FullScreen theme="outline" />}
          </span>
          <span onClick={props.onClose} className={'flex cursor-pointer p-2 hover:bg-zinc-100'}>
            <Close theme="outline" size="18" fill="#666" />
          </span>
        </div>
      </div>
      <MindMap onChange={onChange} value={props.caseDetail.value} />
    </div>
  );
};

export default CaseEditor;
