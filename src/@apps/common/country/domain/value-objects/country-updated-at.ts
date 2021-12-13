import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class CountryUpdatedAt extends TimestampValueObject
{
    public readonly type: 'CountryUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'CountryUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}