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
                name: 'Licensed Granite Car',
                image: 'http://placeimg.com/640/480/sports',
                iso6392: 'vz',
                iso6393: 'v1j',
                ietf: '0ntrh',
                customCode: 'seybdsigtu',
                dir: 'RTL',
                sort: 675888,
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
                id: '6471ea25-a077-4aaa-a1ae-a0165be4a173',
                name: null,
                image: 'http://placeimg.com/640/480/business',
                iso6392: 'ei',
                iso6393: '0so',
                ietf: '1548c',
                customCode: 'k53wk3hpft',
                dir: 'LTR',
                sort: 996010,
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
                id: '4a522b5b-6d98-41f9-8661-8cc5999f02f1',
                name: 'Unbranded Wooden Car',
                image: 'http://placeimg.com/640/480/animals',
                iso6392: null,
                iso6393: 'le2',
                ietf: 'i97mp',
                customCode: 'iqfx07p1jc',
                dir: 'RTL',
                sort: 218207,
                isActive: true,
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
                id: '91ea7397-3a32-42fd-9c56-4d9a8c371db6',
                name: 'Fantastic Plastic Towels',
                image: 'http://placeimg.com/640/480/transport',
                iso6392: '37',
                iso6393: null,
                ietf: 'ihuh6',
                customCode: 'bfhnoj6h92',
                dir: 'LTR',
                sort: 576721,
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
                id: 'bb88d87a-6274-4ec6-8c49-18a89b9f22f0',
                name: 'Ergonomic Fresh Ball',
                image: 'http://placeimg.com/640/480/animals',
                iso6392: '9u',
                iso6393: '3vu',
                ietf: null,
                customCode: 'dze7ea3jc5',
                dir: 'LTR',
                sort: 524837,
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
                id: 'a9697e77-8f51-4d39-93f0-26d1a1c07b2c',
                name: 'Sleek Rubber Table',
                image: 'http://placeimg.com/640/480/abstract',
                iso6392: 'g2',
                iso6393: 'uih',
                ietf: 'mza44',
                customCode: 'xhnchkihw0',
                dir: null,
                sort: 590290,
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
                id: '482de57e-2bfe-410d-bf2f-ccfbddb63645',
                name: 'Licensed Soft Chips',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: 'dz',
                iso6393: 'wpo',
                ietf: '2vcfk',
                customCode: 'ubih9hvel1',
                dir: 'RTL',
                sort: 222811,
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
                name: 'Sleek Metal Gloves',
                image: 'http://placeimg.com/640/480/fashion',
                iso6392: 'dr',
                iso6393: 'wug',
                ietf: 'q752e',
                customCode: '4t7ormvrae',
                dir: 'LTR',
                sort: 186064,
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
                id: 'e11099c1-0048-4dd1-81d5-4c5257e7b4fb',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: '6j',
                iso6393: 'v16',
                ietf: 'pdjxw',
                customCode: 'ejtivk1b3y',
                dir: 'RTL',
                sort: 532337,
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
                id: '37599d44-de89-4bd5-b312-a33315354ccb',
                name: 'Generic Plastic Salad',
                image: 'http://placeimg.com/640/480/food',
                iso6393: 'e0s',
                ietf: 'n5hiw',
                customCode: 'jedg84fftv',
                dir: 'LTR',
                sort: 758479,
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
                id: '4a820f6b-c586-4bf2-a080-11f1de26395e',
                name: 'Handmade Concrete Tuna',
                image: 'http://placeimg.com/640/480/nature',
                iso6392: '4u',
                ietf: 'p8hep',
                customCode: 'g9lcr7qdnr',
                dir: 'RTL',
                sort: 605917,
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
                id: '16fcf7c9-3cab-46d8-9810-50db72c49e96',
                name: 'Handmade Soft Cheese',
                image: 'http://placeimg.com/640/480/food',
                iso6392: 'km',
                iso6393: 'jno',
                customCode: 'agkhx51xr4',
                dir: 'LTR',
                sort: 233045,
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
                id: 'b83ffaf6-b937-4893-b548-8f42a62dc794',
                name: 'Unbranded Plastic Keyboard',
                image: 'http://placeimg.com/640/480/animals',
                iso6392: '7q',
                iso6393: 'klx',
                ietf: 'xl9vp',
                customCode: 'j89hk45ksm',
                sort: 290860,
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
                id: '5a616f76-70d7-4a4c-8cee-b7cc43cb725b',
                name: 'Rustic Frozen Salad',
                image: 'http://placeimg.com/640/480/technics',
                iso6392: '8x',
                iso6393: '3dp',
                ietf: 'mmlyo',
                customCode: '7pjk5v9cpk',
                dir: 'RTL',
                sort: 121038,
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
                id: 'keyndjyy4nl1q6oqfbpkotm5zxvs6shvdlgl4',
                name: 'Sleek Wooden Sausages',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: '7e',
                iso6393: '1zy',
                ietf: 'oxvcg',
                customCode: 't0408opb8w',
                dir: 'RTL',
                sort: 562029,
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
                id: '5eb05822-2425-4aa2-8eb5-e9d950aa4ef1',
                name: 'Incredible Fresh Pizza',
                image: 'http://placeimg.com/640/480/abstract',
                iso6392: 'xmi',
                iso6393: 'hkp',
                ietf: '26nje',
                customCode: 'tlr9znxfs2',
                dir: 'RTL',
                sort: 588649,
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
                id: '0f171da4-8d8d-48ef-8947-b841a2bc20d6',
                name: 'Small Wooden Pants',
                image: 'http://placeimg.com/640/480/people',
                iso6392: 'i9',
                iso6393: 'hv64',
                ietf: 'x6h9e',
                customCode: 'pxco3a12gf',
                dir: 'LTR',
                sort: 118542,
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
                id: '9d230d66-f6d6-42b9-a80d-cbf50b0c9052',
                name: 'Unbranded Rubber Mouse',
                image: 'http://placeimg.com/640/480/technics',
                iso6392: '78',
                iso6393: 'lbw',
                ietf: '6yvz9g',
                customCode: 'saznrgojg6',
                dir: 'LTR',
                sort: 660799,
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
                id: '76c07924-faa0-4e13-8640-ae3bfed0cb64',
                name: 'Awesome Frozen Car',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: 'rn',
                iso6393: 'zwr',
                ietf: 'wicom',
                customCode: '6oh9zjzf3nw',
                dir: 'LTR',
                sort: 932691,
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
                id: '56009311-58b4-4ab5-b8f3-7272e548a987',
                name: 'Small Cotton Pizza',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: 'yx',
                iso6393: 'z3o',
                ietf: 'gcggy',
                customCode: 'lcs24qdcal',
                dir: 'LTR',
                sort: 1132965,
                isActive: true,
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
                id: 'bfb0c05b-9cd7-4381-8d6c-feb8afccd870',
                name: 'Intelligent Steel Mouse',
                image: 'http://placeimg.com/640/480/animals',
                iso6392: 'm3',
                iso6393: '95v',
                ietf: 'uxxev',
                customCode: 'nexwoc9r56',
                dir: 'LTR',
                sort: 159105,
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
                id: 'b0a34cb3-6ae4-45cb-9d6e-df7e8c20389e',
                name: 'Incredible Fresh Keyboard',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: 'n4',
                iso6393: '8iu',
                ietf: 'huvyw',
                customCode: '0yrphpjjyb',
                dir: 'XXXX',
                sort: 337063,
                isActive: false,
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
                        id: '495484e9-f54e-40ac-9a76-802b34510915'
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
                name: 'Intelligent Wooden Computer',
                image: 'http://placeimg.com/640/480/animals',
                iso6392: '5o',
                iso6393: '3q6',
                ietf: '5osli',
                customCode: 'b2xyi6d2b3',
                dir: 'LTR',
                sort: 428605,
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
            .get('/common/lang/450e20e7-3842-4504-83c6-8db9a02fcd5c')
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
                id: '10ba5834-7ada-4ade-b412-d3dc6c182b4a',
                name: 'Ergonomic Rubber Pizza',
                image: 'http://placeimg.com/640/480/business',
                iso6392: 'va',
                iso6393: 'dou',
                ietf: 'jqs5b',
                customCode: 'zk24cje6ta',
                dir: 'RTL',
                sort: 440809,
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
                name: 'Fantastic Steel Fish',
                image: 'http://placeimg.com/640/480/fashion',
                iso6392: '75',
                iso6393: 'ajf',
                ietf: 'vo646',
                customCode: 'zfq91eiwns',
                dir: 'LTR',
                sort: 392098,
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
            .delete('/common/lang/b7457c64-06da-4bdc-bc69-bcf6ec510f52')
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
                        name: 'Generic Rubber Chicken',
                        image: 'http://placeimg.com/640/480/sports',
                        iso6392: 'm9',
                        iso6393: 'fup',
                        ietf: 'fjke8',
                        customCode: 'oygnjvwjqx',
                        dir: 'RTL',
                        sort: 443371,
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
                            id: '233efdc8-e686-497b-abf5-a4e9bcb31c1d'
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
                    id: '2cd8b400-b214-4018-94ac-e95c2bc7557a'
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
                        id: '974ce49a-46d7-4ea9-834e-2c67ee5ae266',
                        name: 'Gorgeous Cotton Pants',
                        image: 'http://placeimg.com/640/480/technics',
                        iso6392: '1e',
                        iso6393: 'obm',
                        ietf: 'beola',
                        customCode: 'wmgte7kzyh',
                        dir: 'LTR',
                        sort: 424622,
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
                        name: 'Unbranded Soft Keyboard',
                        image: 'http://placeimg.com/640/480/nature',
                        iso6392: 'wj',
                        iso6393: 'wee',
                        ietf: '1aueo',
                        customCode: '3c77p5v33h',
                        dir: 'LTR',
                        sort: 489478,
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
                    id: 'edb0d7ec-f177-4432-9c85-c904ed5e3060'
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