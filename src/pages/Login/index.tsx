import { login } from '@/api/modules/Login';
import logo from '@/assets/images/logo.png';
import useQueryParams from '@/hooks/useQueryParams';
import { Avatar, Button, Checkbox, Form, Input, message } from 'antd';
import { Md5 } from 'ts-md5';

const App = () => {
  const [query] = useQueryParams();

  const onFinish = (values: { username: string; password: string }) => {
    login({
      username: values.username,
      password: Md5.hashStr(values.password + 'zfl'),
    }).then((res: any) => {
      if (res.success) {
        location.replace(query.target ? decodeURIComponent(query.target) : '/');
      } else {
        message.error(res.message);
      }
    });
  };
  const onFinishFailed = (errorInfo: any) => console.log('Failed:', errorInfo);

  return (
    <div
      className={'flex h-full w-full items-center justify-between bg-amber-50'}
      style={{ backgroundImage: 'linear-gradient(-225deg, #E3FDF5 0%, #eef1f5 100%)' }}
    >
      <div className={'left flex-1'}></div>
      <div className={'right pr-[200px]'}>
        <div className={'h-[400px] w-[380px] rounded-xl border border-zinc-200/40 bg-white/50 shadow-lg'}>
          <div className={'flex items-end space-x-2 border-b-[1px] border-b-zinc-200/50 px-6 py-5'}>
            <Avatar className={'shadow'} size={36} src={logo} />
            <h1
              className={
                'bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-[20px] font-bold text-transparent'
              }
            >
              Login
            </h1>
          </div>
          <div className={'p-8 py-10'}>
            <Form
              name="basic"
              initialValues={{
                username: undefined,
                password: undefined,
                remember: true,
              }}
              size={'large'}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ]}
              >
                <Input
                  placeholder={'请输入你的用户名'}
                  className={'[&.ant-input]:border-zinc-200 [&.ant-input]:bg-transparent'}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
              >
                <Input.Password
                  placeholder={'请输入你的用户密码'}
                  style={{ backgroundColor: 'transparent' }}
                  className={'[&.ant-input-password]:border-zinc-200 [&_input]:!bg-transparent'}
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
