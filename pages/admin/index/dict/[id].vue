<template>
  <div class="h-full flex xl:justify-center">
    <div class="w-full xl:w-[680px]">
      <t-card title="基本信息">
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
          <t-form-item name="dictType" label="字典类型">
            <t-input v-model="formData.dictType" clearable> </t-input>
          </t-form-item>
          <t-form-item name="dictName" label="字典名称">
            <t-input v-model="formData.dictName" clearable> </t-input>
          </t-form-item>
          <t-form-item name="remark" label="备注">
            <t-input
              v-model="formData.remark"
              clearable
              type="textarea"
            ></t-input>
          </t-form-item>
          <t-form-item name="sort" label="排序">
            <t-input v-model="formData.sort" clearable type="number"> </t-input>
          </t-form-item>
        </t-form>
      </t-card>

      <section class="mt-2">
        <t-card title="字典配置">
          <template #actions>
            <t-button
              @click="
                formData.id && $router.push(`/admin/dict/data/${formData.id}/0`)
              "
              :disabled="!useHasAuth('dict:save')"
              >新增</t-button
            >
          </template>
          <t-table
            ref="tableRef"
            row-key="id"
            :data="list"
            :columns="columns"
          ></t-table>
        </t-card>
      </section>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { SubmitContext } from "tdesign-vue-next/es/form";
import Cookies from "js-cookie";
import {
  useAdminDictTypeInfo,
  useAdminDictTypeSubmitApi,
  useAdminDictDataListApi,
  useAdminDictDataDeleteApi,
} from "@/api/admin/dict";
import type Role from "@/server/models/Role";
import useHasAuth from "@/utils/auth";

const route = useRoute();
const router = useRouter();

const formData = ref<{
  id: number;
  dictType: string;
  dictName: string;
  remark: string;
  sort: string;
}>({
  id: Number(route.params.id),
  dictType: "",
  dictName: "",
  remark: "",
  sort: 0,
});
const form = ref(null);
const formRules = ref({
  dictType: [{ required: true, message: "字典类型必填" }],
  dictName: [{ required: true, message: "字典名称必填" }],
  sort: [{ required: true, message: "排序必填" }],
});

const getData = async () => {
  if (formData.value.id) {
    const { id, dictType, dictName, remark, sort } = await useAdminDictTypeInfo(
      formData.value.id
    );
    formData.value.id = id as number;
    formData.value.dictType = dictType;
    formData.value.dictName = dictName;
    formData.value.remark = remark;
    formData.value.sort = sort;

    const _list = await useAdminDictDataListApi(formData.value.id);
    list.value = _list;
  }
};

const handleSave = async ({ validateResult, firstError }: SubmitContext) => {
  if (validateResult === true) {
    try {
      const res = await useAdminDictTypeSubmitApi(formData.value);
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

// dict-data
const list = ref<DictData[]>([]);
const columns = [
  {
    colKey: "label",
    title: "字典标签",
    ellipsis: true,
  },
  {
    colKey: "value",
    title: "字典值",
    ellipsis: true,
  },
  {
    colKey: "labelClass",
    title: "标签样式",
    ellipsis: true,
  },
  {
    colKey: "remark",
    title: "备注",
    ellipsis: true,
  },
  {
    colKey: "sort",
    title: "排序",
    ellipsis: true,
  },
  {
    colKey: "operate",
    title: "操作",
    cell: (_h: any, { row }: any) => {
      return (
        <t-space>
          <t-link
            variant="text"
            hover="color"
            disabled={!useHasAuth("dict:update")}
            onClick={() =>
              router.push(`/admin/dict/data/${formData.value.id}/${row.id}`)
            }
          >
            编辑
          </t-link>
          <t-popconfirm
            content="确认删除吗"
            onConfirm={() => handleDelete(row.id)}
          >
            <t-link
              disabled={!useHasAuth("dict:delete")}
              variant="text"
              hover="color"
              theme="danger"
            >
              删除
            </t-link>
          </t-popconfirm>
        </t-space>
      );
    },
  },
];

const handleDelete = async (id: number) => {
  try {
    await useAdminDictDataDeleteApi(id);
    await getData();
    MessagePlugin.success("删除成功");
  } catch (error) {
    MessagePlugin.error("删除失败");
  }
};

getData();
</script>
