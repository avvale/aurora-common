import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel2ByIdQuery } from '@apps/common/administrative-area-level-2/application/find/find-administrative-area-level-2-by-id.query';
import { CommonAdministrativeAreaLevel2 } from '../../../../graphql';
import { CommonAdministrativeAreaLevel2Dto } from '../dto';

@Injectable()
export class CommonFindAdministrativeAreaLevel2ByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel2 | CommonAdministrativeAreaLevel2Dto>
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel2ByIdQuery(id, constraint, { timezone }));
    }
}