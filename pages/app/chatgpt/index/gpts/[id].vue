<template>
  <div class="h-full flex xl:justify-center">
    <div class="w-full xl:w-[680px]">
      <t-card title="基本信息">
        <template #actions>
          <t-button
            @click="handleSubmitForm"
            :disabled="!useHasAuth('type:save')"
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
          <t-form-item name="name" label="名称">
            <t-input v-model="formData.name" clearable> </t-input>
          </t-form-item>
          <t-form-item name="code" label="编码">
            <t-input v-model="formData.code" clearable> </t-input>
          </t-form-item>
          <t-form-item name="systemPrompt" label="系统提示词">
            <t-textarea v-model="formData.systemPrompt"></t-textarea>
          </t-form-item>
        </t-form>
      </t-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SubmitContext } from "tdesign-vue-next/es/form";
import useHasAuth from "@/utils/auth";
import {
  useAdminChatTypeInfoApi,
  useAdminChatTypeSubmitApi,
} from "~/api/admin/chat/type";

const route = useRoute();
const router = useRouter();

const formData = ref<{
  id: number;
  name: string;
  code: string;
  systemPrompt: string;
}>({
  id: Number(route.params.id),
  name: "",
  code: "",
  systemPrompt: "",
});
const form = ref(null);
const formRules = ref({
  name: [{ required: true, message: "名称必填" }],
  code: [{ required: true, message: "编码必填" }],
});

const getData = async () => {
  if (formData.value.id) {
    const { id, name, code, systemPrompt } = await useAdminChatTypeInfoApi(
      formData.value.id
    );
    formData.value.id = id as number;
    formData.value.name = name;
    formData.value.code = code;
    formData.value.systemPrompt = systemPrompt;
  }
};

const handleSave = async ({ validateResult, firstError }: SubmitContext) => {
  if (validateResult === true) {
    try {
      const res = await useAdminChatTypeSubmitApi(formData.value);
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
