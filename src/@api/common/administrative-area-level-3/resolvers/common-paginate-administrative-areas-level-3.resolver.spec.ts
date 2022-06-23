/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonPaginateAdministrativeAreasLevel3Resolver } from './common-paginate-administrative-areas-level-3.resolver';
import { CommonPaginateAdministrativeAreasLevel3Handler } from '../handlers/common-paginate-administrative-areas-level-3.handler';

// sources
import { administrativeAreasLevel3 } from '@apps/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonPaginateAdministrativeAreasLevel3Resolver', () =>
{
    let resolver: CommonPaginateAdministrativeAreasLevel3Resolver;
    let handler: CommonPaginateAdministrativeAreasLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonPaginateAdministrativeAreasLevel3Resolver,
                {
                    provide : CommonPaginateAdministrativeAreasLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver    = module.get<CommonPaginateAdministrativeAreasLevel3Resolver>(CommonPaginateAdministrativeAreasLevel3Resolver);
        handler = module.get<CommonPaginateAdministrativeAreasLevel3Handler>(CommonPaginateAdministrativeAreasLevel3Handler);
    });

    test('CommonPaginateAdministrativeAreasLevel3Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel3Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreasLevel3', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : administrativeAreasLevel3,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : administrativeAreasLevel3,
            });
        });
    });
});