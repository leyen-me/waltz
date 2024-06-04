const useAppStore = defineStore("appStore", {
  state: () =>
    <
      {
        dictList: DictTypeResponse[];
        siteConfig: any;
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
      siteConfig: new Map(),
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
