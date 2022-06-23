import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { CommonCreateCountriesHandler } from '../handlers/common-create-countries.handler';
import { CommonCreateCountryInput } from '../../../../graphql';

@Resolver()
export class CommonCreateCountriesResolver
{
    constructor(
        private readonly handler: CommonCreateCountriesHandler,
    ) {}

    @Mutation('commonCreateCountries')
    async main(
        @Args('payload') payload: CommonCreateCountryInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}