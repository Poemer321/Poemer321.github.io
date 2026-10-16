# 孟岛的学习日记

记录一些平时学习生活的日常。

- 博客：https://poemer321.github.io/
- 后台：https://poemer321.github.io/mengdao-admin/

原创的纸页风格，参考 Hallmark 的文字层级、克制排版与移动端设计原则。使用 Node.js 将 Markdown 内容生成为静态网站，由 GitHub Actions 自动发布到 GitHub Pages。

## 写日记

1. 打开 `/mengdao-admin/`，进入 **GitHub 连接**。
2. 在 GitHub 的 Settings → Developer settings → Personal access tokens → Fine-grained tokens 创建令牌。只选择本博客仓库，授予 **Contents: Read and write**，Metadata 保持默认。不要勾选所有仓库，不需要 Workflows 权限。
3. 在后台输入令牌并连接。令牌只存于当前标签页的 sessionStorage，关闭标签页后清除；不写入仓库，不发送给其他服务。
4. 点 **写新日记**，填写标题、日期、分类和正文。可保存草稿，或取消草稿并发布。
5. 保存即提交 GitHub，随后触发自动构建。点击提示栏的“查看构建”了解进度，完成后刷新前台。

草稿不会生成到前台、搜索或 RSS。但本仓库是公开仓库，保存在 GitHub 的草稿仍可通过源码访问；私密内容只留在本机或不上传。

## 功能

- 日记发布、编辑、移除、置顶、标签；稳定文章地址。
- Markdown 工具栏、沙箱预览、代码复制、表格、图片放大、目录、打印 PDF。
- 本机草稿恢复、Ctrl/Cmd+S 保存、Ctrl/Cmd+B/I/K、Tab 缩进。
- 图片压缩至最长边 1800 px 并转换为 WebP 后上传。
- 分类新增、改名、移除、排序；改名同时更新相关日记。
- 首页筛选、全文搜索、分类页、标签页、归档、RSS、站点地图和 404。
- 站点文案与背景设置、手机布局、深浅色切换。
- 学习资料上传、下载、重命名和移除。
- 可选 Giscus 评论：先在仓库启用 Discussions，再通过 https://giscus.app/zh-CN 配置；将 Repository ID 与 Category ID 填入后台站点设置，并在文章中勾选评论。

内容写入前会检查文件版本，多文件变更以一次 Git 提交保存；并发修改会提示刷新，避免静默覆盖。删除后的历史仍可从 GitHub 提交记录恢复。

## 本地开发

需要 Node.js 22 或更新版本。

```sh
npm ci
npm test
npm run build
npm run preview
```

打开 http://127.0.0.1:4173 。`dist/` 是生成目录，每次构建会重建；请编辑源码。

## 文件结构

```text
site.json               站点文案、分类、评论和资料清单
content/*.json          日记元信息与 Markdown 正文
public/mengdao-admin/           直接通过 GitHub API 管理内容的后台
public/assets/          样式与前台脚本
public/uploads/         后台上传的图片和资料
lib/render.mjs          Markdown 清洗、文章校验
scripts/build.mjs       静态页面、搜索、RSS 和 Sitemap 构建
tokens.css              可复用的字体和色彩变量
.github/workflows/      GitHub Pages 自动构建发布
```

## 部署

推送到 `main` 后自动部署。在仓库 Settings → Pages 中将 Source 设为 **GitHub Actions**。本项目为用户主页配置，部署在域名根路径。更换域名后同步修改 `site.json` 的 `url`。

首次发布后，评论需要单独完成上述 Giscus 配置；后台写入需要你自己的令牌。普通访客无需登录。

## 设计参考与依赖

- 设计原则参考：https://github.com/Nutlope/hallmark （MIT）。本博客源码独立编写。
- 文章渲染使用 marked（MIT），输出经 sanitize-html（MIT）清洗。
- 不复制参考博客作者的文章、照片、身份信息或专属资料。
