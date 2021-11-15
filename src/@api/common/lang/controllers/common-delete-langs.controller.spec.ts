import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteLangsController } from './common-delete-langs.controller';
import { ICommandBus } from '@aurora/cqrs/domain/command-bus';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';

describe('CommonDeleteLangsController', () =>
{
    let controller: CommonDeleteLangsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CommonDeleteLangsController
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

        controller  = module.get<CommonDeleteLangsController>(CommonDeleteLangsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonDeleteLangsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an langs deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs)));
            expect(await controller.main()).toBe(langs);
        });
    });
});