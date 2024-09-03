import { PROJECT_SHOW_TYPE, PROJECT_SHOW_TYPE_LIST } from '@/constants';
import { Application } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';
import useService from './useService';
const { Option } = Select;

const App = (props: any) => {
  const { setParams } = useModel('Project.model');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => setIsModalVisible(true);
  const handleOk = () => form.submit();
  const handleHide = () => setIsModalVisible(false);
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const createSuccessCallback = (res: any) => {
    if (res?.id) {
      form.resetFields();
      handleHide();
      setParams({ pageNo: 1 });
    }
  };
  const { loading, projectGroupList, createProject } = useService(createSuccessCallback);

  return (
    <>
      <div onClick={showModal}>{props.children}</div>
      <Modal
        title={
          <div className={'flex items-center space-x-1 leading-none'}>
            <Application theme="outline" size="18" />
            <span>新建项目</span>
          </div>
        }
        styles={{
          body: {
            paddingTop: 50,
          },
        }}
        open={isModalVisible}
        okText={'确认'}
        width={550}
        cancelText={'取消'}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleHide}
      >
        <Form
          form={form}
          initialValues={{
            showType: PROJECT_SHOW_TYPE.PUBLIC,
          }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          onFinish={createProject}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="项目名称" name="name" rules={[{ required: true, message: '项目名不能为空' }]}>
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          <Form.Item name="groupId" label="项目组" rules={[{ required: true, message: '项目分组不能为空' }]}>
            <Select placeholder="请选择一个项目组" allowClear>
              {projectGroupList.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="showType" label="项目分类" rules={[{ required: true, message: '分类不能为空' }]}>
            <Select placeholder="请选择项目显示" allowClear>
              {PROJECT_SHOW_TYPE_LIST.map((item) => (
                <Option value={item.value} key={item.value}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="项目描述" name="description">
            <Input.TextArea rows={4} placeholder="请输入项目简介" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default App;
