import type SiteConfig from "~/server/models/SiteConfig";

/**
 * 树转Map
 * @param configArr
 * @returns
 */
export const buildMap = (configArr: SiteConfig[]) => {
  const map = new Map();
  const bl = (P_CODE: string, arr: SiteConfig[]) => {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      switch (item.type) {
        case "boolean":
          item.value = item.value === "true" ? true : false;
          break;
        case "number":
          item.value = Number(item.value);
          break;
        default:
          break;
      }
      map.set(P_CODE + "_" + item.code, item);
      if (item.children && item.children.length > 0) {
        bl(P_CODE + item.code, item.children);
      }
    }
  };
  bl("", configArr);
  return map;
};
