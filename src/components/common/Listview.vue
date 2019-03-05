<template>
  <div class="rightroot">
      <cube-scroll
        ref="scroll"
        :data="data" 
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <ul class="ul_wraper">
          <li class="li_item" v-for="item in data">
            <!-- 使用插槽进行item布局，扩展性更强 -->
              <slot v-bind:item="item">无数据</slot>
          </li>
        </ul> 
       </cube-scroll>  
  </div>
</template>

<script>
export default {
  name: 'listview',
  data () {
    return {
      data: [],
      loading: false,
      page: 1,
      options: {
        scrollbar: {
          fade: true
        },
        pullDownRefresh: {
          threshold: 90,
          stop: 50,
          txt: '刷新成功'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多的比赛啦'
          }
        },
        click: false
      }
    }
  },
  props: {
    keyword: String
  },
  watch: {
    keyword: function (newS, oldS) {
      if (newS !== oldS) {
        this.data = null
        this.page = 1
        this.loading = false
        window.console.log('keyword改变，开始加载更多！')
        this.loadMore()
      }
    }
  },
  methods: {
    onPullingDown () {
      if (!this.loading) {
        this.page = 1
        this.loadMore()
      }
    },
    onPullingUp () {
      if (!this.loading) {
        this.loadMore()
      }
    },
    loadMore: function () {
      var that = this
      that.loading = true
      that.$emit('getMoreData', that.page, (result) => {
        that.loading = false
        if (!this.util.isNull(result)) {
          if (this.util.isNull(that.data)) {
            that.data = (result)
          } else {
            that.data = that.data.concat(result)
          }
          that.page++
        }
      })
    }
  }
}
</script>

<style scoped>
.rightroot{
  width: 100%;
  height: 90%;
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: start; 
  align-content: center; 
 }
 
 ul{
   width: 100%;
   height: auto;
 }

li{
  line-height: 3;
  padding: 10px 50px 10px 20px;
  width: 100%;
  height: auto;
  background:#ffffff;box-shadow: 1px 5px 20px #888888;
}
.footer{
  width: auto;
  height: auto;
  margin: auto;
}

</style>
