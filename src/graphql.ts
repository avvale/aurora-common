
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

export interface CommonCreateAdministrativeAreaLevel1Input {
    id: string;
    countryId: string;
    code: GraphQLString;
    customCode?: Nullable<GraphQLString>;
    name: GraphQLString;
    slug: GraphQLString;
    latitude?: Nullable<GraphQLFloat>;
    longitude?: Nullable<GraphQLFloat>;
    zoom?: Nullable<GraphQLInt>;
}

export interface CommonUpdateAdministrativeAreaLevel1Input {
    id: string;
    countryId?: Nullable<string>;
    code?: Nullable<GraphQLString>;
    customCode?: Nullable<GraphQLString>;
    name?: Nullable<GraphQLString>;
    slug?: Nullable<GraphQLString>;
    latitude?: Nullable<GraphQLFloat>;
    longitude?: Nullable<GraphQLFloat>;
    zoom?: Nullable<GraphQLInt>;
}

export interface CommonCreateAdministrativeAreaLevel2Input {
    id: string;
    countryId: string;
    administrativeAreaLevel1Id: string;
    code: GraphQLString;
    customCode?: Nullable<GraphQLString>;
    name: GraphQLString;
    slug: GraphQLString;
    latitude?: Nullable<GraphQLFloat>;
    longitude?: Nullable<GraphQLFloat>;
    zoom?: Nullable<GraphQLInt>;
}

export interface CommonUpdateAdministrativeAreaLevel2Input {
    id: string;
    countryId?: Nullable<string>;
    administrativeAreaLevel1Id?: Nullable<string>;
    code?: Nullable<GraphQLString>;
    customCode?: Nullable<GraphQLString>;
    name?: Nullable<GraphQLString>;
    slug?: Nullable<GraphQLString>;
    latitude?: Nullable<GraphQLFloat>;
    longitude?: Nullable<GraphQLFloat>;
    zoom?: Nullable<GraphQLInt>;
}

export interface CommonCreateAdministrativeAreaLevel3Input {
    id: string;
    countryId: string;
    administrativeAreaLevel1Id: string;
    administrativeAreaLevel2Id: string;
    code: GraphQLString;
    customCode?: Nullable<GraphQLString>;
    name: GraphQLString;
    slug: GraphQLString;
    latitude?: Nullable<GraphQLFloat>;
    longitude?: Nullable<GraphQLFloat>;
    zoom?: Nullable<GraphQLInt>;
}

export interface CommonUpdateAdministrativeAreaLevel3Input {
    id: string;
    countryId?: Nullable<string>;
    administrativeAreaLevel1Id?: Nullable<string>;
    administrativeAreaLevel2Id?: Nullable<string>;
    code?: Nullable<GraphQLString>;
    customCode?: Nullable<GraphQLString>;
    name?: Nullable<GraphQLString>;
    slug?: Nullable<GraphQLString>;
    latitude?: Nullable<GraphQLFloat>;
    longitude?: Nullable<GraphQLFloat>;
    zoom?: Nullable<GraphQLInt>;
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

export interface CommonAdministrativeAreaLevel1 {
    id: string;
    countryId: string;
    country: CommonCountry;
    code: GraphQLString;
    customCode?: Nullable<GraphQLString>;
    name: GraphQLString;
    slug: GraphQLString;
    latitude?: Nullable<GraphQLFloat>;
    longitude?: Nullable<GraphQLFloat>;
    zoom?: Nullable<GraphQLInt>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface IQuery {
    commonFindAdministrativeAreaLevel1(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel1> | Promise<Nullable<CommonAdministrativeAreaLevel1>>;
    commonFindAdministrativeAreaLevel1ById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel1> | Promise<Nullable<CommonAdministrativeAreaLevel1>>;
    commonGetAdministrativeAreasLevel1(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel1>[] | Promise<Nullable<CommonAdministrativeAreaLevel1>[]>;
    commonPaginateAdministrativeAreasLevel1(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    commonFindAdministrativeAreaLevel2(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel2> | Promise<Nullable<CommonAdministrativeAreaLevel2>>;
    commonFindAdministrativeAreaLevel2ById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel2> | Promise<Nullable<CommonAdministrativeAreaLevel2>>;
    commonGetAdministrativeAreasLevel2(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel2>[] | Promise<Nullable<CommonAdministrativeAreaLevel2>[]>;
    commonPaginateAdministrativeAreasLevel2(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    commonFindAdministrativeAreaLevel3(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel3> | Promise<Nullable<CommonAdministrativeAreaLevel3>>;
    commonFindAdministrativeAreaLevel3ById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel3> | Promise<Nullable<CommonAdministrativeAreaLevel3>>;
    commonGetAdministrativeAreasLevel3(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel3>[] | Promise<Nullable<CommonAdministrativeAreaLevel3>[]>;
    commonPaginateAdministrativeAreasLevel3(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
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
    commonCreateAdministrativeAreaLevel1(payload: CommonCreateAdministrativeAreaLevel1Input): Nullable<CommonAdministrativeAreaLevel1> | Promise<Nullable<CommonAdministrativeAreaLevel1>>;
    commonCreateAdministrativeAreasLevel1(payload: Nullable<CommonCreateAdministrativeAreaLevel1Input>[]): boolean | Promise<boolean>;
    commonUpdateAdministrativeAreaLevel1(payload: CommonUpdateAdministrativeAreaLevel1Input, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel1> | Promise<Nullable<CommonAdministrativeAreaLevel1>>;
    commonDeleteAdministrativeAreaLevel1ById(id: string, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel1> | Promise<Nullable<CommonAdministrativeAreaLevel1>>;
    commonDeleteAdministrativeAreasLevel1(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel1>[] | Promise<Nullable<CommonAdministrativeAreaLevel1>[]>;
    commonCreateAdministrativeAreaLevel2(payload: CommonCreateAdministrativeAreaLevel2Input): Nullable<CommonAdministrativeAreaLevel2> | Promise<Nullable<CommonAdministrativeAreaLevel2>>;
    commonCreateAdministrativeAreasLevel2(payload: Nullable<CommonCreateAdministrativeAreaLevel2Input>[]): boolean | Promise<boolean>;
    commonUpdateAdministrativeAreaLevel2(payload: CommonUpdateAdministrativeAreaLevel2Input, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel2> | Promise<Nullable<CommonAdministrativeAreaLevel2>>;
    commonDeleteAdministrativeAreaLevel2ById(id: string, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel2> | Promise<Nullable<CommonAdministrativeAreaLevel2>>;
    commonDeleteAdministrativeAreasLevel2(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel2>[] | Promise<Nullable<CommonAdministrativeAreaLevel2>[]>;
    commonCreateAdministrativeAreaLevel3(payload: CommonCreateAdministrativeAreaLevel3Input): Nullable<CommonAdministrativeAreaLevel3> | Promise<Nullable<CommonAdministrativeAreaLevel3>>;
    commonCreateAdministrativeAreasLevel3(payload: Nullable<CommonCreateAdministrativeAreaLevel3Input>[]): boolean | Promise<boolean>;
    commonUpdateAdministrativeAreaLevel3(payload: CommonUpdateAdministrativeAreaLevel3Input, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel3> | Promise<Nullable<CommonAdministrativeAreaLevel3>>;
    commonDeleteAdministrativeAreaLevel3ById(id: string, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel3> | Promise<Nullable<CommonAdministrativeAreaLevel3>>;
    commonDeleteAdministrativeAreasLevel3(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<CommonAdministrativeAreaLevel3>[] | Promise<Nullable<CommonAdministrativeAreaLevel3>[]>;
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

export interface CommonAdministrativeAreaLevel2 {
    id: string;
    countryId: string;
    country: CommonCountry;
    administrativeAreaLevel1Id: string;
    administrativeAreaLevel1: CommonAdministrativeAreaLevel1;
    code: GraphQLString;
    customCode?: Nullable<GraphQLString>;
    name: GraphQLString;
    slug: GraphQLString;
    latitude?: Nullable<GraphQLFloat>;
    longitude?: Nullable<GraphQLFloat>;
    zoom?: Nullable<GraphQLInt>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface CommonAdministrativeAreaLevel3 {
    id: string;
    countryId: string;
    country: CommonCountry;
    administrativeAreaLevel1Id: string;
    administrativeAreaLevel1: CommonAdministrativeAreaLevel1;
    administrativeAreaLevel2Id: string;
    administrativeAreaLevel2: CommonAdministrativeAreaLevel2;
    code: GraphQLString;
    customCode?: Nullable<GraphQLString>;
    name: GraphQLString;
    slug: GraphQLString;
    latitude?: Nullable<GraphQLFloat>;
    longitude?: Nullable<GraphQLFloat>;
    zoom?: Nullable<GraphQLInt>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
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
