import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AddI18NConstraintService, Constraint, ContentLanguage, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindCountryByIdQuery } from '../../../../@apps/common/country/application/find/find-country-by-id.query';
import { DeleteCountryByIdI18NCommand } from '../../../../@apps/common/country/application/delete/delete-country-by-id-i18n.command';

@Resolver()
export class CommonDeleteCountryByIdI18NResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly addI18NConstraintService: AddI18NConstraintService,
    ) {}

    @Mutation('commonDeleteCountryById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    )
    {
        constraint = await this.addI18NConstraintService.main(constraint, 'countryI18N', contentLanguage);
        const country = await this.queryBus.ask(new FindCountryByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteCountryByIdI18NCommand(id, constraint, { timezone }));

        return country;
    }
}