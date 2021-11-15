import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateLangResolver } from './common-update-lang.resolver';
import { ICommandBus } from '@aurora/cqrs/domain/command-bus';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';
import { CommonUpdateLangInput } from './../../../../graphql';

describe('CommonUpdateLangResolver', () =>
{
    let resolver: CommonUpdateLangResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommonUpdateLangResolver,
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

        resolver    = module.get<CommonUpdateLangResolver>(CommonUpdateLangResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonUpdateLangResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateLangResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a lang created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await resolver.main(<CommonUpdateLangInput>langs[0])).toBe(langs[0]);
        });
    });
});