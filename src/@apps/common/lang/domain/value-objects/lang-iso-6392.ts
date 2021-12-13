import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class LangIso6392 extends StringValueObject
{
    public readonly type: 'LangIso6392';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'LangIso6392',
            nullable   : false,
            undefinable: false,
            length     : 2,

        }, validationRules));
    }
}