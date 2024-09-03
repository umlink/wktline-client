declare namespace API {
  type AddProjectUserByIdsReq = {
    /** 项目 id */
    projectId: string;
    /** 用户id列表 */
    userIds: string[];
  };

  type AddProjectUserByIdsRes = {};

  type AddTaskActorReq = {
    /** 项目 id */
    projectId: string;
    /** 任务 id */
    taskId: string;
    /** 用户id列表 */
    userIds: string[];
  };

  type AddTaskActorRes = {};

  type AddTaskAttachmentReq = {
    /** 项目id */
    projectId: string;
    /** 任务 id */
    taskId: string;
    /** 类型 */
    resourceId: string;
  };

  type AddTaskAttachmentRes = {
    /** 任务类型 id */
    id: string;
  };

  type AddTaskLaborHourReq = {
    /** 项目id */
    projectId: string;
    /** 任务id */
    taskId: string;
    /** 日期 */
    date?: string;
    /** 计划工时（小时） */
    hour?: number;
    /** 工作内容说明 */
    description?: string;
  };

  type AddTaskLaborHourRes = {};

  type AddTaskPriorityReq = {
    /** 任务优先级 */
    id: string;
    /** 名称 */
    name: string;
    /** 优先级颜色 */
    color: string;
  };

  type AddTaskPriorityRes = {};

  type AddTestCaseActorsReq = {
    /** 用例 id */
    Id: string;
    /** 项目id */
    projectId: string;
    /** 参与人id列表 */
    actorIds: string[];
  };

  type AddTestCaseActorsRes = {};

  type AddTestCaseLockReq = {
    /** 用例 id */
    Id: string;
  };

  type AddTestCaseLockRes = {};

  type AddWorkPanelUserReq = {
    /** 用户id列表 */
    userIds: string[];
  };

  type AddWorkPanelUserRes = {};

  type AuthReq = {
    /** 授权 code */
    code: string;
  };

  type AuthRes = {
    /** 用户id */
    id: string;
    /** 用户名 */
    username: string;
    /** 用户昵称、别名 */
    nickname: string;
    /** 头像 */
    avatar: string;
    /** 角色id */
    role: string;
    /** 状态 */
    status: number;
    /** token */
    token: string;
    /** token */
    expire: string;
  };

  type CreateMessageReq = {
    /** 消息标题 */
    title: string;
    /** 消息内容 */
    content: string;
    /** 消息类型 */
    type: string;
    /** 项目id */
    projectId?: string;
    /** 任务id */
    taskId?: string;
    /** 接收者 id */
    receiverId: string;
    /** 发送者 id */
    senderId: string;
  };

  type CreateMessageRes = {};

  type CreateProjectGroupReq = {
    /** 项目名 */
    name: string;
    /** 项目描述 */
    description?: string;
  };

  type CreateProjectGroupRes = {
    /** 项目 id */
    id: string;
  };

  type CreateProjectReq = {
    /** 项目名 */
    name: string;
    /** 项目描述 */
    description?: string;
    /** 项目头图 */
    headerImg?: string;
    /** 项目分组id */
    groupId: string;
    /** 项目类型 PRIVATE: 私有  PUBLIC：公开 */
    showType?: string;
  };

  type CreateProjectRes = {
    /** 项目 id */
    id: string;
  };

  type CreateTaskGroupReq = {
    /** 项目id */
    projectId: string;
    /** 分组名 */
    groupName: string;
    /** 描述 */
    description?: string;
  };

  type CreateTaskGroupRes = {
    /** 分组 id */
    id: string;
  };

  type CreateTaskOperationLogReq = {
    /** 日志id */
    taskId: string;
    /** 日志名/标题 */
    name: string;
    /** 日志名/标题 */
    type:
      | 'ATTACHMENT'
      | 'COMMENT'
      | 'DYNAMIC_ADD_ACTOR'
      | 'DYNAMIC_TASK_CREATE'
      | 'DYNAMIC_TASK_DESCRIPTION'
      | 'DYNAMIC_TASK_GROUP'
      | 'DYNAMIC_TASK_HANDLER'
      | 'DYNAMIC_TASK_LABOR_TIME'
      | 'DYNAMIC_TASK_NAME'
      | 'DYNAMIC_TASK_PRIORITY'
      | 'DYNAMIC_TASK_STATUS'
      | 'DYNAMIC_TASK_TIME'
      | 'DYNAMIC_TASK_TYPE';
    /** 日志内容 */
    content?: string;
    /** 备注 */
    desc?: string;
  };

  type CreateTaskOperationLogRes = {
    /** 任务类型 id */
    id: number;
  };

  type CreateTaskReq = {
    /** 名称 */
    name: string;
    /** 项目id */
    projectId: string;
    /** 类型id */
    typeId: string;
    /** 状态id */
    statusId: string;
    /** 描述 */
    description?: string;
    /** 父任务id */
    parentId?: string;
    /** 处理者 */
    handlerId?: string;
    /** 分组id */
    groupId?: string;
    /** 优先级id */
    priorityId?: string;
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    /** 计划工时(小时) */
    planHour?: number;
    /** 实际使用工时(小时) */
    laborHour?: number;
  };

  type CreateTaskRes = {
    /** 任务id */
    id: string;
  };

  type CreateTaskStatusReq = {
    /** 项目id */
    projectId: string;
    /** 状态 */
    name: string;
    /** 状态颜色 */
    color: string;
    /** 枚举 */
    enum: string;
  };

  type CreateTaskStatusRes = {
    /** 任务状态 id */
    id: string;
  };

  type CreateTaskTypeReq = {
    /** 项目id */
    projectId: string;
    /** 类型 */
    name: string;
    /** 类型颜色 */
    color: string;
  };

  type CreateTaskTypeRes = {
    /** 任务类型 id */
    id: string;
  };

  type CreateTestCaseReq = {
    /** 项目id */
    projectId: string;
    /** 测试用例名 */
    name: string;
    /** 关于测试用例的描述 */
    description: string;
  };

  type CreateTestCaseRes = {};

  type CreateUserReq = {
    /** 用户名 */
    username: string;
    /** 用户昵称、别名 */
    nickname: string;
    /** 手机号 */
    phone: number;
    /** 邮箱 */
    email: string;
    /** 头像 */
    avatar: string;
    /** 角色 */
    role: string;
    /** 状态 */
    status?: number;
  };

  type CreateUserRes = {};

  type DelInviteCodeReq = {
    /** 邀请码 */
    code: string;
  };

  type DelInviteCodeRes = {};

  type DelProjectGroupReq = {
    /** 项目 id */
    id: string;
  };

  type DelProjectGroupRes = {};

  type DelProjectReq = {
    /** 项目 id */
    projectId: string;
  };

  type DelProjectRes = {};

  type DelProjectUserByIdsReq = {
    /** 项目 id */
    projectId: string;
    /** 用户id列表 */
    userIds: string[];
  };

  type DelProjectUserByIdsRes = {};

  type DelTaskActorReq = {
    /** 项目 id */
    projectId: string;
    /** 任务 id */
    taskId: string;
    /** 用户ids */
    userIds: string[];
  };

  type DelTaskActorRes = {};

  type DelTaskAttachmentReq = {
    /** 项目id */
    projectId: string;
    /** 附件id */
    id: string;
  };

  type DelTaskAttachmentRes = {};

  type DelTaskGroupReq = {
    /** 任务分组 id id */
    id: string;
    /** 项目id */
    projectId: string;
  };

  type DelTaskGroupRes = {};

  type DelTaskLaborHourReq = {
    /** 工时记录的id */
    id: string;
    /** 项目id */
    projectId: string;
    /** 任务id */
    taskId: string;
  };

  type DelTaskLaborHourRes = {};

  type DelTaskOperationLogReq = {
    /** 任务类型 id id */
    id: string;
  };

  type DelTaskOperationLogRes = {};

  type DelTaskPriorityReq = {
    /** 优先级id */
    id: string;
  };

  type DelTaskPriorityRes = {};

  type DelTaskReq = {
    /** 任务id */
    id: string;
    /** 项目id */
    projectId: string;
  };

  type DelTaskRes = {};

  type DelTaskStatusReq = {
    /** 任务状态 id */
    id: string;
    /** 项目 id */
    projectId: string;
  };

  type DelTaskStatusRes = {};

  type DelTaskTypeReq = {
    /** 任务类型 id id */
    id: string;
    /** 项目id */
    projectId: string;
  };

  type DelTaskTypeRes = {};

  type DelTestCaseActorsReq = {
    /** 用例 id */
    Id: string;
    /** 项目id */
    projectId: string;
    /** 参与人id列表 */
    actorIds: string[];
  };

  type DelTestCaseActorsRes = {};

  type DelTestCaseLockReq = {
    /** 用例 id */
    Id: string;
  };

  type DelTestCaseLockRes = {};

  type DelTestCaseReq = {
    /** 用例 id */
    Id: string;
    /** 项目id */
    projectId: string;
  };

  type DelTestCaseRes = {};

  type DelUserByIdReq = {
    /** 用户 id */
    id: string;
  };

  type DelUserByIdRes = {};

  type DelWorkPanelUserReq = {
    /** 用户id列表 */
    userIds: string[];
  };

  type DelWorkPanelUserRes = {};

  type GenProjectInviteCodeReq = {
    /** 项目id */
    projectId: string;
    /** 链接生效截止时间 */
    deadline?: string;
    /** 最大可邀请人数 */
    maxInviteCount?: number;
  };

  type GenProjectInviteCodeRes = {
    /** 邀请码 */
    code: string;
  };

  type getCaseDetailParams = {
    /** 用例 id */
    id: string;
    /** 项目id */
    projectId: string;
  };

  type getChildTaskListParams = {
    /** 任务id */
    parentId: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大100 */
    pageSize?: number;
  };

  type GetChildTaskListReq = {
    /** 任务id */
    parentId: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大100 */
    pageSize?: number;
  };

  type GetChildTaskListRes = {
    /** 任务列表 */
    list: TaskDetailItem[];
    /** 总数 */
    total: number;
    /** 页码 */
    pageNo: number;
    /** 每页大小 */
    pageSize: number;
  };

  type getIntervalTaskListParams = {
    /** 开始时间 */
    startTime: string;
    /** 结束时间 */
    endTime: string;
  };

  type getInviteInfoParams = {
    /** 邀请码 */
    code: string;
  };

  type GetMessageDetailReq = {
    /** 消息id */
    id: string;
  };

  type GetMessageDetailRes = {
    /** 消息id */
    id: string;
    /** 消息标题 */
    title: string;
    /** 消息内容 */
    content: string;
    /** 任务id */
    taskId?: string;
    /** 任务标题 */
    taskName: string;
    /** 内容格式类型 */
    contentType: string;
    /** 消息类型 */
    msgType: string;
    /** 项目id */
    projectId?: string;
    /** 接收者 id */
    receiverId: string;
    /** 接收者名 */
    receiverName: string;
    /** 接收者头像 */
    receiverAvatar: string;
    /** 发送者 id */
    senderId: string;
    /** 发送者名 */
    senderName: string;
    /** 发送者头像 */
    senderAvatar: string;
    /** 消息创建时间 */
    createdAt: string;
  };

  type GetMessageListReq = {
    /** 消息类型 */
    type?: string;
    /** 已读未读 1｜0 */
    status?: string;
    /** 项目id */
    projectId?: string;
    /** 页码 */
    pageNo?: number;
    /** 页码大小 */
    pageSize?: number;
  };

  type GetMessageListRes = {
    /** 消息列表 */
    list: MessageItem[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type GetMessageUnReadCountReq = {};

  type GetMessageUnReadCountRes = {
    /** 消息未读数 */
    count: number;
  };

  type getMsgListParams = {
    /** 消息类型 */
    type?: string;
    /** 已读未读 1｜0 */
    status?: string;
    /** 项目id */
    projectId?: string;
    /** 页码 */
    pageNo?: number;
    /** 页码大小 */
    pageSize?: number;
  };

  type getProjectGroupListParams = {
    /** 项目分组名称-支持模糊搜索 */
    keywords?: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetProjectGroupListReq = {
    /** 项目分组名称-支持模糊搜索 */
    keywords?: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetProjectGroupListRes = {
    /** 项目分组列表 */
    list: ProjectGroupItem[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type getProjectInfoParams = {
    /** 项目 id */
    id: string;
  };

  type GetProjectInfoReq = {
    /** 项目 id */
    id: string;
  };

  type GetProjectInfoRes = {
    /** 项目id */
    id: string;
    /** 项目名 */
    name: string;
    /** 项目描述 */
    description: string;
    /** 项目头图 */
    headerImg: string;
    /** 操作者id */
    operatorId: string;
    /** 操作者name */
    operatorName: string;
    /** 项目负责人id */
    ownerId: string;
    /** 项目负责人name */
    ownerName: string;
    /** 项目负责人avatar */
    ownerAvatar: string;
    /** 项目分组id */
    groupId: string;
    /** 项目分组name */
    groupName: string;
    /** 项目类型 PRIVATE: 私有  PUBLIC：公开 */
    showType: string;
    /** 项目状态 1. 正常 2：回收站 3：已删除 */
    status: number;
    /** 是否加入项目 */
    isJoined: boolean;
    /** 是否可编辑 */
    canEdit: boolean;
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
  };

  type GetProjectInviteInfoReq = {
    /** 邀请码 */
    code: string;
  };

  type GetProjectInviteInfoRes = {
    /** 邀请码 */
    code: string;
    /** 项目id */
    projectId: string;
    /** 项目名 */
    projectName: string;
    /** 发起邀请的用户id */
    inviterId: string;
    /** 发起邀请的用户名 */
    inviterName: string;
    /** 发起邀请的用户头像 */
    inviterAvatar: string;
    /** 已通过链接加入的人数 */
    joinedCount: number;
    /** 链接生效截止时间 */
    deadline?: string;
    /** 最大可邀请人数 */
    maxInviteCount?: number;
    /** 是否已加入 */
    joined?: boolean;
  };

  type GetProjectListReq = {
    /** 项目名-支持模糊搜索 */
    keywords?: string;
    /** 我负责的 */
    isOwner?: boolean;
    /** 我创建的 */
    isCreator?: boolean;
    /** 是否加入项目 */
    isJoined?: boolean;
    /** 项目分组id */
    groupId?: string;
    /** 显示类型-只有系统管理员和我的全部（全部包含已加入的私有项目)） */
    showType?: string;
    /** 项目状态 1. 正常 2：回收站 3：已删除 */
    status?: number;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大100 */
    pageSize?: number;
  };

  type GetProjectListRes = {
    /** 项目列表 */
    list: ProjectInfoItem[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type GetProjectMyInviteListReq = {
    /** 项目 id */
    projectId: string;
  };

  type GetProjectMyInviteListRes = {};

  type GetProjectStatisticsReq = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type GetProjectStatisticsRes = {
    /** 任务数量 */
    taskCount: number;
    /** 任务数量 */
    userCount: number;
    /** 任务分组数 */
    groupCount: number;
    /** 超时完成任务数 */
    overTimeDoneCount: number;
    /** 超时未完成任务数 */
    overTimeNoDoneCount: number;
    /** 实际总工时（h） */
    laborHour: number;
    /** 计划总工时（h） */
    planHour: number;
  };

  type GetProjectTaskStatusStatReq = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 用户 id */
    userId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type GetProjectTaskStatusStatRes = {};

  type GetProjectTaskTypeStatReq = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 用户 id */
    userId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type GetProjectTaskTypeStatRes = {};

  type GetProjectUserLaborHourReq = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 用户 id */
    userId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type GetProjectUserLaborHourRes = {};

  type getProjectUserParams = {
    /** 项目 id */
    projectId: string;
    /** 用户名，支持模糊搜索 */
    keywords?: string;
    /** 用户权限类型 */
    role?: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetProjectUserReq = {
    /** 项目 id */
    projectId: string;
    /** 用户名，支持模糊搜索 */
    keywords?: string;
    /** 用户权限类型 */
    role?: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetProjectUserRes = {
    /** 项目用户列表 */
    list: ProjectUserItem[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type GetProjectUserTaskCountReq = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 用户 id */
    userId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type GetProjectUserTaskCountRes = {};

  type GetProjectUserTaskStatusStatisticsReq = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 用户 id */
    userId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type GetProjectUserTaskStatusStatisticsRes = {};

  type GetProjectUserTaskTypeStatisticsReq = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 用户 id */
    userId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type GetProjectUserTaskTypeStatisticsRes = {};

  type getStatisticsParams = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type getTaskActorParams = {
    /** 项目 id */
    taskId: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskActorReq = {
    /** 项目 id */
    taskId: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskActorRes = {
    /** 项目用户列表 */
    list: TaskActorItem[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type getTaskAttachmentListParams = {
    /** 项目id */
    projectId?: string;
    /** 任务 id */
    taskId?: string;
    /** 创建用户 id */
    creatorId?: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskAttachmentListReq = {
    /** 项目id */
    projectId?: string;
    /** 任务 id */
    taskId?: string;
    /** 创建用户 id */
    creatorId?: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskAttachmentListRes = {
    /** 任务附件列表 */
    list: TaskAttachmentItem[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type getTaskDetailParams = {
    /** 任务id */
    id: string;
  };

  type GetTaskDetailReq = {
    /** 任务id */
    id: string;
  };

  type GetTaskDetailRes = {
    /** 任务id */
    id: string;
    /** 任务名称 */
    name: string;
    /** 任务描述 */
    description: string;
    /** 项目id */
    projectId: string;
    /** 父任务id */
    parentId: string;
    /** 任务处理者 */
    handlerId: string;
    /** 任务状态id */
    statusId: string;
    /** 分组id */
    groupId: string;
    /** 任务类型id */
    typeId: string;
    /** 优先级 */
    priority: string;
    /** 创建者id */
    creatorId: string;
    /** 任务开始时间 */
    startTime: string;
    /** 任务结束时间 */
    endTime: string;
    /** 计划工时(小时) */
    planHour: number;
    /** 实际使用工时(小时) */
    laborHour: number;
    /** 子任务个数 */
    childrenNum: number;
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
    /** 状态名 */
    statusName: string;
    /** 状态枚举 */
    statusEnum: string;
    /** 状态颜色 */
    statusColor: string;
    /** 任务类型 */
    typeName: string;
    /** 任务类型颜色 */
    typeColor: string;
    /** 任务分组 */
    groupName: string;
    /** 任务创建者名称 */
    creatorName: string;
    /** 任务创建者头像 */
    creatorAvatar: string;
    /** 任务执行者名称 */
    handlerName: string;
    /** 任务执行者头像 */
    handlerAvatar: string;
  };

  type getTaskGroupListParams = {
    /** 任务分组名称-支持模糊搜索 */
    keywords?: string;
    /** 项目id */
    projectId: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskGroupListReq = {
    /** 任务分组名称-支持模糊搜索 */
    keywords?: string;
    /** 项目id */
    projectId: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskGroupListRes = {
    /** 任务分组列表 */
    list: TaskGroupItem[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type GetTaskLaborHourReq = {
    /** 任务id */
    taskId: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大100 */
    pageSize?: number;
  };

  type GetTaskLaborHourRes = {
    /** 工时列表 */
    list: TaskLaborHourItem[];
    /** 总数 */
    total: number;
    /** 当前页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
  };

  type GetTaskListByIntervalReq = {
    /** 开始时间 */
    startTime: string;
    /** 结束时间 */
    endTime: string;
  };

  type GetTaskListByIntervalRes = {};

  type GetTaskListReq = {
    /** 任务名称(支持模糊查询) */
    keywords?: string;
    /** 项目id */
    projectId?: string;
    /** 父任务id */
    parentId?: string;
    /** 任务处理者id */
    handlerId?: string;
    /** 任务创建者id */
    creatorId?: string;
    /** 参与者用户id */
    actorId?: string;
    /** 任务状态id */
    statusId?: string;
    /** 分组id */
    groupId?: string;
    /** 任务类型id */
    typeId?: string;
    /** 任务优先级id */
    priority?: string;
    sortMode?: SortMode;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大100 */
    pageSize?: number;
  };

  type GetTaskListRes = {
    /** 任务列表 */
    list: TaskDetailItem[];
    /** 总数 */
    total: number;
    /** 页码 */
    pageNo: number;
    /** 每页大小 */
    pageSize: number;
  };

  type getTaskOperationLogListParams = {
    /** 任务id */
    taskId: string;
    /** 日志类型 */
    type?:
      | 'ATTACHMENT'
      | 'COMMENT'
      | 'DYNAMIC_ADD_ACTOR'
      | 'DYNAMIC_TASK_CREATE'
      | 'DYNAMIC_TASK_DESCRIPTION'
      | 'DYNAMIC_TASK_GROUP'
      | 'DYNAMIC_TASK_HANDLER'
      | 'DYNAMIC_TASK_LABOR_TIME'
      | 'DYNAMIC_TASK_NAME'
      | 'DYNAMIC_TASK_PRIORITY'
      | 'DYNAMIC_TASK_STATUS'
      | 'DYNAMIC_TASK_TIME'
      | 'DYNAMIC_TASK_TYPE';
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskOperationLogListReq = {
    /** 任务id */
    taskId: string;
    /** 日志类型 */
    type?:
      | 'ATTACHMENT'
      | 'COMMENT'
      | 'DYNAMIC_ADD_ACTOR'
      | 'DYNAMIC_TASK_CREATE'
      | 'DYNAMIC_TASK_DESCRIPTION'
      | 'DYNAMIC_TASK_GROUP'
      | 'DYNAMIC_TASK_HANDLER'
      | 'DYNAMIC_TASK_LABOR_TIME'
      | 'DYNAMIC_TASK_NAME'
      | 'DYNAMIC_TASK_PRIORITY'
      | 'DYNAMIC_TASK_STATUS'
      | 'DYNAMIC_TASK_TIME'
      | 'DYNAMIC_TASK_TYPE';
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskOperationLogListRes = {
    /** 任务操作日志列表 */
    list: TaskOperationLogItem[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type getTaskPriorityListParams = {
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskPriorityListReq = {
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskPriorityListRes = {
    /** 任务优先级列表 */
    list: TaskPriorityItem[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type getTaskStatusListParams = {
    /** 任务状态名称-支持模糊搜索 */
    keywords?: string;
    /** 项目id */
    projectId: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskStatusListReq = {
    /** 任务状态名称-支持模糊搜索 */
    keywords?: string;
    /** 项目id */
    projectId: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskStatusListRes = {
    /** 任务状态列表 */
    list: TaskStatusItem[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type getTaskStatusStatParams = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 用户 id */
    userId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type getTaskTypeListParams = {
    /** 任务类型名称-支持模糊搜索 */
    keywords?: string;
    /** 项目id */
    projectId: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskTypeListReq = {
    /** 任务类型名称-支持模糊搜索 */
    keywords?: string;
    /** 项目id */
    projectId: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTaskTypeListRes = {
    /** 任务类型列表 */
    list: TaskTypeItem[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type getTaskTypeStatParams = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 用户 id */
    userId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type GetTestCaseListReq = {
    /** 项目id */
    projectId: string;
    /** 创建人id */
    creatorId?: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大1000 */
    pageSize?: number;
  };

  type GetTestCaseListRes = {
    /** 用例 */
    list: TestCaseItem[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type GetTestCaseReq = {
    /** 用例 id */
    id: string;
    /** 项目id */
    projectId: string;
  };

  type GetTestCaseRes = {
    /** 用例id */
    id: string;
    /** 用例名 */
    name: string;
    /** 描述说明 */
    description: string;
    /** 数据 */
    value: string;
    /** 进度(草稿: DRAFT 发布:PUBLISHED 测试中:TESTING 测试完成:DONE) */
    progress: number;
    /** 状态 */
    status: string;
    /** 创建人id */
    creatorId: string;
    /** 创建人名称 */
    creatorName: string;
    /** 创建人头像 */
    creatorAvatar: string;
    /** 参与人 */
    actorIds: string[];
    /** 正在编辑的用户（lock） */
    editorId: string;
    /** 编辑人名称 */
    editorName: string;
    /** 编辑人头像 */
    editorAvatar: string;
  };

  type getUserInfoByIdParams = {
    /** 用户 id */
    Id: string;
  };

  type GetUserInfoByIdReq = {
    /** 用户 id */
    Id: string;
  };

  type GetUserInfoByIdRes = {
    /** 用户id */
    id: string;
    /** 用户名 */
    username: string;
    /** 用户昵称、别名 */
    nickname: string;
    /** 头像 */
    avatar: string;
    /** 角色 */
    role: string;
    /** 状态 */
    status: number;
  };

  type GetUserInfoReq = {};

  type GetUserInfoRes = {
    /** 用户id */
    id: string;
    /** 用户名 */
    username: string;
    /** 用户昵称、别名 */
    nickname: string;
    /** 头像 */
    avatar: string;
    /** 角色 */
    role: string;
    /** 状态 */
    status: number;
  };

  type getUserLaborHourStatParams = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 用户 id */
    userId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type getUserListParams = {
    /** 用户名/用户昵称 */
    keywords?: string;
    /** 角色 */
    role?: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大100 */
    pageSize?: number;
  };

  type GetUserListReq = {
    /** 用户名/用户昵称 */
    keywords?: string;
    /** 角色 */
    role?: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大100 */
    pageSize?: number;
  };

  type GetUserListRes = {
    /** 用户列表 */
    list: UserBaseInfo[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type getUserTaskCountStatParams = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 用户 id */
    userId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type getUserTaskStatusStatParams = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 用户 id */
    userId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type getUserTaskTypeStatParams = {
    /** 项目id */
    projectId: string;
    /** 分组id */
    groupId?: string;
    /** 用户 id */
    userId?: string;
    /** 任务创建-开始时间 */
    startTime?: string;
    /** 任务创建-结束时间 */
    endTime?: string;
  };

  type GetWorkLaborHourByUserIdReq = {
    /** 任务开始时间 */
    startTime?: string;
    /** 任务结束时间 */
    endTime?: string;
    userId: string;
  };

  type GetWorkLaborHourByUserIdRes = {};

  type GetWorkLaborHourLogsReq = {
    /** 任务开始时间 */
    startTime?: string;
    /** 任务结束时间 */
    endTime?: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大100 */
    pageSize?: number;
  };

  type GetWorkLaborHourLogsRes = {
    /** 数据列表 */
    list: WorkLaborHourLogItem[];
    /** 总数 */
    total: number;
    /** 当前页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
  };

  type GetWorkPanelUserListReq = {
    /** 用户名/用户昵称 */
    keywords?: string;
    /** 分页号码，默认1 */
    pageNo?: number;
    /** 分页数量，最大100 */
    pageSize?: number;
  };

  type GetWorkPanelUserListRes = {
    /** 用户列表 */
    list: WorkPanelUserItem[];
    /** 页码 */
    pageNo: number;
    /** 页码大小 */
    pageSize: number;
    /** 总数 */
    total: number;
  };

  type InJoinInviteProjectReq = {
    /** 邀请码 */
    code: string;
  };

  type InJoinInviteProjectRes = {};

  type interface = {};

  type LoginReq = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type LoginRes = {
    /** 用户id */
    id: number;
    /** 用户名 */
    username: string;
    /** 用户昵称、别名 */
    nickname: string;
    /** 头像 */
    avatar: string;
    /** 角色id */
    role: string;
    /** 状态 */
    status: number;
    /** token */
    token: string;
    /** token */
    expire: string;
  };

  type MessageItem = {
    /** 消息id */
    id: string;
    /** 消息标题 */
    title: string;
    /** 内容 */
    content: string;
    /** 任务 id */
    taskId: string;
    /** 任务标题 */
    taskName: string;
    /** 已读未读 1｜0 */
    status: number;
    /** 消息类型 */
    msgType: string;
    /** 发送者 id */
    senderId: string;
    /** 发送者名 */
    senderName: string;
    /** 发送者头像 */
    senderAvatar: string;
    /** 消息创建时间 */
    createdAt: string;
  };

  type ProjectGroupItem = {
    /** 项目id */
    id: string;
    /** 项目名 */
    name: string;
    /** 项目描述 */
    description: string;
  };

  type ProjectInfoItem = {
    /** 项目id */
    id: string;
    /** 项目名 */
    name: string;
    /** 项目描述 */
    description: string;
    /** 项目头图 */
    headerImg: string;
    /** 项目负责人id */
    ownerId: string;
    /** 项目负责人name */
    ownerName: string;
    /** 项目负责人头像 */
    ownerAvatar: string;
    /** 项目分组id */
    groupId: string;
    /** 项目分组name */
    groupName: string;
    /** 项目类型 PRIVATE: 私有  PUBLIC：公开 */
    showType: string;
  };

  type ProjectMyInviteItem = {
    /** 邀请码 */
    code: string;
    /** 已通过链接加入的人数 */
    joinedCount: number;
    /** 链接生效截止时间 */
    deadline?: string;
    /** 最大可邀请人数 */
    maxInviteCount?: number;
  };

  type ProjectTaskStatusStatItem = {
    /** 状态id */
    statusId: string;
    /** 状态名称 */
    statusName: string;
    /** 任务数量 */
    taskCount: number;
  };

  type ProjectTaskTypeStatItem = {
    /** 类型id */
    typeId: string;
    /** 类型名称 */
    typeName: string;
    /** 任务数量 */
    taskCount: number;
  };

  type ProjectUserItem = {
    /** id */
    id: string;
    /** 用户id */
    userId: string;
    /** 用户名 */
    username: string;
    /** 用户昵称、别名 */
    nickname: string;
    /** 邮箱 */
    email: string;
    /** 头像 */
    avatar: string;
    /** 用户角色 */
    role: string;
  };

  type ProjectUserLaborHourStatItem = {
    /** 用户 id */
    userId: string;
    /** 用户名 */
    userName: string;
    /** 用户头像 */
    userAvatar: string;
    /** 任务工时 */
    工时: number;
  };

  type ProjectUserTaskCountItem = {
    /** 用户 id */
    userId: string;
    /** 用户名 */
    userName: string;
    /** 用户头像 */
    userAvatar: string;
    /** 任务数量 */
    任务数: number;
  };

  type ProjectUserTaskStatusStatisticsItem = {
    /** 用户 id */
    userId: string;
    /** 用户名 */
    userName: string;
    /** 用户头像 */
    userAvatar: string;
    /** 状态id */
    statusId: string;
    /** 状态名称 */
    statusName: string;
    /** 任务数量 */
    taskCount: number;
  };

  type ProjectUserTaskTypeStatisticsItem = {
    /** 用户 id */
    userId: string;
    /** 用户名 */
    userName: string;
    /** 用户头像 */
    userAvatar: string;
    /** 类型id */
    typeId: string;
    /** 类型名称 */
    typeName: string;
    /** 任务数量 */
    taskCount: number;
  };

  type ReadMessageReq = {
    /** 消息id */
    id: string;
  };

  type ReadMessageRes = {};

  type SortMapItem = {
    /** 项目状态id */
    id: string;
    /** 排序 */
    sort: number;
  };

  type SortMode = {
    /** 排序字段 */
    sortKey?: string;
    /** 排序模式 Desc|Asc */
    mode?: string;
  };

  type TaskActorItem = {
    /** 用户id */
    id: string;
    /** 用户名 */
    username: string;
    /** 用户昵称、别名 */
    nickname: string;
    /** 头像 */
    avatar: string;
  };

  type TaskAttachmentItem = {
    /** 附件id */
    id: string;
    /** 附件名 */
    name: string;
    /** 附件类型 */
    type: string;
    /** 附件url */
    url: string;
    /** 附件大小（kb） */
    size: string;
  };

  type TaskDetailItem = {
    /** 任务id */
    id: string;
    /** 任务名称 */
    name: string;
    /** 任务描述 */
    description: string;
    /** 项目id */
    projectId: string;
    /** 父任务id */
    parentId: string;
    /** 任务处理者 */
    handlerId: string;
    /** 任务状态id */
    statusId: string;
    /** 分组id */
    groupId: string;
    /** 任务类型id */
    typeId: string;
    /** 优先级 */
    priority: string;
    /** 创建者id */
    creatorId: string;
    /** 任务开始时间 */
    startTime: string;
    /** 任务结束时间 */
    endTime: string;
    /** 计划工时(小时) */
    planHour: number;
    /** 实际使用工时(小时) */
    laborHour: number;
    /** 子任务个数 */
    childrenNum: number;
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
    /** 状态名 */
    statusName: string;
    /** 状态枚举 */
    statusEnum: string;
    /** 状态颜色 */
    statusColor: string;
    /** 任务类型 */
    typeName: string;
    /** 任务类型颜色 */
    typeColor: string;
    /** 任务分组 */
    groupName: string;
    /** 任务创建者名称 */
    creatorName: string;
    /** 任务创建者头像 */
    creatorAvatar: string;
    /** 任务执行者名称 */
    handlerName: string;
    /** 任务执行者头像 */
    handlerAvatar: string;
  };

  type TaskGroupItem = {
    /** id */
    id: string;
    /** 名称 */
    groupName: string;
    /** 描述 */
    description: string;
  };

  type TaskLaborHourItem = {
    /** id */
    id: string;
    /** 用户id */
    userId?: string;
    /** 用户名 */
    username?: string;
    /** 用户头像 */
    avatar?: string;
    /** 时间（小时） */
    hour?: number;
    /** 日期 */
    date?: string;
    /** 工作内容 */
    description?: string;
  };

  type TaskListByIntervalItem = {
    /** 任务id */
    id: string;
    /** 任务名称 */
    name: string;
    /** 项目id */
    projectId: string;
    /** 状态 */
    statusName: string;
    /** 状态枚举 */
    statusEnum: string;
    /** 状态枚举 */
    statusColor: string;
    /** 任务开始时间 */
    startTime: string;
    /** 任务结束时间 */
    endTime: string;
  };

  type TaskOperationLogItem = {
    /** 日志id */
    id: string;
    /** 日志名 */
    name: string;
    /** 日志内容 */
    content: string;
    /** 日志备注 */
    desc: string;
    /** 日志类型 */
    type:
      | 'ATTACHMENT'
      | 'COMMENT'
      | 'DYNAMIC_ADD_ACTOR'
      | 'DYNAMIC_TASK_CREATE'
      | 'DYNAMIC_TASK_DESCRIPTION'
      | 'DYNAMIC_TASK_GROUP'
      | 'DYNAMIC_TASK_HANDLER'
      | 'DYNAMIC_TASK_LABOR_TIME'
      | 'DYNAMIC_TASK_NAME'
      | 'DYNAMIC_TASK_PRIORITY'
      | 'DYNAMIC_TASK_STATUS'
      | 'DYNAMIC_TASK_TIME'
      | 'DYNAMIC_TASK_TYPE';
    /** 用户id */
    userId: string;
    /** 用户头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 创建时间 */
    createdAt: string;
  };

  type TaskPriorityItem = {
    /** 优先级id */
    id: string;
    /** 任务优先级 */
    name: string;
    /** 优先级颜色 */
    color: string;
  };

  type TaskStatusItem = {
    /** 状态id */
    id: string;
    /** 任务状态 */
    name: string;
    /** 状态颜色 */
    color: string;
    /** 排序 */
    sort: number;
    /** 枚举 */
    enum: string;
    /** 排序 */
    default: number;
  };

  type TaskTypeItem = {
    /** 类型id */
    id: string;
    /** 任务类型 */
    name: string;
    /** 类型颜色 */
    color: string;
  };

  type TestCaseItem = {
    /** 用例id */
    id: string;
    /** 用例名 */
    name: string;
    /** 描述说明 */
    description: string;
    /** 进度(草稿: DRAFT 发布:PUBLISHED 测试中:TESTING 测试完成:DONE) */
    progress: number;
    /** 状态 */
    status: string;
    /** 创建人id */
    creatorId: string;
    /** 创建人名称 */
    creatorName: string;
    /** 创建人头像 */
    creatorAvatar: string;
    /** 正在编辑的用户（lock） */
    editorId: string;
    /** 编辑人名称 */
    editorName: string;
    /** 编辑人头像 */
    editorAvatar: string;
    /** 参与人 */
    actorIds: string[];
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
  };

  type TestConnectReq = {
    /** 用户名 */
    username?: string;
  };

  type TestConnectRes = {};

  type testParams = {
    /** 用户名 */
    username?: string;
  };

  type UpdateProjectGroupReq = {
    /** 项目分组id */
    id: string;
    /** 项目分组名 */
    name?: string;
    /** 项目分组描述 */
    description?: string;
  };

  type UpdateProjectGroupRes = {};

  type UpdateProjectReq = {
    /** 项目 id */
    projectId: string;
    /** 项目名 */
    name?: string;
    /** 项目描述 */
    description?: string;
    /** 项目头图 */
    headerImg?: string;
    /** 项目负责人id */
    ownerId?: string;
    /** 项目分组id */
    groupId?: string;
    /** 项目类型 PRIVATE: 私有  PUBLIC：公开 */
    showType?: string;
    /** 项目状态 1. 正常 2：回收站 3：已删除 */
    status?: number;
  };

  type UpdateProjectRes = {};

  type UpdateProjectUserRoleReq = {
    /** 用户 id */
    userId: string;
    /** 项目 id */
    projectId: string;
    /** 用户角色 */
    role: 'USER' | 'ADMIN';
  };

  type UpdateProjectUserRoleRes = {};

  type UpdateTaskGroupReq = {
    /** 项目分组id */
    id: string;
    /** 项目id */
    projectId: string;
    /** 任务分组名 */
    groupName?: string;
    /** 任务分组描述 */
    description?: string;
  };

  type UpdateTaskGroupRes = {};

  type UpdateTaskLaborHourReq = {
    /** 项目id */
    projectId: string;
    /** 工时记录id */
    id: string;
    /** 任务id */
    taskId: string;
    /** 日期 */
    date?: string;
    /** 计划工时（小时） */
    hour: number;
    /** 工作内容说明 */
    description: string;
  };

  type UpdateTaskLaborHourRes = {};

  type UpdateTaskPriorityReq = {
    /** 优先级id */
    id: string;
    /** 名称 */
    name: string;
    /** 优先级颜色 */
    color: string;
  };

  type UpdateTaskPriorityRes = {};

  type UpdateTaskReq = {
    /** 任务id */
    id: string;
    /** 项目id */
    projectId: string;
    /** 任务名称 */
    name?: string;
    /** 任务描述 */
    description?: string;
    /** 父任务id */
    parentId?: string;
    /** 任务处理者 */
    handlerId?: string;
    /** 任务状态id */
    statusId?: string;
    /** 分组id */
    groupId?: string;
    /** 任务类型id */
    typeId?: string;
    /** 任务优先级id */
    priority?: string;
    /** 任务开始时间 */
    startTime?: string;
    /** 任务结束时间 */
    endTime?: string;
    /** 计划工时(小时) */
    planHour?: number;
    /** 实际使用工时(小时) */
    laborHour?: number;
  };

  type UpdateTaskRes = {};

  type UpdateTaskStatusReq = {
    /** 项目id */
    projectId: string;
    /** 任务状态id */
    id: string;
    /** 名称 */
    name?: string;
    /** 颜色 */
    color?: string;
    /** 排序 */
    sort: number;
    /** 枚举值 */
    enum?: string;
  };

  type UpdateTaskStatusRes = {};

  type UpdateTaskStatusSortReq = {
    /** 项目id */
    sortMapList?: SortMapItem[];
    /** 项目id */
    projectId: string;
  };

  type UpdateTaskStatusSortRes = {};

  type UpdateTaskTypeReq = {
    /** 项目类型id */
    id: string;
    /** 项目id */
    projectId: string;
    /** 名称 */
    name?: string;
    /** 颜色 */
    color?: string;
  };

  type UpdateTaskTypeRes = {};

  type UpdateTestCaseReq = {
    /** 用例id */
    id: string;
    /** 项目id */
    projectId: string;
    /** 测试用例名 */
    name?: string;
    /** 状态(草稿: DRAFT 发布:PUBLISHED 测试中:TESTING 测试完成:DONE) */
    status?: string;
    /** 测试进度(1-100) */
    progress?: number;
    /** 关于测试用例的描述 */
    description?: string;
    /** 数据 */
    value: string;
  };

  type UpdateTestCaseRes = {};

  type UpdateUserInfoReq = {
    /** 用户id */
    id: string;
    /** 用户名 */
    username?: string;
    /** 用户昵称、别名 */
    nickname?: string;
    /** 手机号 */
    phone?: number;
    /** 邮箱 */
    email?: string;
    /** 头像 */
    avatar?: string;
    /** 角色 */
    role?: string;
    /** 状态 */
    status?: number;
  };

  type UpdateUserInfoRes = {};

  type UploadFileReq = {};

  type UploadFileRes = {
    /** 文件id */
    id: string;
    /** 文件名 */
    name: string;
    /** 文件类型 */
    type: string;
    /** 文件url */
    url: string;
  };

  type UserBaseInfo = {
    /** 用户id */
    id: string;
    /** 用户名 */
    username: string;
    /** 用户昵称、别名 */
    nickname: string;
    /** 头像 */
    avatar: string;
    /** 角色 */
    role: string;
    /** 状态 */
    status: number;
  };

  type WorkLaborHourDetailItem = {
    /** 工时 id */
    id: string;
    /** 任务 id */
    taskId: string;
    /** 任务名 */
    taskName: string;
    /** 工时 */
    hour: number;
    /** 工时日期 */
    date: string;
    /** 工作内容 */
    description: string;
  };

  type WorkLaborHourLogItem = {
    user?: WorkLaborHourUserItem;
    /** 工作记录 */
    records: WorkPanelRecordItem[];
  };

  type WorkLaborHourUserItem = {
    /** 用户 id */
    id: string;
    /** 用户 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
  };

  type WorkPanelRecordItem = {
    /** 工时 */
    hour: number;
    /** 工时日期 */
    date: string;
  };

  type WorkPanelUserItem = {
    /** 用户id */
    id: string;
    /** 用户名 */
    username: string;
    /** 用户昵称、别名 */
    nickname: string;
    /** 头像 */
    avatar: string;
  };
}
