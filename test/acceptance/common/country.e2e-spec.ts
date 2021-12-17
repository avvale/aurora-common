/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '../../../../../@apps/common/country/domain/country.repository';
import { ICountryI18NRepository } from '../../../../../@apps/common/country/domain/country-i18n.repository';
import { AddI18NConstraintService } from 'aurora-ts-core';
import { MockCountrySeeder } from '../../../../../@apps/common/country/infrastructure/mock/mock-country.seeder';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { CommonModule } from '@api/common/common.module';
import * as request from 'supertest';
import * as _ from 'lodash';


const importForeignModules = [];

describe('country', () =>
{
    let app: INestApplication;
    let repository: ICountryRepository;
    let repositoryI18N: ICountryI18NRepository;
    let seeder: MockCountrySeeder;

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
                MockCountrySeeder,
            ]
        })
            .overrideProvider(AddI18NConstraintService)
            .useValue({
                main: () =>
                    ({
                        include: [{
                            association: 'countryI18N',
                            required   : true,
                            where      : { langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a' }
                        }]
                    })
            })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<ICountryRepository>(ICountryRepository);
        repositoryI18N  = module.get<ICountryI18NRepository>(ICountryI18NRepository);
        seeder          = module.get<MockCountrySeeder>(MockCountrySeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource.filter((item, index, self) => index === self.findIndex(t => t.id.value === item.id.value)));
        await repositoryI18N.insert(seeder.collectionSource, {}, aggregate => aggregate.toI18nDTO());

        await app.init();
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: null,
                iso3166Alpha2: 'dw',
                iso3166Alpha3: 'h1m',
                iso3166Numeric: 'lae',
                customCode: 'h7i3fcoccl',
                prefix: 'vk548',
                image: 'http://placeimg.com/640/480/food',
                sort: 276750,
                administrativeAreas: { "foo" : "bar" },
                latitude: 63502273628779540,
                longitude: 95086025129090980,
                zoom: 25,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Granite Hat',
                slug: 'in-est-alias',
                administrativeAreaLevel1: 'f02di5m6ykb9os0xalht28elu2kcpavayp06mqu14hr6ewblwb',
                administrativeAreaLevel2: '8l65i227u7hzyl1nw0xpws9075tqitb1lh31bvx2crt6swxzod',
                administrativeAreaLevel3: 'omxg2obwto6w7299s2a85gtqlywqw9b15j18580q5dml00z6aq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'b0b1b2b5-5d06-43cd-8ace-1cf9db316a85',
                iso3166Alpha2: null,
                iso3166Alpha3: 'r5e',
                iso3166Numeric: 'gpo',
                customCode: 'n92asoj1aj',
                prefix: 'y22xm',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 248813,
                administrativeAreas: { "foo" : "bar" },
                latitude: 87043180196330940,
                longitude: 61470919231861590,
                zoom: 82,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Rubber Table',
                slug: 'totam-ut-perferendis',
                administrativeAreaLevel1: '4m7zgzbpi7901joqvpaiuuv06gcuucfpychzhoio2z6uwg0ngv',
                administrativeAreaLevel2: '10yo9dtcz86rb78maa14gdohe63i69cqo6nes2a472ovxlny9x',
                administrativeAreaLevel3: 'rgk2r6v0jh2jmq1xv5urf0f43it0gpgwmhixld2iy8oohf8o8h',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a35b6a80-3409-43ec-9fab-c58c073af479',
                iso3166Alpha2: 'vq',
                iso3166Alpha3: null,
                iso3166Numeric: 'iw3',
                customCode: 'pan8l49qai',
                prefix: 'sdzhq',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 801193,
                administrativeAreas: { "foo" : "bar" },
                latitude: 53208214106989970,
                longitude: 96698547171210420,
                zoom: 33,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Concrete Salad',
                slug: 'quam-corrupti-voluptatum',
                administrativeAreaLevel1: 'p8idlz4pqa8xhthqhj39kqisg98whurndievx140wzgdsm1clh',
                administrativeAreaLevel2: '466fyerk3c01am8x68ivkn3i9vr5mx8wtt7xzpl515welqwm87',
                administrativeAreaLevel3: 'rx20tdjhewrcg8glqknuqq462tdwqkhlbg8wj4n7vyg5ca5txx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Numeric property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'eb3cc346-529d-4953-be13-63eca8913673',
                iso3166Alpha2: 'h7',
                iso3166Alpha3: '8rb',
                iso3166Numeric: null,
                customCode: '5xi9thk3hr',
                prefix: 'l7ohn',
                image: 'http://placeimg.com/640/480/people',
                sort: 282860,
                administrativeAreas: { "foo" : "bar" },
                latitude: 71738785062346510,
                longitude: 27726318806322040,
                zoom: 94,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Steel Chair',
                slug: 'modi-exercitationem-velit',
                administrativeAreaLevel1: 'atgksc3zecaxw0rv20r7w2a8xxp48mke39cemk8ety28d5qsso',
                administrativeAreaLevel2: '09wedwh6vwnhty4qywo6wvdrqb0n91q5em203n9coyitln0s9v',
                administrativeAreaLevel3: 'y8wvc645ryebqcmcysx8xw4b2tzloqjlhscz9h82vgdfegb9tl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NLangId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'e649598c-e770-42ea-a769-7292ef74cb5f',
                iso3166Alpha2: 'cx',
                iso3166Alpha3: 'n0s',
                iso3166Numeric: '27z',
                customCode: 'b2esibhvgz',
                prefix: 'aa977',
                image: 'http://placeimg.com/640/480/nature',
                sort: 589538,
                administrativeAreas: { "foo" : "bar" },
                latitude: 31447000695121396,
                longitude: 91046950623536480,
                zoom: 29,
                langId: null,
                name: 'Practical Wooden Chair',
                slug: 'eius-earum-labore',
                administrativeAreaLevel1: '9ppwoc026nc3nnqmoyt43c6er27v5jlsbevejn4cclrryueir2',
                administrativeAreaLevel2: 'wbd6qrr0vvq3cy2tw3v3l97rxspq1yptx7wv74e0auqe8ldxcu',
                administrativeAreaLevel3: 'mb0otzfg10bvfpmqb2r9ggl89f2ej3map6z2bxp4shm4f1la9m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryI18NLangId must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'e2eba4e4-0432-4ff2-8217-bd2210e41c57',
                iso3166Alpha2: 'pe',
                iso3166Alpha3: 'j92',
                iso3166Numeric: 'hah',
                customCode: '3p4lziwzz3',
                prefix: 'okva5',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 825635,
                administrativeAreas: { "foo" : "bar" },
                latitude: 95562607260481380,
                longitude: 30291458564785880,
                zoom: 29,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: null,
                slug: 'officia-laborum-adipisci',
                administrativeAreaLevel1: '24loj9kqh52ho0unhlgmehqqovo40stdgglz883up65l1hgy0f',
                administrativeAreaLevel2: 'vsa1m1br78tvn0ku4ict8gqwfec9g26uzug6ai40kf8upxeubk',
                administrativeAreaLevel3: '5kosq3kbea4oyrr4x1upe2lzkduqyrql3w53anw6w67y2fp45a',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryI18NName must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NSlug property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '9d7ce61e-36c1-44dc-a7de-a7d628f51f3a',
                iso3166Alpha2: '1z',
                iso3166Alpha3: 'xdc',
                iso3166Numeric: '6nj',
                customCode: '9ms0c4h9bv',
                prefix: 'ylpsw',
                image: 'http://placeimg.com/640/480/nature',
                sort: 761554,
                administrativeAreas: { "foo" : "bar" },
                latitude: 32451695609346904,
                longitude: 93092704922823380,
                zoom: 74,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Concrete Cheese',
                slug: null,
                administrativeAreaLevel1: 'ysfjv7xftw56j5dl2qtp384ed7i7i94r82y37ilyk59kru2dsr',
                administrativeAreaLevel2: 'w43ybizs02qz13kvdjxzwek12tplszfpmvw3om7krkuufkitl6',
                administrativeAreaLevel3: 'rh7tf3arjyyuat5nf37djf5ijw04byvg3zc7ajano73yvzofey',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryI18NSlug must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                iso3166Alpha2: 'cu',
                iso3166Alpha3: 'mja',
                iso3166Numeric: 'nu3',
                customCode: 'wzb7hzp9oe',
                prefix: 'zpp2e',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 922903,
                administrativeAreas: { "foo" : "bar" },
                latitude: 73893093067623460,
                longitude: 58323319618881150,
                zoom: 54,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Cotton Bike',
                slug: 'ut-ratione-dicta',
                administrativeAreaLevel1: 'ih0devk8ytxuf5991nb0kusf6w4fq406wdoa0qlwivfsc1x25y',
                administrativeAreaLevel2: 'szofz8rtolxawpoo1cy27l2dp7ko316r9me0t8czem0y1hmj6g',
                administrativeAreaLevel3: 'hlzd3hgv0ko8p51yuaa372owmrygta44mjutj7yf473blck0r5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '4a5a7611-7cfa-4c72-8e41-f21feb632b67',
                iso3166Alpha3: 'n16',
                iso3166Numeric: 'u2y',
                customCode: 'xsp15op52o',
                prefix: 'm4suq',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 608076,
                administrativeAreas: { "foo" : "bar" },
                latitude: 99999314146268910,
                longitude: 63014354441349190,
                zoom: 24,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Fresh Chicken',
                slug: 'aut-aut-mollitia',
                administrativeAreaLevel1: 'luqzt9kwsz8zgbv17oyk9orc8gdi4fcrz1wcevc3i57luh6oi7',
                administrativeAreaLevel2: 'wl8sutcdsly5miwgfio443r9ueqtfugvawxjlbmdiqm7852nh0',
                administrativeAreaLevel3: 'ayiuj3j2xtb1u7tzoneb1fcprcm4b8an090x184jus4e5pfwu4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '1f8e756c-eab6-4398-9351-918e9bef5fe5',
                iso3166Alpha2: '3z',
                iso3166Numeric: '043',
                customCode: 'j5bjjccepd',
                prefix: 'vq3wp',
                image: 'http://placeimg.com/640/480/city',
                sort: 930367,
                administrativeAreas: { "foo" : "bar" },
                latitude: 44410967702676220,
                longitude: 93172634147996450,
                zoom: 30,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Frozen Cheese',
                slug: 'debitis-aliquid-ullam',
                administrativeAreaLevel1: 'c0din4ifemwlq3ou8vs1citqqvmky7sc111dqo5w896n1if9bu',
                administrativeAreaLevel2: '25cezp099odfwi6i0nd1phx53ftekth7gd5ist94x0ntob76j2',
                administrativeAreaLevel3: 'ydlldrrcgplqwcsdaclniejfmuaj6wcbm9zvgo6idr11g1e3qh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Numeric property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'cd534973-973a-46b7-8b6d-1731e268ac07',
                iso3166Alpha2: 'so',
                iso3166Alpha3: '69h',
                customCode: 'k0880wa0j6',
                prefix: 'xkrwh',
                image: 'http://placeimg.com/640/480/food',
                sort: 134098,
                administrativeAreas: { "foo" : "bar" },
                latitude: 29848851435032372,
                longitude: 85167554636989900,
                zoom: 95,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Rubber Pants',
                slug: 'enim-sit-doloremque',
                administrativeAreaLevel1: 'tcm4zfqjxakexohwgzrshcaktktg7newvazlt6tjx76ueseiiv',
                administrativeAreaLevel2: '68a7d498w6msneco11jrsft48pr7fmn1f1c0cd83b0nmsyzbo2',
                administrativeAreaLevel3: 'njlca8t9h88zwxi31ptsuf0qfy3p5x5lmxdm235xet2n29os1f',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NLangId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'bd3c99a5-3118-497e-9f5b-dacb5b11e2cb',
                iso3166Alpha2: '0e',
                iso3166Alpha3: 'mec',
                iso3166Numeric: 'awa',
                customCode: '5m04gefi4b',
                prefix: 'd2u32',
                image: 'http://placeimg.com/640/480/animals',
                sort: 931021,
                administrativeAreas: { "foo" : "bar" },
                latitude: 58558170994191496,
                longitude: 75244507637047940,
                zoom: 70,
                name: 'Incredible Concrete Salad',
                slug: 'adipisci-eveniet-tenetur',
                administrativeAreaLevel1: 'kwo86ab5nz6m0e6eb34c85wza58vltchbzh527uflpreo3jppu',
                administrativeAreaLevel2: 'i8vifr43obgl6swscmoqdmkctrdit8hjsiblkwegt8mxybkpy5',
                administrativeAreaLevel3: 'zozs1limanmdygf6dsnq2gvuijy8z1jjb2yktupy65sbwwov59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryI18NLangId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '3545fa57-16d9-4b78-8902-657f5acdb3ec',
                iso3166Alpha2: 'i8',
                iso3166Alpha3: 'h2j',
                iso3166Numeric: '388',
                customCode: 'g218vzfrgg',
                prefix: 'wxj34',
                image: 'http://placeimg.com/640/480/city',
                sort: 539550,
                administrativeAreas: { "foo" : "bar" },
                latitude: 30184362151559656,
                longitude: 18205395848345800,
                zoom: 83,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                slug: 'voluptatem-vel-consectetur',
                administrativeAreaLevel1: 'x4z509sn9q5y9jmeljio0zety2mlhhcy1js9ivqp6a59cysd4y',
                administrativeAreaLevel2: 'atb0t2jkytz82hvwjssilrc16qck9prfiplo2skvoouft0s81v',
                administrativeAreaLevel3: 'lmailco60uczcpq6s0wydse27nnbvyslpzn39d24gn08e896lq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryI18NName must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NSlug property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '3233980e-6e9b-4163-9c66-51269204e172',
                iso3166Alpha2: 'g0',
                iso3166Alpha3: 'uww',
                iso3166Numeric: 'vt6',
                customCode: 'ub0y2z1ekm',
                prefix: '0dk7i',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 322949,
                administrativeAreas: { "foo" : "bar" },
                latitude: 70805777716997020,
                longitude: 12424583739091976,
                zoom: 36,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Concrete Fish',
                administrativeAreaLevel1: 'bzthgn3ob87ak1ejafcj6b4h2m2ytxz498mai3xjnl3akdw2qe',
                administrativeAreaLevel2: '2lil3ftbtqkbas5wqfxv0we9v5mo3l96ej6dv7qaz5o8rjxs6u',
                administrativeAreaLevel3: 'b0gna0bkepgc9zes7q4e0yyvzlu3c8b6kcj681ufjexu12usew',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryI18NSlug must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '2b88x3tb5ppx9lyapx8g5oc1jbvag3a6tgfx6',
                iso3166Alpha2: '69',
                iso3166Alpha3: 'da3',
                iso3166Numeric: '2wc',
                customCode: 'xjt5ym8t4z',
                prefix: 'yn8ji',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 388263,
                administrativeAreas: { "foo" : "bar" },
                latitude: 71611689793296570,
                longitude: 79350029360123300,
                zoom: 33,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Soft Towels',
                slug: 'autem-similique-labore',
                administrativeAreaLevel1: 'dmu09gsq0tnm290wkx0kizgq7m1nclbg5xhgnbzwdqtfk2fbv4',
                administrativeAreaLevel2: 'lu1cyf1c8smz3m8ybfwuhlj7n4r2yqoq9t6fi2i9bg82q8kms7',
                administrativeAreaLevel3: '097hhuesvpgal57ed8iw4mov4utudxn8twqm1kx2yqsjprfag7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha2 is not allowed, must be a length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '5a280b19-c550-4292-88fd-a7e72b72af5f',
                iso3166Alpha2: 'yzx',
                iso3166Alpha3: '6p4',
                iso3166Numeric: 'ca5',
                customCode: 'ly7v6e2zwv',
                prefix: '6cdjs',
                image: 'http://placeimg.com/640/480/city',
                sort: 776613,
                administrativeAreas: { "foo" : "bar" },
                latitude: 51859068487855270,
                longitude: 38049726179228070,
                zoom: 90,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Rubber Table',
                slug: 'quo-sed-sed',
                administrativeAreaLevel1: 'f27pocyw7zt722kor2efsh2n096qf7yvny2jyrslxmkf40vbjx',
                administrativeAreaLevel2: '4viz4cug3bn7x6qojde125uckvgsgzqnwqy0dn6nhs7vvgwfil',
                administrativeAreaLevel3: 'u3iq561js4r5u9r36lptvjglxoa7na490w0t9g2yrt29g6r4w7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 is not allowed, must be a length of 2');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha3 is not allowed, must be a length of 3', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a7c0a084-f793-4bd3-8602-36d1c0042c77',
                iso3166Alpha2: 'yd',
                iso3166Alpha3: '01b5',
                iso3166Numeric: 'hgz',
                customCode: 'b3x493ci4w',
                prefix: 'i20n4',
                image: 'http://placeimg.com/640/480/cats',
                sort: 994392,
                administrativeAreas: { "foo" : "bar" },
                latitude: 92467111923388370,
                longitude: 87398142886363060,
                zoom: 13,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Cotton Computer',
                slug: 'sit-et-quas',
                administrativeAreaLevel1: 'uzhr2z55xg5htws7ijomv5urob010rpbesue8s4xdboype1iwf',
                administrativeAreaLevel2: 'rhorqzvccrr721ttlpy5l0ptqsmunm4udft11oj494g75igndu',
                administrativeAreaLevel3: 'xfnlbyey8fvli8jxxitwlid1f0cv2792gonlicegy5l52xeqjr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 is not allowed, must be a length of 3');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Numeric is not allowed, must be a length of 3', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '21973b73-c697-4c31-afb0-d1e9bf94e16e',
                iso3166Alpha2: 'fk',
                iso3166Alpha3: 'll4',
                iso3166Numeric: 'xoy9',
                customCode: 'vgy1yvcm05',
                prefix: 'xdmup',
                image: 'http://placeimg.com/640/480/cats',
                sort: 614773,
                administrativeAreas: { "foo" : "bar" },
                latitude: 25102786061567750,
                longitude: 85787869577135400,
                zoom: 10,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Cotton Towels',
                slug: 'rerum-earum-eos',
                administrativeAreaLevel1: 'vumolhg2x4a90u2v9l9bu833qtvkfoqp3rmut8nbc1nm3sy8nn',
                administrativeAreaLevel2: 'ovspo2zj1mrth67vs6m25dc6u9eeclvfi4syc4hhej8z50uf4u',
                administrativeAreaLevel3: 'scwxkw36lri97f5z8zm05x55i36zt5x4w93dvglf95rrem3wsu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric is not allowed, must be a length of 3');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NLangId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '0030857b-e7d3-4093-9d0f-c2d83cd6df17',
                iso3166Alpha2: 'u5',
                iso3166Alpha3: 'l57',
                iso3166Numeric: 'v9c',
                customCode: 'vn7mh50o06',
                prefix: 'qhv6u',
                image: 'http://placeimg.com/640/480/city',
                sort: 784564,
                administrativeAreas: { "foo" : "bar" },
                latitude: 98471701176225900,
                longitude: 45661979019349760,
                zoom: 22,
                langId: 'zyrlfu5crjhwgmdvsq5anu63yl5j1aq3s1goc',
                name: 'Fantastic Fresh Computer',
                slug: 'quia-ipsam-fugiat',
                administrativeAreaLevel1: '764qetocmybab9xhjnn1auheg6cvxjk6t6vesk9fjvbydtgdj4',
                administrativeAreaLevel2: '2ygy7xfe3i4ucgagmeb76xo9rq8v9m0flwrywanfbxa3f87cby',
                administrativeAreaLevel3: 'apak9wc3tek7fbrk06g3m4qqkol2kcncedi0rh8rqxwbwjf003',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryI18NLangId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryCustomCode is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '5a6bdf07-e9b6-4a90-ab9f-4b01942964d5',
                iso3166Alpha2: 'dh',
                iso3166Alpha3: 'oss',
                iso3166Numeric: 'lau',
                customCode: 'ecqyw6267n2',
                prefix: 'fc0x6',
                image: 'http://placeimg.com/640/480/sports',
                sort: 954027,
                administrativeAreas: { "foo" : "bar" },
                latitude: 90651055385277230,
                longitude: 51216147507042390,
                zoom: 19,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Metal Fish',
                slug: 'nisi-qui-qui',
                administrativeAreaLevel1: 'kcm1jcidtenrbgx9ogheey3xikumqebg08juhz4psr1xhr6jmn',
                administrativeAreaLevel2: 'kpx2he1zbdn6hcmokbmecjzmnzpfsj6x6sdpkhco286sijycb6',
                administrativeAreaLevel3: 'iw7v2398ublvfg49msy4f1xenxmr6ujs79xsqw8mmlg1fgheou',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCustomCode is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryPrefix is too large, has a maximum length of 5', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '7763ec35-c880-47c7-8ff8-d360769bfdd6',
                iso3166Alpha2: 'iv',
                iso3166Alpha3: '9h9',
                iso3166Numeric: '5um',
                customCode: '0zl01hfkne',
                prefix: 'fnsp9a',
                image: 'http://placeimg.com/640/480/sports',
                sort: 950880,
                administrativeAreas: { "foo" : "bar" },
                latitude: 78716673270841280,
                longitude: 74730142154091260,
                zoom: 51,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Metal Towels',
                slug: 'corporis-ea-dolores',
                administrativeAreaLevel1: '9l0lgks7i4qku70tpt36kywug2ba4ho0efok04cgqcak93ozjs',
                administrativeAreaLevel2: 'x5zc7z0ok7wj9kzzfw7gwbij4b04za05w3vnm1kxq8oplbkrc2',
                administrativeAreaLevel3: 'v423fifor61q5rhejjkc931bnc52wqs4n7owd3uyg5s1daibwd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryPrefix is too large, has a maximum length of 5');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryImage is too large, has a maximum length of 1024', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '29a9d007-eab7-4764-9462-b9e95b180a9b',
                iso3166Alpha2: 'v8',
                iso3166Alpha3: 'jo4',
                iso3166Numeric: 'wel',
                customCode: 'rep2jv87nh',
                prefix: '67kcz',
                image: 'p0uvoozzhnv8mwi8wu625wm1oh3hkgff5oaap5p2x0qgdxx8wvmdcl0seglv25mthrg55knyit12suujc9mieasgvamrftlzwftmnz4g5h18rimue6dt1m07ot9f4gtu3rjum4nnacndjs6vbsjajxiugd1nhh9cxhecnq66ekgzulykrzx7szhwduvgyxsch0sb7hqlsnzhedfm5j35km0ssnbairjvi1rl89htq0o329u7jjal948hiryywwfcdxguyyggmotgzf9een3xlqhm5zzd7ydxt0t4ge39k6sdaga9itn34yr2kjcalesrt2eahzjcmxtw75w2p34weh6axhlio0591koqptmihyzqb25novi480h9jrq4yuqeod35z0nb09arial8pkrypjrhqlgie4ncsa15jdy34uife8ejz5lvnbdxdeb1647kwvjaqsxs05vbi2ma1gdb7v8rtl7tkdcyfzkgong8vjaqwh4m7mek0xafrqcwg4w5ew1r3fe09nnyq2pz8ueudrverkb8z21zh5pq12yjkde6uf90c8z181w4i50nm4lst03qfqyx87xofbuywkth9pgdk9dvrvgiza1dsc3afubqavl8et2yc3d479ak8spz1jd2wlsyhq2uv5ezavn5wicbsbwyt56t7qmxs30ztjlkuj5zjups7jyr5jlbvxj3gxri5gqqz2azmvtz87gxumqmd7ijyo44mt0sbg3avs76l81uo8nvm6e5dugxyjwxnyawheckklqn8ve69s5qqg2lyhiqgv8czyd38a6uny7w2knu2hz8tjn8tyijyiv3yzv46uh2sqgoy858az0rat58qrfr3tjz7cnhbtk0mwuotmx5i3lvujctlo8vg7ss3si7fbwjf2mxle122joxew2ux19oro3a9us8s5wkx0v8bxbictouo91zhqcg9e6vm8u7nwygai82reoy9jaymr2v1yej766eabyacuqi3391phvwjq9g71pr500h6mtas',
                sort: 188449,
                administrativeAreas: { "foo" : "bar" },
                latitude: 70211545123785320,
                longitude: 27886005066974490,
                zoom: 58,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Fantastic Plastic Bike',
                slug: 'molestias-culpa-et',
                administrativeAreaLevel1: 'siisd35se3v8n9bjzqc6a6h4ymr7uehhm5ytzjnjepu2jj3o4w',
                administrativeAreaLevel2: 'empxrqal1ooe7kgvqcd0mq9ou9b1ylfwcawk5rrrmqv55qjvu7',
                administrativeAreaLevel3: 'fxm5fu71ve1dlh6xszb9cqq85q0il18k5cwwwj7td5fczihfgz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryImage is too large, has a maximum length of 1024');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountrySort is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'db33dfaa-3c79-4c96-8a6f-b78a53d77478',
                iso3166Alpha2: 'ai',
                iso3166Alpha3: 'u53',
                iso3166Numeric: 'b26',
                customCode: 'f2ugv7jpwh',
                prefix: 'gmcfv',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 3790332,
                administrativeAreas: { "foo" : "bar" },
                latitude: 97608781047908620,
                longitude: 58211400777838370,
                zoom: 65,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Cotton Computer',
                slug: 'nemo-nihil-nesciunt',
                administrativeAreaLevel1: 'zpewkehaa0fvrfgbx2o5t52exsgwtz7kvtjlg4qzj8f2y2f076',
                administrativeAreaLevel2: 'asj621vp21mqmtxu2tta06023vluln0ve7f48zxcn2ktkr33v6',
                administrativeAreaLevel3: '7sve6bin1xbuctipms51ar1du36oej66nhqpjpu0fkavtxqg8w',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySort is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryLatitude is too large, has a maximum length of 17', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '3474bed5-b78f-49ce-ae74-cdc3e087b043',
                iso3166Alpha2: 'ds',
                iso3166Alpha3: 'ine',
                iso3166Numeric: 'ibn',
                customCode: 'asvqkmxlhv',
                prefix: 'u6ids',
                image: 'http://placeimg.com/640/480/people',
                sort: 872953,
                administrativeAreas: { "foo" : "bar" },
                latitude: 407031722483967500,
                longitude: 77230815669852000,
                zoom: 77,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Soft Ball',
                slug: 'expedita-velit-saepe',
                administrativeAreaLevel1: 'm16uv45k68uz8x1i0goqeb66lspiw06a75pzludjc2ouvhtrez',
                administrativeAreaLevel2: 'n8we5u8e2cq5vj2mfyhym68thfi40e8i0s4u3bntzexdmjlf6d',
                administrativeAreaLevel3: 'ybtrioq21jes8xtzk1xxjglyj3zj0koswugvglxa0615t07mus',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLatitude is too large, has a maximum length of 17');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryLongitude is too large, has a maximum length of 17', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'b054ffd2-ec42-4735-926a-718b606444b5',
                iso3166Alpha2: 'mq',
                iso3166Alpha3: 'lt6',
                iso3166Numeric: 'aul',
                customCode: 'uy6sgdlip8',
                prefix: 't32yp',
                image: 'http://placeimg.com/640/480/transport',
                sort: 953671,
                administrativeAreas: { "foo" : "bar" },
                latitude: 39713569386980270,
                longitude: 952560770305589900,
                zoom: 48,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Steel Table',
                slug: 'officiis-necessitatibus-repellendus',
                administrativeAreaLevel1: 'ke6kta6245yj8rq6sq04c99q5z86u8ofit8729wc9vyfody6p6',
                administrativeAreaLevel2: 'xeetj6ysv4r402v9drnytftz3o3h17ujrx470117gs6o2on249',
                administrativeAreaLevel3: 't81xgkoqmx3k37jhb6ct5u5eaqn6v77qpztx9grwzlkvvuw0se',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLongitude is too large, has a maximum length of 17');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryZoom is too large, has a maximum length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '840bf3f9-7106-4cc5-987f-05d8b88c14e9',
                iso3166Alpha2: '6s',
                iso3166Alpha3: 'ky3',
                iso3166Numeric: '6bv',
                customCode: '0vbx4utipv',
                prefix: '853en',
                image: 'http://placeimg.com/640/480/people',
                sort: 165216,
                administrativeAreas: { "foo" : "bar" },
                latitude: 77665071127252000,
                longitude: 44617090470322616,
                zoom: 511,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Fresh Ball',
                slug: 'mollitia-sit-soluta',
                administrativeAreaLevel1: '6eir3wv49d67n3xrtslmq1riy1mbks4g7toex0mbuyx4pw1uhe',
                administrativeAreaLevel2: 'byfj8516h39sxq0abqcmkxiru6caayl6un4ivth0euyyxdvbfh',
                administrativeAreaLevel3: '7i2afbt1p0a9rk6rj4l273lc2z4acjlbl64rklrhrrgd2ksxf3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryZoom is too large, has a maximum length of 2');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NSlug is too large, has a maximum length of 1024', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'd4bb00d9-3552-42e3-82a7-620016b2802b',
                iso3166Alpha2: 'cm',
                iso3166Alpha3: 'x81',
                iso3166Numeric: '43k',
                customCode: 'r2v0yrt6o2',
                prefix: 'l1njk',
                image: 'http://placeimg.com/640/480/business',
                sort: 377522,
                administrativeAreas: { "foo" : "bar" },
                latitude: 74366434752009500,
                longitude: 56926110244808810,
                zoom: 80,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Cotton Chips',
                slug: '3faimmrow9j3o6sepzppi9n07z7gw363hkffv6mcc5kd9den2vi1tfwtmyisn1f0iafekop6hbjz1bpkljs3qk5uf8j6adyq8bm528nzf448xmj607ghs9de2p39oq4ec4b4zpsx1xy6q0bhbkqoayeyc8c6sckzgmb0ht4tbs2eanqt6jl1tiw47xssz5g9kww9f28k0cpy88frwk73ml54znkownq7bb9myyi1dliznr309mlowwkja9n3o8ij1g4pz96juxn743iyykq4xqyj1g5uj92e3fso2nzc2co3eokzuxqh3ktooqoawcpfoky5xx6ay4gwexxjotzj716skvk5yvdkd6iisc0igyxmirewrxs0wfj6wqd46v52wrpufd0gqrej2u0f71whvkq2e6ksudrx12oy8a2601vx1kiq8x4c0on5vv6dcw07xwlqd9x0c1b8t8e85kxw1i1uko8ludqghs59oi9qctfmkspimyluokbp6ekef7swnp3u3kya3te52nit4gn3lflt4c5h6a5tgwu893rubdgjcpz27xoy8gchd1n7mnlhmgeo39fksg8gb5nftwmz4yxyzqortmct22gew8l4xoyrcmx39lytgum5wjn8hba1bl4calyknebelhlrs3fs37z8gzu0ok6816nc6m8tmqihjuqjgw963om686peawhunvxd26g2up19dhk6ilf4vkzhi3q5u42vv7bkw6cg5pnparppvd1xykeygua5996bk4xy8ja725ijj7sjhvfux630gmwje5lqtxx5ob9555isvo19srsk75lshz2u93zcamz7ujrnmkx70ge03hsw3hwtbpll2vjcg5c3uiq6zfrk2c69cz1tw96zykhd4bkkttvjzkz5h10jphhsb4y76j4jao8z66dipqfjwq4gukre2ulfseat48gg71e2l9uy2cwk40f6awu4eqzmiimsd7fl5zk8ip4cxrmeoahtb80xc7kggp76i1cy7lgzr8jl0',
                administrativeAreaLevel1: 'fk654cvngmwxokh3tikv3cm10l6ifmvm7hcbdlgdt5vszxxqya',
                administrativeAreaLevel2: 'jzf7m4sk5lkvcrkvckljqsloqx7jpbnu33ifa70zxqmrg3grf9',
                administrativeAreaLevel3: 'jyyxzay1liw5vf0i6ah3j98bfxur4xfu1q1mvr0zt988ycivfm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryI18NSlug is too large, has a maximum length of 1024');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NAdministrativeAreaLevel1 is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '991408de-cd69-41aa-9aaf-5dd891c278d7',
                iso3166Alpha2: 'ox',
                iso3166Alpha3: 'i4e',
                iso3166Numeric: 'ors',
                customCode: 'wfiij49oi1',
                prefix: 'dxatm',
                image: 'http://placeimg.com/640/480/transport',
                sort: 527610,
                administrativeAreas: { "foo" : "bar" },
                latitude: 48803505079212824,
                longitude: 88364982688376060,
                zoom: 37,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Plastic Sausages',
                slug: 'aspernatur-voluptatem-eos',
                administrativeAreaLevel1: '9t0rv0jmap8t39suzs7a4uh2b69yokyzhkpj5kxbtfcrn9wcyhz',
                administrativeAreaLevel2: 'rue1evd9ne5drpx6e9u63cpakk3j45ztzti5tkc28khuol326d',
                administrativeAreaLevel3: 'f0pr57zz2umqbvjbg8hg8zeqkmwt5l83oevhd421u6o6igt60w',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryI18NAdministrativeAreaLevel1 is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NAdministrativeAreaLevel2 is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'b9447a71-3e36-432a-accb-de7fda700126',
                iso3166Alpha2: 'yl',
                iso3166Alpha3: '0k7',
                iso3166Numeric: 'e1j',
                customCode: 'xb09to15ou',
                prefix: 'ykuw0',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 438644,
                administrativeAreas: { "foo" : "bar" },
                latitude: 42834523997374540,
                longitude: 48779317062463040,
                zoom: 75,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Fantastic Granite Soap',
                slug: 'qui-quia-id',
                administrativeAreaLevel1: 'jljg1ghfy204t0k2ovb5m2sytvjubbrpqgyifo0m9yhk9pjptq',
                administrativeAreaLevel2: 'ejr81zkxd45qor5qi3cwukjwoitpjv5bdhaw4xcelq3qjztddts',
                administrativeAreaLevel3: 'tg7j6orbh95u32jj26gdlyguflvttgsncd5i0l1vkao5jxl5vd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryI18NAdministrativeAreaLevel2 is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NAdministrativeAreaLevel3 is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'c9147849-6c50-4bf8-bdcc-3fdf36d455c9',
                iso3166Alpha2: 'qh',
                iso3166Alpha3: 'tqb',
                iso3166Numeric: '0hy',
                customCode: 'yjld3e7uqg',
                prefix: 'icxyv',
                image: 'http://placeimg.com/640/480/people',
                sort: 131064,
                administrativeAreas: { "foo" : "bar" },
                latitude: 81579548386992080,
                longitude: 99079940540928220,
                zoom: 23,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Steel Fish',
                slug: 'qui-maiores-labore',
                administrativeAreaLevel1: 'mgi5kxqple1qesh28trey67eulmhue60kbo7siw10gxi5ot2dd',
                administrativeAreaLevel2: 'k8a92sda1bf71xb6d0orh1g3rdk20jliupojkyl2hlozff6r26',
                administrativeAreaLevel3: '30r6qaxh9jnqsrcqt68bk1blebcwqdwgmhnd9x63162lx0rwe26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryI18NAdministrativeAreaLevel3 is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryZoom must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '55a9d027-4433-4168-84d2-ed326f210715',
                iso3166Alpha2: 'ri',
                iso3166Alpha3: 'ng6',
                iso3166Numeric: '8ru',
                customCode: 'uwz8hbyepr',
                prefix: '4oyzt',
                image: 'http://placeimg.com/640/480/city',
                sort: 990412,
                administrativeAreas: { "foo" : "bar" },
                latitude: 73657300345550600,
                longitude: 98119864810885490,
                zoom: -9,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Rubber Sausages',
                slug: 'omnis-quidem-earum',
                administrativeAreaLevel1: '3eavnuwmseoeg29aoehen85jd06v1yrfr5u1dokkr8oa5yu77c',
                administrativeAreaLevel2: 'r75y0ghjif9nxwsqwte0bmavxh5439v0lzzhnhs9su8iys1e42',
                administrativeAreaLevel3: '4vybiyhba07hlnwkcoa6e3e77cbjvdriu75wkroshecwltp08n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for CountryZoom must have a positive sign, this field does not accept negative values');
            });
    });

    test('/REST:POST common/country - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test('/REST:POST common/countries/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/common/countries/paginate')
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
                    total   : seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    count   : seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    rows    : seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
                });
            });
    });

    test('/REST:GET common/countries', () =>
    {
        return request(app.getHttpServer())
            .get('/common/countries')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).toEqual(
                    seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt'])))
                );
            });
    });

    test('/REST:GET common/country - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/country')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '7d206031-94e6-476f-897c-49845b8c7902'
                    }
                }
            })
            .expect(404);
    });

    test('/REST:POST common/country', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                iso3166Alpha2: 'ys',
                iso3166Alpha3: 'lxx',
                iso3166Numeric: 'n4k',
                customCode: 'zf043gq5zf',
                prefix: 's5d66',
                image: 'http://placeimg.com/640/480/city',
                sort: 401472,
                administrativeAreas: { "foo" : "bar" },
                latitude: 51518426711968690,
                longitude: 78395008947469000,
                zoom: 52,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Metal Mouse',
                slug: 'odio-iusto-repellat',
                administrativeAreaLevel1: 'pl0rymfu6dx8gilds0lij3a0ofrtf1cf834jt1u8ff39p4yo7g',
                administrativeAreaLevel2: 'luxuvxtfpk7vo3elzm916m6ynamsmttoowtfuuht6vaqnfs310',
                administrativeAreaLevel3: 'dwlliore40zj25c54zoexrzc7lgcfwox3q2x9owwzooe7d6piq',
            })
            .expect(201);
    });

    test('/REST:GET common/country', () =>
    {
        return request(app.getHttpServer())
            .get('/common/country')
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

    test('/REST:GET common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/country/2ad8fc69-910a-4b9f-81d7-470deb9596cd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET common/country/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/common/country/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/country - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '88f0d151-aab2-4c88-884f-01a8ce2aaa01',
                iso3166Alpha2: '5c',
                iso3166Alpha3: '47p',
                iso3166Numeric: 'liw',
                customCode: '5ps1zo3pz3',
                prefix: 'u2xft',
                image: 'http://placeimg.com/640/480/food',
                sort: 650041,
                administrativeAreas: { "foo" : "bar" },
                latitude: 40127094018359500,
                longitude: 96559887228389310,
                zoom: 87,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Metal Cheese',
                slug: 'natus-recusandae-deleniti',
                administrativeAreaLevel1: 'tj1ejj5j70fo81wx5qezoydbklzy8eaviz6hackeustt0m1h2y',
                administrativeAreaLevel2: 'yqtfebsy2r40m1hrujyc3l5g07trerftqzlfwy5ekhj7boaib1',
                administrativeAreaLevel3: 'lurotzkps4xfh5lza2ziyrjqxwoqmqp7qppz85z941y7783ni2',
            })
            .expect(404);
    });

    test('/REST:PUT common/country', () =>
    {
        return request(app.getHttpServer())
            .put('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                iso3166Alpha2: 'nj',
                iso3166Alpha3: 'f6l',
                iso3166Numeric: 'im7',
                customCode: '9m0p9xazzs',
                prefix: '0vdol',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 715070,
                administrativeAreas: { "foo" : "bar" },
                latitude: 10301174084659980,
                longitude: 11629781718294716,
                zoom: 95,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Plastic Pants',
                slug: 'velit-aut-molestiae',
                administrativeAreaLevel1: 'xmzz2q8oq03v47wvemfcyfzwbgtzkfh306svdodf3evlr3176r',
                administrativeAreaLevel2: '5qo7ek0rlyajy1k825lnbg69hzezcsfofug8rn8tvhoxq5ke4p',
                administrativeAreaLevel3: '3lca7bn4kw23ecxlw9saer9typt9urwcdn2mx11sdlb73hkpl8',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/ee642330-38dd-4a6b-9394-9b6a30d0be67')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE common/country/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL commonCreateCountry - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateCountryInput!)
                    {
                        commonCreateCountry (payload:$payload)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            langId
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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

    test('/GraphQL commonPaginateCountries', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        commonPaginateCountries (query:$query constraint:$constraint)
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
                expect(res.body.data.commonPaginateCountries).toEqual({
                    total   : seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    count   : seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    rows    : seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
                });
            });
    });

    test('/GraphQL commonGetCountries', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonGetCountries (query:$query)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.commonGetCountries.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL commonCreateCountry', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonCreateCountryInput!)
                    {
                        commonCreateCountry (payload:$payload)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            langId
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        iso3166Alpha2: 'e9',
                        iso3166Alpha3: 'g2j',
                        iso3166Numeric: '3m3',
                        customCode: 'wtv50c21fx',
                        prefix: 'oycvj',
                        image: 'http://placeimg.com/640/480/animals',
                        sort: 779502,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 17173783990880424,
                        longitude: 35697682490463604,
                        zoom: 65,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Rustic Steel Shirt',
                        slug: 'expedita-quo-vitae',
                        administrativeAreaLevel1: 'r3z47922jescb9x6h8rrtcdtif8icp4nkz6yz6ehih5x5hsvzg',
                        administrativeAreaLevel2: 'ksw96b08gf5i51add958o53geemo91sfpb1t8t4fcmj6efqge4',
                        administrativeAreaLevel3: 'rhczsnh9fas3obtpc7wslhoxpzvh099cce8radthtnsgwe26on',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.commonCreateCountry).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindCountry - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindCountry (query:$query)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                            id: '783a973f-7d91-4ca4-b493-ae958f2b713d'
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

    test('/GraphQL commonFindCountry', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        commonFindCountry (query:$query)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                expect(res.body.data.commonFindCountry.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonFindCountryById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindCountryById (id:$id)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'c52ed4bb-dcfb-4794-8c7f-55f0bcdf45e9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonFindCountryById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        commonFindCountryById (id:$id)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                expect(res.body.data.commonFindCountryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonUpdateCountry - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateCountryInput!)
                    {
                        commonUpdateCountry (payload:$payload)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '84b5b933-a691-45dc-be87-e06f84f9f707',
                        iso3166Alpha2: 'c7',
                        iso3166Alpha3: 'jyl',
                        iso3166Numeric: 'd4k',
                        customCode: '9xw6j15fbu',
                        prefix: '8ny67',
                        image: 'http://placeimg.com/640/480/food',
                        sort: 674855,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 69976581578693390,
                        longitude: 84730847822052030,
                        zoom: 44,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Handcrafted Concrete Shoes',
                        slug: 'et-facere-id',
                        administrativeAreaLevel1: '98kv9wa7zmsn2r0wh83kjslj99rcmoo483nsov9geufyzun4ui',
                        administrativeAreaLevel2: 'xp6dvyfkeerzqvch0pg64s9414u3272xynkwztw6fsnowhqbvv',
                        administrativeAreaLevel3: 't3416rayuplr45qzbizfm4a8abpkkuothe0jbxpm3ibdoirwqd',
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

    test('/GraphQL commonUpdateCountry', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:CommonUpdateCountryInput!)
                    {
                        commonUpdateCountry (payload:$payload)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        iso3166Alpha2: 'bo',
                        iso3166Alpha3: 'xup',
                        iso3166Numeric: 'zvp',
                        customCode: 'alj5v0hfo1',
                        prefix: 'teno3',
                        image: 'http://placeimg.com/640/480/nightlife',
                        sort: 108219,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 61291324505830100,
                        longitude: 47223814487917400,
                        zoom: 85,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Small Wooden Computer',
                        slug: 'maxime-molestiae-ipsum',
                        administrativeAreaLevel1: '5fcqskbof8034w5id612t3t315hib467a0n97u3bqwafj1oz80',
                        administrativeAreaLevel2: 'o8u3cvofvbajvkjjsl1wnhcaq4tblkkssdmkfi9b1y89hdnr5v',
                        administrativeAreaLevel3: 'v776eqfahhqmp8thf5gn72uu1n0f6uoj1grbudpqrpc1k0qi1k',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.commonUpdateCountry.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL commonDeleteCountryById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteCountryById (id:$id)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '049e6646-043b-4b27-a1ec-ab91f9064a28'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL commonDeleteCountryById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        commonDeleteCountryById (id:$id)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                            id
                            name
                            slug
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                expect(res.body.data.commonDeleteCountryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});