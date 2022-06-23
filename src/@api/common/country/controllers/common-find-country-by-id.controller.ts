/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ContentLanguage, QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonCountryDto } from '../dto';

// @apps
import { CommonFindCountryByIdHandler } from '../handlers/common-find-country-by-id.handler';

@ApiTags('[common] country')
@Controller('common/country/find')
export class CommonFindCountryByIdController
{
    constructor(
        private readonly handler: CommonFindCountryByIdHandler,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find country by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CommonCountryDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
        @ContentLanguage() contentLanguage?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
            contentLanguage?: string,
        );
    }
}