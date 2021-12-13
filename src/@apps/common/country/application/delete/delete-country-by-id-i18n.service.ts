import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { CountryDataLang, CountryId } from './../../domain/value-objects';
import { ICountryRepository } from './../../domain/country.repository';
import { ICountryI18NRepository } from './../../domain/country-i18n.repository';

@Injectable()
export class DeleteCountryByIdI18NService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
        private readonly repositoryI18n: ICountryI18NRepository,
    ) {}

    public async main(id: CountryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const country = await this.repository.findById(id, constraint, cQMetadata);

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repositoryI18n.delete({ where: {
            langId: country.langId.value,
            countryId: country.id.value,
        }});

        const dataLang = country.dataLang.value.removeItem(country.langId.value);

        // if has not any translation in i18n table, delete record
        if (dataLang.length === 0)
        {
            await this.repository.deleteById(country.id, {}, cQMetadata);
        }
        else
        {
            country.dataLang = new CountryDataLang(dataLang);
            await this.repository.update(country);
        }

        // insert EventBus in object, to be able to apply and commit events
        const countryRegister = this.publisher.mergeObjectContext(country);

        countryRegister.deleted(country); // apply event to model events
        countryRegister.commit(); // commit all events of model
    }
}