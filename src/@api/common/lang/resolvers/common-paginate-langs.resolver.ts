import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { PaginateLangsQuery } from '@apps/common/lang/application/paginate/paginate-langs.query';
import { Pagination } from './../../../../graphql';

@Resolver()
export class CommonPaginateLangsResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('commonPaginateLangs')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateLangsQuery(queryStatement, constraint, { timezone }));
    }
}