/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// custom items
import { CommonUpdateCountriesResolver } from './common-update-countries.resolver';
import { CommonUpdateCountriesHandler } from '../handlers/common-update-countries.handler';
import { CommonUpdateCountriesInput } from '../../../../graphql';

// sources
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@apps/common/country/infrastructure/seeds/country.seed';

describe('CommonUpdateCountriesResolver', () =>
{
    let resolver: CommonUpdateCountriesResolver;
    let handler: CommonUpdateCountriesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonUpdateCountriesResolver,
                {
                    provide : CommonUpdateCountriesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateCountriesResolver>(CommonUpdateCountriesResolver);
        handler = module.get<CommonUpdateCountriesHandler>(CommonUpdateCountriesHandler);
    });

    test('CommonUpdateCountriesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateCountriesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a countries updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await resolver.main(<CommonUpdateCountriesInput>countries[0])).toBe(countries[0]);
        });
    });
});