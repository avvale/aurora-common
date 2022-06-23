/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// custom items
import { CommonDeleteCountryByIdController } from './common-delete-country-by-id.controller';
import { CommonDeleteCountryByIdHandler } from '../handlers/common-delete-country-by-id.handler';

// sources
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@apps/common/country/infrastructure/seeds/country.seed';

describe('CommonDeleteCountryByIdController', () =>
{
    let controller: CommonDeleteCountryByIdController;
    let handler: CommonDeleteCountryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            controllers: [
                CommonDeleteCountryByIdController,
            ],
            providers: [
                AddI18NConstraintService,
                {
                    provide : ConfigService,
                    useValue: {
                        get: (key: string) => key === 'APP_LANG' ? 'es' : '',
                    },
                },
                {
                    provide : CACHE_MANAGER,
                    useValue: {
                        get: (key: string) => key === 'common/lang' ? langs : null,
                    },
                },
                {
                    provide : CommonDeleteCountryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteCountryByIdController>(CommonDeleteCountryByIdController);
        handler = module.get<CommonDeleteCountryByIdHandler>(CommonDeleteCountryByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonDeleteCountryByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an country deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await controller.main(countries[0].id)).toBe(countries[0]);
        });
    });
});