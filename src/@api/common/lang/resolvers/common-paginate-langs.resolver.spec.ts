/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';


// custom items
import { CommonPaginateLangsResolver } from './common-paginate-langs.resolver';
import { ICommandBus } from '@aurora/cqrs/domain/command-bus';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';

// sources
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';

describe('CommonPaginateLangsResolver', () =>
{
    let resolver: CommonPaginateLangsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonPaginateLangsResolver,
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

        resolver    = module.get<CommonPaginateLangsResolver>(CommonPaginateLangsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonPaginateLangsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonPaginateLangsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a langs', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs)));
            expect(await resolver.main()).toBe(langs);
        });
    });
});