import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { FindLangByIdQuery } from '@apps/common/lang/application/find/find-lang-by-id.query';
import { CommonLang } from './../../../../graphql';

@Resolver()
export class CommonFindLangByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('commonFindLangById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonLang>
    {
        return await this.queryBus.ask(new FindLangByIdQuery(id, constraint, { timezone }));
    }
}