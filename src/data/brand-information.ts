import {airports} from './airports';
import {brandReferences} from './brand-references';
import {brandPublicChecks} from './brand-public-checks';
// Evidence coverage is distinct from verification of a merchant or service.
export const brandInformation = airports.map(brand => {
 const reference=brandReferences.find(record=>record.slug===brand.slug);
 const publicCheck=brandPublicChecks.find(check=>check.slug===brand.slug);
 const sourceCount=reference?.sources.length??0, offerCount=reference?.offers.length??0;
 const hasConflict=reference?.hasConflict??false;
 const summary=sourceCount?`公开资料已整理 · ${hasConflict?'有来源分歧':'待官方确认'}`:'公开资料待补充';
 const fields=[
  {key:'entry',label:'品牌名称与推广入口',state:'已提供',tone:'provided',detail:'保留运营者提交的原始名称和链接；经营主体及域名归属尚未独立确认。'+(publicCheck?` 入口查阅 ${publicCheck.checkedAt}：${publicCheck.note}`:' 尚未取得入口查阅记录。')},
  {key:'sources',label:'公开资料来源',state:sourceCount?'已整理':'待补充',tone:sourceCount?'recorded':'pending',detail:`${sourceCount} 个第三方来源 · ${offerCount} 条参考价目；具体来源日期见下方记录。`},
  {key:'differences',label:'来源分歧与条件缺口',state:hasConflict?'有分歧':'条件待确认',tone:hasConflict?'conflict':'pending',detail:reference?.differences.join(' ')||'尚未取得可比的公开资料。'},
  {key:'price',label:'当前套餐、流量与倍率',state:'待官方确认',tone:'pending',detail:'已有报价仅作第三方历史参考；当前在售价格、流量重置及计费倍率未取得足够官方证据。'},
  {key:'coupon',label:'优惠码与结算条件',state:brand.couponCode?'已提供 · 未验证':'未提供',tone:brand.couponCode?'provided':'pending',detail:reference?.coupon||'未取得结算验证记录。'},
  {key:'refund',label:'退款与售后条款',state:'待官方确认',tone:'pending',detail:reference?.refund||'尚未取得完整官方退款条款。'},
  {key:'features',label:'协议、设备与服务限制',state:'待官方确认',tone:'pending',detail:'第三方描述不能替代当前套餐条款；设备数、节点区域及支持范围需在服务方确认。'},
  {key:'performance',label:'速度、稳定性与解锁表现',state:'未实测',tone:'pending',detail:'本站没有此品牌的可复现连接测试，不以公开报价或优惠码推断性能。'}
 ];
 return {slug:brand.slug,name:brand.name,summary,sourceCount,offerCount,hasConflict,reviewedAt:reference?.reviewedAt,fields};
});
export function getBrandInformation(slug:string){const information=brandInformation.find(record=>record.slug===slug);if(!information)throw new Error(`Missing brand information: ${slug}`);return information;}
