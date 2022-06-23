/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, FormatLangCode, QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonCountryDto, CommonUpdateCountriesDto } from '../dto';

// @apps
import { CommonUpdateCountriesHandler } from '../handlers/common-update-countries.handler';

@ApiTags('[common] country')
@Controller('common/countries/update')
export class CommonUpdateCountriesController
{
    constructor(
        private readonly handler: CommonUpdateCountriesHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update countries' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonCountryDto })
    async main(
        @Body() payload: CommonUpdateCountriesDto,
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            queryStatement,
            constraint,
            timezone,
        );
    }
}