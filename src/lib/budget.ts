export function calculateCost(price:number,fees:number,discount:number,months:number,quota?:number,multiplier=1,reset='monthly') {
 if (![price,fees,discount,months,multiplier].every(Number.isFinite)||price<0||fees<0||discount<0||discount>price+fees||months<=0||multiplier<=0) throw new Error('请检查金额、支付周期和倍率；优惠金额不能超过应付金额。');
 if(quota!==undefined&&(!Number.isFinite(quota)||quota<=0))throw new Error('额度须大于 0；未知或不限量时请留空。');
 if(quota!==undefined&&reset==='monthly'&&!Number.isInteger(months))throw new Error('按月重置额度需要完整月数；不足整月时请留空额度，仅估算付款成本。');
 const total=price+fees-discount;const theoretical=quota===undefined?undefined:quota*(reset==='monthly'?months:1)/multiplier;
 const monthly=total/months;const perGB=theoretical===undefined?undefined:total/theoretical;
 if(![total,monthly,...(theoretical===undefined?[]:[theoretical,perGB!])].every(Number.isFinite))throw new Error('数值过大或周期过小，请缩小输入范围。');
 return {total,monthly,theoretical,perGB};
}
export function calculateTraffic(sample:number,days:number,targetDays:number,multiplier:number,reserve:number,meter='raw') {
 if(![sample,days,targetDays,multiplier,reserve].every(Number.isFinite)||sample<0||days<=0||targetDays<=0||multiplier<=0||reserve<0||reserve>100)throw new Error('请填写有效的用量、天数和倍率；预留比例为 0–100%。');
 const daily=sample/days;const base=daily*targetDays*(meter==='raw'?multiplier:1);const recommended=base*(1+reserve/100);if(![daily,base,recommended].every(Number.isFinite))throw new Error('数值过大或周期过小，请缩小输入范围。');return {daily,base,recommended};
}
