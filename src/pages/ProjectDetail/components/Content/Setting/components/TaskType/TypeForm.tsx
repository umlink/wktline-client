import Api from '@/api/modules';
import { PRESET_COLORS } from '@/constants';
import useQueryParams from '@/hooks/useQueryParams';
import { useBoolean } from 'ahooks';
import { App, ColorPicker, Form, Input, Modal } from 'antd';
import React from 'react';

type propsType = {
  type?: API.TaskTypeItem;
  callback?: () => void;
  children: React.ReactNode;
};

export default (props: propsType) => {
  const { message } = App.useApp();
  const [query] = useQueryParams();
  const [loading, { setTrue: startLoading, setFalse: loadingDone }] = useBoolean(false);
  const [open, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false);
  const [form] = Form.useForm();
  const handleOk = () => form.submit();
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const newTaskType = (params: any) => {
    startLoading();
    params.projectId = query.id;
    params.color = typeof params.color === 'string' ? params.color : params.color.toHexString();
    Api.TaskType.createTaskType(params as API.CreateTaskTypeReq)
      .then((res) => {
        if (res.success) {
          form.resetFields();
          closeModal();
          props.callback?.();
        } else {
          message.warning(res.message);
        }
      })
      .finally(() => {
        loadingDone();
      });
  };

  const editTaskType = (params: any) => {
    startLoading();
    params.id = props.type?.id;
    params.projectId = query.id;
    params.color = typeof params.color === 'string' ? params.color : params.color.toHexString();
    Api.TaskType.updateTaskType(params)
      .then((res) => {
        if (res.success) {
          form.resetFields();
          closeModal();
          props.callback?.();
        } else {
          message.warning(res.message);
        }
      })
      .finally(() => {
        loadingDone();
      });
  };

  const onFinished = (params: any) => {
    if (props.type) {
      editTaskType(params);
    } else {
      newTaskType(params);
    }
  };

  return (
    <>
      <span onClick={openModal}>{props.children}</span>
      <Modal
        title={props.type ? '编辑' : '新建'}
        open={open}
        okText={'确认'}
        width={500}
        cancelText={'取消'}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={closeModal}
      >
        <Form
          className={'mt-10'}
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          initialValues={{
            name: props.type?.name,
            color: props.type?.color || '#00B96B',
          }}
          onFinish={onFinished}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="类型名称" name="name" rules={[{ required: true, message: '状态名不能为空' }]}>
            <Input placeholder="请输入任务状态名" />
          </Form.Item>
          <Form.Item label="状态颜色" name="color" rules={[{ required: true, message: '颜色不能为空' }]}>
            <ColorPicker
              showText
              presets={[
                {
                  label: '预设',
                  colors: PRESET_COLORS,
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
