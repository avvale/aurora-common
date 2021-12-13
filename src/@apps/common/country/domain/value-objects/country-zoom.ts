import { IntValueObject, ValidationRules } from 'aurora-ts-core';

export class CountryZoom extends IntValueObject
{
    public readonly type: 'CountryZoom';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'CountryZoom',
            nullable   : true,
            undefinable: true,
            maxLength  : 2,
            unsigned   : true,
        }, validationRules));
    }
}