/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonLangDto, CommonUpdateLangByIdDto } from '../dto';

// @apps
import { CommonUpdateLangByIdHandler } from '../handlers/common-update-lang-by-id.handler';

@ApiTags('[common] lang')
@Controller('common/lang/update')
export class CommonUpdateLangByIdController
{
    constructor(
        private readonly handler: CommonUpdateLangByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update lang by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: CommonLangDto })
    async main(
        @Body() payload: CommonUpdateLangByIdDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}