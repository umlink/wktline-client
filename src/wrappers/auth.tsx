import { Navigate, Outlet } from '@umijs/max';

export default () => {
  const isLogin = true;
  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
