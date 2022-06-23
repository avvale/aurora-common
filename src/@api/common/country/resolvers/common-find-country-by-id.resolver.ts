import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, ContentLanguage, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonFindCountryByIdHandler } from '../handlers/common-find-country-by-id.handler';
import { CommonCountry } from '../../../../graphql';

@Resolver()
export class CommonFindCountryByIdResolver
{
    constructor(
        private readonly handler: CommonFindCountryByIdHandler,
    ) {}

    @Query('commonFindCountryById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    ): Promise<CommonCountry>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            contentLanguage,
        );
    }
}