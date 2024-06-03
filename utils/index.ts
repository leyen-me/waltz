export const useDeleteConfirm = (
  deleteFunApi: any,
  deleteFunBody: any,
  deleteSuccess: any
) => {
  const dialog = DialogPlugin.confirm({
    header: "提示",
    body: "确定删除吗?",
    cancelBtn: "取消",
    onConfirm: async () => {
      try {
        dialog.update({ confirmBtn: { content: "删除中", loading: true } });
        await deleteFunApi(deleteFunBody);
        MessagePlugin.success("删除成功");
        await deleteSuccess();
      } catch (error) {
      } finally {
        dialog.destroy();
      }
    },
  });
};
