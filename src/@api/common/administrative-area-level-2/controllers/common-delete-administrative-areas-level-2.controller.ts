/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonAdministrativeAreaLevel2Dto } from '../dto';

// @apps
import { CommonDeleteAdministrativeAreasLevel2Handler } from '../handlers/common-delete-administrative-areas-level-2.handler';

@ApiTags('[common] administrative-area-level-2')
@Controller('common/administrative-areas-level-2/delete')
export class CommonDeleteAdministrativeAreasLevel2Controller
{
    constructor(
        private readonly handler: CommonDeleteAdministrativeAreasLevel2Handler,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete administrative-areas-level-2 in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [CommonAdministrativeAreaLevel2Dto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
        );
    }
}