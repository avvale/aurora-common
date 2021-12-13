
import { IRepository, ObjectLiteral, QueryStatement } from 'aurora-ts-core';
import { Pagination } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { CommonCountry } from './country.aggregate';
import { CountryId } from './value-objects';

export abstract class ICountryI18NRepository implements IRepository<CommonCountry>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CommonCountry>>;

    // create a single record
    abstract create(country: CommonCountry, dataFactory?: (aggregate: CommonCountry) => ObjectLiteral, finderQueryStatement?: (aggregate: CommonCountry) => QueryStatement): Promise<void>;

    // create a single or multiple records
    abstract insert(countries: CommonCountry[], options?: ObjectLiteral, dataFactory?: (aggregate: CommonCountry) => ObjectLiteral): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonCountry | null>;

    // find a single record by id
    abstract findById(id: CountryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonCountry | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonCountry[]>;

    // update record
    abstract update(country: CommonCountry, constraint?: QueryStatement, cQMetadata?: CQMetadata, dataFactory?: (aggregate: CommonCountry) => ObjectLiteral, findArguments?: ObjectLiteral): Promise<void>;

    // delete record
    abstract deleteById(id: CountryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}