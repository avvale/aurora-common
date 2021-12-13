import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateCountriesController } from './common-create-countries.controller';
import { ICommandBus } from '@aurora/cqrs/domain/command-bus';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { countries } from '@apps/common/country/infrastructure/seeds/country.seed';

describe('CommonCreateCountriesController', () =>
{
    let controller: CommonCreateCountriesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CommonCreateCountriesController
            ],
            providers: [
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

        controller  = module.get<CommonCreateCountriesController>(CommonCreateCountriesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonCreateCountriesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an countries created', async () =>
        {
            expect(await controller.main(countries)).toBe(undefined);
        });
    });
});