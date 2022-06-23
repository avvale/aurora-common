import { Injectable } from '@nestjs/common';
import { ICommandBus } from 'aurora-ts-core';

// @apps
import { CreateLangsCommand } from '@apps/common/lang/application/create/create-langs.command';
import { CommonCreateLangInput } from '../../../../graphql';
import { CommonCreateLangDto } from '../dto';

@Injectable()
export class CommonCreateLangsHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    async main(
        payload: CommonCreateLangInput[] | CommonCreateLangDto[],
        timezone?: string,
    ): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateLangsCommand(payload, { timezone }));
        return true;
    }
}