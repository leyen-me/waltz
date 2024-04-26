export const listToTree = <K, T>(list: TreeNode<K, T>[], idKey: keyof TreeNode<K, T>, parentKey: keyof TreeNode<K, T>, root: K): TreeNode<K, T>[] => {
    return list
        .filter(item => item[parentKey] === root) // 过滤出根节点的直接子节点
        .map(item => ({ ...item, children: buildTree(item[idKey] as K) })); // 构建树形结构

    function buildTree(parentId: K): TreeNode<K, T>[] {
        const children = list
            .filter(item => item[parentKey] === parentId) // 过滤出当前节点的子节点
            .map(item => ({ ...item, children: buildTree(item[idKey] as K) })); // 递归构建子节点的树形结构
        return children.length ? children : [] as TreeNode<K, T>[]; // 如果没有子节点，则返回空数组
    }
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

