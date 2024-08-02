import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listResult(query) {
  return request({
    url: '/system/result/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getResult(id) {
  return request({
    url: '/system/result/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addResult(data) {
  return request({
    url: '/system/result',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateResult(data) {
  return request({
    url: '/system/result',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delResult(id) {
  return request({
    url: '/system/result/' + id,
    method: 'delete'
  })
}
