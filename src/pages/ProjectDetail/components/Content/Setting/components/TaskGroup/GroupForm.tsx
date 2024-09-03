import Api from '@/api/modules';
import useQueryParams from '@/hooks/useQueryParams';
import { useBoolean, useUpdateEffect } from 'ahooks';
import { App, Form, Input, Modal } from 'antd';
import React from 'react';

type propsType = {
  group?: API.TaskGroupItem;
  open?: boolean;
  callback?: (params: API.UpdateTaskGroupReq) => void;
  children?: React.ReactNode;
  onClose?: () => void;
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

  useUpdateEffect(() => {
    const group = props.group;
    if (group) {
      form.setFieldValue('groupName', group.groupName);
      form.setFieldValue('description', group.description);
    }
  }, [props.group]);

  const newTaskGroup = (params: any) => {
    startLoading();
    params.projectId = query.id;
    Api.TaskGroup.createTaskGroup(params as API.CreateTaskGroupReq)
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

  const editTaskGroup = (params: any) => {
    startLoading();
    params.id = props.group?.id;
    Api.TaskGroup.updateTaskGroup({
      ...params,
      projectId: query.id,
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
    if (props.group) {
      editTaskGroup(params);
    } else {
      newTaskGroup(params);
    }
  };

  return (
    <>
      <span onClick={openModal}>{props.children}</span>
      <Modal
        title={props.group ? '编辑' : '新建'}
        open={props.open || open}
        okText={'确认'}
        width={500}
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
            groupName: props.group?.groupName,
            description: props.group?.description,
          }}
          onFinish={onFinished}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="迭代名称" name="groupName" rules={[{ required: true, message: '分组/迭代不能为空' }]}>
            <Input placeholder="请输入迭代名称" />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
