import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { FindLangByIdQueryHandler } from './find-lang-by-id.query-handler';
import { MockLangRepository } from '@apps/common/lang/infrastructure/mock/mock-lang.repository';
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';
import { ILangRepository } from '@apps/common/lang/domain/lang.repository';
import { LangMapper } from '@apps/common/lang/domain/lang.mapper';
import { FindLangByIdQuery } from './find-lang-by-id.query';
import { FindLangByIdService } from './find-lang-by-id.service';

describe('FindLangByIdQueryHandler', () =>
{
    let queryHandler: FindLangByIdQueryHandler;
    let service: FindLangByIdService;
    let repository: MockLangRepository;
    let mapper: LangMapper;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindLangByIdQueryHandler,
                {
                    provide : ILangRepository,
                    useClass: MockLangRepository
                },
                {
                    provide : FindLangByIdService,
                    useValue: {
                        main: () => {},
                    }
                }
            ]
        })
        .compile();

        queryHandler    = module.get<FindLangByIdQueryHandler>(FindLangByIdQueryHandler);
        service         = module.get<FindLangByIdService>(FindLangByIdService);
        repository      = <MockLangRepository>module.get<ILangRepository>(ILangRepository);
        mapper          = new LangMapper();
    });

    describe('main', () =>
    {
        test('FindLangByIdQueryHandler should be defined', () =>
        {
            expect(queryHandler).toBeDefined();
        });

        test('should return an lang founded', async () =>
        {
            jest.spyOn(service, 'main').mockImplementation(() => new Promise(resolve => resolve(repository.collectionSource[0])));
            expect(await queryHandler.execute(
                new FindLangByIdQuery(
                    langs[0].id,

                )
            )).toStrictEqual(mapper.mapAggregateToResponse(repository.collectionSource[0]));
        });
    });
});