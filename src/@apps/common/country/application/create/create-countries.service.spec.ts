/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';

// custom items
import { CreateCountriesService } from './create-countries.service';
import { ICountryRepository } from './../../domain/country.repository';
import { ICountryI18NRepository } from './../../domain/country-i18n.repository';
import { MockCountryRepository } from './../../infrastructure/mock/mock-country.repository';

describe('CreateCountriesService', () =>
{
    let service: CreateCountriesService;
    let repository: ICountryRepository;
    let repositoryI18N: ICountryI18NRepository;
    let mockRepository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateCountriesService,
                MockCountryRepository,
                {
                    provide : ICountryRepository,
                    useValue: {
                        insert: (items) => { /**/ },
                    }
                },
                {
                    provide : ICountryI18NRepository,
                    useValue: {
                        insert: (items) => { /**/ },
                    }
                },
                {
                    provide : ConfigService,
                    useValue: {
                        get: (key: string) => key === 'APP_LANG' ? 'es' : ''
                    }
                },
            ]
        }).compile();

        service         = module.get(CreateCountriesService);
        repository      = module.get(ICountryRepository);
        mockRepository  = module.get(MockCountryRepository);
    });

    describe('main', () =>
    {
        test('CreateCountriesService should be defined', () =>
        {
            expect(service).toBeDefined();
        });

        test('should create countries and emit event', async () =>
        {
            expect(await service.main(
                mockRepository.collectionSource
            )).toBe(undefined);
        });
    });
});