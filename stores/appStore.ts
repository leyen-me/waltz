import { useAdminDictTypeListApi } from "~/api/admin/dict";
import { useAdminMenuNavApi } from "~/api/admin/menu";
import { useAdminUserInfoApi } from "~/api/admin/user";
import type Menu from "~/server/models/Menu";
import useUserStore from "./userStore";
import { treeToList } from "~/common/utils/treeUtil";

const useAppStore = defineStore("appStore", {
  state: () =>
    <
      {
        dictList: DictTypeResponse[];

        navTree: Menu[];
        navList: Menu[];
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
      navTree: [],
      navList: [],
      siteConfig: new Map(),
      // 前台
      web: {
        loading: false,
      },
      // 主题
      themeMap: {},
    },
  actions: {
    async initSystem() {
      const userStore = useUserStore();
      /**
       * 获取用户基本信息/获取字典列表
       * Obtain basic user information/obtain dictionary list
       */
      const [userinfo, dictList, navList] = await Promise.all([
        useAdminUserInfoApi(),
        useAdminDictTypeListApi(),
        useAdminMenuNavApi(),
      ]);
      userStore.user.id = userinfo.id as number;
      userStore.authorityList = userinfo.authorityList as string[];
      this.dictList = dictList;
      this.navTree = navList;

      //@ts-ignore
      this.navList = treeToList(JSON.parse(JSON.stringify(navList)));
    },
  },
});

export default useAppStore;
