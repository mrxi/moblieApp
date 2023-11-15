

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="await">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value" :options="option" />
      </van-dropdown-menu>
      <van-cell-group inset>
        <van-field
          v-model="InputValue"
          label="检索"
          clearable
          placeholder="请输入内容"
          input-align="left"
        >
          <template #button>
            <van-button size="small" type="primary">搜索</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(item, index) in list" :key="index">
          <div class="item" @click="details">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="span">创建人:{{ item.name }}</div>
            <div class="span">创建时间：{{ item.timer }}</div>
            <div class="span arrow">
              <div style="flex: 1">详情</div>
              <div><van-icon name="arrow" /></div>
            </div>
            <div></div>
          </div>
        </van-cell>
      </van-list>
      <van-back-top />
    </div>
  </van-pull-refresh>
</template>

<script >
import { reactive, ref } from "vue";

export default {
  setup() {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);

    const onLoad = () => {
      setTimeout(() => {
        if (refreshing.value) {
          list.value = [];
          refreshing.value = false;
        }

        for (let i = 0; i < 10; i++) {
          list.value.push({
            title: ` 档案系统：您有一条全新的档案移交
    代办工作项，请处理！档案系统：您有一条全新的档案移交
    代办工作项，请处理！`,
            name: "张三",
            timer: "2023-9-19",
          });
        }
        loading.value = false;

        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };

    const onRefresh = () => {
      // 清空列表数据
      finished.value = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();
    };

    const value = ref(0);
    const InputValue = ref("");
    const option = [
      { text: "全部商品", value: 0 },
      { text: "新款商品", value: 1 },
      { text: "活动商品", value: 2 },
    ];
    return {
      value,
      option,
      InputValue,
      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
    };
  },
};
</script>
<style scoped >
.item {
  background: #e6e6e6;
  border-radius: 6px;
  margin: 15px;
  height: 140px;
  padding: 10px;
}
.title {
  font-size: 16px;
  line-height: 22px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.span {
  font-size: 14px;
  margin-top: 8px;
}
.line {
  margin-top: 10px;
  width: 100%;
  height: 1px;
  background: #fff;
}
:deep(.van-cell__value) {
  color: black;
  text-align: left;
}
.arrow {
  display: flex;
}
</style>
