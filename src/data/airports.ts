export interface Plan { name:string; price:number; currency:string; period:'month'|'year'|'week'|'lifetime'; trafficGB?:number; unlimited?:boolean; multiplier:number; verified:boolean; condition?:string }
export interface Airport { id:string; name:string; slug:string; kind:'airport'|'vpn'; description:string; officialUrl?:string; affiliateUrl?:string; couponCode?:string; submittedAt?:string; startingPrice?:number; currency?:string; plans:Plan[]; protocols:string[]; regions:string[]; deviceLimit?:string; aiSupport?:string[]; streamingSupport?:string[]; advantages:string[]; disadvantages:string[]; suitableFor:string[]; sources:string[]; lastVerified?:string; testStatus:'tested'|'official-data'|'unverified'; lineType?:string }
// Names, referral URLs and codes supplied by the operator. No package or performance claims verified.
const supplied=[
  [
    "breezenet",
    "微风网络 Breezenet",
    "https://edp01.breezenetaff.com/#/?code=4KDOroY0",
    "weifeng90"
  ],
  [
    "flycat",
    "飞猫云",
    "https://flycat1.flycatvipaff.cc/#/?code=Os3T3OxW",
    "flycat888"
  ],
  [
    "twilight",
    "暮光网络",
    "https://varnexa.twilightaff.com/#/?code=3qqonTlH"
  ],
  [
    "dalaocloud",
    "大佬云",
    "https://vip.dalaocloud.com/#/?code=Cp2sfYZg"
  ],
  [
    "firefly",
    "Firefly机场",
    "https://vip02.fireflyaff.com/#/?code=Fes6j9rn",
    "firefly"
  ],
  [
    "civet",
    "灵猫",
    "https://vip02.civetaff.com/#/?code=kZlRw46w"
  ],
  [
    "flashleap",
    "闪跃 FlashLeap",
    "https://vip02.flashleapaff.com/#/?code=FkCGEeaC",
    "shanyue"
  ],
  [
    "worryfree",
    "无忧链接",
    "https://wep01.worryfreeaff.com/#/?code=56A0RTpU",
    "wuyou666"
  ],
  [
    "kuajie",
    "跨界云",
    "https://vip02.kuajieaff.com/#/?code=VfWeYwHM"
  ],
  [
    "stardream",
    "星岛梦 StarDream",
    "https://kfccbb.xingdaomeng.com/#/?code=JTRIWFim",
    "nmw888"
  ],
  [
    "lightspeed",
    "光速云 LightSpeed",
    "https://mdlky.gsyaff.com/#/?code=6tRWbtgK",
    "jichangcha09"
  ],
  [
    "v2yun",
    "唯兔云（V2云）",
    "https://fast.v2yunvipaff.com/#/?code=xYEe8gyb",
    "rabbit"
  ],
  [
    "u1s1",
    "U1S1（有一说一）",
    "https://pkdj7.vipaff.cc/#/?code=NMjmHbvu",
    "U1S1"
  ],
  [
    "jilian",
    "极连云",
    "https://kdjhao.jlyvipaff.com/#/?code=poyoU7mq"
  ],
  [
    "globalcloud",
    "全球云",
    "https://sswdh.gcvipaff.com/#/?code=NE1AcNIX",
    "tt88"
  ],
  [
    "lightyear",
    "光年梯",
    "https://ggmq.gntaff.com/#/?code=RAJFvngV"
  ],
  [
    "sogoyun",
    "Sogo云",
    "https://wzjc.sogoyunaff.cc/#/?code=2x2EywO9"
  ],
  [
    "yuzhou",
    "宇宙云 YuZhou",
    "https://wzjc.yuzoucloud.cc/#/?code=wL7YStBa",
    "YUZHOU553"
  ],
  [
    "2mao",
    "二猫云 2mao",
    "https://waaa.2maoyunaff.cc/#/?code=uHeyKG44"
  ],
  [
    "1fly",
    "一翻云 1fly",
    "https://wzjc.1flyunaff.cc/#/?code=F7eaT191"
  ],
  [
    "edgenova",
    "边缘节点 EdgeNova",
    "https://work.edgenovaaff.cc/#/?code=z81zCfw1"
  ],
  [
    "kosing",
    "可信云",
    "https://work.kosingaff.com/#/?code=BNsA58Es"
  ],
  [
    "sujie",
    "速界 SuJie",
    "https://work.speedworldaff.cc/#/?code=wSjLCpIf"
  ],
  [
    "kuaili",
    "快狸 KuaiLi",
    "https://work.kuailicloud.cc/#/?code=gVGJa0Mp"
  ],
  [
    "flyv",
    "飞V",
    "https://varnexa.flyvaff.com/#/?code=UoU2Izm5"
  ],
  [
    "laddercloud",
    "梯子云 LadderCloud",
    "https://varnexa.ladderaff.com/#/?code=kuE4kqxo"
  ],
  [
    "wavenet",
    "浪网 WaveNet",
    "https://varnexa.wavenetaff.com/#/?code=oU77JXen"
  ],
  [
    "lingdong",
    "灵动云",
    "https://varnexa.lingdongaff.com/#/?code=QcRK6OPG"
  ],
  [
    "invisible",
    "隐形人",
    "https://varnexa.invisibleaff.com/#/?code=JF4seZUy"
  ]
];
export const airports:Airport[]=supplied.map(([slug,name,affiliateUrl,couponCode])=>({id:slug,slug,name,affiliateUrl,couponCode,submittedAt:'2026-10-13',kind:'airport',description:couponCode?name+' 的推广入口与优惠码已整理；优惠幅度、有效期和适用套餐尚未核实。':name+' 的推广入口已整理；暂未提供优惠码，套餐与服务信息尚未核实。',plans:[],protocols:[],regions:[],aiSupport:[],streamingSupport:[],advantages:[],disadvantages:[],suitableFor:[],sources:[],testStatus:'unverified'}));
export const unknown='尚未核实';
export function price(a:Airport){return a.startingPrice===undefined?unknown:`${a.currency} ${a.startingPrice}${a.startingPrice===0?' / 免费方案':' / 月'}`;}
export function traffic(a:Airport){const p=a.plans[0];if(!p)return unknown;return p.unlimited?'不限流量（官方）':p.trafficGB?`${p.trafficGB} GB${p.verified?' / 月':' / 体验流量'}`:unknown;}
export function cost(p:Plan|undefined){return p?.verified&&!p.unlimited&&p.period==='month'&&p.trafficGB&&p.multiplier>0?p.price/(p.trafficGB/p.multiplier):undefined;}
export function budgetRank(){return airports.filter(a=>a.plans.some(p=>p.verified&&p.period==='month'&&p.price===0));}
export function valueRank(){return airports.flatMap(a=>a.plans.filter(p=>cost(p)!==undefined).map(p=>({airport:a,plan:p,cost:cost(p)!}))).sort((a,b)=>a.plan.currency.localeCompare(b.plan.currency)||a.cost-b.cost);}
export function evidence(a:Airport){return [!!a.officialUrl,a.plans.some(p=>p.verified),!!a.deviceLimit,a.protocols.length>0,!!a.lastVerified&&a.sources.length>0].filter(Boolean).length;}
