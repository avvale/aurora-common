import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class AdministrativeAreaLevel2Slug extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel2Slug';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel2Slug',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}