


<template>
  <van-config-provider :theme-vars="themeVars">
    <div class="approve">
      <van-nav-bar :title="title" @click-left="onClickLeft" left-arrow />
      <van-cell class="vanContent">
        <div class="content">
          <div class="text">借阅类型</div>
          <div class="title">{{ data.response.use_mode }}</div>
        </div>
        <div class="content">
          <div class="text">借阅单号</div>
          <div class="title">{{ data.response.id }}</div>
        </div>
        <div class="content">
          <div class="text">申请人</div>
          <div class="title">{{ data.response.user_name }}</div>
        </div>
        <div class="content">
          <div class="text">所属部门</div>
          <div>{{ data.response.dep_name }}</div>
        </div>
        <div class="content">
          <div class="text">邮箱</div>
          <div class="title">{{ data.response.user_mail }}</div>
        </div>
        <div class="content">
          <div class="text">电话</div>
          <div class="title">{{ data.response.user_tel }}</div>
        </div>
        <div class="content">
          <div class="text">利用方式</div>
          <div class="title">{{ data.response.use_mode_value }}</div>
        </div>
        <div class="content">
          <div class="text">借阅天数</div>
          <div class="title">{{ data.response.borrow_days }}</div>
        </div>

        <div class="content lastItem">
          <div class="text">借阅目的</div>
          <div class="title">{{ data.response.borrow_purpose }}</div>
        </div>
      </van-cell>
      <!-- <van-divider content-position="left">     -->
      <div class="checkbox" v-if="data.listArr.length">
        <van-checkbox
          v-model="isCheckAll"
          icon-size="20px"
          :indeterminate="isIndeterminate"
          @change="checkAllChange"
          shape="square"
          checked-color="#4A90E5"
        >
          <span class="all">全选</span>
        </van-checkbox>
      </div>
      <van-list
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
          <van-collapse v-model="activeNames">
            <van-collapse-item
              :title="'标题' + (index + 1)"
              :name="index"
              v-for="(item, index) in data.listArr"
              :key="index"
            >
              <van-checkbox :name="item" checked-color="#4A90E5" class="list">
                <van-cell>
                  <div class="content">
                    <div class="lot name">题名</div>
                    <div class="title">{{ item.tm }}</div>
                  </div>
                  <div class="content">
                    <div class="lot">密级</div>
                    <div class="title">{{ item.mj }}</div>
                  </div>
                  <div class="content">
                    <div class="lot">保管期限</div>
                    <div class="title">{{ item.bgqx }}</div>
                  </div>
                  <div class="content lastItem">
                    <div class="lot">档号</div>
                    <div class="title">{{ item.dh }}</div>
                  </div>
                </van-cell>
              </van-checkbox>
            </van-collapse-item>
          </van-collapse>
        </van-checkbox-group>
      </van-list>
      <div class="btnList">
        <div class="btns">
          <van-button
            plain
            type="primary"
            class="btn"
            @click="addApprove(2, '驳回')"
            >不同意</van-button
          >
        </div>
        <div class="btns">
          <van-button
            type="primary"
            color="#4A90E5"
            class="btn"
            @click="addApprove(1, '同意')"
            >同意</van-button
          >
        </div>
      </div>
    </div>
  </van-config-provider>
</template>

<script setup >
import { reactive, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { showNotify } from "vant";
import {
  getDetailsInfoApi,
  getBorrowChildInfoApi,
  addApproveApi,
} from "@/api/index.js";
let data = reactive({ response: {}, listArr: [] });
const loading = ref(false);
const pageNum = ref(1);
const title = ref("");
const finished = ref(false);
const applyId = ref("");
const unit_id = ref("");
const type = ref("");
const activeNames = ref([""]);
const isCheckAll = ref(false);
const checkedResult = ref([]);
const isIndeterminate = ref(false);

const checkAllChange = (val) => {
  checkedResult.value = val ? data.listArr : [];
  isIndeterminate.value = false;
};
const themeVars = reactive({
  navBarIconColor: "#000",
});
const checkedResultChange = (value) => {
  const checkedCount = value.length;
  isCheckAll.value = checkedCount === data.listArr.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < data.listArr.length;
};
const onClickLeft = () => history.back();
const text = ref("没有更多了");
const getDetailsInfo = async () => {
  try {
    const { content } = await getDetailsInfoApi(applyId.value, unit_id.value);
    data.response = content;
  } catch (err) {
    showNotify({
      message: err.message,
      type: "danger",
      background: "#fef0f0",
      border: "#fde2e2",
      color: "#f56c6c",
    });
  }
};
const getBorrowChildInfo = async (Stats = 0) => {
  let params = {
    flag: true,
    id: applyId.value,
    keyword: "",
    pageNum: pageNum.value,
    pageSize: 20,
    state: 0,
  };
  try {
    const { status, content, message } = await getBorrowChildInfoApi(params);
    if (status) {
      if (Stats) {
        isCheckAll.value = false;
        data.listArr.length = 0;
        data.listArr.push(...content?.list);
        pageNum.value += 1;
        loading.value = false;
      } else {
        if (content.list.length) {
          data.listArr.push(...content?.list);
          pageNum.value += 1;
          loading.value = false;
        } else {
          finished.value = true;
          text.value = "暂无数据";
        }
      }
    } else {
      isCheckAll.value = false;
      data.listArr.length = 0;
      text.value = "暂无数据";
      finished.value = true;
      showNotify({
        message: message,
        type: "danger",
        background: "#fef0f0",
        border: "#fde2e2",
        color: "#f56c6c",
      });
    }
  } catch (err) {
    finished.value = true;
    showNotify({
      message: err.message,
      type: "danger",
      background: "#fef0f0",
      border: "#fde2e2",
      color: "#f56c6c",
    });
  }
};
const addApprove = async (workItemState, approvalOpinion) => {
  let applyDataIdList = checkedResult.value.map((item) => item.id);
  let params = {
    appType: type.value,
    approvalOpinion,
    id: applyId.value,
    ids: applyDataIdList,
    workItemState,
  };
  try {
    const { status, message } = await addApproveApi(params);
    console.log(status, message);
    if (status) {
      showNotify({
        message: message,
        type: "primary",
      });
    }
  } catch (err) {
    showNotify({
      message: err.message,
      type: "danger",
      background: "#fef0f0",
      border: "#fde2e2",
      color: "#f56c6c",
    });
  } finally {
    pageNum.value = 1;
    getBorrowChildInfo(1);
  }
};
onMounted(() => {
  const route = useRoute();
  let params={
    1:'电子借阅审批',
    2:'实体借阅审批',
    9:'查档预约审批'
  }
  title.value=params[route.query.type]
  if (route.query.type) {
    type.value = route.query.type;
  }
  if (route.query.applyId) {
    applyId.value = route.query.applyId;
  }
  if (route.query.unit_id) {
    unit_id.value = route.query.unit_id;
  }
  getDetailsInfo();
});
</script>
<style scoped >
.approve {
  width: 100%;
  min-height: 100vh;
  background: #e6e6e6;
}
.content {
  font-size: 16px;
  line-height: 32px;
  display: flex;
  align-items: center;
  min-height: 44px;
  border-bottom: 1px solid #e6e6e6;
}
.btns {
  width: 100%;
  padding: 0 10px;
}
:deep(.van-cell) {
  background: #fff !important;
  margin: 0px 10px !important;
  width: 95% !important;
}
:deep(.van-checkbox__label) {
  width: 100%;
}
:deep(.van-cell) {
  background: #fff !important;
  margin: 0px 10px !important;
  width: 95% !important;
}
:deep(.van-collapse-item__wrapper) {
  /* display: flex; */
  margin: 0 auto;
  width: 95%;
}
:deep(.van-collapse-item) {
  margin-bottom: 12px;
}
:deep(.van-collapse-item__content) {
  /* display: flex; */
  padding-bottom: 0px;
  padding-top: 0px;
  margin: 0 auto;
  width: 95%;
}
.item {
  padding: 20px;
}
.text {
  color: #666666;
  font-size: 16px;
  font-weight: 400;
  width: 100px;
}
.lot {
  color: #666666;
  font-size: 16px;
  font-weight: 400;
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
:deep(.van-checkbox) {
  width: 100%;
  background: #fff;
  /* margin-bottom: 10px; */
}

:deep(.van-button--block) {
  width: 80%;
}
:deep(.van-checkbox__icon) {
  padding-left: 10px;
}
:deep(.van-list__finished-text) {
  background: #fff;
}
.btn {
  width: 100%;
}
.checkbox {
  display: flex;
  padding: 10px 10px 10px 0px;
  font-size: 14px;
  margin: 10px;
  background: #fff;
}
.list {
  padding: 0 10px;
}
.btnList {
  margin: 10px 10px 0px 10px;
  padding: 10px 0px;
  /* width: 100%; */
  background: #fff;
  display: flex;
  justify-content: center;
}
.all {
  margin-left: 12px;
}
.name {
  width: 56px;
}
.dan {
  margin-top: 10px;
}
.lastItem {
  border-bottom: none;
}
.vanContent {
  padding-bottom: 0px;
  padding-top: 0px;
}
</style>
