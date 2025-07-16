/**
 * 执行关键词匹配
 * 成功返回 true；失败返回 false
 */

import { Media } from './index'

// string => regexp
const kwCache = {}      // 避免大量重复构建正则表达式影响性能

export function keywordCompare(keyword, target) {
  if (!keyword) return true
  const regStr = keyword.split('').map(escapeRegExp).join('.*')
  if (!(keyword in kwCache)) kwCache[keyword] = new RegExp(regStr, 'i')
  return kwCache[keyword].test(target)
}
function escapeRegExp(str) {
  // From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}


export function shortTime(d) {
  if (!d) return ''
  const y = d.getFullYear().toString().slice(2)
  const m = zfill(d.getMonth() + 1)
  const da = zfill(d.getDate())
  const h = zfill(d.getHours())
  const mi = zfill(d.getMinutes())
  return `${y}/${m}/${da} ${h}:${mi}`
}

export function zfill(value) {
  return value < 10 ? `0${value}` : `${value}`
}

export function transformImgUrlToBase64(text) {
  const promiseList = []
  // a 为富文本的字符串内容，为了测试，只写了img标签
  const b = /<img [^>]*src=['"]([^'"]+)[^>]*>/g;// img 标签取src里面内容的正则
  const s = text.match(b);// 取到所有img标签 放到数组 s里面
  if (!s) return new Promise((resolve) => resolve(text))
  for (let i = 0; i < s.length; i++) {
    const srcImg = s[i].replace(b, '$1');//取src面的内容
    promiseList.push(Media.getBase64Image(srcImg).then(res => {
      text = text.replace(new RegExp(srcImg, 'g'), res)
    }))
  }
  return Promise.all(promiseList).then(() => {
    return text
  })
}