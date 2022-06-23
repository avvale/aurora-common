import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonPaginateAdministrativeAreasLevel3Handler } from '../handlers/common-paginate-administrative-areas-level-3.handler';
import { Pagination } from '../../../../graphql';

@Resolver()
export class CommonPaginateAdministrativeAreasLevel3Resolver
{
    constructor(
        private readonly handler: CommonPaginateAdministrativeAreasLevel3Handler,
    ) {}

    @Query('commonPaginateAdministrativeAreasLevel3')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}