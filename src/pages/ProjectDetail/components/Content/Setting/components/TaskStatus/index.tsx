import TaskStatusForm from '@/pages/ProjectDetail/components/Content/Setting/components/TaskStatus/StatusForm';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Delete, Editor } from '@icon-park/react';
import { App, Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import useService from './useService';

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = (props: RowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 999 } : {}),
  };

  return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};

const TaskStatusPage = () => {
  const { modal } = App.useApp();
  const { statusList, setStatusList, updateStatusSort, getTaskStatusList, delStatus } = useService();
  const [editData, setEditData] = useState<API.TaskStatusItem>();

  const onDelStatus = (id: string) => {
    modal.confirm({
      title: '警告',
      content: '删除后无法恢复（该状态下含有任务时无法删除）',
      onOk: () => delStatus(id),
    });
  };

  const columns: ColumnsType<API.TaskStatusItem> = [
    {
      title: '排序',
      dataIndex: 'user',
      key: 'user',
      width: 100,
      align: 'center',
      ellipsis: true,
      render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (_, record) => <span style={{ color: record.color }}>{record.name}</span>,
    },
    {
      title: (
        <span>
          枚举值
          <span className={'font-light text-zinc-400'}>（默认枚举值不可修改）</span>
        </span>
      ),
      dataIndex: 'enum',
      key: 'enum',
      render: (_, record) => <span>{record.enum}</span>,
    },
    {
      title: '颜色值',
      align: 'center',
      dataIndex: 'color',
      key: 'color',
      render: (_, record) => <span style={{ color: record.color }}>{record.color}</span>,
    },
    {
      title: '操作',
      width: 100,
      dataIndex: '',
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            shape="circle"
            type={'text'}
            title={'编辑'}
            onClick={() => {
              setEditData(record);
            }}
          >
            <Editor theme="outline" size="16" fill="#999" />
          </Button>
          <Button shape="circle" type={'text'} title={'删除'} onClick={() => onDelStatus(record.id)}>
            <Delete theme="outline" size="16" fill="#999" />
          </Button>
        </Space>
      ),
    },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setStatusList((prev) => {
        const activeIndex = prev.findIndex((i) => i.id === active.id);
        const overIndex = prev.findIndex((i) => i.id === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
      setTimeout(updateStatusSort);
    }
  };

  return (
    <div>
      <div className={'mb-4 flex items-center justify-between'}>
        <span className={'text-xs text-zinc-400'}>温馨提示: 可拖拽调整顺序</span>
        <TaskStatusForm callback={getTaskStatusList}>
          <Button type={'primary'}>添加</Button>
        </TaskStatusForm>
      </div>
      <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext items={statusList.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <Table<API.TaskStatusItem>
            components={{
              body: {
                row: Row,
              },
            }}
            bordered
            size={'small'}
            sticky={{ offsetHeader: 0 }}
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            dataSource={statusList || []}
          />
        </SortableContext>
      </DndContext>
      <TaskStatusForm
        open={!!editData}
        status={editData}
        onClose={() => setEditData(undefined)}
        callback={() => {
          setEditData(undefined);
          getTaskStatusList();
        }}
      />
    </div>
  );
};

export default TaskStatusPage;
