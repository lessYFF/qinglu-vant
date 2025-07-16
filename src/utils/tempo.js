import TypeChecker from "@lihzsky/type-checker"
import { ONE_DAY, ONE_HOUR, ONE_MINUTE, ONE_SECOND } from "../constants"

/**
 * 时间格式化
 * @param date 时间
 * @param format 时间格式，默认是 yyyy-MM-dd hh:mm
 */
export const Tempo = {
  PATTERNS: {
    default: 'yyyy-MM-dd hh:mm',
    datetime: 'yyyy-MM-dd hh:mm:ss',
    dateHour: 'yyyy-MM-dd hh',
    yearMonth: 'yyyy-MM',
    monthDay: 'MM-dd',
    date: 'yyyy-MM-dd',
    time: 'hh:mm:ss',
    hourMinute: 'hh:mm'
  },

  format(value, format = 'yyyy-MM-dd hh:mm') {
    const date = Tempo.toDate(value)

    if (date === null) {
      return ''
    }
  
    const DateMap = {
      M: () => date.getMonth() + 1, //月份
      d: () => date.getDate(), //日
      h: () => date.getHours(), //小时
      m: () => date.getMinutes(), //分
      s: () => date.getSeconds(), //秒
      q: () => Math.floor((date.getMonth() + 3) / 3), //季度
      S: () => date.getMilliseconds(), //毫秒
    }
  
    return format.replace(/([yMdhmsqS])+/g, (all, t) => {
      let v = DateMap[t]

      if(TypeChecker.isFunction(v)) {
        v = String(v())

        if(all.length > 1) {
          return ('0'.repeat(all.length) + v).slice(-all.length)
        }

        return v
      }

      if(t === 'y') {
        return String(date.getFullYear()).slice(-all.length)
      }

      return all
    })
  },

  toRemain(value, format = 'd天h小时m分钟s秒') {
    if (!Number.isInteger(value)) {
      return ''
    }

    let remainTime = +value

    function getRemainByStandardTime(standardTime, s) {
      if (remainTime === 0) {
        return ''
      }
      
      const remain = Math.floor(remainTime / standardTime)
    
      remainTime = remainTime % standardTime

      if (remain === 0) {
        return ''
      }
    
      return String(remain) + s
    }

    return format.replace(/([dhms]+)([^dhms]+)/g, (all, t, s) => {
      switch (t) {
        case 'd':
          return getRemainByStandardTime(ONE_DAY, s)
        case 'h':
          return getRemainByStandardTime(ONE_HOUR, s)
        case 'm':
          return getRemainByStandardTime(ONE_MINUTE, s)
        case 's':
          return getRemainByStandardTime(ONE_SECOND, s)
        default:
      }

      return t
    })
  },

  toDate(value, strict = false) {
    if (value instanceof Date) {
      return value
    }

    if (TypeChecker.isValidDate(value)) {
      return new Date(value)
    }

    if (/^(?:\d+[^\d]+){3}/.test(value)) {
      const parts = value.match(/\d+/g)?.map((item) => +item) ?? []
      let args

      if (parts.length > 6) {
        args = parts.slice(0, 6)
      } else if (parts.length < 6) {
        args = parts.concat(new Array(6 - parts.length).fill(0))
      } else {
        args = parts
      }

      return new Date(...args)
    }

    if (strict) {
      return new Date()
    }

    return null
  },

  toTimestamp(value, strict = false) {
    const date = this.toDate(value)

    if (TypeChecker.isValidDate(date)) {
      return date.getTime()
    }

    if (strict) {
      return Date.now()
    }

    return 0
  }
}
