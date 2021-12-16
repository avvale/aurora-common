/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ILangRepository } from '@apps/common/lang/domain/lang.repository';
import { MockLangSeeder } from '@apps/common/lang/infrastructure/mock/mock-lang.seeder';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { CommonModule } from '@api/common/common.module';
import * as request from 'supertest';
import * as _ from 'lodash';


const importForeignModules = [];

describe('lang', () =>
{
    let app: INestApplication;
    let repository: ILangRepository;
    let seeder: MockLangSeeder;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                CommonModule,
                GraphQLConfigModule,
                SequelizeModule.forRoot({
                    dialect       : 'sqlite',
                    storage       : ':memory:',
                    logging       : false,
                    autoLoadModels: true,
                    models        : [],
                }),
            ],
            providers: [
                MockLangSeeder,
            ]
        })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<ILangRepository>(ILangRepository);
        seeder          = module.get<MockLangSeeder>(MockLangSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'Fantastic Metal Ball',
                image: 'http://placeimg.com/640/480/abstract',
                iso6392: 'zu',
                iso6393: 'p8b',
                ietf: '8yzy6',
                customCode: 'u7hyeoj6sn',
                dir: 'LTR',
                sort: 925325,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '4f77068f-4774-4caf-a7e0-134a38556d9d',
                name: null,
                image: 'http://placeimg.com/640/480/food',
                iso6392: 'fh',
                iso6393: 'kps',
                ietf: 'cuu10',
                customCode: 'oblflskyr7',
                dir: 'RTL',
                sort: 185073,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIso6392 property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'd7eebc61-8d47-4f3b-945a-5cb506c7647d',
                name: 'Small Rubber Pizza',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: null,
                iso6393: 'kp1',
                ietf: 'zqnwg',
                customCode: 'l3igtif0ui',
                dir: 'LTR',
                sort: 138221,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIso6393 property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '03a1d122-d236-4fd9-bc84-ec0339335012',
                name: 'Intelligent Wooden Hat',
                image: 'http://placeimg.com/640/480/people',
                iso6392: 'fc',
                iso6393: null,
                ietf: 'vidur',
                customCode: 'r9cj4elm6s',
                dir: 'RTL',
                sort: 178403,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIetf property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '2411210c-7654-48a9-bde2-9c5ae255d7e1',
                name: 'Incredible Cotton Sausages',
                image: 'http://placeimg.com/640/480/business',
                iso6392: 'k8',
                iso6393: 'lo8',
                ietf: null,
                customCode: 'odnomhu72n',
                dir: 'RTL',
                sort: 209692,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangDir property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'b5f6416b-c63b-47f6-a2c1-4f5fe3444984',
                name: 'Fantastic Frozen Towels',
                image: 'http://placeimg.com/640/480/fashion',
                iso6392: 'pg',
                iso6393: 'm8f',
                ietf: 'u12yh',
                customCode: 'xschg1wv66',
                dir: null,
                sort: 170722,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangDir must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '843cef55-8991-487f-a43b-eb7f69bdc4ab',
                name: 'Small Fresh Bike',
                image: 'http://placeimg.com/640/480/city',
                iso6392: 'qx',
                iso6393: 's05',
                ietf: 'hjtdd',
                customCode: 'yt6lvi2v21',
                dir: 'LTR',
                sort: 285948,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive must be defined, can not be null');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                name: 'Generic Frozen Ball',
                image: 'http://placeimg.com/640/480/food',
                iso6392: '29',
                iso6393: '1be',
                ietf: 'tjp4g',
                customCode: '8j7mewwnge',
                dir: 'LTR',
                sort: 154708,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '8aab7979-68e8-481b-90f5-ea09e7ea5447',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: 'v3',
                iso6393: 'cch',
                ietf: '87dwi',
                customCode: 'czu6zndpqw',
                dir: 'LTR',
                sort: 155965,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIso6392 property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '2204c905-1238-4e72-a2d1-340420b47e44',
                name: 'Ergonomic Soft Table',
                image: 'http://placeimg.com/640/480/sports',
                iso6393: 'frd',
                ietf: 'yr74s',
                customCode: 'g321b7y1ev',
                dir: 'LTR',
                sort: 598708,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIso6393 property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '09befb98-ea19-4132-82e3-5deb0d3538c9',
                name: 'Gorgeous Metal Chips',
                image: 'http://placeimg.com/640/480/fashion',
                iso6392: '0a',
                ietf: 'syxmc',
                customCode: 'pincd856ra',
                dir: 'LTR',
                sort: 881633,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIetf property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'def43bea-6210-451b-9016-edd38023724a',
                name: 'Handcrafted Fresh Table',
                image: 'http://placeimg.com/640/480/sports',
                iso6392: 'fj',
                iso6393: 'vnd',
                customCode: 'x896k4rcqw',
                dir: 'RTL',
                sort: 482655,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangDir property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '9b7033a2-5098-4c81-8316-0b7cb685e8d3',
                name: 'Refined Rubber Computer',
                image: 'http://placeimg.com/640/480/business',
                iso6392: 'h8',
                iso6393: 'icm',
                ietf: 'f8hvz',
                customCode: 'rhw5t2ee3j',
                sort: 667338,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangDir must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'd2375089-c86c-4f77-a951-1fac52cc9a42',
                name: 'Sleek Steel Chips',
                image: 'http://placeimg.com/640/480/technics',
                iso6392: 'pc',
                iso6393: 'vrf',
                ietf: 'cmzkf',
                customCode: 'k76xemcphi',
                dir: 'RTL',
                sort: 505171,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'i1eda96kw4n088ingldnb9aqh8l29iu5zsfc6',
                name: 'Fantastic Metal Fish',
                image: 'http://placeimg.com/640/480/food',
                iso6392: 'gk',
                iso6393: '24p',
                ietf: '2mc1k',
                customCode: 'f97re1ch0d',
                dir: 'RTL',
                sort: 439142,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIso6392 is not allowed, must be a length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '4103fc85-e0db-4f71-b434-1e5eec65bc22',
                name: 'Ergonomic Granite Soap',
                image: 'http://placeimg.com/640/480/food',
                iso6392: 'z5i',
                iso6393: 'kq9',
                ietf: 'z8dv1',
                customCode: 'nu1tmayl7d',
                dir: 'LTR',
                sort: 283062,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 is not allowed, must be a length of 2');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIso6393 is not allowed, must be a length of 3', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '6d09ea69-237a-4730-8e57-86543a6f9444',
                name: 'Fantastic Soft Soap',
                image: 'http://placeimg.com/640/480/food',
                iso6392: 'eh',
                iso6393: 'i0dj',
                ietf: 'fnyv6',
                customCode: '85zirc26rd',
                dir: 'LTR',
                sort: 217343,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 is not allowed, must be a length of 3');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIetf is not allowed, must be a length of 5', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'a314838f-44bd-41e7-a196-901cf97f0fa0',
                name: 'Rustic Frozen Gloves',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: 'ea',
                iso6393: 'ghr',
                ietf: 'io1hws',
                customCode: '7f8dckhkks',
                dir: 'LTR',
                sort: 595551,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf is not allowed, must be a length of 5');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangCustomCode is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '4411f8bf-e01d-4870-a9f9-a91fa8237de4',
                name: 'Practical Cotton Computer',
                image: 'http://placeimg.com/640/480/technics',
                iso6392: 'k6',
                iso6393: 'u31',
                ietf: '2pec1',
                customCode: 'yauyrzy0k2j',
                dir: 'RTL',
                sort: 646048,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangCustomCode is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangSort is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '2d307c04-cbfd-49e5-93f2-f342b16263a3',
                name: 'Refined Plastic Salad',
                image: 'http://placeimg.com/640/480/people',
                iso6392: 'jt',
                iso6393: 'hi4',
                ietf: '4aowm',
                customCode: 'kfw3xizurs',
                dir: 'LTR',
                sort: 1369484,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangSort is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '5b9a97b4-d865-43c7-8771-88415a3b577f',
                name: 'Sleek Fresh Cheese',
                image: 'http://placeimg.com/640/480/city',
                iso6392: '6i',
                iso6393: 'vuu',
                ietf: 'slond',
                customCode: 'g1jmzkgqxm',
                dir: 'RTL',
                sort: 654823,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive has to be a boolean value');
            });
    });
    test('/REST:POST common/lang - Got 400 Conflict, LangDir has to be a enum option of LTR, RTL', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '1df8e886-4f43-4e60-936f-676933c01c65',
                name: 'Refined Wooden Shirt',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: 'p1',
                iso6393: 'vgf',
                ietf: '3yly9',
                customCode: '9q914xdbpc',
                dir: 'XXXX',
                sort: 795384,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangDir has to be any of this options: LTR, RTL');
            });
    });

    test('/REST:POST common/lang - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test('/REST:POST common/langs/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/common/langs/paginate')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toEqual({
                    total   : seeder.collectionResponse.length,
                    count   : seeder.collectionResponse.length,
                    rows    : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
                });
            });
    });

    test('/REST:GET common/langs', () =>
    {
        return request(app.getHttpServer())
            .get('/common/langs')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt'])))
                );
            });
    });

    test('/REST:GET common/lang - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/lang')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5edc9a51-bdea-4cc6-86ab-c020894b31f0'
                    }
                }
            })
            .expect(404);
    });

    test('/REST:POST common/lang', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Practical Metal Table',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: 'qd',
                iso6393: 'ta3',
                ietf: 'mbcjn',
                customCode: 'oejqur6hqw',
                dir: 'LTR',
                sort: 695667,
                isActive: false,
            })
            .expect(201);
    });

    test('/REST:GET common/lang', () =>
    {
        return request(app.getHttpServer())
            .get('/common/lang')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:GET common/lang/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/lang/52e37920-e846-454b-8bc9-ac59287373e4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET common/lang/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/common/lang/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/lang - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '01cf73af-59a4-4578-a920-41f515189d7e',
                name: 'Gorgeous Rubber Tuna',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: 'zo',
                iso6393: '6w9',
                ietf: 'f3y88',
                customCode: '0e61pejaco',
                dir: 'LTR',
                sort: 216300,
                isActive: false,
            })
            .expect(404);
    });

    test('/REST:PUT common/lang', () =>
    {
        return request(app.getHttpServer())
            .put('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Generic Cotton Shirt',
                image: 'http://placeimg.com/640/480/people',
                iso6392: 'hf',
                iso6393: '8nt',
                ietf: '5u8zl',
                customCode: 'y7bpoptno7',
                dir: 'LTR',
                sort: 294489,
                isActive: true,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/lang/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/lang/1b943f23-e682-4913-aece-662021d8789c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE common/lang/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/lang/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL commonCreateLang - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateLangInput!)
                    {
                        commonCreateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.response.message).toContain('already exist in database');
            });
    });

    test('/GraphQL commonPaginateLangs', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        commonPaginateLangs (query:$query constraint:$constraint)
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
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.commonPaginateLangs).toEqual({
                    total   : seeder.collectionResponse.length,
                    count   : seeder.collectionResponse.length,
                    rows    : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
                });
            });
    });

    test('/GraphQL commonGetLangs', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonGetLangs (query:$query)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.commonGetLangs.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL commonCreateLang', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateLangInput!)
                    {
                        commonCreateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Refined Soft Soap',
                        image: 'http://placeimg.com/640/480/people',
                        iso6392: 'a6',
                        iso6393: 'oq3',
                        ietf: 'jo354',
                        customCode: 'roz8tv2kat',
                        dir: 'RTL',
                        sort: 182399,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.commonCreateLang).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindLang - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindLang (query:$query)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
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
                            id: 'a05b0a20-9593-4ebb-84c2-3c81338c77dc'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonFindLang', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindLang (query:$query)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
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
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.commonFindLang.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindLangById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindLangById (id:$id)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'be84addf-39c6-44b3-9f7e-75bbb2ccb97e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonFindLangById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindLangById (id:$id)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.commonFindLangById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateLang - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateLangInput!)
                    {
                        commonUpdateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'ac3a9be4-c5a8-4e34-ad7c-b546cf946c01',
                        name: 'Awesome Soft Shirt',
                        image: 'http://placeimg.com/640/480/cats',
                        iso6392: 'u2',
                        iso6393: '5eo',
                        ietf: 'oel60',
                        customCode: '610g5h7ck2',
                        dir: 'LTR',
                        sort: 640999,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonUpdateLang', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateLangInput!)
                    {
                        commonUpdateLang (payload:$payload)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Incredible Wooden Salad',
                        image: 'http://placeimg.com/640/480/nature',
                        iso6392: 'g2',
                        iso6393: 'b09',
                        ietf: 'bjanc',
                        customCode: '4xbw1mpuka',
                        dir: 'LTR',
                        sort: 574356,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.commonUpdateLang.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonDeleteLangById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteLangById (id:$id)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '763786fb-5d51-40e9-b3e9-2e4e9f8f8c68'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonDeleteLangById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteLangById (id:$id)
                        {
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            customCode
                            dir
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.commonDeleteLangById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});