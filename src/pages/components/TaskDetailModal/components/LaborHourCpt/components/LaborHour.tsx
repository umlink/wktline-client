import { useModel } from '@umijs/max';
import { DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
const { TextArea } = Input;

type DataPropsType = {
  laborHourItem?: API.TaskLaborHourItem;
  setEditLaborData: (v: undefined) => void;
};

type FormProps = {
  description: string;
  hour: number;
  date: Dayjs;
};

export default (props: DataPropsType) => {
  const { data, addTaskLaborHour, updateTaskLaborHour } = useModel('taskDetail');
  const [form] = Form.useForm();
  const [showActual, setShowActual] = useState(false);

  const onCancel = () => {
    setShowActual(false);
    form.resetFields();
    props.setEditLaborData(undefined);
  };
  const onFinish = (d: FormProps) => {
    let params: any = {
      taskId: data.taskId!,
      projectId: data.projectId!,
      description: d.description,
      hour: d.hour,
      date: d.date.format('YYYY-MM-DD'),
    };
    if (props.laborHourItem) {
      params.id = props.laborHourItem!.id;
      updateTaskLaborHour(params, onCancel);
    } else {
      addTaskLaborHour(params, onCancel);
    }
  };

  useEffect(() => {
    if (props.laborHourItem) {
      form.setFieldsValue({
        ...props.laborHourItem,
        date: dayjs(props.laborHourItem.date),
      });
      setShowActual(true);
    }
  }, [props.laborHourItem]);

  return (
    <>
      <span className={'cursor-pointer text-primary'} onClick={() => setShowActual(true)}>
        实际工时录入
      </span>
      <Modal
        width={420}
        forceRender
        title={'实际工时录入' + (props.laborHourItem ? '（编辑）' : '')}
        destroyOnClose={true}
        open={showActual}
        onOk={() => form.submit()}
        onCancel={onCancel}
      >
        <div className={'pt-5'}>
          <Form initialValues={{ date: dayjs() }} onFinish={onFinish} form={form} layout="vertical">
            <Form.Item name={'date'} label={'日期'} rules={[{ required: true, message: '请选择工作日期' }]}>
              <DatePicker placeholder={'请选择工作日期'} className={'w-full'} />
            </Form.Item>
            <Form.Item
              name={'hour'}
              label={<span className={'text-zinc-500'}>实际工作时长</span>}
              tooltip={'工时只支持整数'}
              rules={[{ required: true, message: '' }]}
            >
              <InputNumber
                precision={0}
                min={1}
                max={10000}
                className={'!w-full'}
                placeholder="请输入实际工作时间（单位：小时）"
              />
            </Form.Item>
            <Form.Item
              name={'description'}
              label={<span className={'text-zinc-500'}>工作内容</span>}
              rules={[{ required: true, message: '工作内容不能为空' }]}
            >
              <TextArea
                showCount
                maxLength={500}
                style={{ height: 120, marginBottom: 24 }}
                placeholder="请补充工作内容"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
