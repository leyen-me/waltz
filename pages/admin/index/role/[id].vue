<template>
  <div class="h-full flex xl:justify-center">
    <div class="w-full xl:w-[680px]">
      <t-card title="基本信息">
        <template #actions>
          <t-button
            @click="handleSubmitForm"
            :disabled="!useHasAuth('role:save')"
            >保存</t-button
          >
        </template>
        <t-form
          ref="form"
          :data="formData"
          :rules="formRules"
          :colon="true"
          :label-align="'top'"
          @submit="handleSave"
        >
          <t-form-item name="roleName" label="角色名称">
            <t-input v-model="formData.roleName" clearable> </t-input>
          </t-form-item>
          <t-form-item name="roleDesc" label="角色描述">
            <t-input v-model="formData.roleDesc" clearable> </t-input>
          </t-form-item>
          <t-form-item name="menuIdList" label="菜单">
            <t-tree
              ref="tree"
              v-model="formData.menuIdList"
              :data="menuList"
              :checkable="true"
              :check-strictly="false"
              :value-mode="'onlyLeaf'"
              :keys="{ label: 'title', value: 'id' }"
              hover
            />
          </t-form-item>
        </t-form>
      </t-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SubmitContext } from "tdesign-vue-next/es/form";
import { useAdminRoleInfoApi, useAdminRoleSubmitApi } from "@/api/admin/role";
import { useAdminMenuListApi } from "@/api/admin/menu";
import type Menu from "@/server/models/Menu";
import useHasAuth from "@/utils/auth";

const route = useRoute();
const router = useRouter();

const menuList: Ref<Menu[]> = ref([]);
const getMenuList = async () => {
  const data = await useAdminMenuListApi();
  menuList.value = data;
  console.log(menuList.value);
};

const formData = ref<{
  id: number;
  roleName: string;
  roleDesc: string;
  menuIdList: number[];
}>({
  id: Number(route.params.id),
  roleName: "",
  roleDesc: "",
  menuIdList: [],
});
const form = ref(null);
const formRules = ref({
  roleName: [{ required: true, message: "角色名称必填" }],
  roleDesc: [{ required: true, message: "角色描述必填" }],
});

const getData = async () => {
  if (formData.value.id) {
    const { roleName, roleDesc, menuIdList } = await useAdminRoleInfoApi(
      formData.value.id
    );
    formData.value.roleName = roleName;
    formData.value.roleDesc = roleDesc;
    formData.value.menuIdList = menuIdList as number[];
  }
};

const handleSave = async ({ validateResult, firstError }: SubmitContext) => {
  if (validateResult === true) {
    try {
      await useAdminRoleSubmitApi(formData.value);
      MessagePlugin.success("保存成功");
      router.back();
    } catch (error: any) {
      MessagePlugin.error("保存失败");
    }
  } else {
    console.log("Validate Errors: ", firstError, validateResult);
    firstError && MessagePlugin.warning(firstError);
  }
};

const handleSubmitForm = () => {
  // @ts-ignore
  form.value.submit();
};

getMenuList();
getData();
</script>
