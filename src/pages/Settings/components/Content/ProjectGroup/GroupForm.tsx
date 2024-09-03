import Api from '@/api/modules';
import { useBoolean, useUpdateEffect } from 'ahooks';
import { App, Form, Input, Modal } from 'antd';
import React from 'react';

type propsType = {
  group?: API.ProjectGroupItem;
  open?: boolean;
  callback?: (params: API.UpdateProjectGroupReq) => void;
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
    const group = props.group;
    if (group) {
      form.setFieldValue('groupName', group.name);
      form.setFieldValue('description', group.description);
    }
  }, [props.group]);

  const newTaskGroup = (params: any) => {
    startLoading();
    Api.ProjectGroup.createProjectGroup(params as API.CreateProjectGroupReq)
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
    Api.ProjectGroup.updateProjectGroup({
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
            name: props.group?.name,
            description: props.group?.description,
          }}
          onFinish={onFinished}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="分组/迭代名称" name="name" rules={[{ required: true, message: '分组/迭代不能为空' }]}>
            <Input placeholder="请输入分组/迭代名称" />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} placeholder="请输入描述" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
