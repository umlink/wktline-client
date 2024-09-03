import { CloseOne } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { App, Tooltip } from 'antd';
const ContentCard = (props: { item: API.WorkLaborHourDetailItem; preIndex: number; subIndex: number }) => {
  const { modal } = App.useApp();
  const item = props.item;
  const { onShow: onShowTaskDetail } = useModel('taskDetail');
  const { delTaskLaborHourById } = useModel('LaborHour.model');

  const delItem = () => {
    modal.confirm({
      title: '温馨提示',
      content: '确认删除当前工时',
      onOk: () => {
        delTaskLaborHourById({
          id: item.id,
          taskId: item.taskId,
          date: item.date,
          preIndex: props.preIndex,
          subIndex: props.subIndex,
        });
      },
    });
  };
  return (
    <div
      className={'group/item relative mt-2 w-full space-y-2 rounded-md border border-zinc-100 p-2 text-left shadow-md'}
    >
      <h1
        className={'line-clamp-2 cursor-pointer text-zinc-600 hover:text-primary'}
        onClick={() => onShowTaskDetail(item.taskId)}
      >
        {item.taskName}
      </h1>
      <Tooltip placement={'bottom'} title={item.description}>
        <p className={'text-xs text-[color:#8a919f]'}>工作内容：{item.description}</p>
      </Tooltip>

      <p className={'flex items-end justify-between'}>
        <span className={'text-xs font-light text-zinc-400'}>实际工时</span>
        <span className={'text-xs text-primary'}>{item.hour}h</span>
      </p>
      <span
        onClick={delItem}
        className={
          'absolute -right-2 -top-4 hidden cursor-pointer rounded-full bg-white leading-none text-zinc-300 hover:text-primary group-hover/item:inline-flex'
        }
      >
        <CloseOne theme="outline" size="20" />
      </span>
    </div>
  );
};
export default ContentCard;
