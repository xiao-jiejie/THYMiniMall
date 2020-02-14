import request from "./network.js"

/**
 * 1.请求轮播图和推荐数据
 */
export function getMultiData(){
  return request({
    url: '/home/multidata'
  })
}

/**
 * 2.请求商品数据
 * type: 请求的数据类型
 * page： 请求页数
 * data: 请求的参数设置
 */
export function getGoodsData(type, page){
  return request({
    url: '/api/hy/home/data',
    data: {
      type: type,
      page: page
    }
  })
}