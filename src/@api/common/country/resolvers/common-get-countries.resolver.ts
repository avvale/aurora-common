import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, ContentLanguage, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonGetCountriesHandler } from '../handlers/common-get-countries.handler';
import { CommonCountry } from '../../../../graphql';

@Resolver()
export class CommonGetCountriesResolver
{
    constructor(
        private readonly handler: CommonGetCountriesHandler,
    ) {}

    @Query('commonGetCountries')
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