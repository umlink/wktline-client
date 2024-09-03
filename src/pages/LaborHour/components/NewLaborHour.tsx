import Api from '@/api/modules';
import { EVENTS } from '@/constants';
import TaskSelect from '@/pages/components/TaskSelect';
import EventBus from '@/utils/event-bus';
import { useModel } from '@umijs/max';
import { useMemoizedFn, useSetState, useUpdateEffect } from 'ahooks';
import { DatePicker, Form, Input, InputNumber, Modal } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';

type DateType = {
  open: boolean;
  index: number;
  date: string;
  currentTask?: API.TaskDetailItem;
};

type FormProps = {
  description: string;
  hour: number;
  date: Dayjs;
};

const { TextArea } = Input;

const NewLaborHour = () => {
  const [data, setData] = useSetState<DateType>({
    open: false,
    index: 0, // 所在行
    date: '',
  });
  const { updateRowData } = useModel('LaborHour.model');
  const [form] = Form.useForm();
  const hideModal = () => setData({ open: false });

  const onFinish = useMemoizedFn((d: FormProps) => {
    let params: Required<API.AddTaskLaborHourReq> = {
      projectId: data.currentTask!.projectId,
      taskId: data.currentTask!.id,
      description: d.description,
      hour: d.hour,
      date: d.date.format('YYYY-MM-DD'),
    };
    Api.TaskLaborHour.addLaborHour(params).then((res) => {
      if (res.success) {
        updateRowData({
          index: data.index,
          hour: +params.hour,
          date: data.date,
        });
        hideModal();
      }
    });
  });

  useUpdateEffect(() => {
    if (!data.open) {
      setData({ currentTask: undefined });
      form.resetFields();
    }
  }, [data.open]);

  useEffect(() => {
    EventBus.on(EVENTS.SHOW_NEW_TASK_LABOR_HOUR_MODAL, (p: any) => {
      setData({
        open: true,
        index: p.index,
        date: p.date,
      });
      form.setFieldValue('date', dayjs(p.date));
    });
    return () => {
      EventBus.off(EVENTS.SHOW_NEW_TASK_LABOR_HOUR_MODAL);
    };
  }, []);

  return (
    <Modal
      title={'添加实际工时'}
      width={420}
      open={data.open}
      onOk={() => form.submit()}
      onCancel={hideModal}
      okText="提交"
      cancelText="取消"
    >
      <div className={'space-y-4 py-5'}>
        <Form initialValues={{ date: dayjs(data.date) }} onFinish={onFinish} form={form} layout="vertical">
          <Form.Item name={'date'} label={'日期'} rules={[{ required: true, message: '请选择工作日期' }]}>
            <DatePicker disabled placeholder={'请选择工作日期'} className={'w-full'} />
          </Form.Item>
          <TaskSelect
            mount
            onChange={(task) => {
              setData({ currentTask: task });
              form.setFieldValue('taskName', task.name);
            }}
          >
            <Form.Item
              label={'选择我执行的任务'}
              name={'taskName'}
              rules={[{ required: true, message: '请选择选择我执行的任务' }]}
            >
              <Input readOnly placeholder={'根据任务名称进行搜索'} />
            </Form.Item>
          </TaskSelect>
          <Form.Item name={'hour'} label="实际工作时长" rules={[{ required: true, message: '' }]}>
            <InputNumber
              min={1}
              max={24}
              stringMode={true}
              className={'!w-full'}
              placeholder="请输入实际工作时间（单位：小时）"
            />
          </Form.Item>
          <Form.Item
            name={'description'}
            label={'工作内容(进度)'}
            rules={[{ required: true, message: '工作内容不能为空' }]}
          >
            <TextArea showCount maxLength={500} autoSize={{ minRows: 2, maxRows: 6 }} placeholder="请补充工作内容" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
export default NewLaborHour;
