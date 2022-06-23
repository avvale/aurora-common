/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonAdministrativeAreaLevel2Dto } from '../dto';

// @apps
import { CommonFindAdministrativeAreaLevel2ByIdHandler } from '../handlers/common-find-administrative-area-level-2-by-id.handler';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-area-level-2/find')
export class CommonFindAdministrativeAreaLevel2ByIdController
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel2ByIdHandler,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find administrative-area-level-2 by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CommonAdministrativeAreaLevel2Dto })
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