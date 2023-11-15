


<template>
  <div class="approve">
    <van-nav-bar title="审批" />
    <van-cell>
      <div class="content">
        <div class="text">借阅类型：</div>
        <div class="title">{{ data.response.use_mode }}</div>
      </div>
      <div class="content">
        <div class="text">借阅单号：</div>
        <div class="title">{{ data.response.id }}</div>
      </div>
      <div class="content">
        <div class="text">申请人：</div>
        <div class="title">{{ data.response.user_name }}</div>
      </div>
      <div class="content">
        <div class="text">所属部门：</div>
        <div>{{ data.response.dep_name }}</div>
      </div>
      <div class="content">
        <div class="text">邮箱：</div>
        <div class="title">{{ data.response.user_mail }}</div>
      </div>
      <div class="content">
        <div class="text">电话：</div>
        <div class="title">{{ data.response.user_tel }}</div>
      </div>
      <div class="content">
        <div class="text">利用方式：</div>
        <div class="title">{{ data.response.use_mode_value }}</div>
      </div>
      <div class="content">
        <div class="text">借阅天数：</div>
        <div class="title">{{ data.response.borrow_days }}</div>
      </div>
      <div class="content">
        <div class="text">借阅目的：</div>
        <div class="title">{{ data.response.borrow_purpose }}</div>
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
<van-checkbox-group v-model="checkedResult" @change="checkedResultChange"  shape="square">
  <van-checkbox v-for="(item, index) in data.listArr" :key="index" :name="item" checked-color="#4A90E5">
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
import { reactive, onMounted ,ref} from "vue";
import { showNotify } from "vant";
import {
  getDetailsInfoApi,
  getBorrowChildInfoApi,
  addApproveApi,
} from "@/api/index.js";
let data = reactive({ response: {}, listArr: [] });
    const loading = ref(false);
    const pageNum = ref(1);
    const finished = ref(false);

const isCheckAll = ref(false);
const checkedResult = ref([]);
const isIndeterminate = ref(false);

const checkAllChange = (val) => {
  checkedResult.value = val ? data.listArr  : []
  isIndeterminate.value = false
}

const checkedResultChange = (value) => {
  const checkedCount = value.length
  isCheckAll.value = checkedCount === data.listArr .length
  isIndeterminate.value = checkedCount > 0 && checkedCount < data.listArr .length
}
    const text = ref('没有更多了');
const getDetailsInfo = async () => {
  try {
    const { content } = await getDetailsInfoApi(
      "STJY20230927001",
      "F903E03CC7C34F539CDE9B353A7E2A8D"
    );
    data.response = content;
  } catch (err) {
    showNotify({
      message:err.message,
      type: "danger",
      background: '#fef0f0',
        border: '#fde2e2',
        color:'#f56c6c'
    });
  }
};
const getBorrowChildInfo = async () => {
  let params = {
    flag: false,
    id: "STJY20230925001",
    keyword: "",
    pageNum: pageNum.value,
    pageSize: 20,
  };
  try {
    const {
      status, content,message
    } = await getBorrowChildInfoApi(params);
    if(status){
      data.listArr = content?.list;
      let arr=[{
        
        "id": "7D1E48324DE840FAA90F98A6FF0A9FD59",
        "use_mode_value": "出库",
        "use_mode": 2,
        "dh": "0001-2014-Y-0006",
        "tm": "关于二狗等四位同志正式任职的通知",
        "mj": "公开",
        "bgqx": "永久",
        "kwh": "0020021A11",
        "table_id": "t_00002",
        "entity_id": "D6A9255EB795439598EAE7C302EE9B2C",
        "state": 1,
        "delegateFlag": null,
        "tableName": null,
        "borrowChildOriginalList": [
            {
                "id": "C769F503E49448B8A32169BB718597AC",
                "file_id": "C523D0F3610A469EBEF24234DA76DB82",
                "file_name": "北京大兴量子工业有限集团党组关于展开第3批党的群众路线教育实践活动的指导意见.pdf",
                "file_type": "初稿",
                "table_id": "t_00002",
                "download_frequency": null,
                "page_range_setting": null,
                "use_mode_read": 0,
                "use_mode_download": 0,
                "use_mode_print": 0,
                "use_mode_copy": 0,
                "use_mode_value": "出库",
                "use_mode": 2,
                "entity_id": "D6A9255EB795439598EAE7C302EE9B2C",
                "borrow_child_id": null,
                "state": 1
            }
        ]
    
},{
  
        
        "id": "7D1E48324DE840FAA90F98A6FF0A9FD5",
        "use_mode_value": "出库",
        "use_mode": 2,
        "dh": "0001-2014-Y-0006",
        "tm": "关于二狗等四位同志正式任职的通知",
        "mj": "公开",
        "bgqx": "永久",
        "kwh": "0020021A11",
        "table_id": "t_00002",
        "entity_id": "D6A9255EB795439598EAE7C302EE9B2C",
        "state": 1,
        "delegateFlag": null,
        "tableName": null,
        "borrowChildOriginalList": [
            {
                "id": "C769F503E49448B8A32169BB718597AC",
                "file_id": "C523D0F3610A469EBEF24234DA76DB82",
                "file_name": "北京大兴量子工业有限集团党组关于展开第3批党的群众路线教育实践活动的指导意见.pdf",
                "file_type": "初稿",
                "table_id": "t_00002",
                "download_frequency": null,
                "page_range_setting": null,
                "use_mode_read": 0,
                "use_mode_download": 0,
                "use_mode_print": 0,
                "use_mode_copy": 0,
                "use_mode_value": "出库",
                "use_mode": 2,
                "entity_id": "D6A9255EB795439598EAE7C302EE9B2C",
                "borrow_child_id": null,
                "state": 1
            },
            
        ]
    

},{
  
        
  "id": "7D1E48324DE840FAA90F98A6FF0A9FD5",
  "use_mode_value": "出库",
  "use_mode": 2,
  "dh": "0001-2014-Y-0006",
  "tm": "关于二狗等四位同志正式任职的通知",
  "mj": "公开",
  "bgqx": "永久",
  "kwh": "0020021A11",
  "table_id": "t_00002",
  "entity_id": "D6A9255EB795439598EAE7C302EE9B2C",
  "state": 1,
  "delegateFlag": null,
  "tableName": null,
  "borrowChildOriginalList": [
      {
          "id": "C769F503E49448B8A32169BB718597AC",
          "file_id": "C523D0F3610A469EBEF24234DA76DB82",
          "file_name": "北京大兴量子工业有限集团党组关于展开第3批党的群众路线教育实践活动的指导意见.pdf",
          "file_type": "初稿",
          "table_id": "t_00002",
          "download_frequency": null,
          "page_range_setting": null,
          "use_mode_read": 0,
          "use_mode_download": 0,
          "use_mode_print": 0,
          "use_mode_copy": 0,
          "use_mode_value": "出库",
          "use_mode": 2,
          "entity_id": "D6A9255EB795439598EAE7C302EE9B2C",
          "borrow_child_id": null,
          "state": 1
      },
      
  ]


}
]
      data.listArr.push(...arr)
      data.listArr.map(item=>{
        item.checked=false
      })
      loading.value = false;
   if(content.list.length){
       pageNum.value+=1
      finished.value = true;
   }
    }else{
      text.value='暂无数据'
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
      message:err.message,
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
.checkbox{
display: flex;
margin: 20px 0 0 20px;
font-size: 14px;
}
.list{
  padding: 20px;
}
</style>
