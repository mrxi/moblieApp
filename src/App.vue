
<template>
   <router-view></router-view>
</template>
<script>
import { ref } from 'vue';
import { showToast } from 'vant';
export default {
    setup() {
    const value = ref(50);
    const onChange = (value) => showToast('当前值：' + value);
    return {
      value,
      onChange,
    };
  },
}
</script>
