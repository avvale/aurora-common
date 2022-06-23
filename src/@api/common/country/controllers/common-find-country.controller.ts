/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ContentLanguage, QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonCountryDto } from '../dto';

// @apps
import { CommonFindCountryHandler } from '../handlers/common-find-country.handler';

@ApiTags('[common] country')
@Controller('common/country/find')
export class CommonFindCountryController
{
    constructor(
        private readonly handler: CommonFindCountryHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find country according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CommonCountryDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    )
    {
        return await this.handler.main(
            queryStatement,
            constraint,
            timezone,
            contentLanguage?: string,
        );
    }
}