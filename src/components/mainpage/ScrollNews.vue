<template>
  <div class="content"> 
    <div class="newswraper"> 
      <!-- <tabmenu  v-show="!searching"  @clickTab='clickTab' :menuData='tabs'>
      </tabmenu> -->
      <cube-scroll-nav-bar v-show="!searching" :current="tabname" :labels="tabs" @change="clickTab" />
        <listview v-show="!searching" @getMoreData="getMoreData"  :keyword='tabname'>
        <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
        <template slot-scope="slotProps">
          <!-- 为待办项自定义一个模板，--> 
          <!-- 通过 `slotProps` 定制每个待办项。-->
          <span> {{ slotProps.item.title }}</span>
        </template>
      </listview>
    </div>
    <div class='searchBar' >
      <input v-model="searchWord" placeholder="请输入新闻关键字搜索"/> {{tip}}
      <listview v-show="searching" @getMoreData="searchResult" :keyword="searchWord">
        <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
        <template slot-scope="slotProps">
          <!-- 为待办项自定义一个模板，-->
          <!-- 通过 `slotProps` 定制每个待办项。-->
          <span> {{ slotProps.item.title }}</span>
        </template>
    </listview>
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
import listview from '../common/Listview.vue'
 // Load the core build.
var _ = require('lodash')
export default {
  name: 'scrollnews',
  data () {
    return {
      data: null,
      tabname: '',
      tabs: [],
      start: 1,
      searching: false,
      searchWord: '',
      tip: '',
      loading: false
    }
  },
  components: {
    listview
  },
  props: {
  },
  created () {
    this.initMenu()
      // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedSearch = _.debounce(this.searchResult, 500)
  },
  mounted () {
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    searchWord: function () {
      if (this.util.isNull(this.searchWord)) {
        this.searching = false
        this.tip = 'input is null!'
      } else {
        this.searching = true
        var that = this
        this.loading = true
        this.tip = 'Waiting for you to stop typing...'
        setTimeout(() => {
          that.tip = ''
        }, 1000)
      }
    }
  },
  methods: {
    // 搜素新闻
    searchResult: function (page, callback) {
      if (this.util.isNull(this.searchWord)) {
        this.tip = '关键字为空！'
        this.searching = false
        return
      }
      this.searching = true
      var that = this
      if (page > 1) {
        return
      }
      this.xRequest.searchNews(that.searchWord, (result) => {
        that.loading = false
        callback(result)
        window.console.log('searchResult:', result)
      })
    },
    initMenu: function () {
      var that = this
      this.xRequest.getNewsChannel((result) => {
        that.loading = false
        that.tabs = result.result
        that.$nextTick(() => {
          that.tabname = that.tabs[0]
        })
        window.console.log('getNewsChannel:', that.tabs[0])
      })
    },
    // 回调方法
    clickTab: function (tab, callback) {
      this.tabname = tab
      console.log(this.tabname)
    },
    getMoreData: function (page, callback) {
      this.loading = true
      this.xRequest.getNewsList(this.tabname, page, (result) => {
        this.data = result
        callback(result)
        window.console.log('getMoreData:', this.tabname, page, result)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.content{
  width: 99%;
  height: 92%;
  position: absolute;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: start; 
  align-content: center; 
}

.newswraper{
  position: relative;
  width: 100%;
  height: 100%;
  margin: 50px 0 0 0; 
}

.searchBar{
  padding: 10px;
  position: absolute;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: start; 
  align-content: center;
  background: #c5d9f0;
}

span{
  width: 80%;
}
</style>
