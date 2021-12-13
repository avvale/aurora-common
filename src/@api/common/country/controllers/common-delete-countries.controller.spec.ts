/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// custom items
import { CommonDeleteCountriesController } from './common-delete-countries.controller';
import { ICommandBus } from '@aurora/cqrs/domain/command-bus';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { AddI18NConstraintService } from '@apps/common/lang/application/shared/add-i18n-constraint.service';
import { GetLangsCacheService } from '@apps/common/lang/application/shared/get-langs-cache.service';

// sources
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@apps/common/country/infrastructure/seeds/country.seed';

describe('CommonDeleteCountriesController', () =>
{
    let controller: CommonDeleteCountriesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonDeleteCountriesController
            ],
            providers: [
                AddI18NConstraintService,
                {
                    provide : ConfigService,
                    useValue: {
                        get: (key: string) => key === 'APP_LANG' ? 'es' : ''
                    }
                },
                {
                    provide : GetLangsCacheService,
                    useValue: {
                        main: () => langs,
                    }
                },
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    }
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    }
                },
            ]
        }).compile();

        controller  = module.get<CommonDeleteCountriesController>(CommonDeleteCountriesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonDeleteCountriesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an countries deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(countries)));
            expect(await controller.main()).toBe(countries);
        });
    });
});