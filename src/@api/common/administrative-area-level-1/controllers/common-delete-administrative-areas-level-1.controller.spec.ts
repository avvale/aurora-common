/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAdministrativeAreasLevel1Controller } from './common-delete-administrative-areas-level-1.controller';
import { CommonDeleteAdministrativeAreasLevel1Handler } from '../handlers/common-delete-administrative-areas-level-1.handler';

// sources
import { administrativeAreasLevel1 } from '@apps/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonDeleteAdministrativeAreasLevel1Controller', () =>
{
    let controller: CommonDeleteAdministrativeAreasLevel1Controller;
    let handler: CommonDeleteAdministrativeAreasLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonDeleteAdministrativeAreasLevel1Controller,
            ],
            providers: [
                {
                    provide : CommonDeleteAdministrativeAreasLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonDeleteAdministrativeAreasLevel1Controller>(CommonDeleteAdministrativeAreasLevel1Controller);
        handler = module.get<CommonDeleteAdministrativeAreasLevel1Handler>(CommonDeleteAdministrativeAreasLevel1Handler);
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel1Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreasLevel1 deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1)));
            expect(await controller.main()).toBe(administrativeAreasLevel1);
        });
    });
});