/**
 * Created by zhulj on 2020/03/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export default function transJsonToFormData(json) {
  let ret = ''
  for (var it in json) {
    if (ret !== '') {
      ret += '&'
    }
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(json[it])
  }
  return ret
}
