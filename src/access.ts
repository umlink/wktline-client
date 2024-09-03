import { SYSTEM_ROLE } from '@/constants';

export default (initialState: API.UserBaseInfo) => {
  const isSuperAdmin = initialState?.role === SYSTEM_ROLE.SUPER_ADMIN;
  const isAdmin = initialState?.role !== SYSTEM_ROLE.USER
  return {
    isSuperAdmin,
    isAdmin,
  };
};
