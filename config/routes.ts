export default [
  {
    name: 'login',
    path: '/login',
    component: '@/pages/Login',
  },
  {
    name: 'auth',
    path: '/auth',
    component: '@/pages/Auth',
  },
  {
    name: '404',
    path: '*',
    component: '@/pages/404',
  },
  {
    path: '/',
    wrappers: ['@/wrappers/auth'],
    routes: [
      {
        name: '首页',
        path: '',
        component: '@/pages/Home',
      },
      {
        name: '项目',
        path: 'project',
        component: '@/pages/Project',
      },
      {
        name: '项目详情',
        path: 'project/detail',
        component: '@/pages/ProjectDetail',
      },
      {
        name: '工时',
        path: '/labor-hour',
        component: '@/pages/LaborHour',
      },
      {
        name: '日程',
        path: '/schedule',
        component: '@/pages/Schedule',
      },
      {
        name: '设置',
        path: '/settings',
        component: '@/pages/Settings',
      },
      {
        name: '消息通知',
        path: '/message',
        component: '@/pages/Message',
      },
      {
        name: '项目邀请',
        path: '/invite/:id',
        component: '@/pages/Invite',
      },
    ],
  },
];
