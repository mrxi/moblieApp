
import { createStore,useStore} from 'vuex'
console.log(useStore,'useStore')
import getters from './getters'
// 创建一个新的 store 实例
const modulesFiles = import.meta.glob('./modules/*.js',{ eager: true }); // 异步方式
 
let modules = {}
for (const [key, value] of Object.entries(modulesFiles)) {
  var moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
  const name = moduleName.split('/')[1]
  modules[name] = value.default
}
 
const store = createStore({
  modules,
  getters
})
 
export default store
