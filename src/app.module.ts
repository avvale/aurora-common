import { Module } from '@nestjs/common';
import { CoreModule } from './@aurora/core.module';
import { CommonModule } from './@api/common/common.module';

@Module({
    imports: [
        CoreModule,
        CommonModule
    ]
})
export class AppModule {}
