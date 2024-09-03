import projectAvatar from '@/assets/images/default/project-avatar.jpeg';
import { PROJECT_SHOW_TYPE } from '@/constants';
import HeaderImgUpload from '@/pages/components/HeaderImgUpload';
import UserSelect from '@/pages/components/UserSelect';
import { Down, User } from '@icon-park/react';
import { Avatar, Button, Form, Input, Radio, Select, Space } from 'antd';
import useService from './useService';

const TextArea = Input.TextArea;
const ProjectBaseInfo = () => {
  const { data: baseInfo, onFileChange, onFormLayoutChange, updateCurrentOwner, formRef, onSubmit } = useService();

  return (
    <div className={'pt-4'}>
      {!!baseInfo.project && (
        <>
          <Form
            ref={formRef}
            onValuesChange={onFormLayoutChange}
            labelCol={{ flex: '120px' }}
            initialValues={{
              name: baseInfo.project.name,
              description: baseInfo.project.description,
              showType: baseInfo.project.showType,
              groupId: baseInfo.project.groupId,
              ownerId: baseInfo.project.ownerId,
            }}
            wrapperCol={{ span: 10 }}
            labelAlign="right"
            labelWrap
            colon={false}
          >
            <Form.Item label="项目头图" name="url">
              <HeaderImgUpload
                maxSize={5}
                size={200}
                aspect={2}
                onChange={onFileChange}
                headerImg={{
                  uid: baseInfo.project.id + '',
                  name: baseInfo.project.name!,
                  url: baseInfo.project.headerImg || projectAvatar,
                }}
              />
            </Form.Item>
            <Form.Item label="项目名" name="name" rules={[{ required: true }]}>
              <Input minLength={4} maxLength={50} showCount />
            </Form.Item>
            <Form.Item label="项目分组" name="groupId" rules={[{ required: true }]}>
              <Select
                showSearch
                allowClear={true}
                placeholder="搜索项目分组"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={baseInfo.groupList.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
              />
            </Form.Item>
            <Form.Item label="项目负责人" name="ownerId" rules={[{ required: true }]}>
              <UserSelect
                projectId={baseInfo.project.id}
                onChange={(user: API.ProjectUserItem) => {
                  onFormLayoutChange({ ownerId: user.id });
                  updateCurrentOwner(user);
                }}
              >
                <Space className={'rounded-md bg-zinc-50 px-2 py-1 hover:bg-zinc-100'}>
                  <Avatar className={'bg-zinc-300'} src={baseInfo.project.ownerAvatar} icon={<User />} size={25} />
                  <span>{baseInfo.project.ownerName}</span>
                  <Down className={'align-middle'} theme="filled" size="16" fill="#999" />
                </Space>
              </UserSelect>
            </Form.Item>
            <Form.Item label="是否公开" name="showType" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value={PROJECT_SHOW_TYPE.PRIVATE}> 私有 </Radio>
                <Radio value={PROJECT_SHOW_TYPE.PUBLIC}> 公开 </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="项目描述" name="description">
              <TextArea className={'h-[100px] w-full'} maxLength={500} showCount placeholder="请输入项目介绍" />
            </Form.Item>
            <Form.Item htmlFor={'s'}>
              <Button className={'ml-[120px]'} type={'primary'} onClick={onSubmit}>
                保存
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

export default ProjectBaseInfo;
