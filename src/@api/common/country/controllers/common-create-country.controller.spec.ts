/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { CommonCreateCountryController } from './common-create-country.controller';
import { AddI18NConstraintService } from '@apps/common/lang/application/shared/add-i18n-constraint.service';

// sources
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@apps/common/country/infrastructure/seeds/country.seed';

describe('CommonCreateCountryController', () =>
{
    let controller: CommonCreateCountryController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonCreateCountryController
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
                {
                    provide : CACHE_MANAGER,
                    useValue: {
                        get: (key: string) =>
                        {
                            console.log(key);
                            return key === 'common/lang' ? langs : null;
                        },
                    }
                },
            ]
        }).compile();

        controller  = module.get<CommonCreateCountryController>(CommonCreateCountryController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonCreateCountryController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an country created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await controller.main(countries[0])).toBe(countries[0]);
        });
    });
});