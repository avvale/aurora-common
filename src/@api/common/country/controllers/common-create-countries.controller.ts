/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Timezone } from 'aurora-ts-core';
import { CommonCountryDto, CommonCreateCountryDto } from '../dto';

// @apps
import { CommonCreateCountriesHandler } from '../handlers/common-create-countries.handler';

@ApiTags('[common] country')
@Controller('common/countries/create')
export class CommonCreateCountriesController
{
    constructor(
        private readonly handler: CommonCreateCountriesHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create countries in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [CommonCountryDto]})
    @ApiBody({ type: [CommonCreateCountryDto]})
    async main(
        @Body() payload: CommonCreateCountryDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}