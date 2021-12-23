import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class AdministrativeAreaLevel3DeletedAt extends TimestampValueObject
{
    public readonly type: 'AdministrativeAreaLevel3DeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel3DeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}