import { Module } from '@nestjs/common';
import { CoreModule } from '@aurora/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@api/common/common.module';

@Module({
    imports: [
        CoreModule,
        CommonModule
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService
    ],
})
export class AppModule {}
