import { useModel } from '@umijs/max';
import { DatePicker, Form, InputNumber, Modal } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
export default () => {
  const { updateTaskInfo, data } = useModel('taskDetail');
  const [form] = Form.useForm();
  const [showForecast, setSowForecast] = useState(false);
  const onFinish = () => {
    const [startTime, endTime] = form.getFieldValue('date');
    updateTaskInfo({
      startTime: startTime ? dayjs(startTime).format(dateFormat) : undefined,
      endTime: endTime ? dayjs(endTime).format(dateFormat) : undefined,
      planHour: form.getFieldValue('hour'),
    });
    setSowForecast(false);
  };

  useEffect(() => {
    if (data.task) {
      const { startTime = '', endTime = '', planHour } = data.task;
      const dateList = [];
      if (startTime) {
        dateList.push(dayjs(startTime));
      }
      if (endTime) {
        dateList.push(dayjs(endTime));
      }
      form.setFieldsValue({
        date: dateList,
        hour: planHour || undefined,
      });
    }
  }, [data.task, showForecast]);

  return (
    <>
      <span className={'cursor-pointer text-primary'} onClick={() => setSowForecast(true)}>
        计划工时录入
      </span>
      <Modal
        title="计划工时录入"
        width={450}
        forceRender
        destroyOnClose={true}
        open={showForecast}
        onOk={() => form.submit()}
        onCancel={() => setSowForecast(false)}
      >
        <div className={'mt-5 border-t border-t-zinc-100 pt-5'}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name={'date'}
              label={<span className={'text-zinc-500'}>计划工作时间段</span>}
              rules={[{ required: true, message: '' }]}
            >
              <RangePicker variant="filled" format={dateFormat} />
            </Form.Item>
            <Form.Item
              name={'hour'}
              label={<span className={'text-zinc-500'}>计划工时数</span>}
              className={'w-full'}
              rules={[{ required: true, message: '' }]}
            >
              <InputNumber
                precision={0}
                min={1}
                max={10000}
                className={'!w-full'}
                placeholder="请输入计划工时数（单位：小时）"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};
