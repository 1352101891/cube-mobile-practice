<template>
  <div class="rightroot">
      <div class="wrap"   v-show="!isSuccess || isLoading">
        <div v-if="isLoading" id='circle'></div> 
        <p v-if="isLoading">Loading...</p>
        <div v-if="!isSuccess && !isLoading" class="error">
            {{errorMess}}
        </div>
      </div>
      
      <h2  v-if="isSuccess" >博客列表</h2>
      <table v-if="isSuccess" cellspacing="3" class="content">        
          <tr class="tr_title">
            <th class='th_title'>
              标题
            </th>
            <th class='th_title'>
              用户
            </th>
            <th class='th_content'>
              内容
            </th>
            <th class='th_content'>
              时间
            </th>
          </tr>          
          <tr class="tr_content" v-for="(item, index) in newslist" @click="clickitem(item)" :key="index">
            <th class='th_title'>
              {{item.title}}
            </th>
            <th class='th_title'>
              {{item.username}}
            </th>
            <th class='th_content'>
                {{item.content}}
            </th>
            <th class='th_content'>
                {{item.time}}
            </th>
          </tr>
      </table>
  </div>
</template>

<script>
import constants from '../../util/Constants.js'

export default {
  name: 'newslist',
  data () {
    return {
      newslist: [], // 显示菜单名称的属性
      isLoading: true,
      isSuccess: false,
      errorMess: ''
    }
  },
  created: function () {
    console.log('create')
  },
  // 进入路由之前
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.getData(0)
    })
  },

  methods: {
    getData: function (page) {
      var diskList = this.util.getNewsFromDisk()
      var that = this
      setTimeout(() => {
        that.newslist = constants.newsList.concat(diskList)
        that.isLoading = false
        that.isSuccess = true
      }, 500)
    },
    clickitem: function (item) {
      // '/user/main/addnews'
      // { name: 'detail', params: { news: item}}
      this.$router.replace({name: 'fifth', params: {news: item}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.rightroot{
  width: 99%;
  height: 92%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  position:absolute;
  overflow: auto;
}

.wrap{
  width: 100%;
  height: 90%;
  position: relative;
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  align-content: center; 
}

.content{
  margin: 30px 0;
  width: 100%;
  height: auto;
}

table{
  margin-top: 10px;
}

.tr_title{
  background:#ffffff;box-shadow: 1px 5px 20px #888888;
}
.tr_content{
  background:#eff0ef;box-shadow: 1px 1px 2px #888888;
}

.th_title{
    padding: 10px;
    width: 20px;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}
.th_content{
    width: 100px;
    height: 20px;
    overflow: hidden;
    max-width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}

a {
  color: #094127;
}
 #circle{
    
    width: 100px;
    height: 100px;
    border: 20px #ffffff00 solid;
    border-left-color: #ff5500;
    border-right-color:#0c80fe;
    border-radius: 100%;
    animation: loading1 1s infinite linear;
  }
  @keyframes loading1{
      from{transform: rotate(0deg)}to{transform: rotate(360deg)}
  }
</style>
