import request from '@/utils/request'

export function listDataPack(query) {
  return request({
    url: '/system/dataPack/list',
    method: 'get',
    params: query
  })
}
