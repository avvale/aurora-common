/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '../../../src/@apps/common/country/domain/country.repository';
import { ICountryI18NRepository } from '../../../src/@apps/common/country/domain/country-i18n.repository';
import { AddI18NConstraintService } from 'aurora-ts-core';
import { MockCountrySeeder } from '../../../src/@apps/common/country/infrastructure/mock/mock-country.seeder';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { CommonModule } from '../../../src/@api/common/common.module';
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
                iso3166Alpha2: 'nj',
                iso3166Alpha3: 'h7g',
                iso3166Numeric: 'ikh',
                customCode: '5jhpth3g4i',
                prefix: '9xx1k',
                image: 'http://placeimg.com/640/480/people',
                sort: 154592,
                administrativeAreas: { "foo" : "bar" },
                latitude: 66021220847626300,
                longitude: 17934870388343978,
                zoom: 94,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Fresh Shoes',
                slug: 'perferendis-repudiandae-aspernatur',
                administrativeAreaLevel1: 'uuoucqt7p2doarlcg1uy988nsdetp43rtwqio9m5z40vsozich',
                administrativeAreaLevel2: '3s2huyzsoywxugs91kwzjs9bq2dxncec1ygibsldhss6i6jtfi',
                administrativeAreaLevel3: 'dqr5eu21a28s8768idwzb5kefsp027z7usoepa7uyfnfzc5lmc',
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
                id: '7a65f081-57a6-4fd5-8f49-e9a47daed0df',
                iso3166Alpha2: null,
                iso3166Alpha3: '70l',
                iso3166Numeric: 'cq4',
                customCode: 'emkb8ygnb7',
                prefix: 'bqhic',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 438482,
                administrativeAreas: { "foo" : "bar" },
                latitude: 93068467976129700,
                longitude: 78960401459662820,
                zoom: 16,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Steel Bike',
                slug: 'qui-voluptatum-laudantium',
                administrativeAreaLevel1: 'uiyig3ktetfmqktk8azngmlxo9h9g5edt03m98sstqimt70s0a',
                administrativeAreaLevel2: 'j0p8fdnfa62v83vhc2wyvxgmzvvn4pzd6sk0g3y8jq8fvckbtr',
                administrativeAreaLevel3: 'b5jyalehfeyipchwfdusb6x33szy9cd1hoq75dve15iw4ezt6h',
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
                id: '8a152872-96ca-480f-ad0e-ae6bb86bb596',
                iso3166Alpha2: 'co',
                iso3166Alpha3: null,
                iso3166Numeric: '5xz',
                customCode: 'vtjue9210q',
                prefix: 'djx34',
                image: 'http://placeimg.com/640/480/cats',
                sort: 384440,
                administrativeAreas: { "foo" : "bar" },
                latitude: 70243668796078340,
                longitude: 70662430604040870,
                zoom: 21,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Metal Fish',
                slug: 'odio-quas-eum',
                administrativeAreaLevel1: '7le28vb81lnt6gauhkc0fzgzpvizkt9smt62pl88h65ouuc4rs',
                administrativeAreaLevel2: '7ahzp6wtf2ztwxkogk7flxqpr38z3sm0ilv3suk5cdklvjo9y5',
                administrativeAreaLevel3: 'ypsnew7lo0650kotc5tx53jnfmtcw8v69fxxgjrnx0ia3o685k',
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
                id: '62d37098-2ec5-4c3f-a34a-935a5423eab8',
                iso3166Alpha2: 'e0',
                iso3166Alpha3: 'ias',
                iso3166Numeric: null,
                customCode: '3gpgjo8ynm',
                prefix: '7jg3d',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 207210,
                administrativeAreas: { "foo" : "bar" },
                latitude: 39474456105070420,
                longitude: 84010082001579890,
                zoom: 62,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Metal Towels',
                slug: 'minus-dolorem-ipsam',
                administrativeAreaLevel1: '8b5m5slg7vipldpaxyg6qs9fhg0py5fsbp0q42fhhtepsk9spi',
                administrativeAreaLevel2: '1gaa6f05y0uasao74nmakhk6vbt1x3riiv3hujbe4jc66eagq7',
                administrativeAreaLevel3: 'zg90wnvptqao1rhcnuzkwy8w9rh9yynybja2mtxlehzrd76u62',
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
                id: '11cf726a-ffed-4908-befc-2a2622e58a79',
                iso3166Alpha2: '37',
                iso3166Alpha3: '2i1',
                iso3166Numeric: 'f7w',
                customCode: 'b6nuewb2cq',
                prefix: '3y1ay',
                image: 'http://placeimg.com/640/480/city',
                sort: 553011,
                administrativeAreas: { "foo" : "bar" },
                latitude: 23661179198673610,
                longitude: 57626527758455350,
                zoom: 82,
                langId: null,
                name: 'Practical Soft Soap',
                slug: 'asperiores-laudantium-et',
                administrativeAreaLevel1: 'dnchbdf6eox2q780dxkhqvwrjem1zz2hf4kxixfrbqxtun35zt',
                administrativeAreaLevel2: 'rq997rcvrsv2untkyv6msnix4bcydr8788f4mjz59ahhk49hsr',
                administrativeAreaLevel3: 'sleqnck503mgy4ipdxv5y5ypblzzk3w0gua065k8pto2dyv8jq',
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
                id: '74b7b436-42d5-435f-85cf-0cab7fc68311',
                iso3166Alpha2: 'o3',
                iso3166Alpha3: '6ma',
                iso3166Numeric: 'l7e',
                customCode: '8pdxm3dkbz',
                prefix: 'xylrn',
                image: 'http://placeimg.com/640/480/sports',
                sort: 914864,
                administrativeAreas: { "foo" : "bar" },
                latitude: 47542871542318080,
                longitude: 45353112472253020,
                zoom: 93,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: null,
                slug: 'voluptatum-atque-quaerat',
                administrativeAreaLevel1: 'sf7bda3c958xapbfiiqr5s9qv966r7coa6rvfw0ss1ou3cxbph',
                administrativeAreaLevel2: 's1kx4luqx5yocr8md6tkwig5al92iimvhfhwxouqb7sdacfc3y',
                administrativeAreaLevel3: 'k27ultl1zyfz7csvzu930k1lv0f12qvxdak5zu46muftjmlsm1',
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
                id: '7f545881-9cb9-424d-8853-1ae704876588',
                iso3166Alpha2: '3v',
                iso3166Alpha3: 'c6l',
                iso3166Numeric: 'j41',
                customCode: 'a92h2eer6q',
                prefix: 'zrp3l',
                image: 'http://placeimg.com/640/480/transport',
                sort: 777895,
                administrativeAreas: { "foo" : "bar" },
                latitude: 38894928086432410,
                longitude: 77608504184009280,
                zoom: 83,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Rubber Tuna',
                slug: null,
                administrativeAreaLevel1: 'o38dch70ncbt5u8ugp2b7nycmn37n5cv92kixfdrt6auevzq6m',
                administrativeAreaLevel2: '995udctgks4rbpszrgex8f5ztr4l2fiwf19y2ueiqj56ns5evp',
                administrativeAreaLevel3: 'qx9etp4agj2yql5ejetk2cfy7djd61gfclkja1j3vl98537gya',
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
                iso3166Alpha2: 'oh',
                iso3166Alpha3: 'uu0',
                iso3166Numeric: '4ay',
                customCode: '2a6qb7u0o3',
                prefix: 'dvkw2',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 357747,
                administrativeAreas: { "foo" : "bar" },
                latitude: 44268374209523464,
                longitude: 85197575000114670,
                zoom: 32,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Granite Soap',
                slug: 'officiis-laboriosam-adipisci',
                administrativeAreaLevel1: '70hxbux0q5n2xd5vfl617y9zvaoja071a8kk8kckcwjq5m02wr',
                administrativeAreaLevel2: '10rkyynu8n124sxs5kppsj2sioigvpjrmevt4cr3s9d9aj7gvu',
                administrativeAreaLevel3: 'wvart3w0987wpj7sd62b1d85v0xylebmiaosnreybfrlarpe5j',
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
                id: '9d108bfb-6f36-4719-820f-84276b60eee0',
                iso3166Alpha3: 'pya',
                iso3166Numeric: 'fbm',
                customCode: '8a6v92aumd',
                prefix: 'kqsi4',
                image: 'http://placeimg.com/640/480/food',
                sort: 799339,
                administrativeAreas: { "foo" : "bar" },
                latitude: 42629092539462700,
                longitude: 60350482156386670,
                zoom: 43,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Steel Bacon',
                slug: 'ducimus-in-alias',
                administrativeAreaLevel1: '3upbrd4jw207txnhrmmrmbrq8x3jm85ylcpz7u47jqpkx9luqj',
                administrativeAreaLevel2: 'sfdmla30om93p9y0o9oc2mjnid4xxia1cembtp24goetcetdoo',
                administrativeAreaLevel3: '417pb3mx3ma2iycdqhrfm91bh1iryyy1augzpj6ele366xnx20',
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
                id: '37f43e29-4e85-4cdf-8c92-5f604908f08b',
                iso3166Alpha2: 'd9',
                iso3166Numeric: 'o7s',
                customCode: '2x7ev6mk3u',
                prefix: 'lj371',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 236529,
                administrativeAreas: { "foo" : "bar" },
                latitude: 26816327634863292,
                longitude: 98846188352652220,
                zoom: 78,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Fantastic Cotton Gloves',
                slug: 'quis-totam-molestiae',
                administrativeAreaLevel1: 'hnn1zevgs766iab70vgmkscyph2gi5ycb74n3agge3lhs82v9p',
                administrativeAreaLevel2: '0m1s6dnses8z3gvpzhiagjnio65ns3v3ul3fiywg0tuhj2n5ll',
                administrativeAreaLevel3: 'stwfeocqldmibc078cx8km956fam640mhspq19anvl1k50nbqm',
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
                id: 'd9191816-1ddd-4025-8a03-f1da4616c598',
                iso3166Alpha2: 'uj',
                iso3166Alpha3: 'gg5',
                customCode: 'sgb8wxdmz8',
                prefix: 'e1b1u',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 798414,
                administrativeAreas: { "foo" : "bar" },
                latitude: 31841852767220216,
                longitude: 65624266398392520,
                zoom: 50,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Rubber Shirt',
                slug: 'numquam-iusto-est',
                administrativeAreaLevel1: '0bymk1mfw7fho9toxorooyrtrf6h2n4zwehcw1kx8sb9oh4b9i',
                administrativeAreaLevel2: '92pf8cocobsvf0cdw4bcea4gzcfyrmvsp0g8hh28uo8gsrcjt4',
                administrativeAreaLevel3: '8ack7bryic6h0fmcgs09apkoquazgjjushih0oqqbphcdsd2cf',
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
                id: '38bb13f1-a44e-4086-a4ee-2ab4af4f6318',
                iso3166Alpha2: 'hd',
                iso3166Alpha3: 'ojx',
                iso3166Numeric: 'm65',
                customCode: '0hhmoj4sg2',
                prefix: 'rffu0',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 835888,
                administrativeAreas: { "foo" : "bar" },
                latitude: 84298074171794080,
                longitude: 71353371220804500,
                zoom: 49,
                name: 'Intelligent Concrete Chicken',
                slug: 'minima-eaque-doloribus',
                administrativeAreaLevel1: 'h1nieh9suwn9mfj236cy3ilig1xsmy8rasndcl26fq7298fwkz',
                administrativeAreaLevel2: 'qjb4h2x2tny0rs18dc2bxkvafeglgc0lc7zwc421vefv24j9co',
                administrativeAreaLevel3: 'jxw2ppwkg8jdz3g6wcd6bay2gq2dx2jo31ewpssi4kb53ambg6',
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
                id: 'adb8f6bd-a2e0-43aa-b18c-96769d5a61e1',
                iso3166Alpha2: 'dv',
                iso3166Alpha3: 'n83',
                iso3166Numeric: 'lsd',
                customCode: '985dv90ddf',
                prefix: 'l74jb',
                image: 'http://placeimg.com/640/480/business',
                sort: 500308,
                administrativeAreas: { "foo" : "bar" },
                latitude: 44506774411147740,
                longitude: 74455742585032900,
                zoom: 79,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                slug: 'quo-ratione-aliquid',
                administrativeAreaLevel1: 'gyu2qoyg87k9s9n2x5x26v4vg5c0rcga9npuu9yv3vql3bds69',
                administrativeAreaLevel2: 'voypyzy5teg5i3w5xxown1yx5f2j6m2crjhrmzludz4b4xubh8',
                administrativeAreaLevel3: '13umxa47t7w7rynqqnw7m6teupl1hsukhjcqejs8acncphi75n',
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
                id: 'd0c841f6-1d2e-40ca-9d06-ebbc29bd68e2',
                iso3166Alpha2: 'o0',
                iso3166Alpha3: 'rvu',
                iso3166Numeric: 'vqx',
                customCode: 'i3hi4u9whp',
                prefix: 'fd0xu',
                image: 'http://placeimg.com/640/480/transport',
                sort: 352738,
                administrativeAreas: { "foo" : "bar" },
                latitude: 62508791465114030,
                longitude: 69541494078199550,
                zoom: 68,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Soft Bike',
                administrativeAreaLevel1: 'ygn339vvbbugist905vlccfxe8i187xhee91pnpvaozqhzs1va',
                administrativeAreaLevel2: 'bykja30muhw5jy46u16yrbrcfpmztibj4nc82zfx3ne8glovuc',
                administrativeAreaLevel3: '4qoxby2d8b974lqtpt0i4jkpcjit0v57xmx2ct32awet3ag7b2',
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
                id: 'd4imqe124ouf9fmbyb86tunap6amrq49o0x7x',
                iso3166Alpha2: '4c',
                iso3166Alpha3: 'hxp',
                iso3166Numeric: 'fo9',
                customCode: 'c7pfps3e9i',
                prefix: 'mmps7',
                image: 'http://placeimg.com/640/480/sports',
                sort: 714849,
                administrativeAreas: { "foo" : "bar" },
                latitude: 27715885733945156,
                longitude: 69891176138789144,
                zoom: 42,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Soft Mouse',
                slug: 'et-hic-facilis',
                administrativeAreaLevel1: 'o9w83vvb8m807h4xly4rydcx1zcelz44u29pjp1p62woae03uw',
                administrativeAreaLevel2: 'sfxaf8gim7bqs7fpk108i4nxfph29g4614zpm8ci0eps85h6p0',
                administrativeAreaLevel3: 'dn24cskylse4pxyppcx15u7zom4c4pfc5698qeiy0vk5tn1xhv',
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
                id: '86e95e24-da64-410d-96fc-3b81ac0af477',
                iso3166Alpha2: 'mzm',
                iso3166Alpha3: 'lhc',
                iso3166Numeric: 'n8b',
                customCode: 'vs002d2mug',
                prefix: 'isdgz',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 477007,
                administrativeAreas: { "foo" : "bar" },
                latitude: 25948394479800890,
                longitude: 87715017157303580,
                zoom: 49,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Fresh Chicken',
                slug: 'ipsam-omnis-fugit',
                administrativeAreaLevel1: 'ynp2vrm58hkickxqne856aafnzsa5v08s4so8fs1p293qiz17g',
                administrativeAreaLevel2: 'hnsqdj1zdlgoek9bdjhsgawltw8yoqsyju56qg7d0beqsqk27e',
                administrativeAreaLevel3: 'ntgmelli02aiqc4pxi3lnoe0sajidvvul1r0iksfk9jg249lpu',
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
                id: 'c59f282d-1c1b-4bb7-a99c-7165223e390f',
                iso3166Alpha2: '10',
                iso3166Alpha3: 'es6t',
                iso3166Numeric: 'sp1',
                customCode: 'j05jmxk1n3',
                prefix: 'l589q',
                image: 'http://placeimg.com/640/480/cats',
                sort: 338090,
                administrativeAreas: { "foo" : "bar" },
                latitude: 60451790822191350,
                longitude: 71147277879267040,
                zoom: 93,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Rubber Soap',
                slug: 'quisquam-dolor-voluptatibus',
                administrativeAreaLevel1: '4um2w6zjruamqep0paxm1r61v85tyj65ls6n4ln61e79qpwck8',
                administrativeAreaLevel2: 'z3h60utoifohrvcvwuhvqwuyxkt98wchvj7tepygdapatc844v',
                administrativeAreaLevel3: '5bev7oxysw9ui3wuicoa7tr5mgpqz3pqw4ftgcp4s29s6nwuyr',
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
                id: '843e8cde-2764-477f-9baa-80ab23c9d6b6',
                iso3166Alpha2: 'xw',
                iso3166Alpha3: 'wuk',
                iso3166Numeric: '8x79',
                customCode: 'hauqe0qddj',
                prefix: 'x3sos',
                image: 'http://placeimg.com/640/480/cats',
                sort: 802323,
                administrativeAreas: { "foo" : "bar" },
                latitude: 27699426285095210,
                longitude: 19527506095547776,
                zoom: 41,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Gorgeous Metal Sausages',
                slug: 'occaecati-ipsum-suscipit',
                administrativeAreaLevel1: 'righw9q0xt0tfe86psxrf2y55ku7bui5zvh9xcri9jqpid5uv4',
                administrativeAreaLevel2: 'fdxtzcoksxwro6tlj6tt9qhasm7xmofnd9c4ne9t59qslb51hl',
                administrativeAreaLevel3: 'dlsxoggsqsv758gmuc2nga433xp06e7b81hck32oov98c9oqai',
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
                id: '461f33cf-99f4-4c4e-b8da-e82cc0c23153',
                iso3166Alpha2: '65',
                iso3166Alpha3: 'fhg',
                iso3166Numeric: 'jnp',
                customCode: 'wa1ty55rbj',
                prefix: 'rwx1i',
                image: 'http://placeimg.com/640/480/technics',
                sort: 124054,
                administrativeAreas: { "foo" : "bar" },
                latitude: 57194892955434660,
                longitude: 78237084571641100,
                zoom: 27,
                langId: 'nxmvxdjokxusjr35r6mjc3d38iezwuznbxtg7',
                name: 'Fantastic Rubber Chips',
                slug: 'hic-aut-nostrum',
                administrativeAreaLevel1: '2td5c4vk5dkg7yog74eeddn16xa97bw6ip4grmtpp2xdm67vo9',
                administrativeAreaLevel2: '0s9jkktjfllpcijn3p9mqaz7bwqc6pp93is54jcctiuvau0wsn',
                administrativeAreaLevel3: 'w8j62zr7h6pdjafbohxogah2udatt3u29cm6vattlt7qtvsk71',
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
                id: '8b6a87c5-d6da-474b-ad5e-5cd6d6aac252',
                iso3166Alpha2: '1h',
                iso3166Alpha3: 'ult',
                iso3166Numeric: '3sd',
                customCode: '8az28yh16wr',
                prefix: 'rt7wj',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 944201,
                administrativeAreas: { "foo" : "bar" },
                latitude: 80608798617350130,
                longitude: 48650163399279790,
                zoom: 81,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Plastic Salad',
                slug: 'distinctio-sed-corporis',
                administrativeAreaLevel1: 'fn9zqbozkacl4r7vagxl1zfo81ysdlvx57m9lmmyzbocaejpt6',
                administrativeAreaLevel2: 'tb725sab6gldmchwkjnv0hhboff1ntvep72ebezxlo5ou9kglm',
                administrativeAreaLevel3: 'k490tccev6qyj0tbcqu12vyb5zll5hhdllqmchy8ysbkdh6gdh',
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
                id: 'bd79f51c-db1a-470a-ab7d-f7ff30ac4324',
                iso3166Alpha2: 'qf',
                iso3166Alpha3: 'mw7',
                iso3166Numeric: '18x',
                customCode: 'rvlfbyr2wq',
                prefix: 'jq1v7k',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 836093,
                administrativeAreas: { "foo" : "bar" },
                latitude: 43459026010560670,
                longitude: 54295962533521740,
                zoom: 61,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Cotton Keyboard',
                slug: 'tempora-quis-magnam',
                administrativeAreaLevel1: 'puwnr4pw8uqnwf7sri27zxfgmx2esfopcslllevgt9xxzqbaal',
                administrativeAreaLevel2: '56e1zvforogl20tbooz1yrubqirtjmw7n9jm3dnk0tdoqqkhbn',
                administrativeAreaLevel3: '7h25e7ekrqvo1ufzespmscwp6ed0i6uolsl1naw8qbyahwuccm',
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
                id: '5e84c573-54f7-41b4-8611-994a7293cac8',
                iso3166Alpha2: 'f3',
                iso3166Alpha3: '641',
                iso3166Numeric: '9sb',
                customCode: 'v52gum0be6',
                prefix: '82rs3',
                image: 'epykxde8w8zypn8w8061ecifxnv0dm8xul1tv4qjsfm6xv20i6wja6j5ae951w8m442nadbz6qylg0l1nl9nv0ozvvfobhp6ouw26528qo2jf03c9tu6qhifumr9hph4se6w36co0o4i8anlfw4rfbmmthuz839xvaa5mh418l3tmg7jo2tead8dlzyh58ptecd759wpyh1d7zjv0vhddsu1v66m343xw44yccm1bvghgau2vdj095eeqy2ziw9uu0tpnlu16fqfix9dtp7hiba7aob938qm3x9bzdsflav1g6toimjvrfbbeyn8uc212hl3z8c8oaxgu8wb6xahcxfdsuhxb559rtqrudzfh6l6nqltl0o8npx94e1gfos1303nr8qw7dvn0jxea0bbw3llp2p7q6at7nfjcwq4ym7trftbiyf0h84hetg3jvfnmuuac3cqoi6o9b9b6vtgyw6je2qendd1bcicp9yy81e2qv531bxibffrvwchq9f2ywh8cue4bzvd6ctz8xgn2fefncprx5fa2liqy394a3d9w73wdtzksdlzmsxl8ge7v4d6noyrll8lf5agmydsiraxql32lq53z7w3h2zktnmwb9secebc4zicq3fcpr58s15nu54lfx5ovqj4yculmv7a2o37mzkmtagdayayhqf5z917sl7xjenwagvjrru9p3wnmwa4r1wy7wydr2fln2paw6hj2a5jl97wdibj3v9kobct3hffb2bdn6mobqmlxcazdh4ep4ocggva3amlb98nwvez6kt7mrqrtshlna9wrtaa00qqwfqdyj5b0alr4qj7694fdhqkla4t2iumkskikpuabg794xa01qnwez1mmxe6rkm2q1heezihdn9gc0gis44n1sl1xb2rdp2khjymytqxc7glsey95zmuoe0p8ktqfhplx61qi67n3avjwqskdv4wgzw26m3zhujpa3xl3fbv9fvpzd2wvakgki1hdf22jnpmufbc612mth3k1',
                sort: 762733,
                administrativeAreas: { "foo" : "bar" },
                latitude: 69429410369486230,
                longitude: 67062684846888300,
                zoom: 10,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Steel Tuna',
                slug: 'autem-est-a',
                administrativeAreaLevel1: 'wt955g4dhu8zu7q7vcawp0nr0p5tqpypc6zkb25xj3yk73t9l9',
                administrativeAreaLevel2: 'qh1e8kut3bhjehs32ysvme2zcjyqewpd28t2sd2gtvlu5d1nsd',
                administrativeAreaLevel3: 'ljpdxzcxbqwrix0017kee0i9o9cvb045eiguwlpqf9xmq175bj',
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
                id: '79cab861-b629-4ec2-a5c3-53fe198d72c5',
                iso3166Alpha2: 'sm',
                iso3166Alpha3: 'a8q',
                iso3166Numeric: 'pwv',
                customCode: '5emzfi498j',
                prefix: 'ynkxo',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 8932767,
                administrativeAreas: { "foo" : "bar" },
                latitude: 74495811503279260,
                longitude: 74595820814660100,
                zoom: 73,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Soft Cheese',
                slug: 'vero-velit-fugit',
                administrativeAreaLevel1: 'qoy4r1yx8bhtdnqket2xcud8sfq57das9le9qa0qwq2oua2duq',
                administrativeAreaLevel2: 'i555e7pztjrzxvo12255jxkjuu64759g8ibdzzpl3eqd6otlwm',
                administrativeAreaLevel3: 'x0ff0am7873nlp4vldgcqzqx5sq2lhhkgp1jhedxvsxzghxlqx',
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
                id: 'a4a9b8cf-be7e-4822-bba5-3406d2348b90',
                iso3166Alpha2: 'bv',
                iso3166Alpha3: 'ihc',
                iso3166Numeric: 'h7o',
                customCode: 'nex4y86vol',
                prefix: 'lidlx',
                image: 'http://placeimg.com/640/480/cats',
                sort: 971161,
                administrativeAreas: { "foo" : "bar" },
                latitude: 183849752155543600,
                longitude: 16208723185744412,
                zoom: 68,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Steel Towels',
                slug: 'itaque-odit-velit',
                administrativeAreaLevel1: 'g4pdtcpzmp62gc1u328i25k28vms4khwrj0v7jslocp9h88oly',
                administrativeAreaLevel2: 'dpczv8um3ogpwaf1b6ccc2xw6um7pv3szku7dlyo8g3irq9zg2',
                administrativeAreaLevel3: '60x3jcs4ry45lm2qfdacpm8bas549tsethim8oyzimg7otbvga',
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
                id: '84c5c9df-b290-45ca-ab9c-2a5df3f1171c',
                iso3166Alpha2: 'ue',
                iso3166Alpha3: 'e51',
                iso3166Numeric: '3ym',
                customCode: 'agbgo17lj0',
                prefix: '9ln5x',
                image: 'http://placeimg.com/640/480/people',
                sort: 576238,
                administrativeAreas: { "foo" : "bar" },
                latitude: 31214386211836640,
                longitude: 139389064197480380,
                zoom: 48,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Concrete Tuna',
                slug: 'suscipit-est-ea',
                administrativeAreaLevel1: 'tyov53ld6m7p7hm3ctu2e545qz77rlm2td9ztr3uqqn00j02kn',
                administrativeAreaLevel2: 'c021bkxy8g955ykhkp3lfx3vvn6rl0o4j7c87uynstt35n8bnx',
                administrativeAreaLevel3: 'ozzbub95kk672geiswswi7lgol1nhstbamuz7ycg5t9b0zoxlc',
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
                id: '51723943-9865-44fb-8445-13929aac1f26',
                iso3166Alpha2: 'kh',
                iso3166Alpha3: 'wdd',
                iso3166Numeric: 'i7h',
                customCode: 'kc14x4qxpe',
                prefix: 'hgshx',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 972548,
                administrativeAreas: { "foo" : "bar" },
                latitude: 30151068084903456,
                longitude: 81261348027661540,
                zoom: 556,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Steel Hat',
                slug: 'quia-qui-incidunt',
                administrativeAreaLevel1: 'iyvwmxd8y89pkrcn346n0nbpccepgfspd642jk8b3t00okzmyl',
                administrativeAreaLevel2: 'ytohmcvlee213etn7c65xnvla3ouxidiocnsq622zqutax6jrm',
                administrativeAreaLevel3: 'jg3kq65rky9w1ym7suj7erd7ub714i1onz6q4nlfni7i3gq3ek',
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
                id: 'fd75b4d5-cbef-4315-bd81-4ac7a348ad85',
                iso3166Alpha2: '9h',
                iso3166Alpha3: 'z43',
                iso3166Numeric: 'ek1',
                customCode: 's50zbpg9ao',
                prefix: 'mw3a4',
                image: 'http://placeimg.com/640/480/nature',
                sort: 330932,
                administrativeAreas: { "foo" : "bar" },
                latitude: 17816985296185426,
                longitude: 74843582431585890,
                zoom: 25,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Fantastic Steel Tuna',
                slug: 'hhzflangi4xtg66nsteri9tbt0e6obedwkg7ecsfqd1r08tk3g7jrb6lncit9fv4f41bmrgfx7otccsai0h83owbwv7gv8l0yy4dp0hw0hzefswrj86q85jzq1n4aqyriu758evj9it9d25ladoedfi7a9w2mp2qhw0vst3f3u7o1y6ko9bthmkpap6316wmjacq2inu7t54x9bhp4jaxrlvqqrt3bl7pf5gsh4q6nstm62v6bg4nok6c565ckwdm5ox53i72r1o4c55g8ar9p66pge6sqm15eg7iu656choryb9b0syxvmkua21v14xdtr20bt3te0trimyvbargahi0ja5oite7skzkm21tdeg0yejk77okktqbn0pyfzog2kok6zwuzg6fx9pd0t1krd0zulnvmpp7pn6g7glqt1wcjro4ebduxpz2meir7hvlrrgxj38pagarjvr6ce8ipiek0o7g3gosvyqsbyqqhhx7ch2yn8933qz4xr7lqqtmu26dauthiugxkusdrv4x92hll9hkb8bbv4tnx5plgju4dlx09k5tht6lewkwr2zvu55gwjea96w1ymsoh8demcykzimwdjd9x008fpc9br8fn60bwtwz00tzkogqewll1488h22nrx0oq2ndam87bl0cdjwokoc35rjj8lrf8cqggjeorfj9lhss880v951zmf88b5htkvk4pp5kfuc8s7g90p3zwi7e5ck9sikti7lfdtyqeoaz8snp4iq98infun2xyhw5ep0v9v0bl3hsjneinnnhhcijh631m9f6tko6yjgv31sslbhx9dbq4y86s2130jbofgghrb2k9hfut2o3umpzd5zjym828iquyu8vigkewbgytczn9lpy0i0nzrbf5916d113rn2fhz6th42pdj1umva70en7lseecoaa97n8by0jsk3mt43ythe977smefbwp2jxi9z688jnyv3s4gsfdcql4954qdzhv3ygw99knkng0tfsu4x32o1x',
                administrativeAreaLevel1: 'f635mgva1bnygopuuri26lnom5ik6521hlsl27h191s5fckqw0',
                administrativeAreaLevel2: 'w14stk3nw7zc32b2jhxlieucoyo3yal6jfz7aq51vfz7am0fsh',
                administrativeAreaLevel3: 'o08onevcdqzwg2x0itgdy4igyuv7lrjy00lhjyie2allrz6iwq',
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
                id: '7bc83b61-3902-4b4d-a49c-4ee05e007763',
                iso3166Alpha2: '20',
                iso3166Alpha3: '3r2',
                iso3166Numeric: '7u5',
                customCode: 'imacrvgj4u',
                prefix: 'rp906',
                image: 'http://placeimg.com/640/480/technics',
                sort: 608689,
                administrativeAreas: { "foo" : "bar" },
                latitude: 63353570162500080,
                longitude: 59404343271596424,
                zoom: 52,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Rubber Bike',
                slug: 'ratione-iste-magni',
                administrativeAreaLevel1: 'xay9povihbwxvmmgxonah6ccx74rxvut7hizxbn8tuhedsfe3cs',
                administrativeAreaLevel2: 'fxtin47an3hyg7zgajgw2vvmti1xztcvvg3qhtdvuiyj57elyg',
                administrativeAreaLevel3: '8p4b0j40oacubgqs9q4y33n3nm3o5jphw3vmd23kcaz9bz2xs9',
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
                id: '1a29cbda-a1a4-46c3-962b-db1910d7e8e5',
                iso3166Alpha2: 'wr',
                iso3166Alpha3: 'y1v',
                iso3166Numeric: 'cl6',
                customCode: '7k5fgp2m84',
                prefix: 'ruxyi',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 912511,
                administrativeAreas: { "foo" : "bar" },
                latitude: 79274392379685660,
                longitude: 69027658355030296,
                zoom: 81,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Plastic Hat',
                slug: 'laudantium-ut-alias',
                administrativeAreaLevel1: 'rqfdbkxpegk5epjsnbqo3rek3sn416nh2vzu72ptp54erwvtpo',
                administrativeAreaLevel2: 'rjb98zdpk93j59d5ofn59zklzsppzenvnql5cfgjb47y30l2ffx',
                administrativeAreaLevel3: '2iywjej87ejgx2okfawpqcpkv3emn78fu969zbsvywdreshfdw',
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
                id: '9888f320-2911-4838-9eb1-307e9c758a47',
                iso3166Alpha2: 'bq',
                iso3166Alpha3: 'ywy',
                iso3166Numeric: 'tkr',
                customCode: '8bqw1ghl23',
                prefix: 'efp21',
                image: 'http://placeimg.com/640/480/technics',
                sort: 665091,
                administrativeAreas: { "foo" : "bar" },
                latitude: 11942535295014946,
                longitude: 32768799167969756,
                zoom: 51,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Concrete Gloves',
                slug: 'voluptate-amet-cupiditate',
                administrativeAreaLevel1: 'qvzow45yebsqklh1rzan2z3fvggdqzhe8tkifw0w6sbjk6tvn5',
                administrativeAreaLevel2: 'dt3g31cbr69kq25lx7pb6ytu39aeamwx65blszmats3wrand2f',
                administrativeAreaLevel3: 'rss4t3bzjrn9kwxsm1nws0ycuavdlsbrb7jafvk4kshihlsvllu',
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
                id: 'c44a9967-59d8-4385-b7b0-e3afb071dc08',
                iso3166Alpha2: 'w2',
                iso3166Alpha3: '7ac',
                iso3166Numeric: 'e0n',
                customCode: 'aqy9eha5cd',
                prefix: 'xl4gi',
                image: 'http://placeimg.com/640/480/nature',
                sort: 484791,
                administrativeAreas: { "foo" : "bar" },
                latitude: 96469858119400750,
                longitude: 21991821003319628,
                zoom: -9,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Soft Gloves',
                slug: 'molestias-sit-fuga',
                administrativeAreaLevel1: '64y562mxy29xewgjh30oskf2zbc501ttql2dl34m84qavnbcdy',
                administrativeAreaLevel2: 'uuvrhh3wygs8aceu70od08m1vtkydl3jhfr32a8es8xd3dur7r',
                administrativeAreaLevel3: 'y9sqi9sc97avr92gw8wygphv6ty820xig28pwgj9iq5vkqyybj',
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
                        id: '159379ec-b174-4d44-a048-4f02786da9bd'
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
                iso3166Alpha2: 'n0',
                iso3166Alpha3: 'b6v',
                iso3166Numeric: 'e23',
                customCode: '62zpi9pc4z',
                prefix: 'bs76p',
                image: 'http://placeimg.com/640/480/animals',
                sort: 354501,
                administrativeAreas: { "foo" : "bar" },
                latitude: 49003578614653850,
                longitude: 88237483171244420,
                zoom: 92,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Cotton Chicken',
                slug: 'rem-qui-quibusdam',
                administrativeAreaLevel1: 'cnfq9r6oaymn4vcgvm7ze7u0gqkvh8383vunf7o1j35sbqk7qk',
                administrativeAreaLevel2: 'llnv9ihrmdj82ea8770uidkwnam2smwbnt4mw06mp5u8essjhr',
                administrativeAreaLevel3: '62lkfos8pgvbdlvtgubt3nfsda9kz473whidqnyv5qjry0s5wx',
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
            .get('/common/country/be8871c4-7e28-4ba2-b8eb-28b8b0c52a9c')
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
                id: 'ef9f88c9-1437-4ea7-838a-7976fb49ab22',
                iso3166Alpha2: 'he',
                iso3166Alpha3: 'b6x',
                iso3166Numeric: 'j9s',
                customCode: 'zdwigym53c',
                prefix: 'd426z',
                image: 'http://placeimg.com/640/480/technics',
                sort: 162605,
                administrativeAreas: { "foo" : "bar" },
                latitude: 84236509147306430,
                longitude: 98304588832551220,
                zoom: 78,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Steel Hat',
                slug: 'modi-rerum-ex',
                administrativeAreaLevel1: 'cj0vlwdvwi03jjjsqr2tuc7ji0gz4iya4d5ueovhpwnqeq6diy',
                administrativeAreaLevel2: 'l9frbnrc0y1chflcdimar5jzzd4uqfwaliz87bssr364pyviuv',
                administrativeAreaLevel3: '8s5sjq3sdxghn0uxhcvm8zgztvv7l0hu8fs8i2x1ol2n85lpz9',
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
                iso3166Alpha2: 'rs',
                iso3166Alpha3: 'qqc',
                iso3166Numeric: '12d',
                customCode: 'tjt1yh8pv0',
                prefix: 'qxz1m',
                image: 'http://placeimg.com/640/480/people',
                sort: 398884,
                administrativeAreas: { "foo" : "bar" },
                latitude: 22269740509810732,
                longitude: 88058898417470020,
                zoom: 72,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Steel Chips',
                slug: 'aut-distinctio-cupiditate',
                administrativeAreaLevel1: '7up5dz9xyqeo0gt6qb4e8uwtlks98e9v4iwvmhqzqhhvy5ehtt',
                administrativeAreaLevel2: '29p1gyz991kt5cabixp82pxu6d7j3nfk76srpfpipvltuwhoj5',
                administrativeAreaLevel3: '7xwbmntglj9jl0g5lajeigctxbdykrey6xirzgz46xe0kibehf',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/4cb212da-96b9-4ef6-a035-bc14755804dd')
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
                        iso3166Alpha2: 'wj',
                        iso3166Alpha3: '9hr',
                        iso3166Numeric: 'i17',
                        customCode: '2pa0q6wzg8',
                        prefix: 'x8j57',
                        image: 'http://placeimg.com/640/480/nature',
                        sort: 357918,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 72957435381783490,
                        longitude: 30000275187174936,
                        zoom: 27,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Rustic Wooden Soap',
                        slug: 'eum-sit-ipsum',
                        administrativeAreaLevel1: 'l1bmwdf9g83kabinf4f24z2hvduru20u9fs614cnpp3adgq85m',
                        administrativeAreaLevel2: 'l8y8b3efq8slopy6o5d163yxpdutip23h8g994l4je8d5s00f9',
                        administrativeAreaLevel3: 'q3qwlr4gv31y0s1k34u39agfhqxpd1vcztg7sv3rlcsrg1ynzx',
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
                            id: '277ba42c-cbd6-44d4-ba53-c5c2c6281fc9'
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
                    id: 'a1fe3c6e-f07c-42ff-938a-40081b82b0c8'
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
                        id: '5925f2a5-79dd-49af-b220-9ab22558dd63',
                        iso3166Alpha2: '6j',
                        iso3166Alpha3: 'zwm',
                        iso3166Numeric: 'lsi',
                        customCode: 'euujya2t4w',
                        prefix: '30br6',
                        image: 'http://placeimg.com/640/480/people',
                        sort: 797721,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 80181717522354500,
                        longitude: 17531332646281276,
                        zoom: 42,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Generic Frozen Chicken',
                        slug: 'nemo-laboriosam-voluptatibus',
                        administrativeAreaLevel1: 'ww9sqawrwudqr0zqhq0tm0b4rflcfekgpkx3knel0eu72cc3pw',
                        administrativeAreaLevel2: '6yquoftlb0rtln1qo3x3lithwrhpqlwljgeryby4cqwgsnb69c',
                        administrativeAreaLevel3: 'apxnvccz6uggux1wyszxe3a7m16aj15p1nfjj3853w5j44ncjp',
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
                        iso3166Alpha2: 'ax',
                        iso3166Alpha3: 'swp',
                        iso3166Numeric: 'yao',
                        customCode: '4d86gd13zc',
                        prefix: '8hc7e',
                        image: 'http://placeimg.com/640/480/cats',
                        sort: 778872,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 54247961225504190,
                        longitude: 62625607797479200,
                        zoom: 23,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Sleek Wooden Keyboard',
                        slug: 'aut-dicta-doloremque',
                        administrativeAreaLevel1: 'rn7j25fuxlrhn0jagq0q8dnekzr8q1eptrdgi3drp9d4snmhax',
                        administrativeAreaLevel2: 't7amimbti0x5b8egu4244ns0sktoc9mkf820xpuh6r1c10hqf9',
                        administrativeAreaLevel3: 'f98dxvqscvy4n4per25shmoacnfujqaummkypi16s9mnxg5f5l',
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
                    id: '188b6d4c-2e04-463c-8c6b-6c5a157ae441'
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