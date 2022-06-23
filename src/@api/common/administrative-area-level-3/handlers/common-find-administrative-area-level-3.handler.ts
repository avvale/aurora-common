import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel3Query } from '@apps/common/administrative-area-level-3/application/find/find-administrative-area-level-3.query';
import { CommonAdministrativeAreaLevel3 } from '../../../../graphql';
import { CommonAdministrativeAreaLevel3Dto } from '../dto';

@Injectable()
export class CommonFindAdministrativeAreaLevel3Handler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel3 | CommonAdministrativeAreaLevel3Dto>
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel3Query(queryStatement, constraint, { timezone }));
    }
}