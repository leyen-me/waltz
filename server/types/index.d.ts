interface BaseResponse<T> {
  code?: number;
  data?: T;
  msg?: string;
}

interface TreeNode<K, T> {
  id: K;
  pid: K;
  children?: TreeNode<K, T>[];
}

interface BaseQuery {
  page: number;
  limit: number;
  order?: string;
  asc?: boolean;
}

interface BasePageResponse<T> {
  data: T[];
  meta: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    totalItems: number;
  };
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface ArticleQuery extends BaseQuery {
  title?: string;
  authorId?: number;
}

interface UserQuery extends BaseQuery {
  username?: string;
  gender?: number;
  email?: string;
}

interface RoleQuery extends BaseQuery {
  title?: string;
}

interface MenuQuery extends BaseQuery {
  title?: string;
  pid?: number;
}

interface AttachmentQuery extends BaseQuery {
  title?: string;
}

