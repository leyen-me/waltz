const useUserStore = defineStore('userStore', {
    state: () => (<{
        authorityList:string[]
    }>{
        // 用户信息
        user: {
            id: '',
        },
        // 权限列表
        authorityList: [],
    }),
    actions: {
        
    }
})

export default useUserStore
