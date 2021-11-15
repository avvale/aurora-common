import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { CommonModels, CommonHandlers, CommonServices, CommonRepositories, CommonSagas } from '@apps/common';
import { CommonLangControllers, CommonLangResolvers } from './lang';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...CommonModels
            ])
    ],
    controllers: [
        ...CommonLangControllers
    ],
    providers: [
        ...CommonHandlers,
        ...CommonServices,
        ...CommonRepositories,
        ...CommonSagas,
        ...CommonLangResolvers
    ],
})
export class CommonModule {}
