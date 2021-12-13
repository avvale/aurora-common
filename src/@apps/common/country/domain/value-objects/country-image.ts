import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class CountryImage extends StringValueObject
{
    public readonly type: 'CountryImage';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryImage',
            nullable   : true,
            undefinable: true,
            maxLength  : 1024,
        }, validationRules));
    }
}