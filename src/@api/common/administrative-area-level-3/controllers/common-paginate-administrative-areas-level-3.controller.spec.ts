/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { CommonPaginateAdministrativeAreasLevel3Controller } from './common-paginate-administrative-areas-level-3.controller';

// sources
import { administrativeAreasLevel3 } from '../../../../@apps/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonPaginateAdministrativeAreasLevel3Controller', () =>
{
    let controller: CommonPaginateAdministrativeAreasLevel3Controller;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonPaginateAdministrativeAreasLevel3Controller
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

        controller  = module.get<CommonPaginateAdministrativeAreasLevel3Controller>(CommonPaginateAdministrativeAreasLevel3Controller);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel3Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreasLevel3', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3)));
            expect(await controller.main()).toBe(administrativeAreasLevel3);
        });
    });
});