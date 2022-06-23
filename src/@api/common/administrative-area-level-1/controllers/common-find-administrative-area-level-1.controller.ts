/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonAdministrativeAreaLevel1Dto } from '../dto';

// @apps
import { CommonFindAdministrativeAreaLevel1Handler } from '../handlers/common-find-administrative-area-level-1.handler';

@ApiTags('[common] administrative-area-level-1')
@Controller('common/administrative-area-level-1/find')
export class CommonFindAdministrativeAreaLevel1Controller
{
    constructor(
        private readonly handler: CommonFindAdministrativeAreaLevel1Handler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find administrative-area-level-1 according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CommonAdministrativeAreaLevel1Dto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
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