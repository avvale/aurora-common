import { StringValueObject, ValidationRules } from 'aurora-ts-core';

export class AdministrativeAreaLevel3CustomCode extends StringValueObject
{
    public readonly type: 'AdministrativeAreaLevel3CustomCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AdministrativeAreaLevel3CustomCode',
            nullable   : true,
            undefinable: true,
            maxLength  : 10,
        }, validationRules));
    }
}