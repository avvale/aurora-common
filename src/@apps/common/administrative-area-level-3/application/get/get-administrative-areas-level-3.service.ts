import { Injectable } from '@nestjs/common';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { IAdministrativeAreaLevel3Repository } from './../../domain/administrative-area-level-3.repository';
import { CommonAdministrativeAreaLevel3 } from './../../domain/administrative-area-level-3.aggregate';

@Injectable()
export class GetAdministrativeAreasLevel3Service
{
    constructor(
        private readonly repository: IAdministrativeAreaLevel3Repository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel3[]>
    {
        return await this.repository.get(queryStatement, constraint, cQMetadata);
    }
}