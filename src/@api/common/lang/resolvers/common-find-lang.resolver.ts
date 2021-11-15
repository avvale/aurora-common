import { Resolver, Args, Query } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { FindLangQuery } from '@apps/common/lang/application/find/find-lang.query';
import { CommonLang } from './../../../../graphql';

@Resolver()
export class CommonFindLangResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('commonFindLang')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonLang>
    {
        return await this.queryBus.ask(new FindLangQuery(queryStatement, constraint, { timezone }));
    }
}