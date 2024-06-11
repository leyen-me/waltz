export const listToTree = <K, T extends { [key: string]: any }>(
  list: T[],
  idKey: keyof T,
  parentKey: keyof T,
  root: K,
  maxTwoLevel: boolean = false
): TreeNode<K, T>[] => {
  const map = new Map<K, TreeNode<K, T>>();
  // 构建节点映射表
  list.forEach((item) => {
    const nodeId = item[idKey] as K;
    let m = {
      id: item.id as K,
      pid: item.pid as K,
      children: [],
    };
    m = { ...m, ...item };
    map.set(nodeId, m);
  });
  // 构建树形结构
  const tree: TreeNode<K, T>[] = [];
  list.forEach((item) => {
    const nodeId = item[idKey] as K;
    const node = map.get(nodeId);
    if (node) {
      const parentId = item[parentKey] as K;
      if (parentId === root) {
        tree.push(node);
      } else {
        const parentNode = map.get(parentId);

        // 最大两层结构
        if (maxTwoLevel) {
          if (!parentNode) {
            // 如果父节点不存在，则将当前节点直接添加到树中
            tree.push(node);
          } else if (parentNode.pid === root) {
            // 如果父节点存在且其父节点是根节点，则将当前节点添加到父节点的子节点中
            parentNode.children?.push(node);
          }
        } else {
          // 如果不限制层级，直接将当前节点添加到父节点的子节点中
          if (parentNode) {
            parentNode.children?.push(node);
          }
        }
      }
    }
  });
  return tree;
};

export const treeToList = <K, T>(tree: TreeNode<K, T>[]): TreeNode<K, T>[] => {
  let queue: TreeNode<K, T>[] = [...tree];
  const out: TreeNode<K, T>[] = [];
  while (queue.length) {
    const first = queue.shift();
    if (first) {
      if (first.children) {
        queue = queue.concat(first.children);
        delete first.children;
      }
      out.push(first);
    }
  }
  return out;
};
