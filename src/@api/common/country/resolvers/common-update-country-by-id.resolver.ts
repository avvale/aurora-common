import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonUpdateCountryByIdHandler } from '../handlers/common-update-country-by-id.handler';
import { CommonCountry, CommonUpdateCountryByIdInput } from '../../../../graphql';

@Resolver()
export class CommonUpdateCountryByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateCountryByIdHandler,
    ) {}

    @Mutation('commonUpdateCountryById')
    async main(
        @Args('payload') payload: CommonUpdateCountryByIdInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonCountry>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}