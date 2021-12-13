import { SmallintValueObject, ValidationRules } from 'aurora-ts-core';

export class LangSort extends SmallintValueObject
{
    public readonly type: 'LangSort';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangSort',
            nullable   : true,
            undefinable: true,
            maxLength  : 6,
            unsigned   : true,
        }, validationRules));
    }
}