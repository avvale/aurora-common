import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateLangsController } from './common-create-langs.controller';
import { ICommandBus } from '@aurora/cqrs/domain/command-bus';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';

describe('CommonCreateLangsController', () =>
{
    let controller: CommonCreateLangsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CommonCreateLangsController
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

        controller  = module.get<CommonCreateLangsController>(CommonCreateLangsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonCreateLangsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an langs created', async () =>
        {
            expect(await controller.main(langs)).toBe(undefined);
        });
    });
});