# 梯子中心 · tizicenter.blog

Astro 静态中文资讯门户。主关键词：机场推荐 / VPN。当前品牌库明确收录 VPN，不冒充机场；没有独立性能实测。

## 本地运行

Node >=22.12，建议 Node 24。`npm ci` 后执行 `npm run dev`。

正式构建：`npm run check` → `npm run build` → `npm test`。

Cloudflare Pages 构建命令 `npm run build`，输出 `dist`。部署前阅读 [部署指南](docs/deployment.md) 和 [最终验收](docs/final-audit.md)。

## 维护入口

- `src/data/airports.ts`：价格、套餐、来源与核验状态唯一数据源。
- `src/content/articles/`：Content Collections Markdown；修改正文时更新实际 `updated`，新增文章使用真实发布日期。
- `src/data/topics.ts`：六类需求与关联品牌。
- `astro.config.mjs`：正式域名、尾斜杠和 sitemap 排除规则。
- `scripts/`：SEO、链接、内容、排名公式及 IndexNow 验收。

Sitemap 按每篇 Markdown 的 updated、品牌 lastVerified 和公共页面 src/data/site.ts 日期生成逐 URL 的 lastmod。后续修改时更新对应真实日期，禁止每次构建刷新日期。

不添加第三方追踪脚本。没有虚构评分、用户评价或联盟链接。运行测试不会请求或提交 IndexNow。

## 添加真实机场

使用 `kind: 'airport'`，录入官方来源、套餐周期、币种、流量倍率与核验日期；资料不足标为 `unverified`。服务真实性必须由人工核验，脚本不能证明事实。独立测试应保存原始记录并扩展审核机制后再标 `tested`，不要绕过校验。发布稳定性排行前移除 noindex 的依据必须来自真实样本。

## IndexNow

设置 `INDEXNOW_KEY`，执行 `npm run indexnow:key`，重新构建并上线。`npm run indexnow -- --dry-run` 仅查看候选；`npm run indexnow -- https://tizicenter.blog/blog/choose-service/` 提交单 URL；`npm run indexnow` 按已确认的快照提交新增、更新页面。初次提交仅在网站上线后进行。日志和确认快照保存在 `.indexnow/`，后续运行应保留该目录，CI 使用时需持久保存为受控状态。HTTP 202 不确认为完成，HTTP 200 也不代表已收录。

## QA 边界

自动检查验证结构和数据约束，不能替代事实审查或证明品牌性能。实际构建、浏览器检查、Lighthouse、推送与上线结果见最终验收报告；未测试项目明确标 NOT TESTED。
