/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { CommonLangDto } from '../dto';

// @apps
import { CommonDeleteLangByIdHandler } from '../handlers/common-delete-lang-by-id.handler';

@ApiTags('[common] lang')
@Controller('common/lang/delete')
export class CommonDeleteLangByIdController
{
    constructor(
        private readonly handler: CommonDeleteLangByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete lang by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: CommonLangDto })
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