import { UploadOne } from '@icon-park/react';
import type { UploadProps } from 'antd';
import { Button, Space, Upload } from 'antd';

const TaskUploadFile = ({ fileList, setFileList, setCurrentFile, removeResource }: any) => {
  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.data.url;
        file.uid = file.response.data.id;
        if (typeof setCurrentFile === 'function') {
          setCurrentFile(file);
        }
      }
      return file;
    });
    if (typeof setFileList === 'function') {
      setFileList(newFileList);
    }
  };

  const props = {
    action: '/wkt-api/common/upload',
    onChange: handleChange,
    onRemove: (file: any) => {
      if (typeof removeResource === 'function') {
        removeResource(file);
      }
    },
    size: 'small',
    multiple: true,
  };
  return (
    <Upload {...props} className={'[&_.ant-upload-list-item]:!border-zinc-100'} fileList={fileList}>
      <Button type={'dashed'}>
        <Space align="center">
          <UploadOne theme="outline" />
          <span>添加附件</span>
        </Space>
      </Button>
    </Upload>
  );
};

export default TaskUploadFile;
