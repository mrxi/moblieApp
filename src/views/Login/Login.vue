

<template>
  <div class="Login">
    <div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="loginForm.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="loginForm.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin-top: 40px">
          <van-button style="height: 64px;width: 100%;" type="primary" color="#4A90E5"    native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script   >
import { reactive } from "vue";
import { login } from "@/api/index.js";
import { setToken } from "@/utils/auth";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { Encrypt } from "@/utils/secret";
import transJsonToFormData from "@/utils/json-trans";
import router from "@/router";
// import { useStore } from 'vuex'
export default {
  setup() {
    const loginForm = reactive({ username: "", password: "" });
    const onSubmit = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const visitorId = result.visitorId;
      console.log(visitorId, "visitorId");
      loginForm.password = Encrypt(loginForm.password);
      let formData = {
        grant_type: "password",
        username: loginForm.username.trim(),
        password: loginForm.password,
        scope: "all",
      };
      formData = transJsonToFormData(formData);
      const { access_token, expires_in } = await login({ formData, visitorId });
      console.log(access_token, "data");
      //  const store = useStore()  //记得加这一句
      //  console.log(store)
      // const data = response;
      // this.$store.getters.token=access_token
      // commit('SET_TOKEN', data.access_token);
      setToken(access_token);
      window.sessionStorage.setItem("expires_in", expires_in);
      window.sessionStorage.setItem("login_time", Date.now());
      router.push({
        path: "/archivesApprove",
        // query: {
        //     msg: 'hello'
        // }
      });
    };

    return {
      loginForm,
      onSubmit,
    };
  },
};
</script>
<style scoped lang="scss">
.Login {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
