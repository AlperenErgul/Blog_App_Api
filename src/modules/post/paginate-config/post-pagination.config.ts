import { FilterOperator, PaginateConfig } from 'nestjs-paginate';
import {PostEntity} from "../../../core/modules/database/entities/post.entity";

export const POST_PAGINATION_CONFIG: PaginateConfig<PostEntity> = {
    sortableColumns: ['updatedAt', 'createdAt'],
    searchableColumns: ['title', 'content'],
    defaultSortBy: [['updatedAt', 'DESC']],
    filterableColumns: {
        id: [FilterOperator.EQ, FilterOperator.IN],
        title: [FilterOperator.EQ, FilterOperator.IN],
        content: [FilterOperator.EQ, FilterOperator.IN],
    },
    maxLimit: 0,
};
