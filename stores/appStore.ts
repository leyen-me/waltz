import type DictType from "~/server/models/DictType";

const useAppStore = defineStore("appStore", {
  state: () =>
    <
      {
        dictList: DictTypeResponse[];
        siteConfig: {
          [key: string]: [string];
        };
        web: {
          loading: boolean;
        };
      }
    >{
      // 权限列表
      dictList: [],
      siteConfig: {},

      // 前台
      web: {
        loading: false,
      },
    },
  actions: {},
});

export default useAppStore;
