<template>
  <div class="h-full flex justify-center">
    <div class="w-full xl:w-[500px]">
      <t-card title="基本信息">
        <template #actions>
          <t-button
            @click="handleSubmitForm"
            :disabled="!useHasAuth('menu:save')"
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
          <t-form-item name="type" label="类型">
            <t-radio-group variant="default-filled" v-model="formData.type">
              <t-radio-button
                :value="v.value"
                v-for="(v, k) in typeOptions"
                :key="v.value"
                >{{ v.label }}</t-radio-button
              >
            </t-radio-group>
          </t-form-item>
          <t-form-item name="openStyle" label="打开方式">
            <t-radio-group
              variant="default-filled"
              v-model="formData.openStyle"
            >
              <t-radio-button
                :value="v.value"
                v-for="(v, k) in openStyleOptions"
                :key="v.value"
                >{{ v.label }}</t-radio-button
              >
            </t-radio-group>
          </t-form-item>
          <t-form-item name="pid" label="父级">
            <t-tree-select
              v-model="formData.pid"
              :data="pList"
              :keys="{
                label: 'title',
                value: 'id',
              }"
            >
            </t-tree-select>
          </t-form-item>
          <t-form-item name="title" label="菜单名称">
            <t-input v-model="formData.title" clearable> </t-input>
          </t-form-item>
          <t-form-item
            name="path"
            label="菜单路径"
            v-if="formData.type === typeOptions[0].value"
          >
            <t-input v-model="formData.path" clearable> </t-input>
          </t-form-item>
          <t-form-item
            name="icon"
            label="菜单图标"
            v-if="formData.type === typeOptions[0].value"
          >
            <BaseIconSelect v-model="formData.icon"></BaseIconSelect>
          </t-form-item>
          <t-form-item name="sort" label="排序">
            <t-input v-model="formData.sort" clearable type="number"> </t-input>
          </t-form-item>
          <t-form-item
            name="authority"
            label="权限标识"
            v-if="formData.type === typeOptions[1].value"
          >
            <t-input v-model="formData.authority" clearable> </t-input>
          </t-form-item>
        </t-form>
      </t-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  useAdminMenuInfoApi,
  useAdminMenuListApi,
  useAdminMenuSubmitApi,
} from "@/api/admin/menu";
import type { SubmitContext } from "tdesign-vue-next/es/form";
import useHasAuth from "@/utils/auth";

const route = useRoute();
const router = useRouter();

const typeOptions = ref([
  { label: "菜单", value: "menu" },
  { label: "按钮", value: "button" },
]);
const openStyleOptions = ref([
  { label: "内部打开", value: "_self" },
  { label: "外部打开", value: "_blank" },
]);
const pList = ref();
const formData = ref({
  id: Number(route.params.id),
  pid: 0,
  icon: "",
  title: "",
  path: "",
  sort: 0,
  type: typeOptions.value[0].value,
  authority: "",
  openStyle: "_self",
});
const form = ref(null);
const formRules = ref({
  title: [{ required: true, message: "菜单名称必填" }],
  path: [{ required: true, message: "路径必填" }],
  icon: [{ required: true, message: "图标必填" }],
});

const getData = async () => {
  const data = await useAdminMenuListApi();

  const res = [
    {
      id: 0,
      title: "一级菜单",
      children: data,
    },
  ];
  pList.value = res;

  if (formData.value.id) {
    const { pid, icon, title, path, sort, type, authority, openStyle } =
      await useAdminMenuInfoApi(formData.value.id);
    formData.value.pid = pid;
    formData.value.icon = icon;
    formData.value.title = title;
    formData.value.path = path;
    formData.value.sort = sort;
    formData.value.type = type;
    formData.value.authority = authority;
    formData.value.openStyle = openStyle;
  }
};

const handleSave = async ({ validateResult, firstError }: SubmitContext) => {
  if (validateResult === true) {
    try {
      const res = await useAdminMenuSubmitApi(formData.value);
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

getData();
</script>
