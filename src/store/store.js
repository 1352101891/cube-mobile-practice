import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    currentTab: Number
  },
  mutations: {
    setCurrentTab (state, payload) {
      state.currentTab = payload.position
      window.console.log('position:' + payload.position)
    }
  },
  actions: {
    // 参数是对象展开语法
    actionA ({dispatch, commit}, prom) {
      prom().then(r => console.log(r))
    },

    // action中的执行都是异步操作，因此可以执行耗时任务
    delaySet ({commit}, time) {
      setTimeout(() => {
        window.console.log('延迟：' + time + 'ms，设置tab')
        // commit('setCurrentTab', {position: 1})
      }, time)
    },

    // 如何确定当前任务是否完成呢，那么返回promise对象，用来判断状态
    getPromise ({dispatch, commit}, time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('延迟' + time + 'ms,成功')
        }, time)
      })
    },
    // 测试async和await标记符
    async  AsyncMid ({dispatch, commit}, name) {
      let pro = await function () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(name + '延迟1秒计算position')
          }, 1000)
        })
      }
      dispatch('actionA', pro)
    },
    // 测试async和await标记符
    async  AsyncTop ({dispatch, commit}, name) {
      await dispatch('AsyncMid', name)
      dispatch('delaySet', 1000)
    }
  }
})
