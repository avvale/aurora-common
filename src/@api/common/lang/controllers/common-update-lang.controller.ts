import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from 'aurora-ts-core';
import { UpdateLangDto } from './../dto/update-lang.dto';
import { LangDto } from './../dto/lang.dto';

// @apps
import { ICommandBus } from '@aurora/cqrs/domain/command-bus';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { UpdateLangCommand } from '@apps/common/lang/application/update/update-lang.command';
import { FindLangByIdQuery } from '@apps/common/lang/application/find/find-lang-by-id.query';

@ApiTags('[common] lang')
@Controller('common/lang')
export class CommonUpdateLangController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update lang' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: LangDto})
    async main(
        @Body() payload: UpdateLangDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateLangCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindLangByIdQuery(payload.id, constraint, { timezone }));
    }
}