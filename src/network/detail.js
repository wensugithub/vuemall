
import {request} from "./request";

// 获取商品详情
export function getItemDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 商品详情页商品各种信息(价格,折扣价，售后服务etc)
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.realPrice = itemInfo.lowNowPrice;
    this.columns = columns;
    this.services = services;
  }
}
// 店铺相关信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

// 商品详细信息参数
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

