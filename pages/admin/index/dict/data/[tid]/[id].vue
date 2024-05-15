<template>
  <div class="h-full flex xl:justify-center">
    <div class="w-full xl:w-[680px]">
      <t-card title="字典配置">
        <template #actions>
          <t-button
            @click="handleSubmitForm"
            :disabled="!useHasAuth('dict:save')"
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
          <t-form-item name="label" label="字典标签">
            <t-input v-model="formData.label" clearable> </t-input>
          </t-form-item>
          <t-form-item name="value" label="字典值">
            <t-input v-model="formData.value" clearable> </t-input>
          </t-form-item>
          <t-form-item name="labelClass" label="标签样式">
            <t-select
              v-model="formData.labelClass"
              :options="tagList"
              :keys="{ label: 'label', value: 'label' }"
              placeholder="请选择"
            />
          </t-form-item>
          <t-form-item name="remark" label="备注">
            <t-input v-model="formData.remark" clearable></t-input>
          </t-form-item>
          <t-form-item name="sort" label="排序">
            <t-input v-model="formData.sort" clearable type="number"> </t-input>
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
  useAdminDictDataSubmitApi,
  useAdminDictDataInfo,
} from "@/api/admin/dict";
import type Role from "@/server/models/Role";
import useHasAuth from "@/utils/auth";

const route = useRoute();
const router = useRouter();

const tagList = ref([
  {
    label: "default",
  },
  {
    label: "primary",
  },
  {
    label: "warning",
  },
  {
    label: "danger",
  },
  {
    label: "success",
  },
]);

const formData = ref<{
  id: number;
  typeId: number;
  label: string;
  value: string;
  labelClass: string;
  remark: string;
  sort: string;
}>({
  id: Number(route.params.id),
  typeId: Number(route.params.tid),
  label: "",
  value: "",
  labelClass: "",
  remark: "",
  sort: 0,
});
const form = ref(null);
const formRules = ref({
  label: [{ required: true, message: "字典标签必填" }],
  value: [{ required: true, message: "字典值必填" }],
  sort: [{ required: true, message: "排序必填" }],
});

const getData = async () => {
  if (formData.value.id) {
    const { id, typeId, label, value, labelClass, remark, sort } =
      await useAdminDictDataInfo(formData.value.id);
    formData.value.id = id as number;
    formData.value.typeId = typeId as number;
    formData.value.label = label;
    formData.value.value = value;
    formData.value.labelClass = labelClass;
    formData.value.remark = remark;
    formData.value.sort = sort;
  }
};

const handleSave = async ({ validateResult, firstError }: SubmitContext) => {
  if (validateResult === true) {
    try {
      const res = await useAdminDictDataSubmitApi(formData.value);
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
