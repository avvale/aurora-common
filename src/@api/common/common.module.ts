import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { CommonModels, CommonHandlers, CommonServices, CommonRepositories, CommonSagas } from '@apps/common';
import { CommonLangControllers, CommonLangResolvers } from './lang';
import { CommonCountryControllers, CommonCountryResolvers } from './country';

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
export class CommonModule {}
