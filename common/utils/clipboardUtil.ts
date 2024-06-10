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
export const copyText = async (text: string) => {
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