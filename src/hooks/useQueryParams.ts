import { replaceUrlByQuery } from '@/utils/url-utils';
import { useSetState, useUpdateEffect } from 'ahooks';
import queryString from 'query-string';

type IQueryEnum = {
  [key: string]: any;
};

const useQueryParams = () => {
  const q: IQueryEnum = queryString.parseUrl(location.href).query;
  const [query, setQuery] = useSetState<any>(q);
  // query 参数一直追加
  const addQueryString = (obj: IQueryEnum) => replaceUrlByQuery(obj);
  // 只保留当前的 query
  const replaceQuery = (obj: IQueryEnum) => replaceUrlByQuery(obj, true);

  useUpdateEffect(() => {
    addQueryString(query);
  }, [query]);

  return [query, setQuery, replaceQuery];
};

export default useQueryParams;
