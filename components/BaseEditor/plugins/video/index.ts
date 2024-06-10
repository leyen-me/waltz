import createToolbar from "./toolbar";

export default function createImageManagerPlugin({
  name = "video",
  icon = "v-md-custom-icon-video",
  text,
  color,
} = {}) {
  const toolbar = createToolbar({
    commandName: name,
    title: (editor) => `${editor.langConfig.task.toolbar}`,
    text,
    icon,
  });

  function getPreviewEl(el) {
    const previewElClass = "v-md-editor__toolbar-item-video";
    return el.classList.contains(previewElClass)
      ? el
      : el.querySelector(`.${previewElClass}`);
  }

  return {
    install(VMdEditor) {
      if (VMdEditor.name === "v-md-editor") {
        VMdEditor.toolbar(name, toolbar);

        VMdEditor.mixins.push({
          emits: ["video"],
          mounted() {
            this.$nextTick(() => {
              const previewEl = getPreviewEl(this.$el);
              previewEl.addEventListener("click", this.showVideo);
            });
          },
          beforeUnmount() {
            const previewEl = getPreviewEl(this.$el);
            previewEl.removeEventListener("click", this.showVideo);
          },
          methods: {
            showVideo: function handleShowVideo(_ref: any) {
              this.$emit("video", null);
            },
          },
        });

        VMdEditor.lang.add({
          "zh-CN": {
            task: {
              toolbar: "视频",
              placeholder: "视频",
            },
          },
          "en-US": {
            task: {
              toolbar: "Video",
              placeholder: "Video",
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
