import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateCountriesResolver } from './common-create-countries.resolver';
import { CommonCreateCountriesHandler } from '../handlers/common-create-countries.handler';
import { CommonCreateCountryInput } from '../../../../graphql';

// sources
import { countries } from '@apps/common/country/infrastructure/seeds/country.seed';

describe('CommonCreateCountriesResolver', () =>
{
    let resolver: CommonCreateCountriesResolver;
    let handler: CommonCreateCountriesHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonCreateCountriesResolver,
                {
                    provide : CommonCreateCountriesHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateCountriesResolver>(CommonCreateCountriesResolver);
        handler = module.get<CommonCreateCountriesHandler>(CommonCreateCountriesHandler);
    });

    test('CommonCreateCountriesResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateCountriesResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an countries created', async () =>
        {
            expect(await resolver.main(<CommonCreateCountryInput[]>countries)).toBe(undefined);
        });
    });
});