import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, ContentLanguage, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindCountryByIdQuery } from '@apps/common/country/application/find/find-country-by-id.query';
import { CommonCountry } from './../../../../graphql';
import { AddI18NConstraintService } from '@apps/common/lang/application/shared/add-i18n-constraint.service';

@Resolver()
export class CommonFindCountryByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Query('commonFindCountryById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    ): Promise<CommonCountry>
    {
        constraint = await this.addI18NConstraintService.main(constraint, 'countryI18N', contentLanguage);
        return await this.queryBus.ask(new FindCountryByIdQuery(id, constraint, { timezone }));
    }
}