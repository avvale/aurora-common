import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonGetAdministrativeAreasLevel2Handler } from '../handlers/common-get-administrative-areas-level-2.handler';
import { CommonAdministrativeAreaLevel2 } from '../../../../graphql';

@Resolver()
export class CommonGetAdministrativeAreasLevel2Resolver
{
    constructor(
        private readonly handler: CommonGetAdministrativeAreasLevel2Handler,
    ) {}

    @Query('commonGetAdministrativeAreasLevel2')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2[]>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}