interface MResponse<T> {
  code?: number;
  data?: T;
  msg?: string;
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
}