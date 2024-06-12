const useImageUrl = (url: string, prefix: boolean = true) => {
  const { NUXT_API_BASE, NUXT_API_STATIC_BASE } = useRuntimeConfig().public;
  const protocolRegex = /^(https?:\/\/)/i;
  if (protocolRegex.test(url)) {
    return url;
  } else {
    if (prefix) {
      return NUXT_API_BASE + NUXT_API_STATIC_BASE + url;
    } else {
      return NUXT_API_STATIC_BASE + url;
    }
  }
};

export default useImageUrl;
