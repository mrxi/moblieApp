import request from '@/utils/request'
//根据SSO TokenKey获取Token
export function getTokenByTokenKey(tokenKey) {
  return request({
    url: '/pdes-ams-sc/open/getToken/' + tokenKey,
    method: 'get'
  })
}
export function login({formData, visitorId}) {
  return request({
    url: '/pdes-security/oauth/token',
    method: 'post',
    data: formData,
    headers: {
      'authentication': visitorId,
      //外部利用人员登录系统应该限制只能登录电子阅览室，登录数字档案系统应该禁止登录，数字档案系统应该只允许内部人员可以识别登录
      // 'loginSource':'sjxt'
    },
  })
}
// 登录成功之后调用接口
export function loginSuccessAction(data) {
  return request({
    headers: {
      'content-type': 'application/json'
    },
    url: `/pdes-security/session/loginSuccess`,
    method: 'post',
    data
  })
}

// 获取借阅详情
export function getDetailsInfoApi(id, unit_id) {
  return request({
    url: `/pdes-ams-ar/arBorrow/getDetailsInfo/${id}/${unit_id}`,
    method: 'post'
  });
}

// 获取借阅子表详情
export function getBorrowChildInfoApi(data) {
  return request({
    url: `/pdes-ams-ar/arBorrow/getBorrowChildInfo`,
    method: 'post',
    data
  });
}
// 实体借阅审批 列表查询
export function addApproveApi(data) {
  return request({
    url: `/pdes-ams-ar/arBorrow/approve`,
    method: 'post',
    data
  });
}

//出库申请 列表查询
export function postSelectListApi(data) {
  return request({
    url: `/pdes-ams-ap/repositoryOut/outRegDetail`,
    method: 'post',
    data
  });
}

// 鉴定单据详情
export function getApplyDataApi(applyId) {
  return request({
    url: `/pdes-ams-ad/apply/${applyId}`,
    method: 'get'
  });
}

// 鉴定单据详情列表详情
export function getApplyListApi(data) {
  return request({
    url: `/pdes-ams-ad/applyData/list`,
    method: 'post',
    data
  });
}
// 鉴定我的工作台 待办已办驳回同意接口
export function approveApi(data) {
  return request({
    url: `/pdes-ams-ad/apply/approve`,
    method: 'post',
    data
  });
}