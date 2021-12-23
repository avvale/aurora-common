
import { IRepository, ObjectLiteral, QueryStatement } from 'aurora-ts-core';
import { Pagination } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { CommonAdministrativeAreaLevel3 } from './administrative-area-level-3.aggregate';
import { AdministrativeAreaLevel3Id } from './value-objects';

export abstract class IAdministrativeAreaLevel3Repository implements IRepository<CommonAdministrativeAreaLevel3>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CommonAdministrativeAreaLevel3>>;

    // create a single record
    abstract create(administrativeAreaLevel3: CommonAdministrativeAreaLevel3): Promise<void>;

    // create a single or multiple records
    abstract insert(administrativeAreasLevel3: CommonAdministrativeAreaLevel3[], options?: ObjectLiteral): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel3 | null>;

    // find a single record by id
    abstract findById(id: AdministrativeAreaLevel3Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel3 | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel3[]>;

    // update record
    abstract update(administrativeAreaLevel3: CommonAdministrativeAreaLevel3, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: AdministrativeAreaLevel3Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // count records
    abstract count(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<number>;
}