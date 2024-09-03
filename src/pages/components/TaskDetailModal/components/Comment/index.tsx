import Api from '@/api/modules';
import { TASK_OPERATE_LOG_ENUM } from '@/constants';
import { Close, DocSuccess, FilePdf, Link, Zip } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { useDebounceFn, useKeyPress } from 'ahooks';
import { Avatar, Button, Tooltip, Upload, UploadProps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { useEffect, useRef, useState } from 'react';
import Tribute from 'tributejs';
import './comment.less';

export default ({ removeResource }: any) => {
  const { data, getTaskLogs } = useModel('taskDetail');
  const commentRef = useRef<HTMLDivElement>(null);
  const [commentVal, setCommentVal] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { run: getUserList } = useDebounceFn(
    (keywords, cb) => {
      Api.ProjectUser.getProjectUser({ projectId: data.projectId, keywords }).then((res) => {
        if (res.success) {
          const list = res.data?.list?.map((item) => {
            return {
              key: item.username,
              value: item.userId,
            };
          });
          cb(list || []);
        }
      });
    },
    { wait: 200 },
  );

  const onComment = () => {
    if (commentVal || fileList.length > 0) {
      const params: API.CreateTaskOperationLogReq = {
        taskId: data.taskId,
        type: TASK_OPERATE_LOG_ENUM.COMMENT,
        name: '添加评论',
        content: commentVal,
        desc: undefined,
      };
      if (fileList.length) {
        params.type = TASK_OPERATE_LOG_ENUM.ATTACHMENT;
        const files = fileList.map((item) => {
          return {
            name: item.name,
            type: item.type,
            size: item.size || 0,
            url: item.response?.data?.url,
          };
        });
        params.desc = JSON.stringify(files);
      }
      Api.TaskOperationLog.createTaskOperationLog(params).then(() => {
        data.taskLogParams.pageNo = 1;
        getTaskLogs(data.taskId);
        setCommentVal('');
        setFileList([]);
        commentRef.current!.innerHTML = '';
      });
    }
  };

  useKeyPress(['ctrl.enter', 'meta.enter'], onComment);
  const onchange = (e: any) => {
    setCommentVal(e.target.innerHTML);
  };

  const renderTribute = () => {
    const TributeInstance = new Tribute({
      selectClass: 'text-primary',
      values: getUserList,
      selectTemplate: function (item: any) {
        return `<span class='tribute-mention'
                data-id=${item.original.value}
                contenteditable="false">
                @${item.original.key}
                </span>`;
      },
      noMatchTemplate(): any {
        return undefined;
      },
    });
    TributeInstance.attach(commentRef.current!);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    setFileList(fileList);
  };

  const props = {
    action: '/wkt-api/common/upload',
    onChange: handleChange,
    onRemove: (file: any) => {
      if (typeof removeResource === 'function') {
        removeResource(file);
      }
    },
    multiple: true,
  };

  const onRemoveFile = (file: UploadFile) => {
    const list = fileList.filter((item) => item.uid !== file.uid);
    setFileList(list);
  };

  useEffect(() => {
    commentRef.current?.addEventListener('input', onchange);
    renderTribute();
    return () => {
      commentRef.current?.removeEventListener('input', onchange);
    };
  }, []);

  const fileIconMap = (type?: string) => {
    let Icon = <DocSuccess theme="outline" size="20" fill="#333" />;
    switch (type) {
      case 'application/pdf':
        Icon = <FilePdf theme="outline" size="20" fill="#333" />;
        break;
      case 'application/zip':
        Icon = <Zip theme="outline" size="20" fill="#333" />;
        break;
    }
    return Icon;
  };

  return (
    <div className={'relative border-t border-t-zinc-100 bg-white p-4'}>
      <div
        ref={commentRef}
        className={`tribute-container max-h-[300px]
        overflow-y-auto
        focus-visible:outline-none
        [&_.tribute-mention]:text-primary`}
        contentEditable
      />
      {!commentVal && (
        <span className={'absolute left-4 top-4 text-zinc-300'}>输入评论，Cmd+Enter发送 / Enter 换行</span>
      )}
      {!!fileList.length && (
        <div>
          {fileList.map((item) => {
            return (
              <div
                key={item.uid}
                className={'mt-2 flex items-center justify-between border border-zinc-50 bg-zinc-100 p-2'}
              >
                <div className={'flex items-center space-x-2'}>
                  <Avatar
                    className={'bg-white'}
                    icon={fileIconMap(item.type)}
                    shape="square"
                    src={item?.response?.data?.url}
                  />
                  <a
                    rel={'noopener noreferrer'}
                    href={item?.response?.data?.url}
                    title={item.name}
                    target={'_blank'}
                    className={'max-w-[200px] truncate whitespace-nowrap text-zinc-500'}
                  >
                    {item.name}
                  </a>
                </div>
                <span className={'space-x-2'}>
                  <span className={'text-xs text-zinc-400'}>{((item.size || 0) / 1024).toFixed(2)}KB</span>
                  <Close
                    className={'g-hover'}
                    theme="outline"
                    size="14"
                    fill="#999"
                    onChange={() => onRemoveFile(item)}
                  />
                </span>
              </div>
            );
          })}
        </div>
      )}
      <div className={'mt-2 flex items-center justify-between text-right'}>
        <div>
          <Upload {...props} showUploadList={false} listType="picture" fileList={fileList}>
            <Tooltip title={'添加附件'} placement={'left'}>
              <span className={'g-hover'}>
                <Link theme="outline" size="16" fill="#999" />
              </span>
            </Tooltip>
          </Upload>
        </div>
        <Button disabled={!commentVal.length && !fileList.length} type={'primary'} onClick={onComment}>
          发表评论
        </Button>
      </div>
    </div>
  );
};
