function minimatch(path: string, pattern: string) {
    const regex = new RegExp(
        `^${pattern.replace(/\*/g, ".*").replace(/\//g, "\\/")}$`
    );
    return regex.test(path);
}

export const defineFilterPath = (path: string, list: Array<any>) => {
    const pathList = path.split("?")
    path = pathList[0]
    if (!path.endsWith("/")) {
        path += "/"
    }

    // auth
    // example: /api/admin/article/[id]
    list = list.map((r) => {
        return r.replace('[id]', "[0-9]+\/*")
    })

    for (let i = 0; i < list.length; i++) {
        const pattern = list[i];
        if (minimatch(path, pattern)) {
            return true;
        }
    }
    return false;
};
