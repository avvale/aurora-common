
import { IRepository, ObjectLiteral, QueryStatement } from 'aurora-ts-core';
import { Pagination } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { CommonLang } from './lang.aggregate';
import { LangId } from './value-objects';

export abstract class ILangRepository implements IRepository<CommonLang>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CommonLang>>;

    // create a single record
    abstract create(lang: CommonLang): Promise<void>;

    // create a single or multiple records
    abstract insert(langs: CommonLang[], options?: ObjectLiteral): Promise<void>;

    // find a single record
    abstract find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonLang | null>;

    // find a single record by id
    abstract findById(id: LangId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonLang | null>;

    // get multiple records
    abstract get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CommonLang[]>;

    // update record
    abstract update(lang: CommonLang, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract deleteById(id: LangId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // count records
    abstract count(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<number>;
}