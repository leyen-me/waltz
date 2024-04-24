/**
 * 过滤路由白名单
 */
export const defineFilterByWhiteList = (url: string, whiteList: Array<any>) => {
  // 遍历白名单数组
  for (let i = 0; i < whiteList.length; i++) {
    const pattern = whiteList[i];
    // 使用 Ant 风格的路径匹配语法
    if (minimatch(url, pattern)) {
      return true; // 如果匹配成功，返回 true
    }
  }
  return false; // 如果没有匹配成功，返回 false
};

// 使用 minimatch 库实现 Ant 风格的路径匹配
function minimatch(url: string, pattern: string) {
  const regex = new RegExp(
    `^${pattern.replace(/\*/g, ".*").replace(/\//g, "\\/")}$`
  );
  return regex.test(url);
}
