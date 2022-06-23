/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonLangDto } from '../dto';

// @apps
import { CommonFindLangByIdHandler } from '../handlers/common-find-lang-by-id.handler';

@ApiTags('[common] lang')
@Controller('common/lang/find')
export class CommonFindLangByIdController
{
    constructor(
        private readonly handler: CommonFindLangByIdHandler,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find lang by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: CommonLangDto })
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