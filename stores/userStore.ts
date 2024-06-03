const useUserStore = defineStore("userStore", {
  state: () =>
    <
      {
        user: {
          id: number;
        };
        authorityList: string[];
      }
    >{
      user: {
        id: 0, // 用户ID
      },
      authorityList: [], // 权限列表
    },
  actions: {},
});

export default useUserStore;
