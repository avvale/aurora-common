import { DataValueObject, TimestampValueObject, ValidationRules } from 'aurora-ts-core';

export class LangUpdatedAt extends TimestampValueObject
{
    public readonly type: 'LangUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'LangUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}