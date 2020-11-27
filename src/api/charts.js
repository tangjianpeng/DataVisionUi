import request from "@/utils/request";

// 燃料类型： （ 1:乘用车 2:新能源）
// {
//     "sourceType":"1",
//     "dateType":"2",
//     "beginDate":"2020-10",
//     "provinceName":"",
//     "cityName":""
//     }
export function chartsFuelType(data) {
  return request({
    url: "/charts/fuelType",
    method: "post",
    data,
  });
}

// 厂商属性： （ 3:保有量）
// {
// "sourceType":"3",
// "dateType":"1",
// "beginDate":"2020",
// "provinceName":"",
// "cityName":""
// }
export function chartsManfProp(data) {
  return request({
    url: "/charts/manfProp",
    method: "post",
    data,
  });
}

// 车身形式： （ 1:乘用车 2:新能源 3:保有量）
// {
// "sourceType":"1",
// "dateType":"2",
// "beginDate":"2020-10",
// "provinceName":"",
// "cityName":""
// }
export function chartsSegment(data) {
  return request({
    url: "/charts/segment",
    method: "post",
    data,
  });
}

// 品牌TOP10： （ 1:乘用车 2:新能源 3:保有量）
// {
// "sourceType":"1",
// "dateType":"2",
// "beginDate":"2020-10",
// "provinceName":"",
// "cityName":""
// }
export function chartsBrand(data) {
  return request({
    url: "/charts/brand",
    method: "post",
    data,
  });
}

// 车系TOP10： （ 1:乘用车 2:新能源 3:保有量）
// {
// "sourceType":"1",
// "dateType":"2",
// "beginDate":"2020-10",
// "provinceName":"",
// "cityName":""
// }
export function chartsSubModel(data) {
  return request({
    url: "/charts/subModel",
    method: "post",
    data,
  });
}

// 省份销量： （ 1:乘用车 2:新能源 3:保有量）
// {
// "sourceType":"1",
// "dateType":"2",
// "beginDate":"2020-10",
// "provinceName":"",
// "cityName":""
// }
export function chartsProvince(data) {
  return request({
    url: "/charts/province",
    method: "post",
    data,
  });
}

// 城市销量： （ 1:乘用车 2:新能源 3:保有量）
// {
// "sourceType":"1",
// "dateType":"2",
// "beginDate":"2020-10",
// "provinceName":"",
// "cityName":""
// }
export function chartsCity(data) {
  return request({
    url: "/charts/city",
    method: "post",
    data,
  });
}

// 厂商销量： （ 1:乘用车 2:新能源 3:保有量）
// {
// "sourceType":"1",
// "dateType":"2",
// "beginDate":"2020-10",
// "provinceName":"",
// "cityName":""
// }
export function chartsManf(data) {
  return request({
    url: "/charts/manf",
    method: "post",
    data,
  });
}
