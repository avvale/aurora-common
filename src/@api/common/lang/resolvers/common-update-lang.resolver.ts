import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { ICommandBus } from '@aurora/cqrs/domain/command-bus';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { UpdateLangCommand } from '@apps/common/lang/application/update/update-lang.command';
import { FindLangByIdQuery } from '@apps/common/lang/application/find/find-lang-by-id.query';
import { CommonUpdateLangInput } from './../../../../graphql';

@Resolver()
export class CommonUpdateLangResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonUpdateLang')
    async main(
        @Args('payload') payload: CommonUpdateLangInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateLangCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindLangByIdQuery(payload.id, constraint, { timezone }));
    }
}