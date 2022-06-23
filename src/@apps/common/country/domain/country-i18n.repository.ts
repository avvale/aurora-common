
import { LiteralObject } from '@nestjs/common';
import { IRepository, QueryStatement } from 'aurora-ts-core';
import { CQMetadata, Pagination } from 'aurora-ts-core';
import { CommonCountry } from './country.aggregate';
import { CountryId } from './value-objects';

export abstract class ICountryI18NRepository implements IRepository<CommonCountry>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<CommonCountry>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonCountry | null>;

    // find a single record by id
    abstract findById(
        id: CountryId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonCountry | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<CommonCountry[]>;

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
        country: CommonCountry,
        options?: {
            dataFactory?: (aggregate: CommonCountry) => LiteralObject;
            finderQueryStatement?: (aggregate: CommonCountry) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        countries: CommonCountry[],
        options?: {
            insertOptions?: LiteralObject;
            dataFactory?: (aggregate: CommonCountry) => LiteralObject;
        }
    ): Promise<void>;

    // update record
    abstract update(
        country: CommonCountry,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: CommonCountry) => LiteralObject;
            findArguments?: LiteralObject;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: CountryId,
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