export type MappedType<T, K extends string> = { [key in K]: T };
export type TotalCount = { total_count: number };
export type OffSet = { offset: number };
export type Limit = { limit: number };
export type PaginatedType = TotalCount & OffSet & Limit;
export type Paginated<T, K extends string> = MappedType<T, K> & PaginatedType;
