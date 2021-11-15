import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { ICommandBus } from '@aurora/cqrs/domain/command-bus';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { CreateLangsCommand } from '@apps/common/lang/application/create/create-langs.command';
import { CommonCreateLangInput } from './../../../../graphql';

@Resolver()
export class CommonCreateLangsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('commonCreateLangs')
    async main(
        @Args('payload') payload: CommonCreateLangInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateLangsCommand(payload, { timezone }));
        return true;
    }
}