import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, ContentLanguage, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonPaginateCountriesHandler } from '../handlers/common-paginate-countries.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
export class CommonPaginateCountriesResolver
{
    constructor(
        private readonly handler: CommonPaginateCountriesHandler,
    ) {}

    @Query('commonPaginateCountries')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            contentLanguage,
        );
    }
}