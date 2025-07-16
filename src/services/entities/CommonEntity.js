// 通用实体类 - 组件库版本
// 这是一个简化版本，用于组件库演示

class CommonEntity {
  constructor() {
    this.baseURL = 'https://api.example.com'
  }

  // 文件上传方法
  async uploadFile(file, options = {}) {
    // 模拟文件上传
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            url: `https://example.com/uploads/${Date.now()}_${file.name}`,
            filename: file.name,
            size: file.size,
            type: file.type
          }
        })
      }, 1000)
    })
  }

  // 简化的上传方法 (兼容旧版本调用)
  async upload(file, options = {}) {
    // 模拟文件上传，直接返回URL字符串
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟读取文件内容
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          // 对于文本文件，返回文件内容而不是URL
          if (file.type.startsWith('text/') || file.name.endsWith('.txt')) {
            resolve(content);
          } else {
            // 对于其他文件类型，返回模拟的URL
            resolve(`https://example.com/uploads/${Date.now()}_${file.name}`);
          }
        };

        // 根据文件类型选择读取方式
        if (file.type.startsWith('text/') || file.name.endsWith('.txt')) {
          reader.readAsText(file);
        } else {
          reader.readAsDataURL(file);
        }
      }, 500);
    });
  }

  // OCR识别方法
  async ocrRecognition(file, type) {
    // 模拟OCR识别
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            type: type,
            result: {
              name: '张三',
              idNumber: '123456789012345678',
              address: '北京市朝阳区'
            }
          }
        })
      }, 2000)
    })
  }
}

export default new CommonEntity()
