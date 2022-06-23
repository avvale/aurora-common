import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ContentLanguage, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonDeleteCountriesHandler } from '../handlers/common-delete-countries.handler';
import { CommonCountry } from '../../../../graphql';

@Resolver()
export class CommonDeleteCountriesResolver
{
    constructor(
        private readonly handler: CommonDeleteCountriesHandler,
    ) {}

    @Mutation('commonDeleteCountries')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    ): Promise<CommonCountry[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            contentLanguage,
        );
    }
}