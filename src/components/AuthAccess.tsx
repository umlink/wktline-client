import { useModel } from '@umijs/max';

type AuthType = 'admin' | 'superAdmin';

type AuthAccessProps = {
  authType: AuthType;
  children?: JSX.Element;
};

const AuthAccess = (props: AuthAccessProps) => {
  const { initialState: useInfo } = useModel('@@initialState');
  if (useInfo?.role === 'SUPER_ADMIN') {
    return props.children;
  } else if (props.authType === useInfo?.role) {
    return props.children;
  }
  return null;
};

export default AuthAccess;
