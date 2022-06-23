import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonUpdateAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-update-administrative-area-level-1-by-id.handler';
import { CommonAdministrativeAreaLevel1, CommonUpdateAdministrativeAreaLevel1ByIdInput } from '../../../../graphql';

@Resolver()
export class CommonUpdateAdministrativeAreaLevel1ByIdResolver
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreaLevel1ByIdHandler,
    ) {}

    @Mutation('commonUpdateAdministrativeAreaLevel1ById')
    async main(
        @Args('payload') payload: CommonUpdateAdministrativeAreaLevel1ByIdInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1>
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}