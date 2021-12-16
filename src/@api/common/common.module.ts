import { CACHE_MANAGER, Inject, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { CommonModels, CommonHandlers, CommonServices, CommonRepositories, CommonSagas } from '@apps/common';
import { CommonLangControllers, CommonLangResolvers } from './lang';
import { CommonCountryControllers, CommonCountryResolvers } from './country';

// custom
import { IQueryBus } from 'aurora-ts-core';
import { GetLangsQuery } from '@apps/common/lang/application/get/get-langs.query';
import { Cache } from 'cache-manager';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...CommonModels
        ])
    ],
    controllers: [
        ...CommonLangControllers,
        ...CommonCountryControllers
    ],
    providers: [
        ...CommonHandlers,
        ...CommonServices,
        ...CommonRepositories,
        ...CommonSagas,
        ...CommonLangResolvers,
        ...CommonCountryResolvers,
    ],
})
export class CommonModule
{
    constructor(
        private readonly queryBus: IQueryBus,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async onApplicationBootstrap(): Promise<void>
    {
        // set lang in cache manager
        await this.cacheManager.set('common/lang', await this.queryBus.ask(new GetLangsQuery()));
    }
}
