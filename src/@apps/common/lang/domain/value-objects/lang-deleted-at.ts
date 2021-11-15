import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class LangDeletedAt extends TimestampValueObject
{
    public readonly type: 'LangDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'LangDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}