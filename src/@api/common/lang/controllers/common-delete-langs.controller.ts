import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, QueryStatement, Timezone } from 'aurora-ts-core';
import { LangDto } from './../dto/lang.dto';

// @apps
import { ICommandBus } from '@aurora/cqrs/domain/command-bus';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { GetLangsQuery } from '@apps/common/lang/application/get/get-langs.query';
import { DeleteLangsCommand } from '@apps/common/lang/application/delete/delete-langs.command';

@ApiTags('[common] lang')
@Controller('common/langs')
export class CommonDeleteLangsController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete langs in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [LangDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const langs = await this.queryBus.ask(new GetLangsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteLangsCommand(queryStatement, constraint, { timezone }));

        return langs;
    }
}