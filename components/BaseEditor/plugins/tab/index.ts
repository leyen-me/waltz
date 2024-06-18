import createToolbar from "./toolbar";
import commandHandler from "./command";

export default function createTabManagerPlugin({
  name = "tab",
  text,
  color,
} = {}) {
  return {
    install(VMdEditor) {
      if (VMdEditor.name === "v-md-editor") {
        VMdEditor.hotkey({
          modifier: null,
          key: "tab",
          action: function action(editor) {
            const currentSelectedStr = editor.getCurrentSelectedStr();

            if (currentSelectedStr === null) {
              editor.insert(() => {
                return {
                  text: `    `,
                };
              });
            } else {
              // 缩进
              const lines = currentSelectedStr.split("\n");
              const indentedLines = lines.map((line) => "    " + line); // 假设缩进是四个空格
              const indentedText = indentedLines.join("\n");
              editor.replaceSelectionText(indentedText);

              // 继续选中替换后的文本
              editor.changeSelctionTo(indentedText, indentedText);
            }
          },
        });

        VMdEditor.hotkey({
          modifier: "shift",
          key: "tab",
          action: function action(editor) {
            const currentSelectedStr = editor.getCurrentSelectedStr();

            // 取消缩进
            const lines = currentSelectedStr.split("\n");
            const unindentedLines = lines.map(line => {
              // 从行首开始，找到第一个非空白字符的位置
              let firstNonWhitespaceIndex = 0;
              for (let i = 0; i < line.length; i++) {
                if (line[i] !== ' ' && line[i] !== '\t') {
                  break;
                }
                firstNonWhitespaceIndex++;
              }
              // 截取从第一个非空白字符开始到行尾的字符串
              return line.substring(firstNonWhitespaceIndex);
            });
            const unindentedText = unindentedLines.join("\n");
            editor.replaceSelectionText(unindentedText);

            // 继续选中替换后的文本
            editor.changeSelctionTo(unindentedText, unindentedText);
          },
        });
      }
    },
  };
}
