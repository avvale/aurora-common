import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { CommonCreateLangHandler } from '../handlers/common-create-lang.handler';
import { CommonLang, CommonCreateLangInput } from '../../../../graphql';

@Resolver()
export class CommonCreateLangResolver
{
    constructor(
        private readonly handler: CommonCreateLangHandler,
    ) {}

    @Mutation('commonCreateLang')
    async main(
        @Args('payload') payload: CommonCreateLangInput,
        @Timezone() timezone?: string,
    ): Promise<CommonLang>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}