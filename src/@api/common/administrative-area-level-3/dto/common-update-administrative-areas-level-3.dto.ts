/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class CommonUpdateAdministrativeAreasLevel3Dto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'countryId [input here api field description]',
        example    : 'd6867c5a-e4a4-4f9b-b2e5-d22ca8910d08',
    })
    countryId?: string;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel1Id [input here api field description]',
        example    : 'd5e97e22-a432-4961-9049-a31209677cd3',
    })
    administrativeAreaLevel1Id?: string;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel2Id [input here api field description]',
        example    : '6a927b50-e9bc-44e4-a521-96aed8559d7e',
    })
    administrativeAreaLevel2Id?: string;

    @ApiProperty({
        type       : String,
        description: 'code [input here api field description]',
    })
    code?: string;

    @ApiProperty({
        type       : String,
        description: 'customCode [input here api field description]',
    })
    customCode?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : String,
        description: 'slug [input here api field description]',
    })
    slug?: string;

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

}