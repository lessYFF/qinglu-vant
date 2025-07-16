/**
 * 原生 App 内嵌交互
 * 交互规则：https://d07lecjljt.feishu.cn/docx/GyX9dKVlLofWghxu0YXcgJHonte
 */
import { Toast } from 'vant'
import { UrlQuery, jsonToQuery } from './url-query'

/**
 * 是否处于 native 环境
 */
export const isNative = typeof qingluApp !== 'undefined'

/**
 * 是否处于哈啰App内嵌环境
 * 通过检查UserAgent判断
 */
export const isHelloApp = (() => {
  // 检查UserAgent中是否包含哈啰App的标识
  const userAgent = navigator.userAgent || '';
  // 使用正则表达式匹配更精确的模式 匹配 "app=hbmerchant"或者"app=hellobikebos)"
  const helloAppRegex = /\bapp=(hbmerchant|hellobikebos)\b/i;
  if (helloAppRegex.test(userAgent)) {
    return true;
  }
  // 如果以上检测未通过，则不在哈啰App内
  return false;
})();
console.log('isHelloApp', isHelloApp);

export const nativeVersion = (() => {
  UrlQuery.update()
  const { version: raw } = UrlQuery.query
  if (raw) {
    const version = parseInt(raw, 10)
    if (isFinite(version)) return version
  }
  return 0
})()
console.log('native-version', nativeVersion)

/**
 * 向 native 发送消息
 */
export function nativeMessage(type, data = {}) {
  const message = { msgType: type, data }
  console.log('[nativeMessage]', message)

  if (!isNative) return
  qingluApp.postMessage(JSON.stringify(message))
}

/**
 * 通知 native 前往指定页面
 *
 * 目前支持页面：
 * - index   首页
 * - message 消息
 * - user    我的
 */
export function nativeGo(page, params = {}) {
  nativeMessage('go', { page, params })
}

/**
 * 唤起地图
 */
export function nativeMap(address, longitude, latitude) {
  // address: 文字地址
  // gcj02: [longitude, latitude]  高德坐标系（火星坐标系）
  // bd09: [longitude, latitude]  百度坐标系
  const gcj02 = [longitude, latitude]
  const bd09 = getBaiduLoc(longitude, latitude)
  nativeMessage('map', { address, gcj02, bd09 })
}
function getBaiduLoc(lng, lat) {
  const x_PI = (3.14159265358979324 * 3000.0) / 180.0
  lat = +lat
  lng = +lng
  let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI)
  let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI)
  let bd_lng = z * Math.cos(theta) + 0.0065
  let bd_lat = z * Math.sin(theta) + 0.006
  return [bd_lng, bd_lat]
}

/**
 * 唤起绑定微信
 */
export function nativeBindWechat() {
  nativeMessage('bindWechat')
}

/**
 * 下载图片
 */
export function nativeDownloadImage(imageUrl) {
  nativeMessage('downloadImage', {
    imageUrl,
  })
}

/**
 * 分享图片到微信
 */
export function nativeShareImage(imageUrl) {
  nativeMessage('share', {
    shareType: 'image',
    imageUrl,
  })
}

/**
 * 短信分享
 */
export function nativeSendMessage({ imageUrl, description }) {
  nativeMessage('share', {
    shareType: 'image',
    imageUrl,
    description,
  })
}

// 是否支持原生上传图片/视频、原生压缩图片
export const supportNativeUpload = nativeVersion >= 8

/**
 * 原生上传视频
 * options: {
 *  max: number
 * }
 */
export function nativeUploadVideo(options = {}) {
  return new Promise(resolve => {
    nativeMessage('uploadVideo', {
      max: options.max || 20,
    })

    if (!isNative) setTimeout(() => resolve(['test.mp4']), 1000)

    /*
    {
      msgType: 'setVideoList',
      data: {
        videoUrls: [url, url, ...]
      }
    }
    */
    window.nativeCallWeb = function videoUploadCallback(raw) {
      console.log('nativeCallWeb nativeUploadVideo', raw)
      try {
        const message = JSON.parse(raw)
        try {
          if (message.msgType === 'setVideoList' && message.data && message.data.videoUrls) {
            resolve(message.data.videoUrls)
          } else {
            Toast.fail(`视频上传结果格式不匹配：${raw}`)
            resolve([])
          }
        } catch (e) {
          Toast.fail(`处理视频上传结果失败：${e.toString()}`)
          resolve([])
        }
      } catch (e) {
        Toast.fail(`解析视频上传结果失败：${raw}`)
        resolve([])
      }
    }
  })
}

/**
 * 原生上传图片
 * options: {
 *  max: number
 * }
 */
export function nativeUploadImage(options = {}) {
  return new Promise(resolve => {
    nativeMessage('uploadImage', {
      max: options.max || 20,
    })

    if (!isNative) setTimeout(() => resolve(['test.jpg']), 1000)

    /*
    {
      msgType: 'setImageList',
      data: {
        imageUrls: [url, url, ...]
      }
    }
    */
    window.nativeCallWeb = function videoUploadCallback(raw) {
      console.log('nativeCallWeb nativeUploadImage', raw)
      try {
        const message = JSON.parse(raw)
        try {
          if (message.msgType === 'setImageList' && message.data && message.data.imageUrls) {
            resolve(message.data.imageUrls)
          } else {
            Toast.fail(`图片上传结果格式不匹配：${raw}`)
            resolve([])
          }
        } catch (e) {
          Toast.fail(`处理图片上传结果失败：${e.toString()}`)
          resolve([])
        }
      } catch (e) {
        Toast.fail(`解析图片上传结果失败：${raw}`)
        resolve([])
      }
    }
  })
}

/**
 * 原生图片压缩
 * options: {
 *  data: base64Image[]
 * }
 */
export function nativeUploadBase64(options = {}) {
  return new Promise(resolve => {
    nativeMessage('uploadBase64', [
      {
        base64: options.data,
        name: options.name || `${new Date().getTime()}.jpg`,
      },
    ])

    if (!isNative) setTimeout(() => resolve(['test.jpg']), 1000)

    /*
    {
      msgType: 'setImageList',
      data: {
        imageUrls: [url, url, ...]
      }
    }
    */
    window.nativeCallWeb = function videoUploadCallback(raw) {
      console.log('nativeCallWeb nativeUploadBase64', raw)
      try {
        const message = JSON.parse(raw)
        try {
          if (message.msgType === 'setImageList' && message.data && message.data.imageUrls) {
            resolve(message.data.imageUrls)
          } else {
            Toast.fail(`图片上传结果格式不匹配：${raw}`)
            resolve([])
          }
        } catch (e) {
          Toast.fail(`处理图片上传结果失败：${e.toString()}`)
          resolve([])
        }
      } catch (e) {
        Toast.fail(`解析图片上传结果失败：${raw}`)
        resolve([])
      }
    }
  })
}

/**
 * 订单选项保存
 * options={}
 */
export function nativeSetSelect(options) {
  return new Promise(resolve => {
    nativeMessage('putStorage', { key: 'searchType', value: options })
    // if (!isNative) setTimeout(() => resolve({ value: 'noNative' }), 1000)
    window.nativeCallWeb = function videoUploadCallback(message) {
      console.log(message, 'nativeSetSelect')
      resolve(JSON.stringify(message.data.value))
    }
  })
}

/**
 * 通过 Scheme 跳转哈啰App 订单详情页
 * @param {Object} params - 跳转参数对象
 * @param {string} params.status - 订单状态类型: 60(订单详情)/40(取车信息)/50(还车信息)/1000(结算信息)
 * @param {string} params.guid - 渠道订单唯一标识符
 * @example
 * // 跳转到订单详情页
 * nativeToHelloApp({ status: '60', guid: '123456' })
 */
export function nativeToHelloApp(params = {}) {
  // 根据环境生成基础订单URL
  const basePath = process.env.__APP_ENV__ === 'prod' 
    ? 'latest/index.html' 
    : 'fat/latest/pr_index_home.html';
  const orderUrl = `https://m.hellobike.com/AppRentCarSaaSH5/${basePath}#/order-detail?`;
  
  // 构造哈啰H5带参URL并进行编码
  const queryString = jsonToQuery({ ...params, from: 'ql' });
  const encodedUrl = encodeURIComponent(`${orderUrl + queryString}`);
  console.debug('hallo url', orderUrl+queryString)
  // 生成跨平台跳转Scheme
  const helloScheme = `hbmerchant://hbmerchant.com/openWeb?webUrl=${encodedUrl}`;
  nativeMessage('openHelloApp', { scheme: helloScheme });
}

/**
 * 通过 Scheme 跳转携程App 订单详情页
 * @param {Object} params - 跳转参数对象
 * @param {string} params.orderId - 携程渠道订单号(sourceOrderId)
 * @example
 * // 跳转到携程订单详情页
 * nativeToCtripApp({ orderId: '123456' })
 */
export function nativeToCtripApp(params = {}) {
  // 获取订单ID
  const { orderId } = params;
  // 分离scheme前缀和url参数部分
  const schemePrefix = 'zuchebao://wireless';
  const urlToEncode = `/rn_carRentalFulfillment/main.js?CRNModuleName=crn-zuchebao-fulfillment&channel=saas&orderId=${orderId}&initialPage=sendCarPage&CRNType=1`;
  // 对整个URL部分进行编码
  const encodedUrl = encodeURIComponent(urlToEncode);
  // 构建最终的scheme地址，格式为：zuchebao://wireless?url={编码后的URL}
  const finalScheme = `${schemePrefix}?url=${encodedUrl}`;
  console.debug('跳转scheme:', finalScheme);
  nativeMessage('openHelloApp', { scheme: finalScheme });
}
