<h1 align="center">OPEN-NUXT-BLOG</h1>

<p align="center">
  <a><img src="https://img.shields.io/npm/l/@kangc/v-md-editor.svg?sanitize=true" alt="License"></a>
  <a><img src="https://img.shields.io/npm/dm/@kangc/v-md-editor.svg?sanitize=true" alt="Downloads"></a>
  <a><img src="https://img.shields.io/npm/l/@kangc/v-md-editor.svg?sanitize=true" alt="License"></a>
</p>

# 项目简介

本项目是一个基于 Nuxt.js 的开源博客系统，采用 Sequelize 进行数据库管理，使用 TDesign 和 v-md-editor 实现界面美化和 Markdown 编辑功能。

## 特性

- 开箱即用
- 完善的后台管理
- 支持 Markdown 格式的文章编写
- 使用 TDesign 进行界面设计，美观易用
- 基于 Sequelize 进行数据库管理，可靠性高
- 响应式设计，适配各种设备

## 环境准备

```bash
node  v18.19.1+
pnpm  v8.15.4+
mysql v5.7+
```

## 创建数据库并配置

```bash
cd open-nuxt-blog/server/config
vi index.ts

...change your dbConfig

:wq
```

## 安装指南

```bash
# 安装依赖
pnpm i

# 启动服务
pnpm dev
```

## 技术栈

- [Nuxt.js](https://nuxt.com/)
- [Sequelize](https://sequelize.org/)
- [TDesign](https://tdesign.tencent.com/)
- [v-md-editor](https://github.com/code-farmer-i/vue-markdown-editor)

## 贡献

欢迎贡献代码，提出问题和建议，您可以通过提交 Pull Request 或 Issue 的方式参与到项目中来。

## 许可证

MIT