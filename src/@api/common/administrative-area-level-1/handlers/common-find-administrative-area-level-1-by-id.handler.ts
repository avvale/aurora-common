import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel1ByIdQuery } from '@apps/common/administrative-area-level-1/application/find/find-administrative-area-level-1-by-id.query';
import { CommonAdministrativeAreaLevel1 } from '../../../../graphql';
import { CommonAdministrativeAreaLevel1Dto } from '../dto';

@Injectable()
export class CommonFindAdministrativeAreaLevel1ByIdHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1 | CommonAdministrativeAreaLevel1Dto>
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel1ByIdQuery(id, constraint, { timezone }));
    }
}