/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonAdministrativeAreaLevel3Dto } from '../dto';

// @apps
import { CommonDeleteAdministrativeAreaLevel3ByIdHandler } from '../handlers/common-delete-administrative-area-level-3-by-id.handler';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-area-level-3/delete')
export class CommonDeleteAdministrativeAreaLevel3ByIdController
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreaLevel3ByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete administrative-area-level-3 by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: CommonAdministrativeAreaLevel3Dto })
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