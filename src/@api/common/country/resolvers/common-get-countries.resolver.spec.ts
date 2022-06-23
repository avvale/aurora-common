/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// custom items
import { CommonGetCountriesResolver } from './common-get-countries.resolver';
import { CommonGetCountriesHandler } from '../handlers/common-get-countries.handler';

// sources
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@apps/common/country/infrastructure/seeds/country.seed';

describe('CommonGetCountriesResolver', () =>
{
    let resolver: CommonGetCountriesResolver;
    let handler: CommonGetCountriesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonGetCountriesResolver,
                {
                    provide : CommonGetCountriesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonGetCountriesResolver>(CommonGetCountriesResolver);
        handler = module.get<CommonGetCountriesHandler>(CommonGetCountriesHandler);
    });

    test('CommonGetCountriesResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonGetCountriesResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a countries', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries)));
            expect(await resolver.main()).toBe(countries);
        });
    });
});