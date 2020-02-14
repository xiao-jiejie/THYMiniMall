//这里只能写绝对路径(导入函数)
import {
  getMultiData,
  getGoodsData
 } from '../../service/home.js'

const types = ['pop','new','sell'];
const TOP_DISTANCE = 1000;//滚动到多少进行显示返回顶部

Page({
  data: {
    banners: [],//轮播图
    recommends: [],//推荐数据
    titles: ['流行', '新款', '精选'], //tab-control
    goods: {
      pop: { page: 0, list: [] },//流行
      new: { page: 0, list: [] },//新款
      sell: { page: 0, list: [] } //精选
    },
    currentType: 'pop', //记录当前type的类型（pop、new、sell)
    showBackTop: false, //默认不显示
    isTabFixed: false, //滚动到一定位置固定
    tabScrollTop: 0
  },

  //页面加载时执行
  onLoad: function(options){
    //1.调用轮播图和推荐数据方法
    this._getMultiData()

    //2.请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom(){
    //上拉加载更多
    this._getGoodsData(this.data.currentType)
  },

  /**
   * 监听页面滚动函数
   */
  onPageScroll(options){
    // console.log(options)
    //1.取出scrollTop
    const scrollTop = options.scrollTop;

    //2.根据scrollTop，修改showBackTop属性
    //官方提示不要频繁调用滚动使用this.setData
    const flag = scrollTop >= TOP_DISTANCE;
    if(flag != this.data.showBackTop){
      this.setData({
        showBackTop: flag
      })
    }
    //3.修改isTabFixed属性
    const flag2 = scrollTop >= this.data.tabScrollTop;
    if(flag2 != this.data.isTabFixed){
      this.setData({
        isTabFixed: flag2
      })
    }
  },

 /**
   * 页面显示出来时回调的函数
   * 监听某组件距离滚动的距离
   */
  handleImageLoad(){
      wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
        // console.log(rect)
        this.data.tabScrollTop = rect.top
      }).exec()
  },

  /**
   *  网络请求
   * ============ 请求轮播图及推荐数据 ============
   */
  _getMultiData(){
    getMultiData().then(res => {
      // console.log(res)
      //2.取出轮播图和推荐数据(这里的data.data是请求数据的层次，上面log打印后台看下就知道了)
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;

      //3.将banners、recommends放到data对象中
      this.setData({
        banners: banners,
        recommends: recommends
      })
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * ============ 请求商品数据 ============
   */
  _getGoodsData(type){
    //1.获取页码,goods是上面data中的参数
    const page = this.data.goods[type].page + 1;

    //2.发送网络请求
    getGoodsData(type, page).then(res => {
      // console.log(res)
      //2.1.取出数据
      const list = res.data.data.list;
      
      //2.2. 将数据设置到对应type的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list)

      //2.3.将数据设置到data中的goods中
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page

      })
    })
  },

  /**
   * 事件监听
   * ============ tab-control切换事件 ============
   */
  handleTypeClick(e){
    // console.log(e)
    //1.取出index,后边点击那个分类就显示哪个分类的数据
    const index = e.detail.index;

    //设置当前点击时显示的数据
    this.setData({
      currentType: types[index]
    })
  }
  
})