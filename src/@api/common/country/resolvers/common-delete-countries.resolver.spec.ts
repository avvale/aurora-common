/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// custom items
import { CommonDeleteCountriesResolver } from './common-delete-countries.resolver';
import { CommonDeleteCountriesHandler } from '../handlers/common-delete-countries.handler';

// sources
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@apps/common/country/infrastructure/seeds/country.seed';

describe('CommonDeleteCountriesResolver', () =>
{
    let resolver: CommonDeleteCountriesResolver;
    let handler: CommonDeleteCountriesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonDeleteCountriesResolver,
                {
                    provide : CommonDeleteCountriesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonDeleteCountriesResolver>(CommonDeleteCountriesResolver);
        handler = module.get<CommonDeleteCountriesHandler>(CommonDeleteCountriesHandler);
    });

    test('CommonDeleteCountriesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteCountriesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an countries deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries)));
            expect(await resolver.main()).toBe(countries);
        });
    });
});