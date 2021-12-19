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
                name: 'Licensed Steel Tuna',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: 'm9',
                iso6393: '2pu',
                ietf: 'mk1ev',
                customCode: 'g59ovw8fuz',
                dir: 'LTR',
                sort: 535635,
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
                id: '240e3a98-fbfb-4ce5-a4ab-f56c77f9bc76',
                name: null,
                image: 'http://placeimg.com/640/480/food',
                iso6392: 'cy',
                iso6393: 'tgi',
                ietf: 'eqvqf',
                customCode: 'vo4c90310q',
                dir: 'LTR',
                sort: 335200,
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
                id: '8e54789c-5552-42ae-b78f-110a3d520858',
                name: 'Awesome Granite Keyboard',
                image: 'http://placeimg.com/640/480/nature',
                iso6392: null,
                iso6393: '7nr',
                ietf: 'cni4r',
                customCode: 'vru1jhx823',
                dir: 'LTR',
                sort: 290629,
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
                id: 'e6ac2727-924c-4769-a547-8c6a21416a90',
                name: 'Tasty Frozen Gloves',
                image: 'http://placeimg.com/640/480/fashion',
                iso6392: 'z5',
                iso6393: null,
                ietf: 'k4n71',
                customCode: 'vjscboa4rc',
                dir: 'RTL',
                sort: 531509,
                isActive: true,
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
                id: '775bf449-76b2-4ae9-97b0-7f9853075038',
                name: 'Handcrafted Fresh Bacon',
                image: 'http://placeimg.com/640/480/sports',
                iso6392: '9w',
                iso6393: 'osh',
                ietf: null,
                customCode: 'rkty80yqx5',
                dir: 'LTR',
                sort: 542944,
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
                id: '56a0c73e-4a0f-4977-9659-cb219416348f',
                name: 'Unbranded Concrete Fish',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: '9k',
                iso6393: 'glh',
                ietf: 'bcevg',
                customCode: '6c7zrft8yn',
                dir: null,
                sort: 129553,
                isActive: false,
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
                id: '4c193986-0c60-4f9f-aea9-0a91c5a4f9bc',
                name: 'Rustic Frozen Hat',
                image: 'http://placeimg.com/640/480/food',
                iso6392: '9s',
                iso6393: 'gb2',
                ietf: '41xb0',
                customCode: 'okslipjfuv',
                dir: 'LTR',
                sort: 316424,
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
                name: 'Awesome Concrete Salad',
                image: 'http://placeimg.com/640/480/sports',
                iso6392: 'db',
                iso6393: '6sq',
                ietf: 'rn1hj',
                customCode: '6fluowbrid',
                dir: 'LTR',
                sort: 299082,
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
                id: '3fda444d-0f57-421b-b595-ffcf3fa0e118',
                image: 'http://placeimg.com/640/480/fashion',
                iso6392: '21',
                iso6393: '5y9',
                ietf: 'zfts9',
                customCode: 'qbd9koixh9',
                dir: 'RTL',
                sort: 362960,
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
                id: 'b5e385f6-6804-44e0-95c2-473c660f6c74',
                name: 'Generic Concrete Sausages',
                image: 'http://placeimg.com/640/480/animals',
                iso6393: 'jjb',
                ietf: 'pmemo',
                customCode: '4gyjwojol3',
                dir: 'RTL',
                sort: 260841,
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
                id: '226e33af-4141-4392-b057-931c31f4de12',
                name: 'Sleek Wooden Towels',
                image: 'http://placeimg.com/640/480/people',
                iso6392: 'mp',
                ietf: 'no6ta',
                customCode: '6a718065w7',
                dir: 'RTL',
                sort: 282269,
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
                id: 'b386b509-8844-4bb6-b2dd-6dc223ab65fe',
                name: 'Small Wooden Keyboard',
                image: 'http://placeimg.com/640/480/business',
                iso6392: '0p',
                iso6393: '67l',
                customCode: '91maxqkd3o',
                dir: 'LTR',
                sort: 305977,
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
                id: '2002cd8b-bd6e-403f-b050-fc3b3059ac95',
                name: 'Unbranded Concrete Chair',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: 'l9',
                iso6393: 'qic',
                ietf: 'p6mi6',
                customCode: 'rreesl35mw',
                sort: 154182,
                isActive: false,
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
                id: '1cd06f3e-1be3-41cc-adc8-bb040e5eb7a3',
                name: 'Unbranded Concrete Tuna',
                image: 'http://placeimg.com/640/480/transport',
                iso6392: 're',
                iso6393: 'ef7',
                ietf: 'jrdgo',
                customCode: '8avz829fkx',
                dir: 'LTR',
                sort: 682829,
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
                id: 'c77iffarjnh96e6foruuc4w63r62cquo3yv9w',
                name: 'Intelligent Plastic Shirt',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: 'ly',
                iso6393: '02s',
                ietf: 'hfb4m',
                customCode: 'vbtp0gdxpc',
                dir: 'LTR',
                sort: 244278,
                isActive: false,
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
                id: 'd6f27415-b561-4331-97c3-7ba2905d69d5',
                name: 'Ergonomic Soft Mouse',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: 'tsr',
                iso6393: 'mlq',
                ietf: 'f8fdm',
                customCode: 'pfguluf5jc',
                dir: 'RTL',
                sort: 699758,
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
                id: '0a448777-8a07-4908-82df-a5fdfb3aeba3',
                name: 'Gorgeous Rubber Salad',
                image: 'http://placeimg.com/640/480/transport',
                iso6392: 'wn',
                iso6393: '9wke',
                ietf: '93owk',
                customCode: 'm2mspmsngh',
                dir: 'RTL',
                sort: 532885,
                isActive: false,
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
                id: '8738d23b-407b-4e0f-87ca-9de2c9092584',
                name: 'Fantastic Cotton Pants',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: 'f5',
                iso6393: '0yy',
                ietf: 'hi68cp',
                customCode: 's2qmtfab21',
                dir: 'RTL',
                sort: 137533,
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
                id: 'e0c3bc0d-6881-4450-8b45-8bd6ddc0a24d',
                name: 'Licensed Cotton Shoes',
                image: 'http://placeimg.com/640/480/sports',
                iso6392: 'gx',
                iso6393: 'p2e',
                ietf: 'vplt6',
                customCode: 'y253apl8puo',
                dir: 'LTR',
                sort: 708707,
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
                id: '27dcef9c-ea5c-438a-853b-61c5b6aca75b',
                name: 'Tasty Soft Ball',
                image: 'http://placeimg.com/640/480/nature',
                iso6392: 'sh',
                iso6393: 'weg',
                ietf: 'oefzs',
                customCode: 'yq6189vb1l',
                dir: 'LTR',
                sort: 9975907,
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
                id: '60d476fb-940d-41c9-a46c-203c90778b6c',
                name: 'Rustic Soft Keyboard',
                image: 'http://placeimg.com/640/480/people',
                iso6392: 'ez',
                iso6393: 'jui',
                ietf: 'o32vg',
                customCode: 'j5pakfwiqf',
                dir: 'LTR',
                sort: 659910,
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
                id: '8099ba3e-0cf1-4d8a-bd43-756eb5370068',
                name: 'Sleek Wooden Salad',
                image: 'http://placeimg.com/640/480/fashion',
                iso6392: 'vq',
                iso6393: 'd2i',
                ietf: 'yawap',
                customCode: '9sopai6tso',
                dir: 'XXXX',
                sort: 587655,
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
                        id: '5dd0c35c-fb5e-406c-9a80-91e47a8f5e27'
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
                name: 'Gorgeous Wooden Soap',
                image: 'http://placeimg.com/640/480/technics',
                iso6392: '05',
                iso6393: 'up2',
                ietf: 'nsfs8',
                customCode: '69xaflggi7',
                dir: 'LTR',
                sort: 930771,
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
            .get('/common/lang/70a3f462-53a0-4e59-8714-13de5c279b97')
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
                id: '3c181042-b190-4ad4-b02a-9fa0af449dfb',
                name: 'Gorgeous Granite Fish',
                image: 'http://placeimg.com/640/480/animals',
                iso6392: 'd7',
                iso6393: 'fwm',
                ietf: 's2qyr',
                customCode: 'fl4oyrllxt',
                dir: 'LTR',
                sort: 419896,
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
                name: 'Incredible Soft Gloves',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: 'vd',
                iso6393: 'jy3',
                ietf: 'dpd3b',
                customCode: '07ho6fgk8v',
                dir: 'RTL',
                sort: 162937,
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
            .delete('/common/lang/1f9ae584-4776-454e-9bb8-dfdd4b03059d')
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
                        name: 'Small Fresh Sausages',
                        image: 'http://placeimg.com/640/480/business',
                        iso6392: 'bg',
                        iso6393: 'tlj',
                        ietf: 't3gxn',
                        customCode: 'yfccqj2nf7',
                        dir: 'RTL',
                        sort: 154113,
                        isActive: false,
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
                            id: '19bed9ad-cd21-433c-b81a-a715efbd7a44'
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
                    id: 'd2bca24a-79dc-485a-935d-28f58c8ba54a'
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
                        id: 'e7bed69e-1812-46b3-9c6f-61eae21da262',
                        name: 'Refined Fresh Towels',
                        image: 'http://placeimg.com/640/480/abstract',
                        iso6392: 'kz',
                        iso6393: '69e',
                        ietf: 'c4u4r',
                        customCode: '4g9onexspo',
                        dir: 'LTR',
                        sort: 651189,
                        isActive: true,
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
                        name: 'Awesome Fresh Shoes',
                        image: 'http://placeimg.com/640/480/business',
                        iso6392: 'j6',
                        iso6393: 'aka',
                        ietf: 'ypl0g',
                        customCode: '09zzkop2jb',
                        dir: 'RTL',
                        sort: 704557,
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
                    id: '54104c2a-17dc-44b5-bfee-6b14768cd0a9'
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