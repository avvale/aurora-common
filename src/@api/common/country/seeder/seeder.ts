import { NestFactory } from '@nestjs/core';
import { ICommandBus } from 'aurora-ts-core';
import { CreateCountriesCommand } from '@apps/common/country/application/create/create-countries.command';
import { SeederModule } from './seeder.module';
import { countries } from '@apps/common/country/infrastructure/seeds/country.seed';

export class Seeder
{
    main(): void
    {
        NestFactory.createApplicationContext(SeederModule).then(appContext =>
        {
            const commandBus = appContext.get(ICommandBus);
            commandBus.dispatch(new CreateCountriesCommand(countries, { timezone: process.env.TZ }));
        });
    }
}
new Seeder().main();