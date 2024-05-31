import useApi from "@/utils/api";
import type Attachment from "~/server/models/Attachment";

export const useAdminAttachmentListApi = <T = Attachment[]>(query: any) => {
  return useApi<T>(`/api/admin/attachment/list?pid=${query.pid}`, {
    method: "GET",
  });
};

export const useAdminAttachmentFolderApi = <T = any>(body: any) => {
  return useApi<T>(`/api/admin/attachment/folder`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};










export const useAdminAttachmentPageApi = <T = BasePageResponse<Attachment>>(
  query: any
) => {
  return useApi<T>(
    `/api/admin/attachment/page?page=${query.page}&limit=${query.limit}`,
    {
      method: "GET",
    }
  );
};

export const useAdminAttachmentDeleteApi = <T = Attachment>(id: number) => {
  return useApi<T>(`/api/admin/attachment/`, {
    method: "DELETE",
    body: JSON.stringify([id]),
  });
};

export const useAdminAttachmentInfoApi = <T = Attachment>(id: number) => {
  return useApi<T>(`/api/admin/attachment/${id}`, {
    method: "GET",
  });
};

export const useAdminAttachmentSubmitApi = <T = any>(
  body: Partial<Attachment>
) => {
  if (body.id) {
    return useApi<T>(`/api/admin/attachment/`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } else {
    return useApi<T>(`/api/admin/attachment/`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
};
