import { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type PropsType = {
  content?: string;
  readOnly?: boolean;
  placeholder?: string;
  onChange?: (v: string) => void;
};

const RickEditor = forwardRef((props: PropsType, ref) => {
  const quill: any = useRef(null);
  useImperativeHandle(ref, () => ({
    resetContent: (val: string) => {
      // quill.current.setEditorContents(Quill, val);
      quill.current.value = val;
    },
  }));
  return (
    <ReactQuill
      ref={quill}
      readOnly={props.readOnly}
      placeholder={props.placeholder || '请输入内容'}
      className={`!max-h-[300px] flex-1 !overflow-y-auto !text-zinc-700
      [&_.ql-container]:!h-auto [&_.ql-container]:!border-0
      [&_.ql-container]:!px-2 [&_.ql-container]:!text-sm
      [&_.ql-container_strong]:!text-zinc-800 [&_.ql-editor]:!p-2
      [&_.ql-editor]:leading-6 [&_.ql-indent-1]:!pl-[28px]
      [&_.ql-stroke]:!stroke-zinc-700 [&_.ql-stroke]:!stroke-[1.5]
      [&_.ql-toolbar]:!border-0 [&_.ql-toolbar]:!bg-zinc-50
      [&_.ql-toolbar]:!py-[3px] [&_.ql-tooltip]:!h-0
      ${
        props.readOnly
          ? '[&_.ql-editor]:!h-auto [&_.ql-toolbar]:!hidden [&_.ql-tooltip]:!hidden'
          : '[&_.ql-editor]:!min-h-[60px] [&_.ql-editor]:!border-0'
      }`}
      theme={'snow'}
      value={props.content}
      onChange={props.onChange}
      modules={{
        toolbar: [
          [
            'bold',
            'italic',
            'underline',
            { color: [] },
            { background: [] },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
            { list: 'ordered' },
            { list: 'bullet' },
            { script: 'sub' },
            { script: 'super' },
          ],
        ],
      }}
    />
  );
});

export default RickEditor;
