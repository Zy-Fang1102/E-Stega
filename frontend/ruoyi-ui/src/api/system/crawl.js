import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listCrawl(query) {
  return request({
    url: '/system/crawl/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getCrawl(id) {
  return request({
    url: '/system/crawl/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addCrawl(data) {
  return request({
    url: '/system/crawl',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateCrawl(data) {
  return request({
    url: '/system/crawl',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delCrawl(id) {
  return request({
    url: '/system/crawl/' + id,
    method: 'delete'
  })
}
