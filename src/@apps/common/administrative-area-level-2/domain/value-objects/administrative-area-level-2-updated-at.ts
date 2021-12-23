import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class AdministrativeAreaLevel2UpdatedAt extends TimestampValueObject
{
    public readonly type: 'AdministrativeAreaLevel2UpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2UpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}