
<template>
  <van-config-provider :theme-vars="themeVars">
  <div class="approve">
    <van-nav-bar
      :title="title"
      @click-left="onClickLeft"
      left-arrow
    />
    <van-cell class="vanContent">
      <div class="content">
        <div class="text">申请编号</div>
        <div class="title">{{ data.response.apply_no }}</div>
      </div>
      <div class="content">
        <div class="text">申请人</div>
        <div class="title">{{ data.response.apply_user_name }}</div>
      </div>
      <div class="content">
        <div class="text">申请日期</div>
        <div>{{ data.response.apply_date }}</div>
      </div>
      <div class="content">
        <div class="text">所属部门</div>
        <div>{{ data.response.apply_user_dept }}</div>
      </div>
      <div class="content">
        <div class="text">邮箱</div>
        <div>{{ data.response.apply_user_mail }}</div>
      </div>
      <div class="content lastItem">
        <div class="text">电话</div>
        <div>{{ data.response.apply_user_phone }}</div>
      </div>
    </van-cell>
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
        <van-collapse v-model="activeNames">
          <van-collapse-item
            :title="'标题' + (index + 1)"
            :name="index"
            v-for="(item, index) in data.listArr"
            :key="index"
          >
            <van-checkbox :name="item" checked-color="#4A90E5" class="list">
              <van-cell v-if="type === '3'">
                <div class="content">
                  <div class="lot">新保管期限</div>
                  <div class="title">{{ item.xbgqx }}</div>
                </div>
                <div class="content">
                  <div class="lot">原保管期限</div>
                  <div class="title">{{ item.bgqx }}</div>
                </div>

                <div class="content">
                  <div class="lot">档号</div>
                  <div class="title">{{ item.dh }}</div>
                </div>
                <div class="content">
                  <div class="lot name">题名</div>
                  <div class="title">{{ item.tm }}</div>
                </div>
                <div class="content">
                  <div class="lot">责任者</div>
                  <div class="title">{{ item.zrz }}</div>
                </div>
                <div class="content lastItem">
                  <div class="lot">所属档案库</div>
                  <div class="title">{{ item.table_title }}</div>
                </div>
              </van-cell>
              <van-cell v-if="type === '4'">
                <div class="content">
                  <div class="lot">档号</div>
                  <div class="title">{{ item.dh }}</div>
                </div>
                <div class="content">
                  <div class="lot name">题名：</div>
                  <div class="title">{{ item.tm }}</div>
                </div>
                <div class="content">
                  <div class="lot">责任者</div>
                  <div class="title">{{ item.zrz }}</div>
                </div>
                <div class="content lastItem">
                  <div class="lot">所属档案库</div>
                  <div class="title">{{ item.table_title }}</div>
                </div>
              </van-cell>
              <van-cell v-if="type === '5'">
                <div class="content">
                  <div class="lot">新密级</div>
                  <div class="title">{{ item.xmj }}</div>
                </div>
                <div class="content">
                  <div class="lot">原密级</div>
                  <div class="title">{{ item.mj }}</div>
                </div>

                <div class="content">
                  <div class="lot">档号</div>
                  <div class="title">{{ item.dh }}</div>
                </div>
                <div class="content">
                  <div class="lot name">题名</div>
                  <div class="title">{{ item.tm }}</div>
                </div>
                <div class="content">
                  <div class="lot">责任者</div>
                  <div class="title">{{ item.zrz }}</div>
                </div>
                <div class="content lastItem">
                  <div class="lot">所属档案库</div>
                  <div class="title">{{ item.table_title }}</div>
                </div>
              </van-cell>
              <van-cell v-if="type === '6'">
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
import { getApplyDataApi, getApplyListApi, approveApi } from "@/api/index.js";
let data = reactive({ response: {}, listArr: [] });
const loading = ref(false);
const pageNum = ref(1);
const title = ref("");
const applyId = ref("");
const finished = ref(false);
const isCheckAll = ref(false);
const checkedResult = ref([]);
const isIndeterminate = ref(false);
const archivesApproveList = reactive({
  3: "价值鉴定",
  4: "销毁鉴定",
  5: "降解密鉴定",
  6: "开放划控鉴定",
});
const type = ref("");
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
    const { content } = await getApplyDataApi(applyId.value);
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
  console.log(Stats, "阿萨大大");
  let params = {
    page: pageNum.value,
    size: 20,
    apply_no: applyId.value,
    searchTxt: "",
    flag: true,
    apply_state: 1,
    state: 0,
  };
  try {
    const { status, content, message } = await getApplyListApi(params);
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
        }
      }

      console.log(data.listArr);
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
//同意 驳回
const addApprove = async (workItemState, approvalOpinion) => {
  let applyDataIdList = checkedResult.value.map((item) => item.apply_data_id);
  let params = {
    appType: type.value,
    approvalOpinion,
    id: applyId.value,
    applyDataIdList,
    workItemState,
  };
  console.log(params);
  try {
    const { status, message } = await approveApi(params);
    console.log(status);
    if (status) {
      showNotify({
        message: message,
        type: "primary",
      });
      // pageNum.value = 1
      // getBorrowChildInfo(1)
    } else {
      showNotify({
        message: message,
        type: "danger",
        background: "#fef0f0",
        border: "#fde2e2",
        color: "#f56c6c",
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

  pageNum.value = 1;
  if (route.query.type) {
    type.value = route.query.type;
    title.value = archivesApproveList[type];
  }
  if (route.query.applyId) {
    applyId.value = route.query.applyId;
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

:deep(.van-cell) {
  background: #fff !important;
  margin: 10px 10px 10px 10px !important;
  width: 95% !important;
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
  margin-bottom: 10px;
}

:deep(.van-button--block) {
  width: 80%;
}
.btns {
  width: 100%;
  padding: 0 10px;
}
:deep(.van-checkbox__icon) {
  padding-left: 10px;
}

:deep(.van-list__finished-text) {
  background: #fff;
}

.btn {
  width: 100%;
  /* margin-top: 10px; */
  /* display: flex;
  justify-content: center; */
}
:deep(.van-checkbox__label) {
  width: 100%;
}

.lastItem {
  border-bottom: none;
}
.checkbox {
  display: flex;
  padding: 10px 10px 10px 0px;
  font-size: 14px;
  margin: 10px;
  background: #fff;
}
:deep(.van-collapse-item) {
  margin-bottom: 12px;
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
  margin-left: 25px;
}

.name {
  width: 56px;
}

.dan {
  margin-top: 10px;
}
:deep(.van-collapse-item__wrapper) {
  /* display: flex; */
  margin: 0 auto;
  width: 95%;
}
:deep(.van-collapse-item__content) {
  /* display: flex; */
  margin: 0 auto;
  width: 95%;
}
.vanContent {
  padding-bottom: 0px;
  padding-top: 0px;
}
</style>
