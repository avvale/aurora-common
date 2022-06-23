/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonAdministrativeAreaLevel3Dto } from '../dto';

// @apps
import { CommonGetAdministrativeAreasLevel3Handler } from '../handlers/common-get-administrative-areas-level-3.handler';

@ApiTags('[common] administrative-area-level-3')
@Controller('common/administrative-areas-level-3/get')
export class CommonGetAdministrativeAreasLevel3Controller
{
    constructor(
        private readonly handler: CommonGetAdministrativeAreasLevel3Handler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get administrative-areas-level-3 according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [CommonAdministrativeAreaLevel3Dto]})
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