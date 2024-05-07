const useTheme = () => {
  let media = null;
  let callback = (e: MediaQueryList) => {
    if (e.matches) {
      document.documentElement.setAttribute("theme-mode", "dark");
    } else {
      document.documentElement.removeAttribute("theme-mode");
    }
  };
  try {
    media = window.matchMedia("(prefers-color-scheme: dark)");
  } catch (error) {}

  onMounted(() => {
    if (media) {
      callback(media);
      media.addEventListener("change", callback as any);
    }
  });

  onUnmounted(() => {
    if (media) {
      media.removeEventListener("change", callback as any);
    }
  });
};

export default useTheme;
