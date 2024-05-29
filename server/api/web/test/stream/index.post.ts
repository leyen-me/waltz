import useFetchStream from "~/utils/useFetchStream";

/**
 * 
  // 前端调用如下

  const test = async ()=>{
    const response = await fetch("http://192.168.31.120:3000/api/web/test/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const str = decoder.decode(value);
      console.log(str);
    }
  }
  
  test()
 */
export default defineWrappedResponseHandler(async (event) => {
  // 准备好环境
  const NUXT_LLM_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
  const NUXT_LLM_KEY = "0e528fa3cb40a500c414bca1f55f7cd5.xNNAli97bZeIFp2I";
  const NUXT_LLM_MODEL = "glm-4";
  const messages = [
    {
      role: "user",
      content: "你好",
    },
  ];

  /**
   * 请求openai/zhipuai
   */
  const stream = await useFetchStream({
    url: NUXT_LLM_URL,
    authorization: `Bearer ${NUXT_LLM_KEY}`,
    body: {
      model: NUXT_LLM_MODEL,
      stream: true,
      messages,
    },
  });

  /**
   * 返回流
   */
  return new Response(stream);
});
