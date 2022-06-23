import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonUpdateLangByIdHandler } from '../handlers/common-update-lang-by-id.handler';
import { CommonLang, CommonUpdateLangByIdInput } from '../../../../graphql';

@Resolver()
export class CommonUpdateLangByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateLangByIdHandler,
    ) {}

    @Mutation('commonUpdateLangById')
    async main(
        @Args('payload') payload: CommonUpdateLangByIdInput,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonLang>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}