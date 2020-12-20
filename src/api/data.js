import request from "@/utils/request";

// 首页数据
export function dvIndustry() {
  return request({
    url: "/dv/industry",
    method: "post",
  });
}

//日历查询
export function dateRanges(data) {
  return request({
    url: "/dv/dateRange",
    method: "post",
    data,
  });
}
// 获取省份
export function dvProvince(data) {
  return request({
    url: "/dv/province",
    method: "post",
    data,
  });
}
// 获取城市
export function dvCity(data) {
  return request({
    url: "/dv/city",
    method: "post",
    data,
  });
}
// --获取品牌
export function dvCarBrand() {
  return request({
    url: "/dv/carBrand",
    method: "post",
    data: {},
  });
}
// --获取厂商
export function dvCarManf(data) {
  return request({
    url: "/dv/carManf",
    method: "post",
    data,
  });
}
// --获取车型
export function dvCarSeries(data) {
  return request({
    url: "/dv/carSeries",
    method: "post",
    data,
  });
}

// --燃料类型
export function dvFuelType() {
  return request({
    url: "/dv/fuelType",
    method: "post",
    data: {},
  });
}
// --排量
export function dvEngineType() {
  return request({
    url: "/dv/engineType",
    method: "post",
    data: {},
  });
}
// --厂商属性
export function dvManfProp() {
  return request({
    url: "/dv/manfProp",
    method: "post",
    data: {},
  });
}
// --汽车类型
export function dvSegment() {
  return request({
    url: "/dv/segment",
    method: "post",
    data: {},
  });
}
// --细分市场
export function dvSegmentFull() {
  return request({
    url: "/dv/segmentFull",
    method: "post",
    data: {},
  });
}
// 商用车-品牌
export function dvCommerBrand() {
  return request({
    url: "/dv/commerBrand",
    method: "post",
    data: {},
  });
}
// 商用车-企业名称
export function dvOrigEnterpriseName(data) {
  return request({
    url: "/dv/commerOrig",
    method: "post",
    data,
  });
}
// 商用车-车辆型号
export function dvCommerModel(data) {
  return request({
    url: "/dv/commerModel",
    method: "post",
    data,
  });
}
// 商用车-底盘企业
export function dvBaseManf() {
  return request({
    url: "/dv/baseManf",
    method: "post",
    data: {},
  });
}
// 商用车-底盘型号
export function dvBase() {
  return request({
    url: "/dv/base",
    method: "post",
    data: {},
  });
}
// 商用车-燃料
export function dvCommerFuelType() {
  return request({
    url: "/dv/commerFuelType",
    method: "post",
    data: {},
  });
}
// 商用车-排量
export function dvDisplacement() {
  return request({
    url: "/dv/displacement",
    method: "post",
    data: {},
  });
}
// 商用车-排放标准
export function dvEmission() {
  return request({
    url: "/dv/emission",
    method: "post",
    data: {},
  });
}
// 商用车-使用性质
export function dvUseProp() {
  return request({
    url: "/dv/useProp",
    method: "post",
    data: {},
  });
}
// 商用车-车辆类别
export function dvVehicleType() {
  return request({
    url: "/dv/vehicleType",
    method: "post",
    data: {},
  });
}
// 短信验证码接口
export function sendCode(data) {
  return request({
    url: "/dv/sendCode",
    method: "post",
    data,
  });
}

// 注册
export function dvRegister(data) {
  return request({
    url: "/dv/register",
    method: "post",
    data,
  });
}

// 获取数据接口-有权
export function salesVolumeList(data) {
  return request({
    url: "/car/volumeList",
    method: "post",
    data,
  });
}

// 获取数据接口-无权
export function volumeList(data) {
  return request({
    url: "/dv/volumeList",
    method: "post",
    data,
  });
}

//新能源 -无权
export function energyNewList(data) {
  return request({
    url: "/dv/energyNewList",
    method: "post",
    data,
  });
}

// 新能源-有权
export function carEnergyNewList(data) {
  return request({
    url: "/car/energyNewList",
    method: "post",
    data,
  });
}

//商用车 -无权
export function commerList(data) {
  return request({
    url: "/dv/commerList",
    method: "post",
    data,
  });
}

// 商用车-有权
export function carCommerList(data) {
  return request({
    url: "/car/commerList",
    method: "post",
    data,
  });
}

//保有量 -无权
export function stockList(data) {
  return request({
    url: "/dv/stockList",
    method: "post",
    data,
  });
}

// 保有量-有权
export function carStockList(data) {
  return request({
    url: "/car/stockList",
    method: "post",
    data,
  });
}

//排行榜接口
export function salesRankList(data) {
  return request({
    url: "/dv/salesRankList",
    method: "post",
    data,
  });
}

//获取支付信息
export function payInfo() {
  return request({
    url: "/buy/payInfo",
    method: "post",
  });
}

//获取支付页面
export function aliPayPc(data) {
  return request({
    url: "/buy/aliPayPc",
    method: "post",
    data,
  });
}

//购买数据包，提交申请
export function dataPack(data) {
  return request({
    url: "/buy/dataPack",
    method: "post",
    data,
  });
}

//仪表盘

// 累计销量
export function salesRatio(query) {
  return request({
    url: "/charts/salesRatio",
    method: "get",
    params: query,
  });
}

// 销量走势图
export function carSales(query) {
  return request({
    url: "/charts/carSales",
    method: "get",
    params: query,
  });
}

// 厂商排行 和 车型排行 分析
export function ranking(query) {
  return request({
    url: "/charts/ranking",
    method: "get",
    params: query,
  });
}

// 行业资讯
export function info(data) {
  return request({
    url: "/dv/info",
    method: "post",
    data,
  });
}

// 行业报告
export function report(data) {
  return request({
    url: "/dv/report",
    method: "post",
    data,
  });
}

// 行业报告
export function poster(data) {
  return request({
    url: "/dv/poster",
    method: "post",
    data,
  });
}

// http://tang9.free.idcfengye.com/buy/price
// 购买价格列表
export function price(query) {
  return request({
    url: "/buy/price",
    method: "get",
    params: query,
  });
}

// http://tang9.free.idcfengye.com/buy/getAmount
// 金额查询
export function getAmount(data) {
  return request({
    url: "/buy/getAmount",
    method: "post",
    data,
  });
}
