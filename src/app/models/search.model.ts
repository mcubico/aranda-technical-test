import { Pagination } from "./pagination.model";

export interface Search extends Pagination {
  name?: string,
  category?: string,
  description?: string,
}
