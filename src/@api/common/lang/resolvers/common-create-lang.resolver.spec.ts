/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateLangResolver } from './common-create-lang.resolver';
import { ICommandBus } from '@aurora/cqrs/domain/command-bus';
import { IQueryBus } from '@aurora/cqrs/domain/query-bus';
import { CommonCreateLangInput } from './../../../../graphql';

// sources
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';

describe('CommonCreateLangResolver', () =>
{
    let resolver: CommonCreateLangResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateLangResolver,
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

        resolver    = module.get<CommonCreateLangResolver>(CommonCreateLangResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('CommonCreateLangResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateLangResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an lang created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(langs[0])));
            expect(await resolver.main(<CommonCreateLangInput>langs[0])).toBe(langs[0]);
        });
    });
});