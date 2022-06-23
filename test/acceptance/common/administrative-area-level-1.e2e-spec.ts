/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel1Repository } from '@apps/common/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Seeder } from '@apps/common/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.seeder';
import { administrativeAreasLevel1 } from '@apps/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { CommonModule } from '@api/common/common.module';
import * as request from 'supertest';
import * as _ from 'lodash';


// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('administrative-area-level-1', () =>
{
    let app: INestApplication;
    let administrativeAreaLevel1Repository: IAdministrativeAreaLevel1Repository;
    let administrativeAreaLevel1Seeder: MockAdministrativeAreaLevel1Seeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                CommonModule,
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports   : [ConfigModule],
                    inject    : [ConfigService],
                    useFactory: (configService: ConfigService) =>
                    {
                        return {
                            dialect       : configService.get('TEST_DATABASE_DIALECT'),
                            storage       : configService.get('TEST_DATABASE_STORAGE'),
                            host          : configService.get('TEST_DATABASE_HOST'),
                            port          : +configService.get('TEST_DATABASE_PORT'),
                            username      : configService.get('TEST_DATABASE_USER'),
                            password      : configService.get('TEST_DATABASE_PASSWORD'),
                            database      : configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize   : configService.get('TEST_DATABASE_SYNCHRONIZE'),
                            logging       : configService.get('TEST_DATABASE_LOGGIN') === 'true' ? console.log : false,
                            autoLoadModels: true,
                            models        : [],
                        };
                    },
                }),
            ],
            providers: [
                MockAdministrativeAreaLevel1Seeder,
            ],
        })
            .compile();

        mockData = administrativeAreasLevel1;
        app = module.createNestApplication();
        administrativeAreaLevel1Repository = module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);
        administrativeAreaLevel1Seeder = module.get<MockAdministrativeAreaLevel1Seeder>(MockAdministrativeAreaLevel1Seeder);

        // seed mock data in memory database
        await administrativeAreaLevel1Repository.insert(administrativeAreaLevel1Seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1CountryId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                countryId: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                slug: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be null');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1CountryId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                countryId: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                slug: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Id is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1CountryId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                countryId: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Code is too large, has a maximum length of 8', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                code: '*********',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code is too large, has a maximum length of 8');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                customCode: '***********',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Name is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Slug is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                slug: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Zoom is too large, has a maximum length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                zoom: 111,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Zoom is too large, has a maximum length of 2');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Zoom must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                zoom: -1,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('The numerical value for AdministrativeAreaLevel1Zoom must have a positive sign, this field does not accept negative values');
            });
    });
    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Latitude is too large, has a maximum decimal integers length of 13', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                latitude: 82879995360941.64,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Latitude is too large, has a maximum length of 13 integers in');
            });
    });
    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Longitude is too large, has a maximum decimal integers length of 13', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                longitude: 89176060447000.72,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Longitude is too large, has a maximum length of 13 integers in');
            });
    });
    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Latitude is too large, has a maximum decimals length of 4', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                latitude: 262659292589.6545,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Latitude is too large, has a maximum length of 4 decimals in');
            });
    });
    test('/REST:POST common/administrative-area-level-1/create - Got 400 Conflict, AdministrativeAreaLevel1Longitude is too large, has a maximum decimals length of 4', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                longitude: 813337142677.4075,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Longitude is too large, has a maximum length of 4 decimals in');
            });
    });

    test('/REST:POST common/administrative-area-level-1/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST common/administrative-areas-level-1/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-areas-level-1/paginate')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    offset: 0,
                    limit: 5,
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: administrativeAreaLevel1Seeder.collectionResponse.length,
                    count: administrativeAreaLevel1Seeder.collectionResponse.length,
                    rows : administrativeAreaLevel1Seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST common/administrative-areas-level-1/get', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-areas-level-1/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    administrativeAreaLevel1Seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST common/administrative-area-level-1/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '705393d5-4726-4611-b884-ab073964b411',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST common/administrative-area-level-1/create', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST common/administrative-area-level-1/find', () =>
    {
        return request(app.getHttpServer())
            .post('/common/administrative-area-level-1/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:GET common/administrative-area-level-1/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-1/find/2d5bdaf9-c60c-4861-a729-2304012292a6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET common/administrative-area-level-1/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/common/administrative-area-level-1/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/administrative-area-level-1/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/administrative-area-level-1/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'bf6e271b-7df1-4242-bca6-aeb8cc026704',
            })
            .expect(404);
    });

    test('/REST:PUT common/administrative-area-level-1/update', () =>
    {
        return request(app.getHttpServer())
            .put('/common/administrative-area-level-1/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/administrative-area-level-1/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/administrative-area-level-1/delete/030626be-d21c-4b53-8951-7f86b332542f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE common/administrative-area-level-1/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/administrative-area-level-1/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL commonCreateAdministrativeAreaLevel1 - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateAdministrativeAreaLevel1Input!)
                    {
                        commonCreateAdministrativeAreaLevel1 (payload:$payload)
                        {
                            id
                            countryId
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(mockData[0], ['createdAt','updatedAt','deletedAt']),
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.response.message).toContain('already exist in database');
            });
    });

    test('/GraphQL commonPaginateAdministrativeAreasLevel1', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        commonPaginateAdministrativeAreasLevel1 (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonPaginateAdministrativeAreasLevel1).toEqual({
                    total: administrativeAreaLevel1Seeder.collectionResponse.length,
                    count: administrativeAreaLevel1Seeder.collectionResponse.length,
                    rows : administrativeAreaLevel1Seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL commonGetAdministrativeAreasLevel1', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonGetAdministrativeAreasLevel1 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {},
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.commonGetAdministrativeAreasLevel1.entries())
                {
                    expect(administrativeAreaLevel1Seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL commonCreateAdministrativeAreaLevel1', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateAdministrativeAreaLevel1Input!)
                    {
                        commonCreateAdministrativeAreaLevel1 (payload:$payload)
                        {
                            id
                            countryId
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonCreateAdministrativeAreaLevel1).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel1 - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAdministrativeAreaLevel1 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: 'aa211153-391c-42d7-b348-be4a2856426b',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel1', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindAdministrativeAreaLevel1 (query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonFindAdministrativeAreaLevel1.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel1ById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindAdministrativeAreaLevel1ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ff07cf39-d03e-4ec0-bd2b-c485b73c9f1c',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonFindAdministrativeAreaLevel1ById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindAdministrativeAreaLevel1ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonFindAdministrativeAreaLevel1ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateAdministrativeAreaLevel1ById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel1ByIdInput!)
                    {
                        commonUpdateAdministrativeAreaLevel1ById (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '7cbae8d5-8232-41fa-8dd7-50762aab49e4',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonUpdateAdministrativeAreaLevel1ById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreaLevel1ByIdInput!)
                    {
                        commonUpdateAdministrativeAreaLevel1ById (payload:$payload)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonUpdateAdministrativeAreaLevel1ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateAdministrativeAreasLevel1', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateAdministrativeAreasLevel1Input! $query: QueryStatement)
                    {
                        commonUpdateAdministrativeAreasLevel1 (payload:$payload query:$query)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                    query: {
                        where: {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonUpdateAdministrativeAreasLevel1[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonDeleteAdministrativeAreaLevel1ById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAdministrativeAreaLevel1ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8b41f7e1-fa88-4a3e-83fe-ccb7e1f50d27',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonDeleteAdministrativeAreaLevel1ById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteAdministrativeAreaLevel1ById (id:$id)
                        {
                            id
                            code
                            customCode
                            name
                            slug
                            latitude
                            longitude
                            zoom
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.commonDeleteAdministrativeAreaLevel1ById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await administrativeAreaLevel1Repository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});