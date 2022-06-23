/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { CommonCountryDto } from '../../../common/country/dto/common-country.dto';
import { CommonAdministrativeAreaLevel1Dto } from '../../../common/administrative-area-level-1/dto/common-administrative-area-level-1.dto';
import { CommonAdministrativeAreaLevel2Dto } from '../../../common/administrative-area-level-2/dto/common-administrative-area-level-2.dto';

export class CommonAdministrativeAreaLevel3Dto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'countryId [input here api field description]',
        example    : '598a2116-45be-4b80-8e0f-b83a4e16ef58',
    })
    countryId: string;

    @ApiProperty({
        type       : () => CommonCountryDto,
        description: 'CommonCountry [input here api field description]',
    })
    country?: CommonCountryDto;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel1Id [input here api field description]',
        example    : '8f466717-1c8c-4cd6-b84d-f6f7d02d44eb',
    })
    administrativeAreaLevel1Id: string;

    @ApiProperty({
        type       : () => CommonAdministrativeAreaLevel1Dto,
        description: 'CommonAdministrativeAreaLevel1 [input here api field description]',
    })
    administrativeAreaLevel1?: CommonAdministrativeAreaLevel1Dto;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel2Id [input here api field description]',
        example    : 'edc21099-79dd-456a-a3eb-f48b9f4b81ab',
    })
    administrativeAreaLevel2Id: string;

    @ApiProperty({
        type       : () => CommonAdministrativeAreaLevel2Dto,
        description: 'CommonAdministrativeAreaLevel2 [input here api field description]',
    })
    administrativeAreaLevel2?: CommonAdministrativeAreaLevel2Dto;

    @ApiProperty({
        type       : String,
        description: 'code [input here api field description]',
    })
    code: string;

    @ApiProperty({
        type       : String,
        description: 'customCode [input here api field description]',
    })
    customCode?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type       : String,
        description: 'slug [input here api field description]',
    })
    slug: string;

    @ApiProperty({
        type       : Number,
        description: 'latitude [input here api field description]',
    })
    latitude?: number;

    @ApiProperty({
        type       : Number,
        description: 'longitude [input here api field description]',
    })
    longitude?: number;

    @ApiProperty({
        type       : Number,
        description: 'zoom [input here api field description]',
    })
    zoom?: number;

    @ApiProperty({
        type       : String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type       : String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type       : String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;

}