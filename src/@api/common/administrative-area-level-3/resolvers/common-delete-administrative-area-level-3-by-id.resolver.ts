import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonDeleteAdministrativeAreaLevel3ByIdHandler } from '../handlers/common-delete-administrative-area-level-3-by-id.handler';
import { CommonAdministrativeAreaLevel3 } from '../../../../graphql';

@Resolver()
export class CommonDeleteAdministrativeAreaLevel3ByIdResolver
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreaLevel3ByIdHandler,
    ) {}

    @Mutation('commonDeleteAdministrativeAreaLevel3ById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3>
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}