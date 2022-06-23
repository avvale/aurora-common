/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Constraint, Pagination, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { CommonPaginateAdministrativeAreasLevel1Handler } from '../handlers/common-paginate-administrative-areas-level-1.handler';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-areas-level-1/paginate')
export class CommonPaginateAdministrativeAreasLevel1Controller
{
    constructor(
        private readonly handler: CommonPaginateAdministrativeAreasLevel1Handler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate administrative-areas-level-1' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
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