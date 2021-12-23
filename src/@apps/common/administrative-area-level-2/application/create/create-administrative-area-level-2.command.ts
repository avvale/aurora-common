import { CQMetadata } from 'aurora-ts-core';

export class CreateAdministrativeAreaLevel2Command
{
    constructor(
        public readonly payload: {
            id: string,
            countryId: string,
            administrativeAreaLevel1Id: string,
            code: string,
            customCode?: string,
            name: string,
            slug: string,
            latitude?: number,
            longitude?: number,
            zoom?: number,
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}