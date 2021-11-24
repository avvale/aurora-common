import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { Cache } from 'cache-manager';
import { LangResponse } from '../../domain/lang.response';
import { GetLangsQuery } from '../get/get-langs.query';

@Injectable()
export class GetLangsCacheService
{
    constructor(
        private readonly queryBus: IQueryBus,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    public async main(): Promise<LangResponse[]>
    {
        // get langs from cache
        let langs: LangResponse[] = await this.cacheManager.get('common/lang');
        if (!langs) langs = await this.cacheManager.set('common/lang', await this.queryBus.ask(new GetLangsQuery()));

        return langs;
    }
}