import Api from '@/api/modules';
import { PRESET_COLORS } from '@/constants';
import { useBoolean, useUpdateEffect } from 'ahooks';
import { App, ColorPicker, Form, Input, Modal } from 'antd';
import React from 'react';

type propsType = {
  priority?: API.TaskPriorityItem;
  open?: boolean;
  callback?: (params: API.UpdateTaskPriorityReq) => void;
  children?: React.ReactNode;
  onClose?: () => void;
};

export default (props: propsType) => {
  const { message } = App.useApp();
  const [loading, { setTrue: startLoading, setFalse: loadingDone }] = useBoolean(false);
  const [open, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false);
  const [form] = Form.useForm();
  const handleOk = () => form.submit();
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useUpdateEffect(() => {
    const priority = props.priority;
    if (priority) {
      form.setFieldValue('name', priority.name);
      form.setFieldValue('color', priority.color);
    }
  }, [props.priority]);

  const newTaskPriority = (params: any) => {
    startLoading();
    params.color = typeof params.color === 'string' ? params.color : params.color.toHexString();
    Api.TaskPriority.addTaskPriority(params as API.AddTaskPriorityReq)
      .then((res) => {
        if (res.success) {
          form.resetFields();
          closeModal();
          props.callback?.(params);
        } else {
          message.warning(res.message);
        }
      })
      .finally(() => {
        loadingDone();
      });
  };

  const editTaskPriority = (params: any) => {
    startLoading();
    params.id = props.priority?.id;
    params.color = typeof params.color === 'string' ? params.color : params.color.toHexString();
    Api.TaskPriority.updateTaskPriority({
      ...params,
    })
      .then((res) => {
        if (res.success) {
          form.resetFields();
          closeModal();
          props.callback?.(params);
        } else {
          message.warning(res.message);
        }
      })
      .finally(() => {
        loadingDone();
      });
  };

  const onFinished = (params: any) => {
    if (props.priority) {
      editTaskPriority(params);
    } else {
      newTaskPriority(params);
    }
  };

  return (
    <>
      <span onClick={openModal}>{props.children}</span>
      <Modal
        title={props.priority ? '编辑' : '新建'}
        open={props.open || open}
        okText={'确认'}
        width={400}
        cancelText={'取消'}
        onOk={handleOk}
        confirmLoading={loading}
        destroyOnClose
        onCancel={() => {
          closeModal();
          props.onClose?.();
        }}
      >
        <Form
          className={'!mt-5'}
          form={form}
          layout="vertical"
          initialValues={{
            id: props.priority?.id,
            name: props.priority?.name,
            color: props.priority?.color,
          }}
          onFinish={onFinished}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="优先级" name="id" rules={[{ required: true, message: '优先级不能为空' }]}>
            <Input placeholder="请输入任务优先级 P*" disabled={!!props.priority} />
          </Form.Item>
          <Form.Item label="名称" name="name" rules={[{ required: true, message: '优先级名称不能为空' }]}>
            <Input placeholder="请输入优先级名称" />
          </Form.Item>
          <Form.Item label="颜色" name="color" rules={[{ required: true, message: '颜色不能为空' }]}>
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
