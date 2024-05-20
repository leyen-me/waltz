/*
 Date: 20/05/2024 13:40:02
*/
CREATE DATABASE IF NOT EXISTS open_nuxt_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_article
-- ----------------------------
DROP TABLE IF EXISTS `t_article`;
CREATE TABLE `t_article`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `category_id` bigint(0) NULL DEFAULT NULL COMMENT '文章分类',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章标题',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '文章封面',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章内容',
  `html` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章HTML',
  `author_id` bigint(0) NOT NULL COMMENT '文章作者ID',
  `published_at` datetime(0) NULL DEFAULT NULL COMMENT '发布时间',
  `status` enum('draft','published','archived') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'draft' COMMENT '文章状态',
  `views_count` int(0) NULL DEFAULT 0 COMMENT '文章浏览量',
  `sort` int(0) NULL DEFAULT 1 COMMENT '排序',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  FULLTEXT INDEX `idx_title_fulltext`(`title`, `content`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of t_article
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for t_article_ip
-- ----------------------------
DROP TABLE IF EXISTS `t_article_ip`;
CREATE TABLE `t_article_ip`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `article_id` bigint(0) NOT NULL COMMENT '文章ID',
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'ip地址',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of t_article_ip
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for t_attachment
-- ----------------------------
DROP TABLE IF EXISTS `t_attachment`;
CREATE TABLE `t_attachment`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `original_title` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '附件原始标题',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '附件标题',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '附件链接',
  `ext` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '附件分类/扩展名',
  `size` int(0) NOT NULL COMMENT '附件大小',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of t_attachment
-- ----------------------------
BEGIN;
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
  `sort` int(0) NULL DEFAULT NULL COMMENT '排序',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of t_dict_data
-- ----------------------------
BEGIN;
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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of t_dict_type
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for t_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `pid` bigint(0) NOT NULL COMMENT '父级ID',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单路径',
  `title` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单标题',
  `icon` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `type` enum('menu','button','interface') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单类型',
  `authority` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '授权标识',
  `sort` int(0) NULL DEFAULT NULL COMMENT '排序',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of t_menu
-- ----------------------------
BEGIN;
INSERT INTO `t_menu` VALUES (1, 0, '/admin/home', '首页', 'home', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (2, 0, '', '博文管理', '', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (3, 2, '/admin/category', '分类管理', 'catalog', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (4, 2, '/admin/tag', '标签管理', 'tag', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (5, 2, '/admin/article', '文章管理', 'assignment', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (6, 0, '', '权限管理', '', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (7, 6, '/admin/menu', '菜单管理', 'menu', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (8, 7, '', '分页', 'search', 'button', 'menu:page', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (9, 7, '', '列表', 'list', 'button', 'menu:list', 1, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (10, 7, 'add', '新增', 'add', 'button', 'menu:save', 2, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (11, 7, '', '修改', 'edit', 'button', 'menu:update', 3, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (12, 7, '', '删除', 'delete', 'button', 'menu:delete', 4, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (13, 7, '', '详情', 'info-circle', 'button', 'menu:info', 5, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (14, 6, '/admin/role', '角色管理', 'list', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (15, 14, '', '分页', 'search', 'button', 'role:page', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (16, 14, '', '列表', 'list', 'button', 'role:list', 4, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (17, 14, '', '新增', 'add', 'button', 'role:save', 2, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (18, 14, '', '修改', 'edit', 'button', 'role:update', 3, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (19, 14, '', '删除', 'delete', 'button', 'role:delete', 4, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (20, 14, '', '详情', 'info-circle', 'button', 'role:info', 5, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (21, 6, '/admin/user', '用户管理', 'user-list', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (22, 21, '', '分页', 'search', 'button', 'user:page', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (23, 21, '', '列表', 'list', 'button', 'user:list', 1, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (24, 21, '', '新增', 'user-add', 'button', 'user:save', 2, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (25, 21, '', '修改', 'edit', 'button', 'user:update', 3, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (26, 21, '', '删除', 'delete', 'button', 'user:delete', 4, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (27, 21, '', '详情', 'info-circle', 'button', 'user:info', 5, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (28, 5, '', '分页', 'search', 'button', 'article:page', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (29, 5, '', '列表', 'list', 'button', 'article:list', 1, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (30, 5, '', '新增', 'add', 'button', 'article:save', 2, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (31, 5, '', '修改', 'edit', 'button', 'article:update', 3, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (32, 5, '', '删除', 'delete', 'button', 'article:delete', 4, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (33, 5, '', '详情', 'info-circle', 'button', 'article:info', 5, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (34, 0, '', '系统设置', '', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (35, 34, '/admin/attachment', '附件管理', 'file-attachment', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (36, 35, '', '分页', 'search', 'button', 'attachment:page', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (37, 35, '', '列表', 'list', 'button', 'attachment:list', 1, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (38, 35, '', '新增', 'upload', 'button', 'attachment:save', 2, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (39, 35, '', '删除', 'delete', 'button', 'attachment:delete', 3, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (40, 34, '/admin/site/config', '站点配置', 'adjustment', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (41, 40, '', '分页', 'search', 'button', 'site:config:page', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (42, 40, '', '列表', 'list', 'button', 'site:config:list', 1, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (43, 40, '', '新增', 'add', 'button', 'site:config:save', 2, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (44, 40, '', '修改', 'edit', 'button', 'site:config:update', 3, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (45, 40, '', '删除', 'delete', 'button', 'site:config:delete', 4, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (46, 34, '/admin/dict', '数据字典', 'data', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (47, 46, '', '分页', 'search', 'button', 'dict:page', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (48, 46, '', '列表', 'list', 'button', 'dict:list', 1, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (49, 46, '', '新增', 'add', 'button', 'dict:save', 2, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (50, 46, '', '修改', 'edit', 'button', 'dict:update', 3, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (51, 46, '', '删除', 'delete', 'button', 'dict:delete', 4, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (52, 46, '', '详情', 'info-circle', 'button', 'dict:info', 5, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (53, 0, '', '更多', '', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (54, 53, '/admin/user/info', '个人页', 'user', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (55, 53, '/admin/login', '登录页', 'login', 'menu', '', 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48');
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
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of t_role
-- ----------------------------
BEGIN;
INSERT INTO `t_role` VALUES (1, 'blog_admin', '博文管理员', '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (2, 'visitor', '访客', '2024-05-20 13:38:48', '2024-05-20 13:38:48');
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
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of t_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `t_role_menu` VALUES (1, 1, 1, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (2, 1, 2, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (3, 1, 3, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (4, 1, 4, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (5, 1, 5, '2024-05-20 13:38:48', '2024-05-20 13:38:48');
COMMIT;

-- ----------------------------
-- Table structure for t_site_config
-- ----------------------------
DROP TABLE IF EXISTS `t_site_config`;
CREATE TABLE `t_site_config`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '键',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '值',
  `type` enum('string','boolean','number') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '类型',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '描述',
  `created_at` datetime(0) NOT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of t_site_config
-- ----------------------------
BEGIN;
INSERT INTO `t_site_config` VALUES (1, 'theme', 'default', 'string', '主题', '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (2, 'login', 'false', 'boolean', '登录', '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (3, 'leave', 'false', 'boolean', '评论', '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (4, 'chatgpt', 'false', 'boolean', '大模型', '2024-05-20 13:38:48', '2024-05-20 13:38:48');
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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of t_user
-- ----------------------------
BEGIN;
INSERT INTO `t_user` VALUES (1, 'LEYEN', '$2b$10$jgLIbHq678SS8Mo4caG.NOJn03kS6ku8B2rXjjdS1hoIEY.GqNWtq', NULL, 'men', NULL, NULL, 1, 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (2, 'Alice', '$2b$10$jgLIbHq678SS8Mo4caG.NOJn03kS6ku8B2rXjjdS1hoIEY.GqNWtq', NULL, 'women', NULL, NULL, 1, 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48'), (3, 'Facker', '$2b$10$jgLIbHq678SS8Mo4caG.NOJn03kS6ku8B2rXjjdS1hoIEY.GqNWtq', NULL, 'secret', NULL, NULL, 0, 0, '2024-05-20 13:38:48', '2024-05-20 13:38:48');
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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of t_user_role
-- ----------------------------
BEGIN;
INSERT INTO `t_user_role` VALUES (1, 3, 1, '2024-05-20 13:38:48', '2024-05-20 13:38:48');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
