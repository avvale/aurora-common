import { CACHE_MANAGER, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { FormatLangCode, QueryStatement } from 'aurora-ts-core';
import { Cache } from 'cache-manager';
import { LangResponse } from '../../domain/lang.response';
import { GetLangsCacheService } from './get-langs-cache.service';
import * as _ from 'lodash';

@Injectable()
export class AddI18NConstraintService
{
    constructor(
        private readonly queryBus: IQueryBus,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly configService: ConfigService,
        private readonly getLangsCacheService: GetLangsCacheService,
    ) {}

    public async main(
        constraint: QueryStatement,
        i18NRelation: string,
        contentLanguage: string,
        {
            contentLanguageFormat = FormatLangCode.ISO6392,
            defineDefaultLanguage = true
        }: {
            contentLanguageFormat?: FormatLangCode;
            defineDefaultLanguage?: boolean;

        } = {}
    ): Promise<QueryStatement>
    {
        // get langs from cache
        const langs: LangResponse[] = await this.getLangsCacheService.main();

        let lang = langs.find(lang => lang[contentLanguageFormat] === contentLanguage);
        if (!lang && defineDefaultLanguage) lang = langs.find(lang => lang[FormatLangCode.ISO6392] === this.configService.get<string>('APP_LANG'));

        // error if lang is not defined
        if (!lang && defineDefaultLanguage) throw new InternalServerErrorException('APP_LANG must be defined in iso6392 lang code format in .env file');

        return _.merge(
            {},
            {
                include: {
                    association: i18NRelation,
                    required   : true,
                    // add lang constrain if is defined
                    where      : lang ? { langId: lang.id } : undefined
                }
            },
            constraint
        );
    }
}