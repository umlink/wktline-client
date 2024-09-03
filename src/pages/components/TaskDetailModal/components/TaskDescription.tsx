import RickEditor from '@/components/RickEditor';
import { Editor } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Button, Tooltip } from 'antd';
import { useState } from 'react';

const StatusSelect = () => {
  const { data, updateTaskInfo } = useModel('taskDetail');
  const [readOnly, setReadOnly] = useState(true);
  const [desc, setDesc] = useState<string>(data.task!.description);

  const updateDescription = () => {
    updateTaskInfo({ description: desc || 'null' });
    setReadOnly(true);
  };

  const onCancel = () => {
    setReadOnly(true);
    setDesc(data.task!.description);
  };

  if (!data.task) return null;

  const noDesc = !data.task.description || data.task.description === '<p><br></p>';
  return (
    <div className={`group relative rounded-lg border border-gray-100 ${!noDesc || !readOnly ? '' : 'border-0'}`}>
      {!noDesc || !readOnly ? (
        <>
          <RickEditor
            readOnly={readOnly}
            placeholder={'添加任务描述'}
            content={desc}
            onChange={(val) => setDesc(val)}
          />
          {readOnly ? (
            <Tooltip title={'编辑'}>
              <span
                className={
                  'absolute right-1 top-1 inline-flex cursor-pointer rounded-md bg-zinc-50 p-1 text-zinc-400 group-hover:bg-zinc-100 group-hover:text-primary'
                }
              >
                <Editor onClick={() => setReadOnly(false)} theme="outline" size="16" />
              </span>
            </Tooltip>
          ) : (
            <div className={'mt-3 space-x-2 px-3 pb-3 text-right'}>
              <Button size={'small'} onClick={onCancel} type={'text'}>
                取消
              </Button>
              <Button size={'small'} type={'primary'} onClick={updateDescription}>
                保存
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className={'h-[30px] cursor-pointer leading-[30px] text-zinc-400'} onClick={() => setReadOnly(false)}>
          添加任务描述
        </div>
      )}
    </div>
  );
};
export default StatusSelect;
