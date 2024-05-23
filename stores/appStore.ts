import type DictType from "~/server/models/DictType";

const useAppStore = defineStore("appStore", {
  state: () =>
    <
      {
        dictList: DictTypeResponse[];
        siteConfig: {
          [key: string]: string;
        };
        web: {
          loading: boolean;
        };
        themeMap: {
          [key: string]: any;
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
      // 主题
      themeMap: {},
    },
  actions: {},
});

export default useAppStore;
