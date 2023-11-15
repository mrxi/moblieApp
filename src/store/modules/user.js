import { getToken, setToken} from '@/utils/auth'
import { loginSuccessAction} from '@/api/index'
const state = {
  token: getToken(),
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}
const actions = {
  // login by token
  tokenLogin({ commit }, data) {
    commit('SET_TOKEN', data.access_token);
    setToken(data.access_token);
    window.sessionStorage.setItem('expires_in', data.expires_in);
    window.sessionStorage.setItem('login_time', Date.now());
    loginSuccessAction({
      token: data.access_token,
      expires_in: data.expires_in,
      refresh_token: data.refresh_token,
      user_id: data.user_id
    });
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}