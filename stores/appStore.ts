import type DictType from "~/server/models/DictType";

const useAppStore = defineStore("appStore", {
  state: () =>
    <
      {
        dictList: DictTypeResponse[];
      }
    >{
      // 权限列表
      dictList: [],
    },
  actions: {},
});

export default useAppStore;
