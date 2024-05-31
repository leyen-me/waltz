const useImageUrl = (url: string) => {
  const { NUXT_API_BASE, NUXT_API_STATIC_BASE } = useRuntimeConfig().public;
  const protocolRegex = /^(https?:\/\/)/i;
  if (protocolRegex.test(url)) {
    return url;
  } else {
    return NUXT_API_BASE + NUXT_API_STATIC_BASE + url;
  }
};

export default useImageUrl;
