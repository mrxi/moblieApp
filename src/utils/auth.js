import Cookies from 'js-cookie'

const TokenKey = 'access_token'

export function getToken() {
  const expires_in = window.sessionStorage.getItem('expires_in')
  const login_time = window.sessionStorage.getItem('login_time')
  if (parseInt(login_time) + parseInt(expires_in * 1000) < Date.now()) {
    return false
  }
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
