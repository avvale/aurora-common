/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateAdministrativeAreaLevel3Controller } from './common-create-administrative-area-level-3.controller';
import { CommonCreateAdministrativeAreaLevel3Handler } from '../handlers/common-create-administrative-area-level-3.handler';

// sources
import { administrativeAreasLevel3 } from '@apps/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonCreateAdministrativeAreaLevel3Controller', () =>
{
    let controller: CommonCreateAdministrativeAreaLevel3Controller;
    let handler: CommonCreateAdministrativeAreaLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonCreateAdministrativeAreaLevel3Controller,
            ],
            providers: [
                {
                    provide : CommonCreateAdministrativeAreaLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateAdministrativeAreaLevel3Controller>(CommonCreateAdministrativeAreaLevel3Controller);
        handler = module.get<CommonCreateAdministrativeAreaLevel3Handler>(CommonCreateAdministrativeAreaLevel3Handler);
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreaLevel3Controller should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await controller.main(administrativeAreasLevel3[0])).toBe(administrativeAreasLevel3[0]);
        });
    });
});