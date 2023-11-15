<script >
import {getTokenByTokenKey} from "@/api/index.js";
import { Base64 } from 'js-base64';
import {onMounted,reactive} from 'vue'
import {useStore} from 'vuex'
export default {
   setup(){
const store = useStore()
console.log(store)
    // console.log(useStore,'useStore')
// const store = useStore()
//         console.log(store,'啊飒飒的')
const parseURLHashBegin=function (url) {
      var begin=url.split('#')[0]
      return begin
    };
    //解析URL中的参数和值
    const  parseQueryString=function(url) {
      var objURL = {}
      url.replace(
          new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
          function( $0, $1, $2, $3 ){
              objURL[ $1 ] = $3;
          }
      );
      return objURL
    }

    onMounted(()=>{

      const hash = window.location.hash.slice(1)
  // const  hash="http://218.94.17.130:9919/mobileApp/#/auth-redirect?tokenkey=04D8E1909FE9D7C754369321C70234DC6F873E94A1A147E0BB6419390E7D78AB22C93890F17398636F1D3A213EF2BC1556C54F8A0D445BE593B709EC7B9D371671C78E11B440CF8D63C673F816752E790C5AEC9E4759011D3B8BB11DE2DC5EE72EE4A6&path=aHR0cDovLzIxOC45NC4xNy4xMzA6OTkxOS9tb2JpbGVBcHAvIy9lbnRpdHlBcHByb3Zl&type=1&applyId=DZJY20231010006&unit_id=F903E03CC7C34F539CDE9B353A7E2A8D"
// debugger
    console.log('location.hash:'+hash)
    //获取参数
    var params=parseQueryString(hash)
    var tokenkey=params['tokenkey']
    console.log(tokenkey)
    if(params['path']){
      console.log(decodeURIComponent(params['path']),'path')
    }

    // var tokenData={access_token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJoZWJlaWNlc2hpIiwic2NvcGUiOlsiYWxsIl0sImNvbXBhbnkiOiJQREUiLCJleHAiOjE2NjkzMDc3MTQsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiI2ZmYxYTNjZi01MTdlLTRmNzEtYjZmNi04MWYyMmZkZjZmMTAiLCJjbGllbnRfaWQiOiJwZGUifQ.FIx2r7wHyMLZD3spdux6stg245CGCKkfI4vrnMLvZlA'}
    // if (typeof(tokenData.access_token) != "undefined" && tokenData.access_token != null && tokenData.access_token != ""){
    //     this.$store.dispatch('user/tokenLogin', tokenData)
    //     //跳转的URL
    //     var redirectUrl= Base64.decode(decodeURIComponent(params['path']))
    //     console.log(redirectUrl)
    //     window.location.href=redirectUrl
    //   }

    getTokenByTokenKey(tokenkey).then(async response => {
      const tokenData = response.content
      console.log(tokenData)
      // var tokenData={'access_token':tokenkey}
      if (typeof(tokenData?.access_token) != "undefined" && tokenData?.access_token != null && tokenData?.access_token != ""){
        console.log(store)
      await  store.dispatch('user/tokenLogin', tokenData)
        //跳转的URL
        let redirectUrl = '';
        if(params['path']){
          console.log(decodeURIComponent(params['path']),'decodeURIComponent(params[path])')
          if(decodeURIComponent(params['path']).indexOf('archives-management-system') != -1){
            redirectUrl = decodeURIComponent(params['path']).replace('zhanweimessage_query','&message_query')
          }else{
            redirectUrl = Base64.decode(decodeURIComponent(params['path']))
          }
        }else{
          redirectUrl= parseURLHashBegin(window.location.href)
        }
        if(params['type']){
          redirectUrl+=`?type=${params['type']}`
        }
        if(params['applyId']){
          redirectUrl+=`&applyId=${params['applyId']}`
        }
        if(params['unit_id']){
          redirectUrl+=`&unit_id=${params['unit_id']}`
        }
        console.log(redirectUrl,'redirectUrl')
        window.location.href=redirectUrl
      }
    }).catch(error => {
      console.log(error)
    })

    })


  return {
    parseURLHashBegin,
    parseQueryString
  }
   }
}

  
// }

</script>
