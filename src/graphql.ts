
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum CommonLangDir {
    LTR = "LTR",
    RTL = "RTL"
}

export interface CommonCreateCountryInput {
    id: string;
    iso3166Alpha2: GraphQLString;
    iso3166Alpha3: GraphQLString;
    iso3166Numeric: GraphQLString;
    customCode?: Nullable<GraphQLString>;
    prefix?: Nullable<GraphQLString>;
    image?: Nullable<GraphQLString>;
    sort?: Nullable<GraphQLInt>;
    administrativeAreas?: Nullable<JSON>;
    latitude?: Nullable<GraphQLFloat>;
    longitude?: Nullable<GraphQLFloat>;
    zoom?: Nullable<GraphQLInt>;
    dataLang?: Nullable<JSON>;
    langId: string;
    name: GraphQLString;
    slug: GraphQLString;
    administrativeAreaLevel1?: Nullable<GraphQLString>;
    administrativeAreaLevel2?: Nullable<GraphQLString>;
    administrativeAreaLevel3?: Nullable<GraphQLString>;
}

export interface CommonUpdateCountryInput {
    id: string;
    iso3166Alpha2?: Nullable<GraphQLString>;
    iso3166Alpha3?: Nullable<GraphQLString>;
    iso3166Numeric?: Nullable<GraphQLString>;
    customCode?: Nullable<GraphQLString>;
    prefix?: Nullable<GraphQLString>;
    image?: Nullable<GraphQLString>;
    sort?: Nullable<GraphQLInt>;
    administrativeAreas?: Nullable<JSON>;
    latitude?: Nullable<GraphQLFloat>;
    longitude?: Nullable<GraphQLFloat>;
    zoom?: Nullable<GraphQLInt>;
    dataLang?: Nullable<JSON>;
    langId?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    slug?: Nullable<GraphQLString>;
    administrativeAreaLevel1?: Nullable<GraphQLString>;
    administrativeAreaLevel2?: Nullable<GraphQLString>;
    administrativeAreaLevel3?: Nullable<GraphQLString>;
}

export interface CommonCreateLangInput {
    id: string;
    name: GraphQLString;
    image?: Nullable<GraphQLString>;
    iso6392: GraphQLString;
    iso6393: GraphQLString;
    ietf: GraphQLString;
    customCode?: Nullable<GraphQLString>;
    dir: CommonLangDir;
    sort?: Nullable<GraphQLInt>;
    isActive: GraphQLBoolean;
}

export interface CommonUpdateLangInput {
    id: string;
    name?: Nullable<GraphQLString>;
    image?: Nullable<GraphQLString>;
    iso6392?: Nullable<GraphQLString>;
    iso6393?: Nullable<GraphQLString>;
    ietf?: Nullable<GraphQLString>;
    customCode?: Nullable<GraphQLString>;
    dir?: Nullable<CommonLangDir>;
    sort?: Nullable<GraphQLInt>;
    isActive?: Nullable<GraphQLBoolean>;
}

export interface QueryStatement {
    where?: Nullable<JSON>;
    include?: Nullable<Nullable<GraphQLString>[]>;
    order?: Nullable<JSON>;
    limit?: Nullable<GraphQLInt>;
    offset?: Nullable<GraphQLInt>;
}

export interface CommonCountry {
    id: string;
    iso3166Alpha2: GraphQLString;
    iso3166Alpha3: GraphQLString;
    iso3166Numeric: GraphQLString;
    customCode?: Nullable<GraphQLString>;
    prefix?: Nullable<GraphQLString>;
    image?: Nullable<GraphQLString>;
    sort?: Nullable<GraphQLInt>;
    administrativeAreas?: Nullable<JSON>;
    latitude?: Nullable<GraphQLFloat>;
    longitude?: Nullable<GraphQLFloat>;
    zoom?: Nullable<GraphQLInt>;
    dataLang?: Nullable<JSON>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
    langId: string;
    lang: CommonLang;
    name: GraphQLString;
    slug: GraphQLString;
    administrativeAreaLevel1?: Nullable<GraphQLString>;
    administrativeAreaLevel2?: Nullable<GraphQLString>;
    administrativeAreaLevel3?: Nullable<GraphQLString>;
}

export interface IQuery {
    commonFindCountry(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonCountry> | Promise<Nullable<CommonCountry>>;
    commonFindCountryById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<CommonCountry> | Promise<Nullable<CommonCountry>>;
    commonGetCountries(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonCountry>[] | Promise<Nullable<CommonCountry>[]>;
    commonPaginateCountries(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    commonFindLang(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonLang> | Promise<Nullable<CommonLang>>;
    commonFindLangById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<CommonLang> | Promise<Nullable<CommonLang>>;
    commonGetLangs(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonLang>[] | Promise<Nullable<CommonLang>[]>;
    commonPaginateLangs(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    hello(): Nullable<string> | Promise<Nullable<string>>;
}

export interface IMutation {
    commonCreateCountry(payload: CommonCreateCountryInput): Nullable<CommonCountry> | Promise<Nullable<CommonCountry>>;
    commonCreateCountries(payload: Nullable<CommonCreateCountryInput>[]): boolean | Promise<boolean>;
    commonUpdateCountry(payload: CommonUpdateCountryInput, constraint?: Nullable<QueryStatement>): Nullable<CommonCountry> | Promise<Nullable<CommonCountry>>;
    commonDeleteCountryById(id: string, constraint?: Nullable<QueryStatement>): Nullable<CommonCountry> | Promise<Nullable<CommonCountry>>;
    commonDeleteCountries(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonCountry>[] | Promise<Nullable<CommonCountry>[]>;
    commonCreateLang(payload: CommonCreateLangInput): Nullable<CommonLang> | Promise<Nullable<CommonLang>>;
    commonCreateLangs(payload: Nullable<CommonCreateLangInput>[]): boolean | Promise<boolean>;
    commonUpdateLang(payload: CommonUpdateLangInput, constraint?: Nullable<QueryStatement>): Nullable<CommonLang> | Promise<Nullable<CommonLang>>;
    commonDeleteLangById(id: string, constraint?: Nullable<QueryStatement>): Nullable<CommonLang> | Promise<Nullable<CommonLang>>;
    commonDeleteLangs(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonLang>[] | Promise<Nullable<CommonLang>[]>;
}

export interface CommonLang {
    id: string;
    name: GraphQLString;
    image?: Nullable<GraphQLString>;
    iso6392: GraphQLString;
    iso6393: GraphQLString;
    ietf: GraphQLString;
    customCode?: Nullable<GraphQLString>;
    dir: CommonLangDir;
    sort?: Nullable<GraphQLInt>;
    isActive: GraphQLBoolean;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface Pagination {
    total: GraphQLInt;
    count: GraphQLInt;
    rows: Nullable<JSON>[];
}

export type JSON = any;
export type Any = any;
export type Upload = any;
export type GraphQLString = any;
export type GraphQLInt = any;
export type GraphQLFloat = any;
export type GraphQLBoolean = any;
export type GraphQLISODateTime = any;
export type GraphQLTimestamp = any;
export type GraphQLUpload = any;
type Nullable<T> = T | null;
