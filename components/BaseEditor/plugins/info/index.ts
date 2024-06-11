import createToolbar from "./toolbar";
import commandHandler from "./command";

export default function createImageManagerPlugin({
  name = "info",
  icon = "v-md-custom-icon-info",
  text,
  color,
} = {}) {
  const toolbar = createToolbar({
    commandName: name,
    title: (editor) => `${editor.langConfig.info.toolbar}`,
    text,
    icon,
  });

  function getPreviewEl(el) {
    const previewElClass = "v-md-editor__toolbar-item-info";
    return el.classList.contains(previewElClass)
      ? el
      : el.querySelector(`.${previewElClass}`);
  }

  return {
    install(VMdEditor) {
      if (VMdEditor.name === "v-md-editor") {
        VMdEditor.toolbar(name, toolbar);

        VMdEditor.mixins.push({
          emits: ["info"],
          mounted() {
            this.$nextTick(() => {
              const previewEl = getPreviewEl(this.$el);
              previewEl.addEventListener("click", this.showInfo);
            });
          },
          beforeUnmount() {
            const previewEl = getPreviewEl(this.$el);
            previewEl.removeEventListener("click", this.showInfo);
          },
          methods: {
            showInfo: function handleShowInfo(_ref: any) {
              this.$emit("info", null);
            },
          },
        });

        VMdEditor.lang.add({
          "zh-CN": {
            info: {
              toolbar: "基本信息",
              placeholder: "基本信息",
            },
          },
          "en-US": {
            info: {
              toolbar: "Base Info",
              placeholder: "Base Info",
            },
          },
        });
      }

      // VMdEditor.vMdParser.use(parser, {
      //   color,
      // });
    },
  };
}
