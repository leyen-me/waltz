export const listToTree = <K, T extends { [key: string]: any }>(list: T[], idKey: keyof T, parentKey: keyof T, root: K): TreeNode<K, T>[] => {
    const map = new Map<K, TreeNode<K, T>>();

    // 构建节点映射表
    list.forEach(item => {
        const nodeId = item[idKey] as K;
        let m = {
            id: item.id as K,
            pid: item.pid as K,
            children: []
        }
        // 从 Menu 对象中取出所需的属性
        m = { ...m, ...item }
        map.set(nodeId, m);
    });

    // 构建树形结构
    const tree: TreeNode<K, T>[] = [];
    list.forEach(item => {
        const nodeId = item[idKey] as K;
        const node = map.get(nodeId);
        if (node) {
            const parentId = item[parentKey] as K;
            if (parentId === root) {
                tree.push(node);
            } else {
                const parentNode = map.get(parentId);
                if (parentNode) {
                    parentNode.children?.push(node);
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

