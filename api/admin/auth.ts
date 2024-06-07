import useApi from "@/utils/api";

export const useAdminLoginApi = <T = LoginResponse>(body: LoginRequest) => {
  return useApi<T>("/api/admin/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const useAdminRegisterApi = <T = LoginResponse>(body: LoginRequest) => {
  return useApi<T>("/api/admin/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
};
