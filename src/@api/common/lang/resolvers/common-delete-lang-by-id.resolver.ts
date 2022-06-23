import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonDeleteLangByIdHandler } from '../handlers/common-delete-lang-by-id.handler';
import { CommonLang } from '../../../../graphql';

@Resolver()
export class CommonDeleteLangByIdResolver
{
    constructor(
        private readonly handler: CommonDeleteLangByIdHandler,
    ) {}

    @Mutation('commonDeleteLangById')
    async main(
        @Args('id') id: string,
        @Args('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonLang>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}