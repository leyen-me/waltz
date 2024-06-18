const createClipboardInput = () => {
    const input = document.createElement("input");
    input.setAttribute("id", "clipboardInput");
    input.setAttribute("type", "text");
    input.setAttribute("readonly", "readonly");
    input.style.position = "absolute";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    return input;
}

/**
 * 浏览器拷贝文本
 * @param text 
 */
export const copyText2 = async (text: string) => {
    try {
        // 尝试使用现代剪贴板API
        await navigator.clipboard.writeText(text);
        MessagePlugin.success("已复制");
    } catch (e) {
        // 如果剪贴板API不可用，使用降级方案
        const input = createClipboardInput();
        if (input) {
            input.value = text;
            input.select();
        }
        try {
            const result = document.execCommand("copy");
            if (result) {
                MessagePlugin.success("已复制");
            } else {
                MessagePlugin.error("复制失败");
            }
        } catch (err) {
            MessagePlugin.error("复制失败");
        } finally {
            if (input) {
                input.remove();
            }
        }
    }
};



/**
 * 创建带有格式的文本，并将其复制到剪贴板
 * @param {string} text 要复制的文本，可以包含换行符
 */
export const copyText = async (text:string) => {
    try {
        // 创建一个虚拟的textarea元素来保留格式
        const textarea = document.createElement('textarea');
        textarea.value = text;
        // 设置足够的列和行以包含整个内容（防止自动截断）
        textarea.cols = 1;
        textarea.rows = text.split('\n').length; // 根据换行符的数量设置行数
        document.body.appendChild(textarea);

        // 选择文本
        textarea.select();
        textarea.setSelectionRange(0, 99999); // 对于某些浏览器需要这个

        // 尝试使用剪贴板API复制文本
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    'text/plain': new Blob([textarea.value], { type: 'text/plain' })
                })
            ]);
            MessagePlugin.success("已复制");
        } catch (err) {
            // 如果剪贴板API不可用，使用document.execCommand方法作为回退
            if (document.execCommand('copy')) {
                MessagePlugin.success("已复制");
            } else {
                MessagePlugin.error("复制失败");
            }
        } finally {
            // 移除textarea元素
            document.body.removeChild(textarea);
        }
    } catch (e) {
        MessagePlugin.error("复制失败");
    }
};