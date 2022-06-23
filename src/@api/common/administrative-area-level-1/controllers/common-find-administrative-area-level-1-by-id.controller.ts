/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonAdministrativeAreaLevel1Dto } from '../dto';

// @apps
import { CommonFindAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-find-administrative-area-level-1-by-id.handler';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1/find')
export class CommonFindAdministrativeAreaLevel1ByIdController
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel1ByIdHandler,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find administrative-area-level-1 by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CommonAdministrativeAreaLevel1Dto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}