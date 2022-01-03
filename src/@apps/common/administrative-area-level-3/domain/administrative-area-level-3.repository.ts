
import { IRepository, ObjectLiteral, QueryStatement } from 'aurora-ts-core';
import { CQMetadata, Pagination } from 'aurora-ts-core';
import { CommonAdministrativeAreaLevel3 } from './administrative-area-level-3.aggregate';
import { AdministrativeAreaLevel3Id } from './value-objects';

export abstract class IAdministrativeAreaLevel3Repository implements IRepository<CommonAdministrativeAreaLevel3>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<CommonAdministrativeAreaLevel3>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAdministrativeAreaLevel3 | null>;

    // find a single record by id
    abstract findById(
        id: AdministrativeAreaLevel3Id,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAdministrativeAreaLevel3 | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonAdministrativeAreaLevel3[]>;

    // count records
    abstract count(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<number>;

    // ******************
    // ** side effects **
    // ******************

    // create a single record
    abstract create(
        administrativeAreaLevel3: CommonAdministrativeAreaLevel3,
        options?: {
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel3) => ObjectLiteral;
            // arguments to find object and check if object is duplicated
            finderQueryStatement: (aggregate: CommonAdministrativeAreaLevel3) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        administrativeAreasLevel3: CommonAdministrativeAreaLevel3[],
        options?: {
            insertOptions?: ObjectLiteral;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel3) => ObjectLiteral;
        }
    ): Promise<void>;

    // update record
    abstract update(
        administrativeAreaLevel3: CommonAdministrativeAreaLevel3,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: CommonAdministrativeAreaLevel3) => ObjectLiteral;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: ObjectLiteral;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AdministrativeAreaLevel3Id,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;

    // delete records
    abstract delete(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;
}