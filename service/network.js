//将相同部分进行抽取
import {
  baseURL
} from './config.js'

export default function(options){
  //通过Promise进行封装
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}