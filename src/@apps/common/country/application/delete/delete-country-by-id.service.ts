import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { CountryId } from './../../domain/value-objects';
import { ICountryRepository } from './../../domain/country.repository';
import { ICountryI18NRepository } from './../../domain/country-i18n.repository';

@Injectable()
export class DeleteCountryByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ICountryRepository,
        private readonly repositoryI18n: ICountryI18NRepository,
    ) {}

    public async main(id: CountryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const country = await this.repository.findById(id, { constraint, cQMetadata });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repositoryI18n.delete({ 
            queryStatement: { 
                where: { countryId: country.id.value }
            }
        });
        await this.repository.deleteById(country.id, { cQMetadata });

        // insert EventBus in object, to be able to apply and commit events
        const countryRegister = this.publisher.mergeObjectContext(country);

        countryRegister.deleted(country); // apply event to model events
        countryRegister.commit(); // commit all events of model
    }
}