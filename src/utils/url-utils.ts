type anyObj = { [key: string]: any };

/**
 * @description:
 * @param {string} url
 * @param {anyObj} query
 * @return {string}
 */
export const addQuery = (url: string, query: anyObj): string => {
  const { protocol, host } = location;
  let path = url;
  const hasProtocol = path.includes('http');
  if (!hasProtocol) {
    path = `${protocol}//${host}${url}`;
  }
  const _url = new URL(path);
  for (const key in query) {
    if (query[key]) {
      _url.searchParams.set(key, query[key]);
    }
  }
  return hasProtocol ? _url.href : _url.pathname + _url.search;
};

/**
 * @description:
 * @param {string} key
 * @return {string}
 */
export const getQueryByKey = (key: string): string => {
  const query = new URL(location.href);
  return query.searchParams.get(key) || '';
};

/**
 * @description:
 * @param {*} url
 * @return {*}
 */
export const getQueryObject = (url: any = location.href): anyObj => {
  const kvs = new URL(url).search.slice(1).split('&');
  const query: anyObj = {};
  for (let i = 0; i < kvs.length; i++) {
    const q = kvs[i].split('=');
    if (q[1]) query[q[0]] = decodeURIComponent(q[1]);
  }
  return query;
};

/**
 * @description:
 * @param {anyObj} data
 * @param clear
 * @return {*}
 */
export const replaceUrlByQuery = (data: anyObj, clear?: boolean): any => {
  const { protocol, host, pathname } = location;
  const url = `${protocol}//${host}${pathname}`;
  let query = Object.assign(getQueryObject(), data);
  if (clear) {
    query = data;
  }
  window.history.replaceState('replace', 'null', addQuery(url, query));
};
