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

interface ArticlePublishedAtDetail {
  year: string;
  quarter: string;
  month: {
    number: string;
    english: string;
  },
  week: string;
  day: string;
  second: string;
}


interface DictTypeResponse {
  dictType: string;
  dictName: string;
  remark: string;
  sort: number;
  dataList: DictData[];
}

interface DictData {
  dictLabel: string;
  dictValue: string;
  labelClass: string;
}

interface BaseQuery {
  page: number;
  limit: number;
  order?: string;
  asc?: boolean;
}

interface ArticleQuery extends BaseQuery {
  title?: string;
  authorId?: number;
  categoryId?: number;
  tagId?: number;
  status?: string;
  order?: string;
  asc?: boolean;
}

interface CategoryQuery extends BaseQuery {
  title?: string;
}

interface TagQuery extends BaseQuery {
  title?: string;
}

interface CommentQuery extends BaseQuery {
  articleId?: number;
  userId?: number;
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
  order?: string;
  asc?: boolean;
}

interface AttachmentQuery extends BaseQuery {
  title?: string;
  ext?: string;
}

interface SiteConfigQuery extends BaseQuery {
  key?: string;
  sort: number;
}

interface DictTypeQuery extends BaseQuery {
  dictType?: string;
  dictName?: string;
}

interface DictDataQuery extends BaseQuery {
  dictTypeId?: number;
}

interface ChatQuery extends BaseQuery {
  title?: string;
  typeCode?: string;
}

interface ContextQuery extends BaseQuery {
  role?: ChatRoleEnum;
  status: number;
}

interface TypeQuery extends BaseQuery {
  name?: string;
  code?: string;
}

type UserGenderEnum = "men" | "women" | "secret";
type ChatRoleEnum = "user" | "assitant" | "system";
type SiteConfigTypeEnum = "string" | "boolean" | "number" | "textarea" | "dict";
type MenuTypeEnum = "menu" | "button" | "interface";
type MenuOpenStyleEnum = "_self" | "_blank";
type QuestionLevelEnum = "simple" | "general" | "intermediate" | "challenging" | "arduous";
type QuestionAnswerStatusEnum = "right" | "wrong";

type BaseCreateResponse = number;
