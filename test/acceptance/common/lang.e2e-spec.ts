/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ILangRepository } from '../../../../../@apps/common/lang/domain/lang.repository';
import { MockLangSeeder } from '../../../../../@apps/common/lang/infrastructure/mock/mock-lang.seeder';
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
                name: 'Incredible Granite Tuna',
                image: 'http://placeimg.com/640/480/sports',
                iso6392: 'zh',
                iso6393: 'gdr',
                ietf: 'tgy85',
                customCode: 'j091yt4hu5',
                dir: 'LTR',
                sort: 110232,
                isActive: false,
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
                id: '14961979-0a89-4037-8f9d-59cb02d69698',
                name: null,
                image: 'http://placeimg.com/640/480/sports',
                iso6392: 'lx',
                iso6393: 'm0r',
                ietf: '86w9p',
                customCode: '1b6enqyben',
                dir: 'LTR',
                sort: 379365,
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
                id: 'a8d863a8-e2a7-453e-80d6-6fa4b205e029',
                name: 'Sleek Frozen Bike',
                image: 'http://placeimg.com/640/480/city',
                iso6392: null,
                iso6393: 'ndm',
                ietf: 'xz6bx',
                customCode: '5jn6llyz1p',
                dir: 'LTR',
                sort: 996105,
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
                id: '747d93e9-7742-4150-8d28-4c924a2dad36',
                name: 'Tasty Fresh Shirt',
                image: 'http://placeimg.com/640/480/people',
                iso6392: '84',
                iso6393: null,
                ietf: 'j7pl3',
                customCode: 'bwyf1hhckl',
                dir: 'LTR',
                sort: 521105,
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
                id: '9362174a-8d1f-402e-b6d7-e4cadaaac250',
                name: 'Generic Metal Gloves',
                image: 'http://placeimg.com/640/480/people',
                iso6392: 'cr',
                iso6393: 'cwp',
                ietf: null,
                customCode: 'kqoprmhd17',
                dir: 'RTL',
                sort: 568960,
                isActive: false,
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
                id: '8d6e5d79-03dc-4908-a876-9673163459aa',
                name: 'Unbranded Soft Shirt',
                image: 'http://placeimg.com/640/480/business',
                iso6392: 'sk',
                iso6393: 'gtw',
                ietf: 'lsemk',
                customCode: 'k6khozn2kw',
                dir: null,
                sort: 741079,
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
                id: '1be9df7f-5668-4846-8c73-6bfc17a93139',
                name: 'Unbranded Wooden Chicken',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: 'nj',
                iso6393: 'wsu',
                ietf: '40wsn',
                customCode: '98grneemet',
                dir: 'RTL',
                sort: 299706,
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
                name: 'Sleek Wooden Gloves',
                image: 'http://placeimg.com/640/480/business',
                iso6392: '1v',
                iso6393: 'nfg',
                ietf: 'xokvq',
                customCode: '47hih3aqrl',
                dir: 'RTL',
                sort: 678810,
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
                id: '4f8c6da8-9ad5-4072-aa78-e3af0d853ebc',
                image: 'http://placeimg.com/640/480/transport',
                iso6392: 'sy',
                iso6393: 'k36',
                ietf: 'k33cw',
                customCode: 'xzecuz7k4m',
                dir: 'LTR',
                sort: 938758,
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
                id: '83fac8d7-1d6a-4a6e-a78d-aec74f3460f7',
                name: 'Tasty Plastic Towels',
                image: 'http://placeimg.com/640/480/transport',
                iso6393: '6hb',
                ietf: 'tfiec',
                customCode: '48cwvxwn4j',
                dir: 'LTR',
                sort: 650056,
                isActive: true,
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
                id: '6cdc387f-bdf3-4942-9f0a-84500eb44c24',
                name: 'Ergonomic Plastic Bacon',
                image: 'http://placeimg.com/640/480/sports',
                iso6392: '17',
                ietf: 'ma2th',
                customCode: '0mtk36h8xs',
                dir: 'RTL',
                sort: 347329,
                isActive: false,
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
                id: 'f441a0d0-6a6b-47cd-9678-4ca82b85a7c7',
                name: 'Generic Concrete Hat',
                image: 'http://placeimg.com/640/480/nature',
                iso6392: 'ot',
                iso6393: 'rmv',
                customCode: 'h6hkgxone8',
                dir: 'LTR',
                sort: 323174,
                isActive: true,
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
                id: '7df01d11-711b-4beb-a77e-a4d539e57b7c',
                name: 'Fantastic Wooden Cheese',
                image: 'http://placeimg.com/640/480/abstract',
                iso6392: '3a',
                iso6393: 'gt1',
                ietf: 'pgd7g',
                customCode: 'utdjt5mnp1',
                sort: 585792,
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
                id: '136b3c5a-0455-4eb0-9774-54ecac488da9',
                name: 'Handcrafted Rubber Soap',
                image: 'http://placeimg.com/640/480/technics',
                iso6392: 'h3',
                iso6393: 'mn3',
                ietf: '0d6ww',
                customCode: 'tvw3i7cosu',
                dir: 'LTR',
                sort: 987072,
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
                id: '5wz0v6v9aflswahl4lclswevnz3rtpg3dsllx',
                name: 'Rustic Plastic Chips',
                image: 'http://placeimg.com/640/480/animals',
                iso6392: '9i',
                iso6393: 'o43',
                ietf: 'rmbwi',
                customCode: 'mlf4cyo5w2',
                dir: 'RTL',
                sort: 830166,
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
                id: '0a4da722-5b9e-4e0b-a906-6dfa40ae5fe8',
                name: 'Handcrafted Frozen Car',
                image: 'http://placeimg.com/640/480/food',
                iso6392: '5jn',
                iso6393: 'e0n',
                ietf: 'znr02',
                customCode: 'cd9drbnlvi',
                dir: 'RTL',
                sort: 192557,
                isActive: true,
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
                id: '025ba790-d502-4761-b52a-eda267b95b3d',
                name: 'Awesome Wooden Computer',
                image: 'http://placeimg.com/640/480/business',
                iso6392: 'tk',
                iso6393: 'g691',
                ietf: 'o1e4q',
                customCode: 'd8wghlnt5x',
                dir: 'LTR',
                sort: 344999,
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
                id: '55b479cb-5f92-42c5-9018-d8f1ede17ffb',
                name: 'Small Rubber Computer',
                image: 'http://placeimg.com/640/480/fashion',
                iso6392: 'my',
                iso6393: '0xe',
                ietf: '0zx1zd',
                customCode: '7vv5nrpb2b',
                dir: 'RTL',
                sort: 313600,
                isActive: false,
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
                id: '4fe8e751-01c7-426f-b615-d7ff9f9c68c4',
                name: 'Incredible Wooden Cheese',
                image: 'http://placeimg.com/640/480/city',
                iso6392: 'qj',
                iso6393: 'el2',
                ietf: 'xwt44',
                customCode: 'isql9c2e3qo',
                dir: 'RTL',
                sort: 160746,
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
                id: '2a73080f-eb76-47a7-9fc1-31efc7f34b5d',
                name: 'Ergonomic Soft Shirt',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: '6l',
                iso6393: '0c6',
                ietf: 'f0kvg',
                customCode: '98dmg04a3c',
                dir: 'RTL',
                sort: 3376231,
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
                id: 'bfa3e49e-0a12-42d2-86af-e8a4e9be2fab',
                name: 'Handmade Frozen Ball',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: 'a5',
                iso6393: 'jcc',
                ietf: 'zdjbm',
                customCode: '1nof7c8sw4',
                dir: 'LTR',
                sort: 709897,
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
                id: 'd4e84426-17e3-43a7-aa9c-1604b70bc7cc',
                name: 'Rustic Frozen Cheese',
                image: 'http://placeimg.com/640/480/sports',
                iso6392: '9n',
                iso6393: 'bsj',
                ietf: '4mx0c',
                customCode: 'jrbsnocrp1',
                dir: 'XXXX',
                sort: 694283,
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
                        id: 'bb4698a4-52b0-4a36-b28b-fc5e2c2626d6'
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
                name: 'Gorgeous Metal Keyboard',
                image: 'http://placeimg.com/640/480/transport',
                iso6392: 'iu',
                iso6393: 'mzg',
                ietf: 'dn4q5',
                customCode: 'kdb029o1fs',
                dir: 'LTR',
                sort: 682319,
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
            .get('/common/lang/72286be3-3bc4-4119-b55e-fa40482580c3')
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
                id: '4481ec1b-1a9e-49e9-8469-f44977623afb',
                name: 'Handmade Steel Chair',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: 'm1',
                iso6393: 'zum',
                ietf: 'gm1pi',
                customCode: '72zu4shjsu',
                dir: 'RTL',
                sort: 592922,
                isActive: true,
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
                name: 'Intelligent Soft Cheese',
                image: 'http://placeimg.com/640/480/people',
                iso6392: 'mi',
                iso6393: '7j7',
                ietf: 'dnl2b',
                customCode: 'kgprwal92f',
                dir: 'LTR',
                sort: 894073,
                isActive: false,
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/lang/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/lang/a61588e5-99cb-4cf2-8475-00adc63462e8')
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
                        name: 'Fantastic Frozen Sausages',
                        image: 'http://placeimg.com/640/480/fashion',
                        iso6392: 'g3',
                        iso6393: '18r',
                        ietf: 'ooi8q',
                        customCode: 'lc61brlcsz',
                        dir: 'RTL',
                        sort: 592347,
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
                            id: '177254aa-98f6-403e-9a57-cf5d7449bac8'
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
                    id: '1cfd71dc-5b37-4ed6-97d8-8e61e93933ad'
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
                        id: '32a15f8b-3dee-4d6a-b18b-adb6ab77ec6f',
                        name: 'Licensed Fresh Chair',
                        image: 'http://placeimg.com/640/480/nature',
                        iso6392: 'gc',
                        iso6393: 'rxw',
                        ietf: 'i28bj',
                        customCode: 'aj55snlyff',
                        dir: 'LTR',
                        sort: 810752,
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
                        name: 'Handcrafted Soft Chicken',
                        image: 'http://placeimg.com/640/480/nightlife',
                        iso6392: 'iv',
                        iso6393: 'qbe',
                        ietf: 'bw039',
                        customCode: 'ige00jrjx5',
                        dir: 'RTL',
                        sort: 993707,
                        isActive: true,
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
                    id: '0163e659-5f6a-40ec-b697-efb2121ce01c'
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