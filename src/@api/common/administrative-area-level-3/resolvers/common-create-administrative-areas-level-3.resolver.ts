import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Timezone } from 'aurora-ts-core';

// @apps
import { CommonCreateAdministrativeAreasLevel3Handler } from '../handlers/common-create-administrative-areas-level-3.handler';
import { CommonCreateAdministrativeAreaLevel3Input } from '../../../../graphql';

@Resolver()
export class CommonCreateAdministrativeAreasLevel3Resolver
{
    constructor(
        private readonly handler: CommonCreateAdministrativeAreasLevel3Handler,
    ) {}

    @Mutation('commonCreateAdministrativeAreasLevel3')
    async main(
        @Args('payload') payload: CommonCreateAdministrativeAreaLevel3Input[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}