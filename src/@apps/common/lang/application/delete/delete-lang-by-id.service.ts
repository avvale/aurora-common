import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from 'aurora-ts-core';
import { CQMetadata } from 'aurora-ts-core';
import { LangId } from './../../domain/value-objects';
import { ILangRepository } from './../../domain/lang.repository';

@Injectable()
export class DeleteLangByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ILangRepository,
    ) {}

    public async main(id: LangId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>
    {
        // get object to delete
        const lang = await this.repository.findById(id, constraint, cQMetadata);

        await this.repository.deleteById(id, constraint, cQMetadata);

        // insert EventBus in object, to be able to apply and commit events
        const langRegister = this.publisher.mergeObjectContext(lang);

        langRegister.deleted(lang); // apply event to model events
        langRegister.commit(); // commit all events of model
    }
}