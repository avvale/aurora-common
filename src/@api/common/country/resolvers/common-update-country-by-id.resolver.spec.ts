/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// custom items
import { CommonUpdateCountryByIdResolver } from './common-update-country-by-id.resolver';
import { CommonUpdateCountryByIdHandler } from '../handlers/common-update-country-by-id.handler';
import { CommonUpdateCountryByIdInput } from '../../../../graphql';

// sources
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';
import { countries } from '@apps/common/country/infrastructure/seeds/country.seed';

describe('CommonUpdateCountryByIdResolver', () =>
{
    let resolver: CommonUpdateCountryByIdResolver;
    let handler: CommonUpdateCountryByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                CacheModule.register(),
            ],
            providers: [
                CommonUpdateCountryByIdResolver,
                {
                    provide : CommonUpdateCountryByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateCountryByIdResolver>(CommonUpdateCountryByIdResolver);
        handler = module.get<CommonUpdateCountryByIdHandler>(CommonUpdateCountryByIdHandler);
    });

    test('CommonUpdateCountryByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateCountryByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a country by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(countries[0])));
            expect(await resolver.main(<CommonUpdateCountryByIdInput>countries[0])).toBe(countries[0]);
        });
    });
});