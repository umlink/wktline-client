import Api from '@/api/modules';
import { Copy, Delete } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { useUpdateEffect } from 'ahooks';
import { App, Button, DatePicker, Divider, Form, InputNumber, Modal, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import React, { useState } from 'react';

export default (props: { children: React.ReactNode }) => {
  const [inviteList, setInviteList] = useState<API.ProjectMyInviteItem[]>([]);
  const { data: projectData } = useModel('ProjectDetail.model');
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm<{
    deadline: string;
    maxInviteCount: number;
  }>();

  const genInviteUrl = (code: string) => {
    const inviteUrl = `${location.origin}/invite/${code}`;
    copy(inviteUrl);
    message.success('邀请链接已复制到粘贴板');
  };

  const genInviteCode = () => {
    Api.ProjectInvite.genInviteCode({
      projectId: projectData.projectId,
      deadline: dayjs(form.getFieldValue('deadline')).format('YYYY-MM-DD HH:mm:ss'),
      maxInviteCount: form.getFieldValue('maxInviteCount'),
    }).then((res) => {
      if (res.success) {
        genInviteUrl(res.data!.code!);
        setOpen(false);
        form.resetFields();
      }
    });
  };
  const getInviteList = () => {
    Api.ProjectInvite.getInviteList({
      projectId: projectData.projectId,
    }).then((res) => {
      if (res.success) {
        setInviteList(res.data || []);
      }
    });
  };
  const confirmDelete = (code: string) => {
    Api.ProjectInvite.delInviteCode({ code }).then((res) => {
      if (res.success) {
        message.success('删除成功');
        getInviteList();
      } else {
        message.error(res.message);
      }
    });
  };
  const hideModal = () => setOpen(false);
  const onOk = () => form.validateFields({ validateOnly: false }).then(genInviteCode);

  const columns: ColumnsType<API.ProjectMyInviteItem> = [
    {
      title: '邀请码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '人数',
      dataIndex: 'maxInviteCount',
      key: 'maxInviteCount',
      align: 'center',
      render: (text, data) => (
        <span>
          {data.joinedCount} / {text}
        </span>
      ),
    },
    {
      title: '过期时间',
      dataIndex: 'deadline',
      key: 'deadline',
      align: 'center',
      render: (text) => <span className={'font-light text-zinc-400'}>{text}</span>,
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      width: 80,
      render: (_, data) => (
        <Space size={0} split={<Divider type="vertical" />}>
          <a className={'text-zinc-400'}>
            <Copy theme="outline" onClick={() => genInviteUrl(data.code)} />
          </a>
          <Popconfirm
            placement={'left'}
            title="删除邀请码"
            description={'确认删除，删除后邀请链接将失效？'}
            onConfirm={() => confirmDelete(data.code)}
            okText="确认"
            cancelText="取消"
          >
            <a className={'text-zinc-400 hover:!text-red-600'}>
              <Delete theme="outline" />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useUpdateEffect(() => {
    if (open) getInviteList();
  }, [open]);

  if (!projectData.project?.canEdit) {
    return null;
  }

  return (
    <>
      <Modal
        width={640}
        title="生成邀请链接"
        open={open}
        onCancel={hideModal}
        okText="生成"
        cancelText="取消"
        footer={null}
      >
        <div className={'pt-5'}>
          <Form form={form} layout={'inline'} initialValues={{ remember: true }} autoComplete="off">
            <div className={'flex w-full justify-between'}>
              <div className={'flex'}>
                <Form.Item name="deadline" rules={[{ required: true, message: '请选择邀请码过期时间' }]}>
                  <DatePicker minDate={dayjs()} showTime needConfirm={true} />
                </Form.Item>
                <Form.Item name="maxInviteCount">
                  <InputNumber placeholder={'人数限制'} className={'w-full'} />
                </Form.Item>
              </div>
              <Form.Item shouldUpdate className={'!mr-0'}>
                {() => (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={onOk}
                    disabled={
                      !form.isFieldsTouched(true) ||
                      !!form.getFieldsError().filter(({ errors }) => errors.length).length
                    }
                  >
                    生成邀请链接
                  </Button>
                )}
              </Form.Item>
            </div>
          </Form>
          <div className={'pt-3'}>
            <h3 className={'mb-2 text-zinc-500'}>我生成的邀请码</h3>
            <Table<API.ProjectMyInviteItem>
              size={'small'}
              pagination={false}
              bordered
              dataSource={inviteList}
              columns={columns}
            />
          </div>
        </div>
      </Modal>
      <div className={'flex'} onClick={() => setOpen(true)}>
        {props.children}
      </div>
    </>
  );
};
