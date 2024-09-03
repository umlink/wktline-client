import { Button, Form, Input } from 'antd';

const TestCaseFilter = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };

  return (
    <div className={'p-3'}>
      <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
        <Form.Item name="name">
          <Input variant={'filled'} placeholder="用例名" />
        </Form.Item>
        <Form.Item name="user">
          <Input variant={'filled'} placeholder="创建人" />
        </Form.Item>
        <Form.Item shouldUpdate>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TestCaseFilter;
