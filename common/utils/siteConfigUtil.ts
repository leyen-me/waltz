import SiteConfig from "@/server/models/SiteConfig";
import { listToTree } from "./treeUtil";

/**
 * 树转Map
 * @param configArr
 * @returns
 */
export const buildMap = (configArr: SiteConfig[]) => {
  let list = listToTree(configArr, "id", "pid", 0);
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
      const key = P_CODE + (P_CODE ? "_" : '') + item.code
      map.set(key, item);
      if (item.children && item.children.length > 0) {
        bl(key, item.children);
      }
    }
  };
  bl("", list);
  return map;
};


export const getValue = (map: Map<string, SiteConfig>, key: string): any => {
  return map.get(key)?.value
}