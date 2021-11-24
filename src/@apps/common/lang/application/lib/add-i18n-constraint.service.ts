import { CACHE_MANAGER, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { FormatLangCode, QueryStatement } from 'aurora-ts-core';
import { Cache } from 'cache-manager';
import { LangResponse } from '../../domain/lang.response';
import { GetLangsCacheService } from './get-langs-cache.service';

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
        contentLanguageFormat: FormatLangCode = FormatLangCode.ISO6392,
    ): Promise<QueryStatement>
    {
        // get langs from cache
        const langs: LangResponse[] = await this.getLangsCacheService.main();

        let lang = langs.find(lang => lang[contentLanguageFormat] === contentLanguage);
        if (!lang) lang = langs.find(lang => lang[FormatLangCode.ISO6392] === this.configService.get<string>('APP_LANG'));

        // error
        if (!lang) throw new InternalServerErrorException('APP_LANG_ID must be defined in iso6392 lang code format in .env file');

        return Object.assign(
            {},
            constraint,
            {
                include: {
                    association: i18NRelation,
                    required   : true,
                    where      : {
                        langId: lang.id
                    }
                }
            }
        );
    }
}