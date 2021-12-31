import { Injectable } from '@nestjs/common';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IAdministrativeAreaLevel2Repository } from './../../domain/administrative-area-level-2.repository';
import { CommonAdministrativeAreaLevel2 } from './../../domain/administrative-area-level-2.aggregate';

@Injectable()
export class GetAdministrativeAreasLevel2Service
{
    constructor(
        private readonly repository: IAdministrativeAreaLevel2Repository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel2[]>
    {
        return await this.repository.get(queryStatement, constraint, cQMetadata);
    }
}