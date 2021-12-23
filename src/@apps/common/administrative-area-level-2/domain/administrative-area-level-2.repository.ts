
import { IRepository, ObjectLiteral, QueryStatement } from 'aurora-ts-core';
import { Pagination } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { CommonAdministrativeAreaLevel2 } from './administrative-area-level-2.aggregate';
import { AdministrativeAreaLevel2Id } from './value-objects';

export abstract class IAdministrativeAreaLevel2Repository implements IRepository<CommonAdministrativeAreaLevel2>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CommonAdministrativeAreaLevel2>>;

    // create a single record
    abstract create(administrativeAreaLevel2: CommonAdministrativeAreaLevel2): Promise<void>;

    // create a single or multiple records
    abstract insert(administrativeAreasLevel2: CommonAdministrativeAreaLevel2[], options?: ObjectLiteral): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel2 | null>;

    // find a single record by id
    abstract findById(id: AdministrativeAreaLevel2Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel2 | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel2[]>;

    // update record
    abstract update(administrativeAreaLevel2: CommonAdministrativeAreaLevel2, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: AdministrativeAreaLevel2Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // count records
    abstract count(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<number>;
}