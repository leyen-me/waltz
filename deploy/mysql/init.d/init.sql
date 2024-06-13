/*
 Navicat Premium Data Transfer

 Source Server         : 32
 Source Server Type    : MySQL
 Source Server Version : 80036
 Source Host           : localhost:3306
 Source Schema         : open_nuxt_blog

 Target Server Type    : MySQL
 Target Server Version : 80036
 File Encoding         : 65001

 Date: 20/05/2024 13:52:17
*/
CREATE DATABASE IF NOT EXISTS open_nuxt_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE open_nuxt_blog;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_article
-- ----------------------------
DROP TABLE IF EXISTS `t_article`;
CREATE TABLE `t_article`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `category_id` bigint(0) NULL NOT NULL COMMENT '文章分类',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章标题',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章封面',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章内容',
  `author_id` bigint(0) NOT NULL COMMENT '文章作者ID',
  `published_at` datetime(0) NULL DEFAULT NULL COMMENT '发布时间',
  `status` enum('draft','published','archived') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'draft' COMMENT '文章状态',
  `views_count` int(0) NULL DEFAULT 0 COMMENT '浏览量',
  `favorites_count` int(0) NULL DEFAULT 0 COMMENT '收藏量',
  `likes_count` int(0) NULL DEFAULT 0 COMMENT '点赞量',
  `comments_count` int(0) NULL DEFAULT 0 COMMENT '评论量',
  `sort` int(0) NULL DEFAULT 1 COMMENT '排序',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='文章表';

CREATE FULLTEXT INDEX idx_title_content ON t_article(title, content) WITH PARSER NGRAM;
-- ----------------------------
-- Records of t_article
-- ----------------------------
BEGIN;
INSERT INTO `t_article`(`id`, `category_id`, `title`, `cover`, `content`, `author_id`, `published_at`, `status`, `views_count`, `favorites_count`, `likes_count`, `comments_count`, `sort`, `created_at`, `updated_at`) VALUES (12, 1, 'MarkDown语法学习2', 'https://images.unsplash.com/photo-1586943759341-be5595944989?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '# MarkDown语法学习\n\nMarkdown是一种轻量级标记语言，排版语法简洁，让人们更多地关注内容本身而非排版。它使用易读易写的纯文本格式编写文档，可与HTML混编，可导出 HTML、PDF 以及本身的 .md 格式的文件。因简洁、高效、易读、易写，Markdown被大量使用，如Github、Wikipedia、简书等\n\n## 标题\n\n### 语法\n\n````\n# 一级标题\n## 二级标题\n### 三级标题\n#### 四级标题\n##### 五级标题\n###### 六级标题\n````\n\n## 段落\n\n### 语法\n\n````\n没有固定的语法格式直接写\n````\n\n### 预览\n\n没有固定的语法格式直接写\n\n## 换行\n\n### 语法\n\n````\n要换行的结尾加两个以上的空格即可\n直接写\n````\n\n### 预览\n\n要换行的结尾加两个以上的空格即可  \n直接写\n\n## 加粗\n\n### 语法\n\n````\n__粗体文本__\n````\n\n### 预览\n\n__粗体文本__\n\n## 斜体\n\n### 语法\n\n````\n*斜体文本*\n````\n\n### 预览\n\n*斜体文本*\n\n## 粗斜体文本\n\n### 语法\n\n````\n***粗斜体文本***\n___粗斜体文本___\n````\n\n### 预览\n\n***粗斜体文本***\n\n## 删除线\n\n### 语法\n\n````\n~~BAIDU.COM~~\n````\n\n### 预览\n\n~~BAIDU.COM~~\n\n## 下划线\n\n### 语法\n\n````\n<u>带下划线文本</u>\n````\n\n### 预览\n\n<u>带下划线文本</u>\n\n## 分割线\n\n### 语法\n\n````\n******\n````\n\n### 预览\n\n******\n******\n******\n******\n\n## 有序列表\n\n### 语法\n\n````\n1. 第一项\n2. 第二项\n3. 第三项\n````\n\n### 预览\n\n1. 第一项\n2. 第二项\n3. 第三项\n\n\n## 无序列表\n\n### 语法\n\n````\n- 第一项\n- 第二项\n- 第三项\n\n+ 第一项\n+ 第二项\n+ 第三项\n\n* 第一项\n* 第二项\n* 第三项\n````\n\n### 预览\n\n- 第一项\n+ 第二项\n* 第三项\n\n## 引用\n\n### 语法\n\n````\n> 最外层\n> > 第一层嵌套\n> > > 第二层嵌套\n````\n\n### 预览\n\n> 最外层\n> > 第一层嵌套\n> > > 第二层嵌套\n\n## 代码\n\n### 语法\n\n````\n```js\n$(document).ready(function () {\n    alert(\'hello world\');\n});\n```\n````\n\n### 预览\n\n```js\n$(document).ready(function () {\n    alert(\'hello world\');\n});\n```\n\n## 链接\n\n### 语法\n\n````\n这是一个链接 [百度](https://www.baidu.com)\n````\n\n### 预览\n\n这是一个链接 [百度](https://www.baidu.com)\n\n\n## 图片\n\n### 语法\n\n````\n![alt 属性文本](图片地址 \"可选标题\")\n````\n\n### 预览\n\n![alt 属性文本](https://gd-hbimg.huaban.com/2e105a41add87e1248fd214a28377304e4e1a0f94324e-cktSG2_fw1200webp \"某APP\")\n\n## 表格\n\n### 语法\n\n````\n|  表头   | 表头  |\n|  ----  | ----  |\n| 单元格  | 单元格 |\n| 单元格  | 单元格 |\n````\n\n### 预览\n\n| 表头   | 表头   | 表头   |\n| ------ | ------ | ------ |\n| 单元格 | 单元格 | 单元格 |\n| 单元格 | 单元格 | 单元格 |\n\n\n## 表格对齐\n\n### 语法\n\n````\n| 左对齐 | 右对齐 | 居中对齐 |\n| :-----| ----: | :----: |\n````\n\n### 预览\n\n| 左对齐 | 右对齐 | 居中对齐 |\n| :----- | -----: | :------: |\n| 单元格 | 单元格 |  单元格  |\n| 单元   |   单元 |  单元格  |\n\n\n## Emoji\n\n### 语法\n````\n:grinning:\n````\n\n### 预览\n\n:grinning:\n\n## 自定义容器\n\n### 语法\n\n````\n\n::: tip\nThis is a tip.\n:::\n\n::: warning\nThis is a warning.\n:::\n\n::: danger\nThis is a dangerous warning.\n:::\n\n::: details 点我查看代码\nThis is a details block.\n:::\n````\n\n### 预览\n\n::: tip\nThis is a tip.\n:::\n\n::: warning\nThis is a warning.\n:::\n\n::: danger\nThis is a dangerous warning.\n:::\n\n::: details 点我查看代码\nThis is a details block.\n:::\n\n\n\n## 代码块行高亮\n\n### 语法\n\n````\n```js{4-5,7}\nexport default {\n  data () {\n    return {\n      msg: \'Highlighted!\',\n      msg2: \'Highlighted!\'\n    }\n  }\n}\n```\n````\n\n### 预览\n```js{4-5,7}\nexport default {\n  data () {\n    return {\n      msg: \'Highlighted!\',\n      msg2: \'Highlighted!\'\n    }\n  }\n}\n```\n\n## 代码块行号\n\n### 语法\n\n````\n```ts:line-numbers {1}\nconst line2 = \'This is line 2\'\nconst line3 = \'This is line 3\'\n```\n````\n\n### 预览\n\n```ts:line-numbers {1}\nconst line2 = \'This is line 2\'\nconst line3 = \'This is line 3\'\n```', 1, '2024-06-05 14:55:00', 'published', 0, 0, 0, 0, 1, '2024-06-06 13:14:00', '2024-06-06 16:38:43');
COMMIT;


-- ----------------------------
-- Table structure for t_article_role
-- ----------------------------
DROP TABLE IF EXISTS `t_article_role`;
CREATE TABLE `t_article_role`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `article_id` bigint(0) NOT NULL COMMENT '用户id',
  `role_id` bigint(0) NOT NULL COMMENT '角色id',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='文章角色表';

-- ----------------------------
-- Records of t_article_role
-- ----------------------------
BEGIN;
COMMIT;


-- ----------------------------
-- Table structure for t_category
-- ----------------------------
DROP TABLE IF EXISTS `t_category`;
CREATE TABLE `t_category`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章分类标题',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章分类描述',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='文章分类表';

-- ----------------------------
-- Records of t_category
-- ----------------------------
BEGIN;
INSERT INTO `t_category`(`id`, `title`, `desc`, `created_at`, `updated_at`) VALUES (1, '随笔', '随笔', '2024-06-06 17:15:49', '2024-06-06 17:15:49');
COMMIT;

-- ----------------------------
-- Table structure for t_ip
-- ----------------------------
DROP TABLE IF EXISTS `t_ip`;
CREATE TABLE `t_ip`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `article_id` bigint(0) NOT NULL COMMENT '文章ID',
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'ip地址',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='文章ip表';

-- ----------------------------
-- Records of t_ip
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for t_tag
-- ----------------------------
DROP TABLE IF EXISTS `t_tag`;
CREATE TABLE `t_tag`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章标签标题',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章标签描述',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='文章标签表';


-- ----------------------------
-- Records of t_tag
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for t_article_tag
-- ----------------------------
DROP TABLE IF EXISTS `t_article_tag`;
CREATE TABLE `t_article_tag`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `article_id` bigint(0) NOT NULL COMMENT '文章id',
  `tag_id` bigint(0) NOT NULL COMMENT '标签id',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='文章标签关联表';

-- ----------------------------
-- Records of t_article_tag
-- ----------------------------
BEGIN;
COMMIT;


-- ----------------------------
-- Table structure for t_comment
-- ----------------------------
DROP TABLE IF EXISTS `t_comment`;
CREATE TABLE `t_comment` (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `article_id` bigint(0) NOT NULL COMMENT '文章id',
  `pid` bigint(0) NULL DEFAULT NULL COMMENT '父评论id，允许为空，用于支持评论的回复',
  `user_id` bigint(0) NOT NULL COMMENT '评论用户id',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '评论内容',
  `likes_count` int(0) NULL DEFAULT 0 COMMENT '点赞数',
  `status` enum('nopass', 'ing', 'pass') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '状态',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT = 1 CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='评论表';

-- ----------------------------
-- Records of t_comment
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for t_chat
-- ----------------------------
DROP TABLE IF EXISTS `t_chat`;
CREATE TABLE `t_chat`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `type_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '专家类型',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='chat';

-- ----------------------------
-- Records of t_chat
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for t_context
-- ----------------------------
DROP TABLE IF EXISTS `t_context`;
CREATE TABLE `t_context`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `chat_id` bigint(20) NOT NULL COMMENT '聊天ID',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '内容',
  `role` enum('user', 'assistant', 'system') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色',
  `status` int(11) NOT NULL COMMENT '状态',
  `tool_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '工具名称',
  `tool_parameters` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '工具参数',
  `execution_time` bigint(20) NULL DEFAULT NULL COMMENT '耗时',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='context';

-- ----------------------------
-- Records of t_context
-- ----------------------------
BEGIN;
COMMIT;


-- ----------------------------
-- Table structure for t_favorite
-- ----------------------------
CREATE TABLE `t_favorite` (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `user_id` bigint(0) NOT NULL COMMENT '用户id',
  `article_id` bigint(0) NOT NULL COMMENT '文章id',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT = 1 CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户文章收藏表';


-- ----------------------------
-- Records of t_favorite
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for t_like
-- ----------------------------
CREATE TABLE `t_like` (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `user_id` bigint(0) NOT NULL COMMENT '用户id',
  `article_id` bigint(0) NOT NULL COMMENT '文章id',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户文章点赞表';


-- ----------------------------
-- Records of t_like
-- ----------------------------
BEGIN;
COMMIT;


-- ----------------------------
-- Table structure for t_attachment
-- ----------------------------
DROP TABLE IF EXISTS `t_attachment`;
CREATE TABLE `t_attachment`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `pid` bigint(0) NOT NULL COMMENT '父id',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '附件标题',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '附件链接',
  `ext` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '附件扩展名',
  `size` int(0) DEFAULT NULL COMMENT '附件大小',
  `is_folder` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否是文件夹',
  `type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '附件类型',
  `is_fixed` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否固定(能否被删除)',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='附件表';

CREATE UNIQUE INDEX idx_pid_title_type ON t_attachment(pid,title, type);
-- ----------------------------
-- Records of t_attachment
-- ----------------------------
BEGIN;
INSERT INTO `t_attachment`(`id`, `pid`, `title`, `url`, `ext`, `size`, `is_folder`, `type`, `is_fixed`, `created_at`, `updated_at`) VALUES (1, '0', '文章', '/article', NULL, NULL, 1, 'folder', 1, '2024-06-03 16:55:45', '2024-06-03 16:55:45');
COMMIT;

-- ----------------------------
-- Table structure for t_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `t_dict_data`;
CREATE TABLE `t_dict_data`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `type_id` bigint(0) NOT NULL COMMENT '字典类型ID',
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典标签',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典值',
  `label_class` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标签样式',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `sort` int(0) NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='字典数据表';

-- ----------------------------
-- Records of t_dict_data
-- ----------------------------
BEGIN;
INSERT INTO `t_dict_data`(`id`, `type_id`, `label`, `value`, `label_class`, `remark`, `sort`, `created_at`, `updated_at`) VALUES (1, 1, '默认', 'Default', 'primary', '默认主题', 0, '2024-05-21 17:04:19', '2024-05-21 17:04:19');
COMMIT;

-- ----------------------------
-- Table structure for t_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `t_dict_type`;
CREATE TABLE `t_dict_type`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `dict_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典类型',
  `dict_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典名称',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `sort` int(0) NULL DEFAULT NULL COMMENT '排序',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='字典类型表';

-- ----------------------------
-- Records of t_dict_type
-- ----------------------------
BEGIN;
INSERT INTO `t_dict_type`(`id`, `dict_type`, `dict_name`, `remark`, `sort`, `created_at`, `updated_at`) VALUES (1, 'theme', '主题', '主题', 0, '2024-05-21 17:03:07', '2024-05-21 17:03:07');
COMMIT;

-- ----------------------------
-- Table structure for t_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `pid` bigint(0) NOT NULL COMMENT '父级id',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单路径',
  `title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单标题',
  `icon` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `type` enum('menu','button','interface') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单类型',
  `open_style` enum('_self','_blank') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '打开方式',
  `authority` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '授权标识',
  `sort` int(0) NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='菜单表';

-- ----------------------------
-- Records of t_menu
-- ----------------------------
BEGIN;
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (1, 0, ' ', '仪表盘', '', 'menu', '_self', ' ', 0, '2024-06-05 11:00:52', '2024-06-05 11:00:54');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (2, 1, '/admin/home', '首页', 'home', 'menu', '_self', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (3, 0, '', '博文管理', '', 'menu', '_self', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (4, 3, '/admin/article', '文章管理', 'assignment', 'menu', '_self', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (5, 4, '', '分页', 'search', 'button', '_self', 'article:page', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (6, 4, '', '列表', 'list', 'button', '_self', 'article:list', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (7, 4, '', '新增', 'add', 'button', '_self', 'article:save', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (8, 4, '', '修改', 'edit', 'button', '_self', 'article:update', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (9, 4, '', '删除', 'delete', 'button', '_self', 'article:delete', 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (10, 4, '', '详情', 'info-circle', 'button', '_self', 'article:info', 5, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (11, 4, '', '导入', 'file-import', 'button', '_self', 'article:import', 6, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (12, 4, '', '导出', 'file-export', 'button', '_self', 'article:export', 7, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (13, 3, '/admin/category', '分类管理', 'catalog', 'menu', '_self', '', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (14, 13, '', '分页', 'search', 'button', '_self', 'category:page', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (15, 13, '', '列表', 'list', 'button', '_self', 'category:list', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (16, 13, 'add', '新增', 'add', 'button', '_self', 'category:save', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (17, 13, '', '修改', 'edit', 'button', '_self', 'category:update', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (18, 13, '', '删除', 'delete', 'button', '_self', 'category:delete', 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (19, 13, '', '详情', 'info_circle', 'button', '_self', 'category:info', 5, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (20, 3, '/admin/tag', '标签管理', 'tag', 'menu', '_self', '', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (21, 20, '', '分页', 'search', 'button', '_self', 'tag:page', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (22, 20, '', '列表', 'list', 'button', '_self', 'tag:list', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (23, 20, 'add', '新增', 'add', 'button', '_self', 'tag:save', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (24, 20, '', '修改', 'edit', 'button', '_self', 'tag:update', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (25, 20, '', '删除', 'delete', 'button', '_self', 'tag:delete', 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (26, 20, '', '详情', 'info_circle', 'button', '_self', 'tag:info', 5, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (27, 3, '/admin/comment', '评论管理', 'chat-setting', 'menu', '_self', '', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (28, 27, '', '分页', 'search', 'button', '_self', 'comment:page', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (29, 27, '', '列表', 'list', 'button', '_self', 'comment:list', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (30, 27, 'add', '新增', 'add', 'button', '_self', 'comment:save', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (31, 27, '', '修改', 'edit', 'button', '_self', 'comment:update', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (32, 27, '', '删除', 'delete', 'button', '_self', 'comment:delete', 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (33, 27, '', '详情', 'info_circle', 'button', '_self', 'comment:info', 5, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (34, 0, '', '权限管理', '', 'menu', '_self', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (35, 34, '/admin/menu', '菜单管理', 'menu', 'menu', '_self', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (36, 35, '', '分页', 'search', 'button', '_self', 'menu:page', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (37, 35, '', '列表', 'list', 'button', '_self', 'menu:list', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (38, 35, 'add', '新增', 'add', 'button', '_self', 'menu:save', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (39, 35, '', '修改', 'edit', 'button', '_self', 'menu:update', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (40, 35, '', '删除', 'delete', 'button', '_self', 'menu:delete', 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (41, 35, '', '详情', 'info-circle', 'button', '_self', 'menu:info', 5, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (42, 34, '/admin/role', '角色管理', 'list', 'menu', '_self', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (43, 42, '', '分页', 'search', 'button', '_self', 'role:page', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (44, 42, '', '列表', 'list', 'button', '_self', 'role:list', 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (45, 42, '', '新增', 'add', 'button', '_self', 'role:save', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (46, 42, '', '修改', 'edit', 'button', '_self', 'role:update', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (47, 42, '', '删除', 'delete', 'button', '_self', 'role:delete', 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (48, 42, '', '详情', 'info-circle', 'button', '_self', 'role:info', 5, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (49, 34, '/admin/user', '用户管理', 'user-list', 'menu', '_self', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (50, 49, '', '分页', 'search', 'button', '_self', 'user:page', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (51, 49, '', '列表', 'list', 'button', '_self', 'user:list', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (52, 49, '', '新增', 'user-add', 'button', '_self', 'user:save', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (53, 49, '', '修改', 'edit', 'button', '_self', 'user:update', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (54, 49, '', '删除', 'delete', 'button', '_self', 'user:delete', 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (55, 49, '', '详情', 'info-circle', 'button', '_self', 'user:info', 5, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (56, 0, '', '系统设置', '', 'menu', '_self', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (57, 56, '/admin/attachment', '附件管理', 'file-attachment', 'menu', '_self', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (58, 57, '', '分页', 'search', 'button', '_self', 'attachment:page', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (59, 57, '', '列表', 'list', 'button', '_self', 'attachment:list', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (60, 57, '', '新增', 'upload', 'button', '_self', 'attachment:save', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (61, 57, '', '删除', 'delete', 'button', '_self', 'attachment:delete', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (62, 56, '/admin/site/config', '站点配置', 'adjustment', 'menu', '_self', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (63, 62, '', '分页', 'search', 'button', '_self', 'site:config:page', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (64, 62, '', '列表', 'list', 'button', '_self', 'site:config:list', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (65, 62, '', '新增', 'add', 'button', '_self', 'site:config:save', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (66, 62, '', '修改', 'edit', 'button', '_self', 'site:config:update', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (67, 62, '', '删除', 'delete', 'button', '_self', 'site:config:delete', 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (68, 56, '/admin/dict', '数据字典', 'data', 'menu', '_self', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (69, 68, '', '分页', 'search', 'button', '_self', 'dict:page', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (70, 68, '', '列表', 'list', 'button', '_self', 'dict:list', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (71, 68, '', '新增', 'add', 'button', '_self', 'dict:save', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (72, 68, '', '修改', 'edit', 'button', '_self', 'dict:update', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (73, 68, '', '删除', 'delete', 'button', '_self', 'dict:delete', 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (74, 68, '', '详情', 'info-circle', 'button', '_self', 'dict:info', 5, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (75, 0, '', '应用中心', '', 'menu', '_self', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (76, 75, '/app/chatgpt', 'ChatGPT', 'logo-adobe-illustrate', 'menu', '_blank', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (77, 76, '', '列表', 'list', 'button', '_self', 'chat:list', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (78, 76, '', '新增', 'add', 'button', '_self', 'chat:save', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (79, 76, '', '修改', 'edit', 'button', '_self', 'chat:update', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (80, 76, '', '删除', 'delete', 'button', '_self', 'chat:delete', 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (81, 76, '', '详情', 'info-circle', 'button', '_self', 'chat:info', 5, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (82, 76, '', '列表', 'list', 'button', '_self', 'context:list', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (83, 76, '', '新增', 'add', 'button', '_self', 'context:save', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (84, 76, '', '修改', 'edit', 'button', '_self', 'context:update', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (85, 76, '', '删除', 'delete', 'button', '_self', 'context:delete', 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (86, 76, '', '详情', 'info-circle', 'button', '_self', 'context:info', 5, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (87, 76, '', '分页', 'search', 'button', '_self', 'type:page', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (88, 76, '', '列表', 'list', 'button', '_self', 'type:list', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (89, 76, '', '新增', 'add', 'button', '_self', 'type:save', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (90, 76, '', '修改', 'edit', 'button', '_self', 'type:update', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (91, 76, '', '删除', 'delete', 'button', '_self', 'type:delete', 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (92, 76, '', '详情', 'info-circle', 'button', '_self', 'type:info', 5, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (93, 0, '', '更多', '', 'menu', '_self', '', 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (94, 93, '/admin/user/info', '个人页', 'user', 'menu', '_self', '', 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (95, 93, '/admin/login', '登录页', 'login', 'menu', '_self', '', 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_menu` (`id`, `pid`, `path`, `title`, `icon`, `type`, `open_style`, `authority`, `sort`, `created_at`, `updated_at`) VALUES (96, 93, '/', '站点页', 'location', 'menu', '_blank', ' ', 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
COMMIT;

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `role_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `role_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '角色描述',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='角色表';

-- ----------------------------
-- Records of t_role
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for t_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_role_menu`;
CREATE TABLE `t_role_menu`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `role_id` bigint(0) NOT NULL COMMENT '角色id',
  `menu_id` bigint(0) NOT NULL COMMENT '菜单id',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='角色菜单关联表';

-- ----------------------------
-- Records of t_role_menu
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for t_site_config
-- ----------------------------
DROP TABLE IF EXISTS `t_site_config`;
CREATE TABLE `t_site_config`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `menu_id` bigint(0) DEFAULT NULL COMMENT '菜单id',
  `pid` bigint(0) NOT NULL COMMENT '父id',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '编码',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '标题',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '值',
  `type` enum('string','boolean','number','textarea','dict') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类型',
  `dict_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '字典类型',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述',
  `is_change` tinyint(1) NOT NULL DEFAULT 0  COMMENT '是否可变',
  `is_show` tinyint(1) NOT NULL DEFAULT 0  COMMENT '是否展示',
  `sort` int(0) NOT NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='站点配置表';

-- ----------------------------
-- Records of t_site_config
-- ----------------------------
BEGIN;
INSERT INTO `t_site_config`(`id`, `menu_id`, `pid`, `code`, `title`, `value`, `type`, `dict_type`, `desc`, `is_change`, `is_show`, `sort`, `created_at`, `updated_at`) VALUES (1, NULL, 0, 'site', '站点信息', 'true', 'boolean', NULL, NULL, 0, 1, 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_site_config`(`id`, `menu_id`, `pid`, `code`, `title`, `value`, `type`, `dict_type`, `desc`, `is_change`, `is_show`, `sort`, `created_at`, `updated_at`) VALUES (2, NULL, 1, 'title', '站点名称', 'Waltz', 'string', NULL, NULL, 1, 1, 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_site_config`(`id`, `menu_id`, `pid`, `code`, `title`, `value`, `type`, `dict_type`, `desc`, `is_change`, `is_show`, `sort`, `created_at`, `updated_at`) VALUES (3, NULL, 1, 'theme', '站点主题', 'Default', 'dict', 'theme', NULL, 1, 1, 1, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_site_config`(`id`, `menu_id`, `pid`, `code`, `title`, `value`, `type`, `dict_type`, `desc`, `is_change`, `is_show`, `sort`, `created_at`, `updated_at`) VALUES (4, NULL, 1, 'desc', '站点详情', 'Here I will share insights, tips, and tutorials on website development and also thoughts on the latest trends and technologies in the field.v', 'textarea', NULL, NULL, 1, 1, 2, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_site_config`(`id`, `menu_id`, `pid`, `code`, `title`, `value`, `type`, `dict_type`, `desc`, `is_change`, `is_show`, `sort`, `created_at`, `updated_at`) VALUES (5, NULL, 1, 'login', '站点登录', 'false', 'boolean', NULL, NULL, 1, 1, 3, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_site_config`(`id`, `menu_id`, `pid`, `code`, `title`, `value`, `type`, `dict_type`, `desc`, `is_change`, `is_show`, `sort`, `created_at`, `updated_at`) VALUES (6, NULL, 1, 'comment', '站点评论', 'false', 'boolean', NULL, NULL, 1, 1, 4, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_site_config`(`id`, `menu_id`, `pid`, `code`, `title`, `value`, `type`, `dict_type`, `desc`, `is_change`, `is_show`, `sort`, `created_at`, `updated_at`) VALUES (7, NULL, 1, 'footer', '站点页脚', 'false', 'boolean', NULL, NULL, 1, 1, 5, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_site_config`(`id`, `menu_id`, `pid`, `code`, `title`, `value`, `type`, `dict_type`, `desc`, `is_change`, `is_show`, `sort`, `created_at`, `updated_at`) VALUES (8, 76, 0, 'chatgpt', '大模型', 'false', 'boolean', NULL, NULL, 1, 0, 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
INSERT INTO `t_site_config`(`id`, `menu_id`, `pid`, `code`, `title`, `value`, `type`, `dict_type`, `desc`, `is_change`, `is_show`, `sort`, `created_at`, `updated_at`) VALUES (9, NULL, 8, 'url', '链接', '', 'string', NULL, NULL, 1, 0, 0, '2024-05-20 13:14:00', '2024-06-04 16:29:59');
INSERT INTO `t_site_config`(`id`, `menu_id`, `pid`, `code`, `title`, `value`, `type`, `dict_type`, `desc`, `is_change`, `is_show`, `sort`, `created_at`, `updated_at`) VALUES (10, NULL, 8, 'model', '模型名称', '', 'string', NULL, NULL, 1, 0, 1, '2024-05-20 13:14:00', '2024-06-04 16:29:43');
INSERT INTO `t_site_config`(`id`, `menu_id`, `pid`, `code`, `title`, `value`, `type`, `dict_type`, `desc`, `is_change`, `is_show`, `sort`, `created_at`, `updated_at`) VALUES (11, NULL, 8, 'key', '密钥', '', 'string', NULL, NULL, 1, 0, 2, '2024-05-20 13:14:00', '2024-06-04 16:30:26');
COMMIT;


-- ----------------------------
-- Table structure for t_type
-- ----------------------------
DROP TABLE IF EXISTS `t_type`;
CREATE TABLE `t_type`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` bigint(20) Default NULL COMMENT '这个GPT属于谁',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模型名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模型编码',
  `system_prompt` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '系统提示词',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '描述',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='type';

CREATE UNIQUE INDEX index_code ON t_type(code);


-- ----------------------------
-- Records of t_type
-- ----------------------------
BEGIN;
INSERT INTO `t_type`(`id`, `user_id`, `name`, `code`, `desc`, `system_prompt`, `created_at`, `updated_at`) VALUES (1, NULL, '通用', 'general', '通用', '您是我的私人智能助理', '2024-05-29 14:16:37', '2024-05-29 14:16:37');
COMMIT;

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '姓名/昵称',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像',
  `gender` enum('men','women','secret') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '性别',
  `email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `introduction` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '简介',
  `super_admin` int(0) NOT NULL DEFAULT 0 COMMENT '是否是超级管理员(0:否 1:是)',
  `status` int(0) NOT NULL DEFAULT 0 COMMENT '是否正常(0:正常 1:停用)',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='用户表';

-- ----------------------------
-- Records of t_user
-- ----------------------------
BEGIN;
INSERT INTO `t_user` (`id`, `username`, `password`, `avatar`, `gender`, `email`, `introduction`, `super_admin`, `status`, `created_at`, `updated_at`) VALUES (1, 'admin', '$2b$10$jgLIbHq678SS8Mo4caG.NOJn03kS6ku8B2rXjjdS1hoIEY.GqNWtq', NULL, 'men', NULL, NULL, 1, 0, '2024-05-20 13:14:00', '2024-05-20 13:14:00');
COMMIT;

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `user_id` bigint(0) NOT NULL COMMENT '用户id',
  `role_id` bigint(0) NOT NULL COMMENT '角色id',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='用户角色表';

-- ----------------------------
-- Records of t_user_role
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
