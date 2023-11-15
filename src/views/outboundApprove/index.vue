



<template>
  <div class="approve">
    <van-nav-bar :title="title" />
    <van-cell>
      <div class="content">
        <div class="text">单据来源：</div>
        <div class="title">{{ data.response.use_mode }}</div>
      </div>
      <div class="content">
        <div class="text">单据号：</div>
        <div class="title">{{ data.response.id }}</div>
      </div>
      <div class="content">
        <div class="text">申请人：</div>
        <div class="title">{{ data.response.user_name }}</div>
      </div>
      <div class="content">
        <div class="text">申请日期：</div>
        <div>{{ data.response.user_tel }}</div>
      </div>
      <div class="content">
        <div class="text">所属部门：</div>
        <div>{{ data.response.dep_name }}</div>
      </div>
    </van-cell>
    <!-- <van-divider content-position="left">     -->
    <div class="checkbox">
      <van-checkbox
        v-model="isCheckAll"
        icon-size="20px"
        :indeterminate="isIndeterminate"
        @change="checkAllChange"
        shape="square"
        checked-color="#4A90E5"
      >
        全选
      </van-checkbox>
    </div>
    <!-- </van-divider> -->

    <!-- <van-cell  >
      <div class="content">
        <div class="lot"> 申请的批次内容：</div>
        <div class="title">哈哈哈哈哈哈哈</div>
      </div>
    </van-cell> -->
    <van-list
      class="list"
      v-model:loading="loading"
      :finished="finished"
      :finished-text="text"
      @load="getBorrowChildInfo"
    >
      <van-checkbox-group
        v-model="checkedResult"
        @change="checkedResultChange"
        shape="square"
      >
        <van-checkbox
          v-for="(item, index) in data.listArr"
          :key="index"
          :name="item"
          checked-color="#4A90E5"
        >
          <van-cell>
            <!-- <div>
        <div>
          <van-checkbox v-model="checked"></van-checkbox>
        </div>
      </div> -->
            <div class="content">
              <div class="lot">题名：</div>
              <div class="title">{{ item.tm }}</div>
            </div>
            <div class="content">
              <div class="lot">密级：</div>
              <div class="title">{{ item.mj }}</div>
            </div>

            <div class="content">
              <div class="lot">保管期限：</div>
              <div class="title">{{ item.bgqx }}</div>
            </div>
            <div class="content">
              <div class="lot">档号：</div>
              <div class="title">{{ item.dh }}</div>
            </div>
          </van-cell>
        </van-checkbox>
      </van-checkbox-group>
    </van-list>
    <div class="btn">
      <van-button type="primary" block @click="addApprove" color="#4A90E5">同意</van-button>
    </div>
    <div class="btn">
      <van-button type="danger" block @click="addApprove">拒绝</van-button>
    </div>
  </div>
</template>

<script setup >
import { reactive, onMounted, ref } from "vue";
import { showNotify } from "vant";
import { getBorrowChildInfoApi ,getDetailsInfoApi} from "@/api/index.js";
let data = reactive({ response: {}, listArr: [] });
const loading = ref(false);
const pageNum = ref(1);
const title = ref("出库申请审批");
const finished = ref(false);

const isCheckAll = ref(false);
const checkedResult = ref([]);
const isIndeterminate = ref(false);

const checkAllChange = (val) => {
  checkedResult.value = val ? data.listArr : [];
  isIndeterminate.value = false;
};

const checkedResultChange = (value) => {
  const checkedCount = value.length;
  isCheckAll.value = checkedCount === data.listArr.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < data.listArr.length;
};
const text = ref("没有更多了");
const getDetailsInfo = async () => {
  try {
    const { content } = await getDetailsInfoApi(
      "STJY20230925001",
      "F903E03CC7C34F539CDE9B353A7E2A8D"
    );
    data.response = content;
  } catch (err) {
    showNotify({
      message: err.message,
      type: "danger",
      background: '#fef0f0',
        border: '#fde2e2',
        color:'#f56c6c'
    });
  }
};
const getBorrowChildInfo = async () => {
  let params = {
    pageNum: pageNum.value,
    pageSize: 20,
    id: "STJY20230925001",
    keyword: "",
    flag: false,
  };

  try {
    const { status, content, message } = await getBorrowChildInfoApi(params);
    if (status) {
      data.listArr = content?.list;
      loading.value = false;
      if (content.list.length) {
        pageNum.value += 1;
        finished.value = true;
      }
    } else {
      text.value = "暂无数据";
      loading.value = false;
      finished.value = true;
      showNotify({
        message: message,
        type: "danger",
        background: '#fef0f0',
        border: '#fde2e2',
        color:'#f56c6c'
        
      });
    }
  } catch (err) {
    showNotify({
      message: err.message,
      type: "danger",
      background: '#fef0f0',
        border: '#fde2e2',
        color:'#f56c6c'
    });
  }
};
const addApprove = async () => {
  let params = {
    appType: "2",
    approvalOpinion: "驳回",
    id: "STJY20230920010",
    ids: [],
    workItemState: 2,
  };
  try {
    const {
      content: { list },
    } = await addApproveApi(params);
    data.listArr = list;
  } catch (err) {
    showNotify({
      message: err.message,
      type: "danger",
      background: '#fef0f0',
        border: '#fde2e2',
        color:'#f56c6c'
    });
  }
};
onMounted(() => {
  getDetailsInfo();
  getBorrowChildInfo();
});
</script>
<style scoped >
.approve {
  width: 100%;
  min-height: 100vh;
  background: #fff;
}
.content {
  font-size: 14px;
  height: 30px;
  display: flex;
  align-items: center;
}
.item {
  padding: 20px;
}
.text {
  font-size: 16px;
  font-weight: bold;
  width: 100px;
}
.lot {
  font-size: 16px;
  font-weight: bold;
}
.span {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

:deep(.van-cell__value) {
  color: black;
  text-align: left;
}
:deep(.van-button--block) {
  width: 80%;
}
.btn {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
.checkbox {
  display: flex;
  margin: 20px 0 0 20px;
  font-size: 14px;
}
.list {
  padding: 20px;
}
</style>
