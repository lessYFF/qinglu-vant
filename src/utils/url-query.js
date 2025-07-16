import TypeChecker from "@lihzsky/type-checker";

export const UrlQuery = {
  // 浏览器携带的参数
  query: {},

  /**
   * 解析url上的参数
   * @param search url上的参数
   */
  parse(search) {
    return (search || '').split('&').reduce((obj, cur = '') => {
      const [key, val] = cur.split('=');

      if (TypeChecker.isString(key) && key.trim() !== '') {
        obj[key] = val;
      }

      return obj;
    }, {});
  },

  /**
   * 获取浏览器的参数
   * * 支持正常URL参数和hash参数
   * * hash参数优先级高于正常URL参数
   */
  update() {
    const { search = '', hash = '' } = window.location;

    UrlQuery.query = Object.assign(
      {},
      UrlQuery.parse(search.split('?')[1]),
      UrlQuery.parse(hash.split('?')[1]),
    );
  },
};

/**
 * JSON对象转URL查询字符串
 * @param {Object} params - 需要转换的参数对象
 * @param {boolean} [encode=false] - 是否进行URI编码
 * @example
 * jsonToQuery({ a: 1, b: [2,3], c: { d: 4 } })
 * // returns 'a=1&b=2&b=3&c.d=4'
 */
export function jsonToQuery(params, encode = false) {
  if (!TypeChecker.isObject(params)) return ''

  const processValue = (key, value) => {
    if (TypeChecker.isArray(value)) {
      return value.map(item => `${key}=${encode ? encodeURIComponent(item) : item}`).join('&')
    }
    if (TypeChecker.isObject(value)) {
      return Object.entries(value)
        .map(([subKey, subValue]) => 
          processValue(`${key}.${subKey}`, subValue)
        )
        .join('&')
    }
    return `${key}=${encode ? encodeURIComponent(value) : value}`
  }

  return Object.entries(params)
    .filter(([_, value]) => !TypeChecker.isNull(value))
    .flatMap(([key, value]) => {
      const formattedValue = TypeChecker.isBoolean(value) ? Number(value) : value
      return processValue(key, formattedValue).split('&')
    })
    .join('&')
}
