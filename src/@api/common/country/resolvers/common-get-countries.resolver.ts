import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, ContentLanguage, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { GetCountriesQuery } from '@apps/common/country/application/get/get-countries.query';
import { CommonCountry } from './../../../../graphql';
import { AddI18NConstraintService } from '@apps/common/lang/application/shared/add-i18n-constraint.service';

@Resolver()
export class CommonGetCountriesResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Query('commonGetCountries')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    ): Promise<CommonCountry[]>
    {
        constraint = await this.addI18NConstraintService.main(constraint, 'countryI18N', contentLanguage, { defineDefaultLanguage: false });
        return await this.queryBus.ask(new GetCountriesQuery(queryStatement, constraint, { timezone }));
    }
}