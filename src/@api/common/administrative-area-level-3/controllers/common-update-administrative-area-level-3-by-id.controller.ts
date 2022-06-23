/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonAdministrativeAreaLevel3Dto, CommonUpdateAdministrativeAreaLevel3ByIdDto } from '../dto';

// @apps
import { CommonUpdateAdministrativeAreaLevel3ByIdHandler } from '../handlers/common-update-administrative-area-level-3-by-id.handler';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-area-level-3/update')
export class CommonUpdateAdministrativeAreaLevel3ByIdController
{
    constructor(
        private readonly handler: CommonUpdateAdministrativeAreaLevel3ByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update administrative-area-level-3 by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonAdministrativeAreaLevel3Dto })
    async main(
        @Body() payload: CommonUpdateAdministrativeAreaLevel3ByIdDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}