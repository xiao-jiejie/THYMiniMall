// components/my-tab-control/my-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //1.设置当前选中title的样式的方法
    handleItemClick(e){
      //打印点击titles时获取的数据
      // console.log(e)
      
      //2.获取索引
      const index = e.currentTarget.dataset.index;

      //3.设置当前索引currentIndex为index获取的索引
      this.setData({
        currentIndex: index
      })

      //4.触发事件triggerEvent，能获取到页面的事件，将组件的事件itemClick传递到页面
      this.triggerEvent('itemClick',
        {
          index, title: this.properties.titles[index]
        },
        {}
      )
    }
  }
})
