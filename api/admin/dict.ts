import useApi from "@/utils/api";
import type DictType from "~/server/models/DictType";
import type DictData from "~/server/models/DictData";

export const useAdminDictTypePageApi = <T = BasePageResponse<DictType>>(
  query: any
) => {
  return useApi<T>(
    `/api/admin/dict/type/page?page=${query.page}&limit=${query.limit}`,
    {
      method: "GET",
    }
  );
};

export const useAdminDictTypeListApi = <T = DictType[]>() => {
  return useApi<T>(`/api/admin/dict/type/list`, {
    method: "GET",
  });
};

export const useAdminDictTypeInfo = <T = DictType>(id: number) => {
  return useApi<T>(`/api/admin/dict/type/${id}`, {
    method: "GET",
  });
};

export const useAdminDictTypeSubmitApi = <T = any>(body: Partial<DictType>) => {
  if (body.id) {
    return useApi<T>(`/api/admin/dict/type/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/dict/type/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};

export const useAdminDictTypeDeleteApi = <T = DictType>(id: number) => {
  return useApi<T>(`/api/admin/dict/type/`, {
    method: "DELETE",
    body: JSON.stringify([id]),
  });
};

export const useAdminDictDataListApi = <T = DictData[]>(typeId: number) => {
  return useApi<T>(`/api/admin/dict/data/list?typeId=${typeId}`, {
    method: "GET",
  });
};

export const useAdminDictDataInfo = <T = DictData>(id: number) => {
  return useApi<T>(`/api/admin/dict/data/${id}`, {
    method: "GET",
  });
};

export const useAdminDictDataDeleteApi = <T = DictData>(id: number) => {
  return useApi<T>(`/api/admin/dict/data/`, {
    method: "DELETE",
    body: JSON.stringify([id]),
  });
};

export const useAdminDictDataSubmitApi = <T = any>(body: Partial<DictData>) => {
  if (body.id) {
    return useApi<T>(`/api/admin/dict/data/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/dict/data/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};
