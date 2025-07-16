import { customAlphabet } from "nanoid";
import { alphanumeric } from "nanoid-dictionary";
import videoPreviewPic from './video-preview.png'

const nanoid = customAlphabet(alphanumeric, 8);
const getMediaSuffix = (file) => file.name.slice(file.name.lastIndexOf('.'))
const getMediaPathSuffix = (path) => path.slice(path.lastIndexOf('.'))
const generateUniqueFileName = (suffix) => `${Date.now()}_${nanoid()}${suffix}`
const OssAppend = (key, value) => value ? ',' + key + '_' + value : ''

export const Media = {
  getMediaDefinition(value) {
    const suffix = value.slice(value.lastIndexOf('.'))

    if (['.mp4', '.mov', '.wmv', '.3gp', '.avi'].includes(suffix)) {
      return 'video'
    }

    return 'image'
  },

  generateMediaPath(file, dir) {
    const suffix = getMediaSuffix(file)
    const filename = generateUniqueFileName(suffix)

    return dir + '/' + filename
  },

  generateMediaThumbPath(url, options) {
    const suffix = getMediaPathSuffix(url)
    let search = ''

    if (['.mp4', '.mov', '.wmv', '.3gp', '.avi'].includes(suffix)) {
      // ! 视频截图方案 在van-image中表现并不符合要求
      // search = '?x-oss-process=video/snapshot,t_10000,f_jpg'
      // search += OssAppend('w', options?.width)
      // search += OssAppend('h', options?.height)
      // search += OssAppend('m', options?.fit ?? 'fast')
      return videoPreviewPic
    }

    if (['.jpg', '.png', '.jpeg'].includes(suffix)) {
      search = '?x-oss-process=image/resize,limit_0'
      search += OssAppend('w', options?.width)
      search += OssAppend('h', options?.height)
      search += OssAppend('m', options?.fit ?? 'fill')
    }

    return url + search
  },

  base64ToBlob({b64data = '', contentType = '', sliceSize = 512} = {}) {
    return new Promise((resolve, reject) => {
      // 使用 atob() 方法将数据解码
      let byteCharacters = atob(b64data);
      let byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = [];
        for (let i = 0; i < slice.length; i++) {
            byteNumbers.push(slice.charCodeAt(i));
        }
        // 8 位无符号整数值的类型化数组。内容将初始化为 0。
        // 如果无法分配请求数目的字节，则将引发异常。
        byteArrays.push(new Uint8Array(byteNumbers));
      }
      let result = new Blob(byteArrays, {
        type: contentType
      })
      result = Object.assign(result,{
        // 这里一定要处理一下 URL.createObjectURL
        preview: URL.createObjectURL(result),
        name: `XXX.png`
      });
      resolve(result)
    })
  },

  
  async getBase64Image(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      // 添加超时处理
      const timeout = setTimeout(() => reject('Image load timeout'), 10000);
      
      image.src = src;
      image.setAttribute('crossOrigin', 'anonymous');
      image.onerror = (e) => {
        clearTimeout(timeout);
        reject(`Image load error: ${e.message}`);
      }

      image.onload = () => {
        try {
          clearTimeout(timeout);
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, image.width, image.height);
          const dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        } catch (error) {
          reject(`Canvas error: ${error.message}`);
        }
      }
    })
  }
}
