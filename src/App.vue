<template>
  <div id="app">
    <!-- 对特定的组件页面进行缓存，防止切换path之后重建页面 -->
    <keep-alive>
     <router-view v-if="this.$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
     <div class="navigator">
        <ul class="nav-list">
          <li class="app-li" v-for="(item, index) in tabList" :key="index"
            @click="switchTab(index)">
            <div class="menu-wraper">
                <img style="width:20px;height:20px" :src="currentPage === index?item.checksrc:item.src"/>
                <a class="app-a" v-bind:class="{active: currentPage === index}">
                  {{ item.txt }}
                </a>
            </div> 
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
// import { ENDED, LIVE, CONCERN } from './common/config/tabs'
// import MatchList from './components/match-list'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      currentPage: 0,
      tabList: [
        {
          txt: '球赛',
          type: 0,
          src: require('./assets/race.png'),
          checksrc: require('./assets/race_check.png')
        },
        {
          txt: '新闻',
          type: 1,
          src: require('./assets/news.png'),
          checksrc: require('./assets/news_check.png')
        },
        {
          txt: '博客',
          type: 2,
          src: require('./assets/boke.png'),
          checksrc: require('./assets/boke_check.png')
        }, {
          txt: '新增',
          type: 3,
          src: require('./assets/add.png'),
          checksrc: require('./assets/add_check.png')
        }
      ]
    }
  },
  mounted () {
    this.$router.push('/first')
    // this.gp(1000).then(r => console.log(r))
    this.aa('测试')
  },

  computed: {
    // 使用computed标识符，监听store的状态量
    currentTab: function () {
      window.console.log('tab页面改变' + this.$store.state.currentTab)
      return this.$store.state.currentTab
    }
  },
  watch: {
    currentTab: function (newVal, oldVal) {
      this.currentPage = newVal
      this.switchTab(this.currentPage)
    }
  },
  methods: {
    // 映射action,并且定义 action的别名，使用起来更方便
    ...mapActions([
      'actionA',
      'delaySet',
      'getPromise', // map `this.getPromise(time)` to `this.$store.dispatch('getPromise', time)`
      'AsyncMid',
      'AsyncTop'
    ]),
    ...mapActions({
      gp: 'getPromise', // map 'this.gp(time) to this.getPromise(time)'
      aa: 'AsyncTop'
    }),

    switchTab (index) {
      if (this.currentPage === index) {
        return
      }
      this.currentPage = index
      switch (index) {
        case 0:
          this.$router.replace('/first')
          break
        case 1:
          this.$router.replace('/second')
          break
        case 2:
          this.$router.replace('/third')
          break
        case 3:
          this.$router.replace('/fourth')
          break
        default:
          break
      }
    }
  },
  components: {

  }
}
</script>

<style>
  #app{
    width: 100%;
    height: 100%;
  }
  .navigator{ 
    position: absolute; 
    bottom: 0px;
    height: 8%;
    width: 100%;
    font-size: 15px;
  }
  .nav-list{
    background: rgb(171, 173, 173);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    align-content: center;
  }
  .app-li{
    text-align: center;
    line-height: 50px;
    height: 50px;
    max-width: 20%;
    font-size: 15px;
    width: 60px;
    color: #E0E4E8;
  }

  .menu-wraper{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .app-a{
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    height: 20px;
    width: auto;
  }
  .active{
    color: rgb(39, 152, 218);
  }
</style>
