import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ContentLanguage, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { ICommandBus } from '@aurora/cqrs/domain/command-bus';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { GetCountriesQuery } from '@apps/common/country/application/get/get-countries.query';
import { DeleteCountriesCommand } from '@apps/common/country/application/delete/delete-countries.command';
import { AddI18NConstraintService } from '@apps/common/lang/application/shared/add-i18n-constraint.service';

@Resolver()
export class CommonDeleteCountriesResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Mutation('commonDeleteCountries')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    )
    {
        constraint = await this.addI18NConstraintService.main(constraint, 'countryI18N', contentLanguage, { defineDefaultLanguage: false });
        const countries = await this.queryBus.ask(new GetCountriesQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteCountriesCommand(queryStatement, constraint, { timezone }));

        return countries;
    }
}