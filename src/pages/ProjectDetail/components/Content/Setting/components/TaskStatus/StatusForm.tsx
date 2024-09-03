import Api from '@/api/modules';
import { PRESET_COLORS, TASK_STATUS_ENUM, TASK_STATUS_ENUM_LIST } from '@/constants';
import useQueryParams from '@/hooks/useQueryParams';
import { useBoolean, useUpdateEffect } from 'ahooks';
import { App, ColorPicker, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const { Option } = Select;

type propsType = {
  open?: boolean;
  status?: API.TaskStatusItem;
  callback?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
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

  const newTaskStatus = (params: any) => {
    startLoading();
    params.projectId = query.id;
    params.color = typeof params.color === 'string' ? params.color : params.color.toHexString();
    Api.TaskStatus.createTaskStatus(params as API.CreateTaskStatusReq)
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

  const editTaskStatus = (params: any) => {
    startLoading();
    params.id = props.status?.id;
    params.projectId = query.id;
    params.sort = props.status?.sort;
    params.color = typeof params.color === 'string' ? params.color : params.color.toHexString();
    Api.TaskStatus.updateTaskStatus(params)
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
    if (props.status) {
      editTaskStatus(params);
    } else {
      newTaskStatus(params);
    }
  };

  useUpdateEffect(() => {
    const status = props.status;
    if (status) {
      form.setFieldValue('name', status.name);
      form.setFieldValue('color', status.color);
    }
  }, [props.status]);

  return (
    <>
      <span onClick={openModal}>{props.children}</span>
      <Modal
        title={props.status ? '编辑' : '新建'}
        open={props.open || open}
        okText={'确认'}
        width={500}
        cancelText={'取消'}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={() => {
          closeModal();
          props.onClose?.();
        }}
      >
        <Form
          className={'mt-10'}
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          initialValues={{
            name: props.status?.name,
            enum: TASK_STATUS_ENUM.PROCESSING,
            color: props.status?.color || '#00B96B',
          }}
          onFinish={onFinished}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="状态名称" name="name" rules={[{ required: true, message: '状态名不能为空' }]}>
            <Input placeholder="请输入任务状态名" />
          </Form.Item>
          <Form.Item
            name="enum"
            label="枚举值"
            tooltip={'枚举值请谨慎添加，随意删除会影响数据统计，中间节点统一为处理中'}
            rules={[{ required: true, message: '枚举不能为空' }]}
          >
            <Select placeholder="请选择一个枚举">
              {TASK_STATUS_ENUM_LIST.map((item) => (
                <Option value={item.value} key={item.value}>
                  {item.name} - {item.value}
                </Option>
              ))}
            </Select>
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
