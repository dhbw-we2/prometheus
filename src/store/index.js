import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import auth from './auth'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

let store = null
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })
  store = Store
  return Store
}

export { store }
