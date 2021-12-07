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

        app         = module.createNestApplication();
        repository  = module.get<ILangRepository>(ILangRepository);
        seeder      = module.get<MockLangSeeder>(MockLangSeeder);

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST common/lang - Got 400 Conflict, LangId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/lang')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'Sleek Soft Chicken',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: 'j2',
                iso6393: 'jmr',
                ietf: 'u9dxy',
                customCode: 'ikuek5d3he',
                dir: 'RTL',
                sort: 195389,
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
                id: 'b3d32e5a-53b3-415a-af90-243878633de6',
                name: null,
                image: 'http://placeimg.com/640/480/animals',
                iso6392: 'pf',
                iso6393: '5kv',
                ietf: 'homz7',
                customCode: 'cx9unyq5c8',
                dir: 'RTL',
                sort: 740620,
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
                id: '197fd588-c223-4b00-934f-c7b1cdf2e68a',
                name: 'Small Fresh Pizza',
                image: 'http://placeimg.com/640/480/abstract',
                iso6392: null,
                iso6393: '2wc',
                ietf: 'l7wnh',
                customCode: 'x7pbnibg6i',
                dir: 'RTL',
                sort: 199868,
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
                id: 'bd59a53f-ceae-47c3-b9d7-34e8a4b6467e',
                name: 'Rustic Wooden Mouse',
                image: 'http://placeimg.com/640/480/food',
                iso6392: 'z1',
                iso6393: null,
                ietf: 'n1gf9',
                customCode: 'fc1q1ezavv',
                dir: 'RTL',
                sort: 248596,
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
                id: '9813f07e-e971-4d90-86e3-859c7240a103',
                name: 'Generic Granite Chips',
                image: 'http://placeimg.com/640/480/animals',
                iso6392: '6l',
                iso6393: 'llf',
                ietf: null,
                customCode: 'plfj8w25m5',
                dir: 'LTR',
                sort: 475062,
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
                id: '203213f9-6855-4b4a-ae3f-76628035beb9',
                name: 'Practical Plastic Gloves',
                image: 'http://placeimg.com/640/480/abstract',
                iso6392: '0z',
                iso6393: 'h8t',
                ietf: 'w748l',
                customCode: '76eask0mff',
                dir: null,
                sort: 128774,
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
                id: 'cee7df63-f145-4bb5-9a96-b138d3ded3b4',
                name: 'Small Frozen Mouse',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: 'xd',
                iso6393: 't0l',
                ietf: 'e3i8v',
                customCode: 'j2506j8w9o',
                dir: 'RTL',
                sort: 555500,
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
                name: 'Licensed Soft Pizza',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: '0q',
                iso6393: '7vd',
                ietf: 'axfgq',
                customCode: 'mp71sesceb',
                dir: 'LTR',
                sort: 416348,
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
                id: 'afee8bc6-1d25-4ee4-a4f6-0f2dec46b053',
                image: 'http://placeimg.com/640/480/nature',
                iso6392: '17',
                iso6393: '01k',
                ietf: '91l3l',
                customCode: '91ghxwtvg1',
                dir: 'RTL',
                sort: 673945,
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
                id: '5da9a687-9d54-403a-8126-2b9c68941bb2',
                name: 'Unbranded Plastic Towels',
                image: 'http://placeimg.com/640/480/technics',
                iso6393: 'g7v',
                ietf: 'mrlxl',
                customCode: 'b480olbxxh',
                dir: 'LTR',
                sort: 549209,
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
                id: '4ebcbfac-0b40-4df5-b950-48e0936211f3',
                name: 'Sleek Metal Table',
                image: 'http://placeimg.com/640/480/people',
                iso6392: 'kr',
                ietf: '8zmff',
                customCode: 'naj2056k3z',
                dir: 'LTR',
                sort: 182705,
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
                id: 'f54e754a-2130-4428-9433-c739cca408f4',
                name: 'Ergonomic Cotton Gloves',
                image: 'http://placeimg.com/640/480/people',
                iso6392: '0c',
                iso6393: '5g8',
                customCode: 'yx863k0b5h',
                dir: 'LTR',
                sort: 290852,
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
                id: '2e5e796e-8691-41dd-9e1c-a36505533a02',
                name: 'Intelligent Soft Ball',
                image: 'http://placeimg.com/640/480/nightlife',
                iso6392: 'pf',
                iso6393: '5sp',
                ietf: 'gqb6p',
                customCode: 'vuxm0kpgve',
                sort: 977129,
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
                id: '2f644a95-c661-429d-a9db-b0bbbc7309cb',
                name: 'Tasty Cotton Shirt',
                image: 'http://placeimg.com/640/480/food',
                iso6392: 'i6',
                iso6393: '9wn',
                ietf: 'xsy3s',
                customCode: 'rmogbecec7',
                dir: 'RTL',
                sort: 878028,
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
                id: 'b33k3wqxktbclaxgdgmu022f6r6cjs8u7mkte',
                name: 'Handcrafted Fresh Gloves',
                image: 'http://placeimg.com/640/480/nature',
                iso6392: 'u4',
                iso6393: '86a',
                ietf: '6p21x',
                customCode: '87h2bhpqyd',
                dir: 'RTL',
                sort: 771023,
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
                id: '306914a0-765a-49f8-b564-60b8afa07bf8',
                name: 'Tasty Frozen Towels',
                image: 'http://placeimg.com/640/480/fashion',
                iso6392: '6p7',
                iso6393: 'k3d',
                ietf: 'l6mdt',
                customCode: 'sujc5eoq4b',
                dir: 'RTL',
                sort: 886141,
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
                id: 'ddb1f395-f6e2-49b1-9356-48093bb1e642',
                name: 'Sleek Granite Shoes',
                image: 'http://placeimg.com/640/480/animals',
                iso6392: '7d',
                iso6393: '4bov',
                ietf: 'wk32v',
                customCode: 'j8v1dakwm9',
                dir: 'LTR',
                sort: 407633,
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
                id: '5a470d35-7d6a-4858-aa7b-9bbffd174239',
                name: 'Practical Plastic Shirt',
                image: 'http://placeimg.com/640/480/nature',
                iso6392: '51',
                iso6393: '4na',
                ietf: 'mosaw1',
                customCode: 'l0soszx726',
                dir: 'LTR',
                sort: 229705,
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
                id: 'c955ed25-0229-4d00-939e-151f5c8a8fe7',
                name: 'Handmade Soft Shirt',
                image: 'http://placeimg.com/640/480/abstract',
                iso6392: 'fz',
                iso6393: 'ibj',
                ietf: 'ddxp3',
                customCode: 'a8spqml7si4',
                dir: 'LTR',
                sort: 963518,
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
                id: '56a20acc-f4b8-4add-b521-7735a143f8b7',
                name: 'Unbranded Frozen Salad',
                image: 'http://placeimg.com/640/480/cats',
                iso6392: 'rx',
                iso6393: 'nd4',
                ietf: '8fyni',
                customCode: 'qjxq79ylwb',
                dir: 'RTL',
                sort: 7845930,
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
                id: 'f281c69b-6c91-4a81-a385-cdf716854a07',
                name: 'Intelligent Steel Chicken',
                image: 'http://placeimg.com/640/480/city',
                iso6392: 'mw',
                iso6393: 't19',
                ietf: 'boise',
                customCode: 'drg1xhcmsg',
                dir: 'LTR',
                sort: 786954,
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
                id: 'c6a23db5-0173-4175-a2de-cef48b389c0f',
                name: 'Licensed Fresh Table',
                image: 'http://placeimg.com/640/480/abstract',
                iso6392: 'u5',
                iso6393: '51g',
                ietf: 'c751s',
                customCode: 'urqgiqguuu',
                dir: 'XXXX',
                sort: 573812,
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
            .expect({
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test('/REST:GET common/langs', () =>
    {
        return request(app.getHttpServer())
            .get('/common/langs')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(seeder.collectionResponse);
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
                        id: '25a57c24-0d9f-4c6a-8e74-14cc8c22417f'
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
                name: 'Intelligent Concrete Shoes',
                image: 'http://placeimg.com/640/480/fashion',
                iso6392: '7z',
                iso6393: 'kuv',
                ietf: 'g7jpm',
                customCode: 'zjiz2ik04q',
                dir: 'LTR',
                sort: 977306,
                isActive: true,
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
            .get('/common/lang/10bd28ea-d390-4252-8678-f02592b1ac58')
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
                id: '8e6bd680-d3bd-43fa-9919-beeb3c2ce938',
                name: 'Handmade Frozen Chips',
                image: 'http://placeimg.com/640/480/abstract',
                iso6392: 'ld',
                iso6393: 'm6w',
                ietf: 'jdijj',
                customCode: 'ut72xl9r9l',
                dir: 'RTL',
                sort: 273955,
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
                name: 'Tasty Soft Cheese',
                image: 'http://placeimg.com/640/480/nature',
                iso6392: '4g',
                iso6393: '2vf',
                ietf: '6uqlm',
                customCode: 'mluzjbbsos',
                dir: 'LTR',
                sort: 584895,
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
            .delete('/common/lang/bd32ddbd-1b46-4ec6-a572-51cf00da3550')
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
                expect(res.body.data.commonPaginateLangs.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.commonPaginateLangs.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.commonPaginateLangs.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
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
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
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
                        name: 'Incredible Rubber Keyboard',
                        image: 'http://placeimg.com/640/480/business',
                        iso6392: 'kn',
                        iso6393: 'hav',
                        ietf: 'ehksb',
                        customCode: '7vofcss197',
                        dir: 'RTL',
                        sort: 392192,
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
                            id: 'fc3545cc-0384-46bd-a392-57e6f4004b99'
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
                    id: '8f675993-d119-42e7-b3f7-49698762d691'
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
                        id: '51e2e44e-e3d6-4257-a4e6-25bbfce5f314',
                        name: 'Fantastic Steel Cheese',
                        image: 'http://placeimg.com/640/480/business',
                        iso6392: '9k',
                        iso6393: 'vxh',
                        ietf: '3kmq3',
                        customCode: '70i5s4d4gt',
                        dir: 'LTR',
                        sort: 130880,
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
                        name: 'Gorgeous Cotton Hat',
                        image: 'http://placeimg.com/640/480/people',
                        iso6392: 'py',
                        iso6393: 'iqq',
                        ietf: 'h0p1a',
                        customCode: 'ghx5lrnaq9',
                        dir: 'RTL',
                        sort: 932028,
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
                    id: 'eecdf12e-8f17-413c-8ded-198f272e0ec3'
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