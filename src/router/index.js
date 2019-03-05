import Vue from 'vue'
import VueRouter from 'vue-router'
import firstpage from '../components/mainpage/firstpage.vue'
import scrollnews from '../components/mainpage/ScrollNews.vue'
import newslist from '../components/mainpage/NewsList.vue'
import addnews from '../components/mainpage/AddNews.vue'
import newsdetail from '../components/mainpage/NewsDetail.vue'
Vue.use(VueRouter)

// 1. Define route components.
// These can be imported from other files
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '/first',
    component: firstpage,
    meta: {
      keepAlive: true // 需要缓存
    }
  },
  { path: '/second',
    component: scrollnews,
    meta: {
      keepAlive: true // 需要缓存
    }
  },
  { path: '/third',
    component: newslist,
    meta: {
      keepAlive: true // 需要缓存
    }
  },
  { path: '/fourth',
    component: addnews,
    meta: {
      keepAlive: true // 需要缓存
    }
  }, {
    path: '/fifth',
    name: 'fifth',
    component: newsdetail,
    meta: {
      keepAlive: false // 不需要缓存
    }
  }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.

// Now the app has started!

export default router
