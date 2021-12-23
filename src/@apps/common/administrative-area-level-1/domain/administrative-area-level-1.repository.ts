
import { IRepository, ObjectLiteral, QueryStatement } from 'aurora-ts-core';
import { Pagination } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { CommonAdministrativeAreaLevel1 } from './administrative-area-level-1.aggregate';
import { AdministrativeAreaLevel1Id } from './value-objects';

export abstract class IAdministrativeAreaLevel1Repository implements IRepository<CommonAdministrativeAreaLevel1>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CommonAdministrativeAreaLevel1>>;

    // create a single record
    abstract create(administrativeAreaLevel1: CommonAdministrativeAreaLevel1): Promise<void>;

    // create a single or multiple records
    abstract insert(administrativeAreasLevel1: CommonAdministrativeAreaLevel1[], options?: ObjectLiteral): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel1 | null>;

    // find a single record by id
    abstract findById(id: AdministrativeAreaLevel1Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel1 | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonAdministrativeAreaLevel1[]>;

    // update record
    abstract update(administrativeAreaLevel1: CommonAdministrativeAreaLevel1, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: AdministrativeAreaLevel1Id, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // count records
    abstract count(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<number>;
}