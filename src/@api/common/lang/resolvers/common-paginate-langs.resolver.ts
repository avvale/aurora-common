import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonPaginateLangsHandler } from '../handlers/common-paginate-langs.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
export class CommonPaginateLangsResolver
{
    constructor(
        private readonly handler: CommonPaginateLangsHandler,
    ) {}

    @Query('commonPaginateLangs')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}