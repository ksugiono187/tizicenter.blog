# 当前版本验收报告

日期：2026-10-13（Asia/Shanghai）。本次替换原品牌，使用运营者提供的 29 个机场品牌、29 条推广链接和 11 个优惠码。

## 实际页面与内容

104 个静态 HTML 页面，39 个 URL 进入 Sitemap。包括 29 个品牌页、29 个购买检查页、20 篇文章、6 个专题、4 个榜单标准页、7 个分类中心、首页、比较、搜索、5 个信任页面及 404。未核实品牌页和购买检查页、四个无数据榜单、专线模板、搜索与 404 均 noindex，避免用模板和未核实数据制造收录页面。

原品牌已从当前数据库、文章、页面、推广入口和构建产物删除；旧资料 URL 返回 404。Git 历史保留正常版本记录，没有改写历史。

## 验收结果

| 项目 | 状态 | 证据与边界 |
|---|---|---|
| 生产构建 | PASS | Astro 静态输出 104 页 |
| 类型检查 | PASS | 30 文件，0 errors、0 warnings、0 hints |
| SEO | PASS | 104 页独立标题、描述、唯一 H1、正式 Canonical、Schema、robots；39 个 Sitemap URL |
| 内链与孤岛 | PASS | 检查 4338 条引用；103 个非 404 页面可从首页到达 |
| 品牌与优惠码映射 | PASS | 29 条注册链接逐项匹配原文；11 个代码保留大小写；18 个品牌显示未提供 |
| 原品牌移除 | PASS | 全部生成 HTML 的旧品牌名称与 URL 回归扫描通过；旧资料 URL HTTP 404 |
| 空套餐与排名排除 | PASS | 未核实品牌无虚构价格、流量或性能；成本和低预算排序为空 |
| 推广披露 | PASS | 页面对推广关系作披露，外链包含 sponsored nofollow noopener noreferrer |
| 优惠码复制 | PASS | 浏览器点击后显示已复制；失败时提供手动复制提示 |
| 比较交互 | PASS | 29 候选、最多 4 家、第五家禁用、可移除；U1S1 与 YUZHOU553 大小写及未提供状态检查 |
| 响应式 | PASS | 代表性移动页面无文档横向溢出，比较表在容器内滚动 |
| 内容与公式 | PASS | 20 篇文章、套餐公式、IndexNow 模拟响应测试通过 |
| 首页 Lighthouse | PASS | 本地移动模拟：Performance 100、SEO 100、Accessibility 100、Best Practices 100；采样 2026-10-13T03:15:06.621Z |
| 优惠码真实有效性 | NOT TESTED | 未向品牌结算页面尝试优惠，幅度、有效期和适用套餐未知 |
| 外部品牌身份、套餐和线路 | NOT TESTED | 链接由运营者提供，不冒称已验证官网 |
| 品牌性能、AI 和流媒体 | NOT TESTED | 没有独立实测记录 |
| 真实用户 INP / 线上性能 | NOT TESTED | 尚未部署正式域名 |
| 真实 IndexNow 提交 | NOT TESTED | 未配置 Key 或部署验证文件；没有向搜索引擎发送本次更新 |
| 本次 GitHub 推送 | NOT TESTED | 完成最终文件后执行推送，并记录结果 |
| Cloudflare / Bing 账户配置 | NOT TESTED | 尚未登录托管平台、绑定域名或验证 Bing 所有权 |

## 数据与维护

品牌、注册链接及优惠码统一维护在 src/data/airports.ts；原文映射记录在 docs/brand-submission.json。来源性质见 docs/source-review.md。优惠码与推广链接的 code 参数是不同字段，不混用。

本次保留全部链接路径、片段和推广参数，不生成折扣比例、套餐、评分或用户评价。展示顺序按运营者提供的目录排列，不代表质量排名。品牌资料补齐后，先核验来源与真实日期，再决定是否允许搜索收录。

正式上线前仍需补充真实运营主体、联系邮箱和托管隐私范围，完成 Cloudflare Pages、域名、HTTPS、Bing 验证与 IndexNow 配置；步骤见 docs/deployment.md 和 docs/bing-webmaster.md。本地与代码结果不代表正式站已部署。
