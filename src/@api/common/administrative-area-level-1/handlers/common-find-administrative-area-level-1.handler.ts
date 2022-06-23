import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindAdministrativeAreaLevel1Query } from '@apps/common/administrative-area-level-1/application/find/find-administrative-area-level-1.query';
import { CommonAdministrativeAreaLevel1 } from '../../../../graphql';
import { CommonAdministrativeAreaLevel1Dto } from '../dto';

@Injectable()
export class CommonFindAdministrativeAreaLevel1Handler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<CommonAdministrativeAreaLevel1 | CommonAdministrativeAreaLevel1Dto>
    {
        return await this.queryBus.ask(new FindAdministrativeAreaLevel1Query(queryStatement, constraint, { timezone }));
    }
}