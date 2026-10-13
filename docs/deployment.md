# GitHub 与 Cloudflare Pages 部署

## 项目参数

- 正式 URL：https://tizicenter.blog
- GitHub：https://github.com/ksugiono187/tizicenter.blog
- Astro 7.3.8，Node 24；包版本以 package-lock.json 固定。
- 静态构建，不需要 Cloudflare Astro SSR adapter。

## Cloudflare Pages

1. 用域名及仓库拥有者账户登录 Cloudflare，进入 Workers & Pages 创建 Pages 项目。
2. 授权指定 GitHub 仓库，选择 main 分支。
3. 根目录为仓库根；构建 `npm run build`；输出 `dist`；设置 `NODE_VERSION=24`。
4. 检查构建日志，绑定 `tizicenter.blog`，按 Cloudflare 提示完成域名与 DNS 配置。
5. 验证 HTTPS、尾斜杠、404 状态、CSS/JS、robots.txt 和 sitemap-index.xml。
6. 预览域名应在 Cloudflare 增加 `X-Robots-Tag: noindex` 访问规则；不要让预览地址作为正式搜索落地页。正式 Canonical 始终为指定域名。

此项目没有代替用户登录 Cloudflare 或声称已部署。绑定域名与平台账户授权需要拥有者完成。

## 上线前必须确认

补充真实运营主体与运营邮箱；核对隐私政策中实际托管日志范围。没有邮箱时已提供 GitHub 公开纠错入口，不使用虚构联系人。真实机场品牌、独立测速、稳定性和 AI / 流媒体兼容性尚未提供；不发布对应性能名次。

## 内容更新

先改统一数据源并保留官方来源，再更新真实修改日期与 Sitemap 对应 lastmod，运行检查和构建。GitHub CI 自动执行类型检查、构建与审计。Pages 部署成功后再提交 IndexNow，避免通知搜索引擎尚未上线的 URL。

## IndexNow

使用 PowerShell 设置当前会话的 `$env:INDEXNOW_KEY`（8–128 位字母、数字或连字符），执行 `npm run indexnow:key`。公开验证文件不是账户密码。提交前必须重建并部署，脚本会核对本地 dist 和线上验证文件内容。批量上限 10,000，自动重试 429/5xx，永久错误停止。HTTP 日志不记录 Key。快照只在 HTTP 200 后更新，202 待验证会保留候选；失败不吞掉待提交页面。不得每次构建无差别提交全站。

官方文档：[Cloudflare Astro Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)、[IndexNow](https://www.indexnow.org/documentation)。
