<template>
  <div
    class="h-full p-5 flex flex-col relative overflow-hidden lg:px-16 xl:px-60 bg-[var(--web-bg-2)]"
  >
    <!-- 专家类型 -->

    <div class="flex mb-8">
      <t-dropdown
        :disabled="chatId ? true : false"
        :options="
          typeList.map((type) => {
            return { content: type.name, value: type.code };
          })
        "
        @click="(item) => (typeCode = item.value)"
        trigger="click"
        :hide-after-item-click="true"
        :min-column-width="100"
      >
        <t-button variant="text"
          >{{ typeName }}
          <template #suffix>
            <t-icon name="chevron-down-s" size="16"></t-icon>
          </template>
        </t-button>
      </t-dropdown>
    </div>

    <!-- 没有任何聊天对话的时候 -->
    <div
      v-show="chatLoading && messages.length <= 0"
      class="flex items-center justify-center h-4/5"
    >
      <div class="flex flex-col items-center">
        <div
          class="w-12 h-12 flex items-center justify-center border rounded-full"
        >
          <svg
            width="41"
            height="41"
            viewBox="0 0 41 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-8"
            role="img"
          >
            <text x="-9999" y="-9999">ChatGPT</text>
            <path
              d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h1 class="text-xl mt-3 font-bold">Loading...</h1>
      </div>
    </div>

    <!-- 没有任何聊天对话的时候 -->
    <div
      v-show="!chatLoading && messages.length <= 0"
      class="flex items-center justify-center h-4/5"
    >
      <div class="flex flex-col items-center">
        <div
          class="w-12 h-12 flex items-center justify-center border rounded-full"
        >
          <svg
            width="41"
            height="41"
            viewBox="0 0 41 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-8"
            role="img"
          >
            <text x="-9999" y="-9999">ChatGPT</text>
            <path
              d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h1 class="text-xl mt-3 font-bold">How can I help you today?</h1>
      </div>
    </div>

    <!-- 聊天对话 -->
    <ul
      v-show="messages.length > 0"
      class="flex-1 overflow-y-auto pb-24 scrollbar-hidden"
      id="messages"
      ref="messagesRef"
    >
      <li
        class="relative pb-4 group"
        :style="{
          '--web-bg-1':
            v.role === 'user' ? 'var(--web-bg-9)' : 'var(--web-bg-2)',
          '--gpt-justify-content':
            v.role === 'user' ? 'flex-end' : 'flex-start',
          '--gpt-max-width': v.role === 'user' ? '80%' : '100%',
          '--gpt-border-radius': v.role === 'user' ? '24px' : '0px',
        }"
        v-for="(v, k) in messages"
        :key="v.id"
      >
        <BasePreview v-model="v.content"></BasePreview>
        <div v-if="!loading" class="flex justify-end mt-3 h-8">
          <div class="hidden group-hover:block">
            <t-space size="8px">
              <t-button v-if="v.role !== 'user'" variant="text">
                耗时：{{ v.executionTime }}ms
              </t-button>
              <t-button
                shape="square"
                variant="text"
                @click="handleCopy(v.content)"
              >
                <t-icon name="copy"></t-icon>
              </t-button>
              <t-button
                v-if="k === messages.length - 1"
                shape="square"
                variant="text"
                @click="handleReSend"
              >
                <t-icon name="refresh"></t-icon>
              </t-button>
            </t-space>
          </div>
        </div>
      </li>
    </ul>

    <footer
      class="w-full fixed py-4 px-5 flex left-0 bottom-0 lg:px-16 lg:absolute xl:px-60 z-20"
    >
      <div
        class="w-full flex bg-[var(--web-bg-8)] p-2 rounded-lg items-end border border-solid border-[var(--web-border-2)]"
      >
        <div
          class="flex-1 h-full relative flex items-center"
          style="
            --td-border-level-2-color: none;
            --td-brand-color: none;
            --td-brand-color-focus: none;
          "
        >
          <t-textarea
            v-model="prompt"
            autofocus
            :autosize="{ minRows: 1, maxRows: 5 }"
            @keydown="sendMessage"
            placeholder="Enter 发送; Shift+Enter 换行;"
          ></t-textarea>
        </div>
        <div class="ml-3">
          <t-button
            shape="square"
            :theme="prompt ? 'primary' : 'default'"
            @click="onSend"
            size="large"
          >
            <t-icon name="stop" v-if="loading" size="24px"></t-icon>
            <t-icon name="arrow-up" v-else size="24px"></t-icon>
          </t-button>
        </div>
      </div>
    </footer>

    <!-- <el-dialog v-model="dialogGptsVisible" title="选择专家类型" width="800">
      <el-button
        :type="typeCode === v.code ? 'primary' : 'default'"
        v-for="(v, k) in typeList"
        :key="v.id"
        @click="handleSelectType(v)"
        style="margin-bottom: 10px; margin-left: 0; margin-right: 10px"
        >{{ v.name }}</el-button
      >
    </el-dialog> -->

    <input
      type="text"
      id="clipboardInput"
      style="position: absolute; left: -9999px"
    />
  </div>
</template>

<script setup lang="ts">
import useUserStore from "~/stores/userStore";
import { useAdminChatTypeListApi } from "@/api/admin/chat/type";
import {
  useAdminChatChatInfoApi,
  useAdminChatChatSubmitApi,
  useAdminChatResumeApi,
} from "@/api/admin/chat/chat";
import {
  useAdminChatContextListApi,
  useAdminChatContextSubmitApi,
} from "@/api/admin/chat/context";
import type Type from "~/server/models/Type";
import type Context from "~/server/models/Context";
import type { TextareaValue } from "tdesign-vue-next/es/textarea";
import { nanoid } from "nanoid";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const chatId = ref<number>(0);
const wheel = ref(false);
const chatLoading = ref(false);
const loading = ref(false);
const messages = ref<Context[]>([]);
const messagesRef = ref();
const prompt = ref("");
const typeList = ref<Type[]>([]);
const typeCode = ref("");
const dialogGptsVisible = ref(false);
const { NUXT_API_BASE } = useRuntimeConfig().public;

const isNewChat = () => {
  return chatId.value === 0;
};

const getChatData = async (chatId: number) => {
  try {
    const response = await useAdminChatChatInfoApi(chatId);
    typeCode.value = response.typeCode;
  } catch (error) {}
};

const typeName = computed(() => {
  const _type = typeList.value.find((t) => t.code === typeCode.value);
  if (_type) {
    return _type.name;
  }
  return "未选择";
});

const scrollBottom = (time = 500) => {
  nextTick(() => {
    // 用户正在滚动，请勿滚动了
    if (wheel.value) {
      return;
    }
    const messagesElement = document.querySelector("#messages");
    if (messagesElement) {
      messagesElement.scrollTo(0, messagesElement.scrollHeight);
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
};

const handleCopy = async (text: string) => {
  try {
    // 尝试使用现代剪贴板API
    await navigator.clipboard.writeText(text);
    MessagePlugin.success("已复制");
  } catch (e) {
    // 如果剪贴板API不可用，使用降级方案
    const input = document.getElementById("clipboardInput");
    if (input) {
      //@ts-ignore
      input.value = text;
      //@ts-ignore
      input.select();
    }
    try {
      const result = document.execCommand("copy");
      if (result) {
        MessagePlugin.success("已复制");
      } else {
        MessagePlugin.error("复制失败");
      }
    } catch (err) {
      MessagePlugin.error("复制失败");
    }
  }
};

function handleWheel(event: WheelEvent) {
  wheel.value = true;
}

const getTypeData = async () => {
  try {
    const response = await useAdminChatTypeListApi();
    typeList.value = response;
    if (typeList.value.length > 0) {
      typeCode.value = typeList.value[0].code;
    }
  } catch (error) {}
};

const getContextData = async (chatId: number) => {
  try {
    const response = await useAdminChatContextListApi(chatId);
    messages.value = response;
    scrollBottom();
  } catch (error) {
  } finally {
    chatLoading.value = false;
  }
};

const onSend = async () => {
  const token = useCookie("token", {
    default: () => "",
    watch: false,
  });
  const decoder = new TextDecoder();

  const messagesId = document.getElementById("messages");
  if (messagesId) {
    messagesId.addEventListener("wheel", handleWheel);
  }
  // 停止之前的对话
  if (loading.value) {
    loading.value = false;
    return;
  }
  // prompt为空
  if (!prompt.value) {
    return;
  }
  const changeTitle = ref(false);

  if (isNewChat()) {
    const response = await useAdminChatChatSubmitApi({
      title: "...",
      typeCode: typeCode.value,
    });
    chatId.value = response;
    changeTitle.value = true;
    const newPath = `/app/chatgpt/c/${chatId.value}`;
    history.replaceState({}, "", newPath);
  }

  const _prompt = prompt.value;
  prompt.value = "";
  let stop = false;
  loading.value = true;
  const questionOptions = {
    id: String(Math.random()),
    role: "user",
    content: _prompt,
  };
  messages.value.push(questionOptions);
  const answerOptions = {
    id: String(Math.random()),
    role: "assistant",
    content: "",
  };
  messages.value.push(answerOptions);

  const answer = messages.value.find(
    (context) => context.id == answerOptions.id
  );
  scrollBottom();

  try {
    // 真实
    const controller = new AbortController();
    const signal = controller.signal;
    const response = await fetch(NUXT_API_BASE + "/api/admin/chat/stream", {
      method: "POST",
      signal: signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: token.value,
      },
      body: JSON.stringify({
        chatId: chatId.value,
        prompt: _prompt,
      }),
    });

    const count = { value: 0 };

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        if (!loading.value) {
          stop = true;
          controller.abort();
          break;
        }
        const str = decoder.decode(value);
        if (answer) {
          answer.content += str;
        }
        count.value++;
        if (count.value >= 10) {
          count.value = 0;
          scrollBottom(0);
        }
      }
    }
  } catch (error) {
    console.log("回答错误", error);
    MessagePlugin.error("回答错误");
  } finally {
    loading.value = false;
    if (messagesId) {
      messagesId.removeEventListener("wheel", handleWheel);
    }
    wheel.value = false;
    // 主动停止，保存记录
    if (stop) {
      try {
        if (answer) {
          await useAdminChatContextSubmitApi({
            chatId: chatId.value,
            content: answer.content,
            role: answer.role,
            status: 0,
          });
        }
      } catch (error2) {
        console.log(error2);
      }
    }

    // 对话完成
    if (changeTitle.value) {
      try {
        await useAdminChatResumeApi({
          chatId: chatId.value,
        });
        router.push(`/app/chatgpt/c/${chatId.value}?r=${nanoid()}`);
      } catch (error3) {}
    }

    // 刷新对话
    await getContextData(chatId.value);
  }
};

const handleReSend = async () => {
  const token = useCookie("token", {
    default: () => "",
    watch: false,
  });
  const messagesId = document.getElementById("messages");
  if (messagesId) {
    messagesId.addEventListener("wheel", handleWheel);
  }
  let stop = false;

  // 删除最后一个
  messages.value.splice(messages.value.length - 1, 1);

  const answerOptions = {
    id: String(Math.random()),
    role: "assistant",
    content: "",
  };
  messages.value.push(answerOptions);
  const answer = messages.value.find(
    (context) => context.id == answerOptions.id
  );
  scrollBottom();

  try {
    // 临时
    loading.value = true;

    // 真实
    const controller = new AbortController();
    const signal = controller.signal;
    const response = await fetch(NUXT_API_BASE + "/api/admin/chat/restream", {
      method: "POST",
      signal: signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: token.value,
      },
      body: JSON.stringify({
        chatId: chatId.value,
      }),
    });

    const count = { value: 0 };
    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        if (!loading.value) {
          stop = true;
          controller.abort();
          break;
        }
        const str = decoder.decode(value);
        if (answer) {
          answer.content += str;
        }
        count.value++;
        if (count.value >= 10) {
          count.value = 0;

          scrollBottom(0);
        }
      }
    }
  } catch (error) {
    console.log("回答错误", error);
    MessagePlugin.error("回答错误");
  } finally {
    loading.value = false;
    if (messagesId) {
      messagesId.removeEventListener("wheel", handleWheel);
    }
    wheel.value = false;

    // 主动停止，保存记录
    if (stop) {
      try {
        if (answer) {
          await useAdminChatContextSubmitApi({
            chatId: chatId.value,
            content: answer.content,
            role: answer.role,
            status: 0,
          });
        }
      } catch (error2) {
        console.log(error2);
      }
    }

    getContextData(chatId.value);
  }
};

const sendMessage = async (
  value: TextareaValue,
  context: { e: KeyboardEvent }
) => {
  if (context.e.key === "Enter" && !context.e.shiftKey) {
    context.e.preventDefault();
    if (!loading.value) {
      await onSend();
    }
  }
};

onMounted(async () => {
  await getTypeData();

  nextTick(async () => {
    chatId.value = Number(route.params.id);
    if (chatId.value) {
      chatLoading.value = true;
      await getChatData(chatId.value);
      await getContextData(chatId.value);
    }
  });
});
</script>
