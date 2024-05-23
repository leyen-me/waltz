<template>
  <div class="h-full flex xl:justify-center">
    <div class="w-full xl:w-[680px]">
      <t-card title="基本信息">
        <template #actions>
          <t-button
            @click="handleSubmitForm"
            :disabled="!useHasAuth('category:save')"
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
          <t-form-item name="title" label="名称">
            <t-input v-model="formData.title" clearable> </t-input>
          </t-form-item>
          <t-form-item name="desc" label="备注">
            <t-input v-model="formData.desc" clearable> </t-input>
          </t-form-item>
        </t-form>
      </t-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SubmitContext } from "tdesign-vue-next/es/form";
import Cookies from "js-cookie";
import {
  useAdminCategoryInfoApi,
  useAdminCategorySubmitApi,
} from "@/api/admin/category";
import useHasAuth from "@/utils/auth";

const route = useRoute();
const router = useRouter();

const formData = ref<{
  id: number;
  title: string;
  desc: string;
}>({
  id: Number(route.params.id),
  title: "",
  desc: "",
});
const form = ref(null);
const formRules = ref({
  title: [{ required: true, message: "名称必填" }],
});

const getData = async () => {
  if (formData.value.id) {
    const { id, title, desc } = await useAdminCategoryInfoApi(
      formData.value.id
    );
    formData.value.id = id as number;
    formData.value.title = title;
    formData.value.desc = desc;
  }
};

const handleSave = async ({ validateResult, firstError }: SubmitContext) => {
  if (validateResult === true) {
    try {
      const res = await useAdminCategorySubmitApi(formData.value);
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
