import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { langs } from '@apps/common/lang/infrastructure/seeds/lang.seed';
import { UpdateLangsCommandHandler } from './update-langs.command-handler';
import { UpdateLangsCommand } from './update-langs.command';
import { UpdateLangsService } from './update-langs.service';

describe('UpdateLangsCommandHandler', () =>
{
    let commandHandler: UpdateLangsCommandHandler;
    let service: UpdateLangsService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateLangsCommandHandler,
                {
                    provide : UpdateLangsService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler  = module.get<UpdateLangsCommandHandler>(UpdateLangsCommandHandler);
        service         = module.get<UpdateLangsService>(UpdateLangsService);
    });

    describe('main', () =>
    {
        test('UpdateLangsCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return an langs updated', async () =>
        {
            expect(await commandHandler.execute(
                new UpdateLangsCommand(
                    {
                        id: langs[0].id,
                        name: langs[0].name,
                        image: langs[0].image,
                        iso6392: langs[0].iso6392,
                        iso6393: langs[0].iso6393,
                        ietf: langs[0].ietf,
                        customCode: langs[0].customCode,
                        dir: langs[0].dir,
                        sort: langs[0].sort,
                        isActive: langs[0].isActive,
                    },
                    {},
                    {},
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});