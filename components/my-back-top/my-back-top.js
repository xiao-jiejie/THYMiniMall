// components/my-back-top/my-back-top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //返回顶部
    handleBackTop(){
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  }
})
