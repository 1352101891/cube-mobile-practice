<template>
  <div class="rightroot">
    
    <div id='arror' @click="back">&lt;-返回</div>
    <div class="wrap">
      
        <h3>{{news.title}}</h3><br>
        <p>{{news.content}}</p>
        <div class="wrap1">
          <p>作者：{{news.username}}</p><p>时间：{{news.time}}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newsdetail',
  data () {
    return {
      errorMess: '',
      news: {}
    }
  },
  created: function () {
    this.news = this.$route.params.news
    this.getData(0)
  },
  methods: {
    getData: function (page) {
      setTimeout(() => {

      }, 500)
    },
    back: function () {
      this.$router.replace('/third')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
.rightroot{
  width: 100%;
  height: 90%;
  position: absolute;
}

.wrap{
  width: 90%;
  height: 80%;
  margin: auto;
  margin-top: 5%;
  position: relative;
  display: flex; 
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: start; 
}


.wrap1{
  position: relative;
  height: auto;
  width: auto;
  margin-left: 70%;
  margin-top: 10%;
  display: flex; 
  flex-direction: column; 
  align-content: space-between; 
}

p{
  display: block;
  float: left;
}
  #arror{
    width: 100px;;
    height: 30px;
    margin-left: 5%;
    margin-top: 5%;
    text-align: center;
    line-height: 30px;
    background: #e3faf0;box-shadow: 5px 5px 20px #8cb4fd;
  }
  #arror:hover{
    color:rgb(78, 78, 250)
  }
  #arror:active {color: #0000FF}


</style>
