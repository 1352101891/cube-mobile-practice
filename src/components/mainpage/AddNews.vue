<template>
  <div class="rightroot">
      <div class="wrap">
        <h2>新增新闻</h2>
        <table class="table-wraper">
          <tr>
            <th>
             标题：<input class="input_title" v-model="title" type="text" placeholder="请输入3位字符以上的标题"/>
            </th>
          </tr>
          <tr>
            <th>
             内容：<input class="input_content" v-model="content" type="textarea" placeholder="请输入20位字符以上的新闻内容"/>
            </th>
          </tr>
          <tr>
            <th>
              <button class="submit" @click="submit">提交</button>
            </th>
          </tr>
        </table>
      </div>
  </div>
</template>

<script>
import constants from '../../util/Constants.js'

export default {
  name: 'addnews',
  data () {
    return {
      newslist: [], // 显示菜单名称的属性
      title: '',
      content: '',
      isLoading: true,
      isSuccess: false,
      errorMess: ''
    }
  },
  created: function () {
    this.getData(0)
  },
  methods: {
    submit: function () {
      if (!window.localStorage) {
        alert('浏览器不支持localstorage')
        return false
      } else {
        var un = sessionStorage.getItem('username')
        var NewsEntity = {
          username: un,
          time: this.getNowFormatDate(),
          title: this.title,
          content: this.content
        }
        if (this.util.isNull(this.title) || this.util.isNull(this.content)) {
          alert('不允许为空!')
          return
        }
        this.util.saveNewsToDisk(NewsEntity)
        this.$store.commit('setCurrentTab', {position: 2})
        this.$router.replace('/third')
      }
    },
    // 获取当前时间，格式YYYY-MM-DD
    getNowFormatDate: function () {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    getData: function (page) {
      var that = this
      setTimeout(() => {
        that.newslist = constants.newsList
        that.isLoading = false
        that.isSuccess = true
      }, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rightroot{
  width: 100%;
  height: 92%;
  align-items: center;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

}

.wrap{
  width: 100%;
  height: 100%;
  position: relative; 
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  flex-direction: column;
}

.table-wraper{
  height: 70%;
  width: 90%;
  background:#ffffff;box-shadow: 5px 5px 20px #8cb4fd;
}

tr{
  padding: 0;
  width: auto;
  height: auto;
}

th{ 
  text-align:center;/** 设置水平方向居中 */
  vertical-align:middle/** 设置垂直方向居中 */ 
}

.input_title{
  border: 1px solid #90918e;
  width: 300px;
  height: auto;
}

button{
  margin-top: 10px;
  width: 200px;
  height: 30px;
}

.input_content{
  border: 1px solid #90918e;
  width: 300px;
  height: 100px;
}

</style>
