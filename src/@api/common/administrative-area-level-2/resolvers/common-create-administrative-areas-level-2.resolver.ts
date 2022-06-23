import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { CommonCreateAdministrativeAreasLevel2Handler } from '../handlers/common-create-administrative-areas-level-2.handler';
import { CommonCreateAdministrativeAreaLevel2Input } from '../../../../graphql';

@Resolver()
export class CommonCreateAdministrativeAreasLevel2Resolver
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreasLevel2Handler,
    ) {}

    @Mutation('commonCreateAdministrativeAreasLevel2')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel2Input[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}