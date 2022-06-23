/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCountryByIdCommand } from './update-country-by-id.command';
import { UpdateCountryByIdService } from './update-country-by-id.service';
import {
    CountryId,
    CountryIso3166Alpha2,
    CountryIso3166Alpha3,
    CountryIso3166Numeric,
    CountryCustomCode,
    CountryPrefix,
    CountryImage,
    CountrySort,
    CountryAdministrativeAreas,
    CountryLatitude,
    CountryLongitude,
    CountryZoom,
    CountryDataLang,
    CountryCreatedAt,
    CountryUpdatedAt,
    CountryDeletedAt,
    CountryI18NLangId,
    CountryI18NName,
    CountryI18NSlug,
    CountryI18NAdministrativeAreaLevel1,
    CountryI18NAdministrativeAreaLevel2,
    CountryI18NAdministrativeAreaLevel3,
} from '../../domain/value-objects';

@CommandHandler(UpdateCountryByIdCommand)
export class UpdateCountryByIdCommandHandler implements ICommandHandler<UpdateCountryByIdCommand>
{
    constructor(
        private readonly updateCountryByIdService: UpdateCountryByIdService,
    ) {}

    async execute(command: UpdateCountryByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateCountryByIdService.main(
            {
                id: new CountryId(command.payload.id),
                iso3166Alpha2: new CountryIso3166Alpha2(command.payload.iso3166Alpha2, { undefinable: true }),
                iso3166Alpha3: new CountryIso3166Alpha3(command.payload.iso3166Alpha3, { undefinable: true }),
                iso3166Numeric: new CountryIso3166Numeric(command.payload.iso3166Numeric, { undefinable: true }),
                customCode: new CountryCustomCode(command.payload.customCode),
                prefix: new CountryPrefix(command.payload.prefix),
                image: new CountryImage(command.payload.image),
                sort: new CountrySort(command.payload.sort),
                administrativeAreas: new CountryAdministrativeAreas(command.payload.administrativeAreas),
                latitude: new CountryLatitude(command.payload.latitude),
                longitude: new CountryLongitude(command.payload.longitude),
                zoom: new CountryZoom(command.payload.zoom),
                langId: new CountryI18NLangId(command.payload.langId, { undefinable: true }),
                name: new CountryI18NName(command.payload.name, { undefinable: true }),
                slug: new CountryI18NSlug(command.payload.slug, { undefinable: true }),
                administrativeAreaLevel1: new CountryI18NAdministrativeAreaLevel1(command.payload.administrativeAreaLevel1),
                administrativeAreaLevel2: new CountryI18NAdministrativeAreaLevel2(command.payload.administrativeAreaLevel2),
                administrativeAreaLevel3: new CountryI18NAdministrativeAreaLevel3(command.payload.administrativeAreaLevel3),
            },
            command.constraint,
            command.cQMetadata,
        );
    }
}