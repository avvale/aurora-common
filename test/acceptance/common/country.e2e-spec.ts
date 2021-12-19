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
                iso3166Alpha2: '8s',
                iso3166Alpha3: '7fo',
                iso3166Numeric: 'dpv',
                customCode: 'ij9skaef8s',
                prefix: 'pfdfk',
                image: 'http://placeimg.com/640/480/nature',
                sort: 587650,
                administrativeAreas: { "foo" : "bar" },
                latitude: 57230295022651930,
                longitude: 42177960960001520,
                zoom: 26,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Steel Hat',
                slug: 'ipsum-ad-minus',
                administrativeAreaLevel1: 'lwqj39bmapbcak9p6gbjqhhkae4cr1cq6dk2tk2s6jue7podds',
                administrativeAreaLevel2: 'uhoaw4o02mbwztf8kexqtgehhjyn50uoxi6tkizn8kld85rqvu',
                administrativeAreaLevel3: 'o5kgl82mofpffdlyz6vhs5ccppmdhhrj7ouv70khr2kwt51h5i',
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
                id: '4c8e8c98-7842-4ed7-bdce-a3d0d5ba317e',
                iso3166Alpha2: null,
                iso3166Alpha3: '21w',
                iso3166Numeric: 'c1m',
                customCode: 'c5o8ehubgn',
                prefix: 'n9lnv',
                image: 'http://placeimg.com/640/480/nature',
                sort: 673257,
                administrativeAreas: { "foo" : "bar" },
                latitude: 25887889445240184,
                longitude: 79166749262373250,
                zoom: 38,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Granite Shirt',
                slug: 'voluptates-vero-eos',
                administrativeAreaLevel1: 'pzd522t2qmnj7e661ec9ntcx4epmquffd8v2d1n7p55nrd4z3a',
                administrativeAreaLevel2: 'el8bdhgmu6od2otmeabefbkfjwx4b9h50e0t5zjfx6ubqbxzw6',
                administrativeAreaLevel3: 'usxpcahoqciqnizg54wj95q03yyikxcf8mum2h290llh0bbkmx',
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
                id: '7b64af50-0d37-4d67-a8a8-4d986546b275',
                iso3166Alpha2: 'zm',
                iso3166Alpha3: null,
                iso3166Numeric: 'jbs',
                customCode: 'm0sq8tdd7t',
                prefix: 'tsfrk',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 796218,
                administrativeAreas: { "foo" : "bar" },
                latitude: 20697760359804336,
                longitude: 63549136230242100,
                zoom: 18,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Frozen Chicken',
                slug: 'iusto-provident-vero',
                administrativeAreaLevel1: '9eme9vr9y7ttciufxsea619gq0yt1emxd45bv0chu5xl7h4pf3',
                administrativeAreaLevel2: 'jvs7okvg641ngyg6yytepb0903oewvfde36ld9dxikahmdohvw',
                administrativeAreaLevel3: 'bs640l718kb7un4o0qbn3b1li326ya7n6p3lwxh8nfpchykc8y',
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
                id: 'd8cb71fc-7dfc-4e32-bf20-7926ad68e97a',
                iso3166Alpha2: 'e9',
                iso3166Alpha3: 'u4n',
                iso3166Numeric: null,
                customCode: 'kkj1wvgtnv',
                prefix: 'kpgb4',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 919451,
                administrativeAreas: { "foo" : "bar" },
                latitude: 36674522842977380,
                longitude: 90542072683485280,
                zoom: 95,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Metal Cheese',
                slug: 'itaque-eos-fugit',
                administrativeAreaLevel1: 'jqnj8hwwfxbgcjdor2feixhh57kc8u93o8oj0vghc225b2d5ox',
                administrativeAreaLevel2: '203usuirqnbtnp03pw3vrpq9y95wf3qv0jqh19gpvqwt2p3vka',
                administrativeAreaLevel3: '859jnawpk9izd2rhc580jwsnmxa9ptl2knbo7dbw95kiifwdoy',
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
                id: 'a4c101a2-3a94-425b-a6b3-486c82b85af8',
                iso3166Alpha2: 'ul',
                iso3166Alpha3: 'jv0',
                iso3166Numeric: 't8w',
                customCode: 'dxfoh63x1o',
                prefix: '1j097',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 545129,
                administrativeAreas: { "foo" : "bar" },
                latitude: 10438901078521170,
                longitude: 94922831056404320,
                zoom: 20,
                langId: null,
                name: 'Rustic Fresh Bike',
                slug: 'illo-saepe-ad',
                administrativeAreaLevel1: 'dtdyl214cfilx8sut7tqi0cgndgu1qufee1s4gam7wxscaju54',
                administrativeAreaLevel2: '900lw3435mh9w8j9h6t5cxaj1uhfgh6r0xi4biv0srhjv69uzi',
                administrativeAreaLevel3: 'vthyob5f9yhneivenaw4gqc8907lr1lnjs8vimqtykyzhutbux',
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
                id: 'ae7a3298-628a-482e-8d0d-35720f3c040d',
                iso3166Alpha2: 'gc',
                iso3166Alpha3: 'pvb',
                iso3166Numeric: 'sz3',
                customCode: 'ricgrvalrm',
                prefix: 'ynqf9',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 758191,
                administrativeAreas: { "foo" : "bar" },
                latitude: 70228628483645170,
                longitude: 44114270193451300,
                zoom: 67,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: null,
                slug: 'culpa-voluptas-qui',
                administrativeAreaLevel1: 'q7q1amf87tofvmikhp0zbiklqnshrczzkpxo57d5b5alz3sxgh',
                administrativeAreaLevel2: '7bi8emmrfv4z3wvx9z7vvmyzsh608x62iyy2cugna3slrogvp9',
                administrativeAreaLevel3: 'jhquxnmkk8rmpngrdyge6upmq7zxc9dlpswj3nl5by0tn16f6u',
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
                id: '6a8885e3-0853-464b-a41e-ac704b065173',
                iso3166Alpha2: 'b2',
                iso3166Alpha3: 'sf6',
                iso3166Numeric: 'ful',
                customCode: 'n3eqv73c49',
                prefix: '3m027',
                image: 'http://placeimg.com/640/480/nature',
                sort: 773049,
                administrativeAreas: { "foo" : "bar" },
                latitude: 42353601820965600,
                longitude: 64659122491492280,
                zoom: 30,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Plastic Ball',
                slug: null,
                administrativeAreaLevel1: '8itg3upkxcaxab9zet9s8v66m5erbmja8o7bni9t6axv70e598',
                administrativeAreaLevel2: 't799k4xyrn0l9kn91odedwm1yfnjgze4yrh1yqu2ke8lgiggpl',
                administrativeAreaLevel3: 'rnpfme0kxx2skezza5rbip10en341nzppo05qilbw187cnu2uf',
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
                iso3166Alpha2: 'z8',
                iso3166Alpha3: 'is2',
                iso3166Numeric: 'w7u',
                customCode: '2wtd04gd4q',
                prefix: 'p94zl',
                image: 'http://placeimg.com/640/480/cats',
                sort: 928879,
                administrativeAreas: { "foo" : "bar" },
                latitude: 53447866402925000,
                longitude: 29547527908006010,
                zoom: 52,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Soft Pants',
                slug: 'aut-doloremque-ab',
                administrativeAreaLevel1: '1rm99310w2qjyujvj2n42w10925h6w0dotl191twe78jftzf4f',
                administrativeAreaLevel2: 'cw00rr7srhyy8jattfvfnfoazp1bmv4oc99c2nefphx63d1y37',
                administrativeAreaLevel3: 'csg4xd979ul77dbd92dozverkdkyzuafmwb1vhj88m6ric2f06',
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
                id: '595eab91-82cf-4a4c-9bfe-e950538de64e',
                iso3166Alpha3: 'mkv',
                iso3166Numeric: 'x76',
                customCode: 'kvt528qhhc',
                prefix: 'o7lq4',
                image: 'http://placeimg.com/640/480/animals',
                sort: 640574,
                administrativeAreas: { "foo" : "bar" },
                latitude: 66015226179422050,
                longitude: 36486667077049730,
                zoom: 89,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Frozen Towels',
                slug: 'error-incidunt-nihil',
                administrativeAreaLevel1: '7irf4ml2hbg1za30ks9qnoas8rs2uygfigasn6stccx8zwksne',
                administrativeAreaLevel2: '1g5eajhp5o8lnnusxp2n5oktk65lf3r71byaehaz4wlvvndpcz',
                administrativeAreaLevel3: 'iohg33ronvmyslfbxm1czxy7wzgbh69jyp47klngmq9mz0u1i7',
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
                id: '3357b7e1-d47b-43bb-8d04-0739e70263f3',
                iso3166Alpha2: 'qo',
                iso3166Numeric: 'x9h',
                customCode: 'aii5g7944a',
                prefix: '9t9xa',
                image: 'http://placeimg.com/640/480/business',
                sort: 608135,
                administrativeAreas: { "foo" : "bar" },
                latitude: 71686342711574980,
                longitude: 25485401989773776,
                zoom: 68,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Concrete Chicken',
                slug: 'dolorem-qui-in',
                administrativeAreaLevel1: 'ofmc249tvq8jt2c5cozpfqapv8cazifo2e2q384duzsq6d423g',
                administrativeAreaLevel2: '0o3zu2c55fw1y2mneiomznzhc1g2nq5xzwo3cotid8nkvcp6el',
                administrativeAreaLevel3: 'eqi557y9ekbo2dhpp21jlh48h2hxbm5rrphmvqfi8p3bjjfkbu',
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
                id: 'c03eeb1c-f1da-403a-8167-adbc96067ca6',
                iso3166Alpha2: '1t',
                iso3166Alpha3: '62z',
                customCode: 'lwxikbekf8',
                prefix: 'pd8kg',
                image: 'http://placeimg.com/640/480/nature',
                sort: 404570,
                administrativeAreas: { "foo" : "bar" },
                latitude: 16333938843038334,
                longitude: 86823182772973520,
                zoom: 48,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Concrete Computer',
                slug: 'numquam-tempore-at',
                administrativeAreaLevel1: 'jkekwgs2cgternalk377sryju4an37btmh6g08whzqriec2plg',
                administrativeAreaLevel2: 'jzud0oo31r9fnq4kbc8xwev95k7wtrnboh31688udqgkdlzgvi',
                administrativeAreaLevel3: 'nwbqi0rkr9dxs8e9juckkt4kkubys40ppxz0et2lffhiqlzvyf',
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
                id: 'f9d72f76-7177-406b-9a99-6083d143c0da',
                iso3166Alpha2: '0b',
                iso3166Alpha3: 'zlk',
                iso3166Numeric: 'jph',
                customCode: 'n9jodj407v',
                prefix: 'yzwgr',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 233628,
                administrativeAreas: { "foo" : "bar" },
                latitude: 85849519362341220,
                longitude: 61356925372856030,
                zoom: 16,
                name: 'Handcrafted Cotton Gloves',
                slug: 'officia-alias-ut',
                administrativeAreaLevel1: 'ucs5s307fqntplegn18qymmxx8m0atoyj18rff9kumiv25flz6',
                administrativeAreaLevel2: 'mtv3pe43zkza2e7yyx4hefjmaj8ah4xw10x74eeyghluhnwqil',
                administrativeAreaLevel3: 'rj61sp91do307urslysrwlfs7rov17akph4bpw74yp35vq9ig3',
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
                id: '080e00cf-5ef2-4f99-94f5-5a7705349fae',
                iso3166Alpha2: 'lu',
                iso3166Alpha3: '57t',
                iso3166Numeric: '6z9',
                customCode: 's22t8uulv4',
                prefix: '5jpwc',
                image: 'http://placeimg.com/640/480/sports',
                sort: 810301,
                administrativeAreas: { "foo" : "bar" },
                latitude: 38294886090935176,
                longitude: 45932298742271180,
                zoom: 73,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                slug: 'enim-sint-alias',
                administrativeAreaLevel1: '1x5svlttkwx8mz9rv1q1q7n8sodz8hi9um8s5wxbldl73kum1x',
                administrativeAreaLevel2: 'd3s59jzaktvtunlt0t8i60ababhspmrvh5x65tq6rmbaizcivz',
                administrativeAreaLevel3: '812rygp6umx9onxjpt4nplz5vg13lgvjxn4z5v6xkhqklirl8q',
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
                id: 'f358b82e-9bd4-48ee-a98d-a622efdf5f90',
                iso3166Alpha2: 'x2',
                iso3166Alpha3: 'w8e',
                iso3166Numeric: 'nfe',
                customCode: 'g7qc5wzgaf',
                prefix: 'krtu0',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 970104,
                administrativeAreas: { "foo" : "bar" },
                latitude: 41269558682486850,
                longitude: 65819164195842040,
                zoom: 74,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Granite Ball',
                administrativeAreaLevel1: '20wfgk2ve0mw5tmpjgxkfj1vcocrv1se670yn4rul9f4j8no6m',
                administrativeAreaLevel2: 's1vzbqna1mf17deqmsuy52h91vydsrn9s9j5c56yrfg5me9t58',
                administrativeAreaLevel3: '6gduxkierzvo40do0wkb6hreqd96a2ckpk54pr3bcfw3e8zshr',
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
                id: '3zprqv92n83wutfljyfbw6kxjxg9yv2u2wyvm',
                iso3166Alpha2: 'y7',
                iso3166Alpha3: 'f3n',
                iso3166Numeric: '8s4',
                customCode: 'wmjzdizmst',
                prefix: 'unnrq',
                image: 'http://placeimg.com/640/480/cats',
                sort: 846013,
                administrativeAreas: { "foo" : "bar" },
                latitude: 93343095787246270,
                longitude: 79327099158574820,
                zoom: 94,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Metal Keyboard',
                slug: 'velit-distinctio-voluptatem',
                administrativeAreaLevel1: '64znv26fp054ro1f51yzvnxfy5coqpfz2qp8gbf94b4b4foh63',
                administrativeAreaLevel2: 'ph7l13v6gwpjwb88uw34c0c27w3zzypedlueskplsnd60ihxy5',
                administrativeAreaLevel3: '8q8zhny600dpdsju984he38tntlxbuoocg26hoj88dqrayxa86',
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
                id: 'e5a4578c-f558-4fa0-9dc9-696a54969be6',
                iso3166Alpha2: 'w0x',
                iso3166Alpha3: 'yw4',
                iso3166Numeric: 'ctb',
                customCode: 'ufegbskfzn',
                prefix: 'yixfy',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 867599,
                administrativeAreas: { "foo" : "bar" },
                latitude: 68300243614366744,
                longitude: 44324015450013230,
                zoom: 12,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Frozen Fish',
                slug: 'atque-et-molestiae',
                administrativeAreaLevel1: '1yv1qsbm686m7vmdvsmc3h3um9roccfk7uxs27uapu1sej8eyd',
                administrativeAreaLevel2: 'd7o8cqpa1a18r8yi893s02nirpwhu0uiy57c2i1qimqoa7vua1',
                administrativeAreaLevel3: 'xlzb3d8gt7zlls13kohoml2set849p7ym26nkp43qelicyogq0',
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
                id: 'bb09b7f2-1298-4c89-97a7-1954e24f1015',
                iso3166Alpha2: 'xw',
                iso3166Alpha3: 't69t',
                iso3166Numeric: 'jz7',
                customCode: '27wce2weoa',
                prefix: 'efj7h',
                image: 'http://placeimg.com/640/480/business',
                sort: 130181,
                administrativeAreas: { "foo" : "bar" },
                latitude: 72341733284304270,
                longitude: 94282006073301810,
                zoom: 23,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Cotton Sausages',
                slug: 'odit-voluptatibus-voluptatem',
                administrativeAreaLevel1: 'ni3k3udk8hhv024k2061lkshw9ac6t4icd5ngmr76w2na4a9zh',
                administrativeAreaLevel2: 'r4lcgdvszluqyym63y468myz6z1b9vaetyoj9tx07u48fvs6kq',
                administrativeAreaLevel3: 'q3u0y2zxwcidw8h5mvg9gy55jm7emnk4i3o1i87r3g0s2fkod4',
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
                id: '18bd712f-c52a-4b79-8e37-f970ec980e26',
                iso3166Alpha2: 'yd',
                iso3166Alpha3: '6kq',
                iso3166Numeric: '00tq',
                customCode: '12bdwvvava',
                prefix: 's9jal',
                image: 'http://placeimg.com/640/480/city',
                sort: 351322,
                administrativeAreas: { "foo" : "bar" },
                latitude: 70514442027901640,
                longitude: 82725384615050320,
                zoom: 34,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Wooden Bike',
                slug: 'quia-impedit-aperiam',
                administrativeAreaLevel1: 'fwiyjgrt6pon2ngxkvu99kp2u47y98e0623a0l46td7mif9p8v',
                administrativeAreaLevel2: 'ktf4owh2j3tnhtexmm023o1ft58z968qodsuqg851i5wl8t9zk',
                administrativeAreaLevel3: 'wwy6939tp530pa1m3xge6nrpm7i5fxc0dwt1yyz9ih789wuuv7',
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
                id: '0ffd9859-0669-4151-9990-2c1f9c99fd85',
                iso3166Alpha2: 'w4',
                iso3166Alpha3: 'rmq',
                iso3166Numeric: 'lka',
                customCode: 'bh8jd0wfp6',
                prefix: 'fts42',
                image: 'http://placeimg.com/640/480/city',
                sort: 190732,
                administrativeAreas: { "foo" : "bar" },
                latitude: 70821374070270430,
                longitude: 82562942877112430,
                zoom: 22,
                langId: 'dtqrdb7mgwt12va15oywmjgt7a48qwbocffld',
                name: 'Intelligent Steel Cheese',
                slug: 'occaecati-dolorem-nostrum',
                administrativeAreaLevel1: 'krba4i3qguwye3eyc8on3pe6kip2arlkelgfrr60cwfdn2whdt',
                administrativeAreaLevel2: '6r82kupupxwzgf8apbysrfxp8gohqnsa6nh37x4z9xvrawr45l',
                administrativeAreaLevel3: 'cat0klwcjrx4ws1r6tgrmqaggl27gp88i8rwp27hwzc9lbqks2',
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
                id: '5c12d335-2ee1-4250-aa21-9b9abee04311',
                iso3166Alpha2: 'eu',
                iso3166Alpha3: 'oox',
                iso3166Numeric: '3qk',
                customCode: 'd0baxj9cwru',
                prefix: 'yp9db',
                image: 'http://placeimg.com/640/480/sports',
                sort: 967075,
                administrativeAreas: { "foo" : "bar" },
                latitude: 62227751337141100,
                longitude: 20119894100539370,
                zoom: 36,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Plastic Fish',
                slug: 'ad-id-officiis',
                administrativeAreaLevel1: '0wz4wt3m17squstfrr6kyityqj9ued90y8rvlaf93819avmxfl',
                administrativeAreaLevel2: 'gwg1z3926bb75wy0emicp56qjg6plpxosz3d7i0h0s5rqy2x9x',
                administrativeAreaLevel3: '3gt8rljh4lfl1y7oy2sl72uki5ykjkj34hi47n09hjyb2ltx9q',
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
                id: 'ee80d1ec-5fdb-4f29-91ed-117a40d56433',
                iso3166Alpha2: 'p9',
                iso3166Alpha3: '2pi',
                iso3166Numeric: '2kf',
                customCode: '1ujskidkum',
                prefix: 'cotlv4',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 908821,
                administrativeAreas: { "foo" : "bar" },
                latitude: 25834211714182340,
                longitude: 22219403054103690,
                zoom: 68,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Soft Sausages',
                slug: 'veniam-ab-laboriosam',
                administrativeAreaLevel1: 'oveo6vn82xnq0moqxgnj9ykotooqnfifddbzxlrqg8aensc83t',
                administrativeAreaLevel2: 'sau4ld7dpfzs9jjxsxz98ve1rrz8p060tw6ppmbfmjezduqqnl',
                administrativeAreaLevel3: 'trulowt187uosvv5fy63xdrsrj361i8v54bz32c2ny7fog5ivf',
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
                id: '8e888cf8-3298-4fd8-8514-54631d7f1524',
                iso3166Alpha2: '5t',
                iso3166Alpha3: 'c68',
                iso3166Numeric: 'lze',
                customCode: 'x1zb0yt0bb',
                prefix: 'p8qvu',
                image: 'lqxvg25nbxfherz2npcdlzdq13iahmg2kxxb13b0vbylpbc0ytes51gqgj3f6wfx031idv0tpcyf7ivus2jn3jn61mc03aeod1sqixqzzq1oh1iohejta9nnnkawq806cf4b5ac70b8y0zlbdbjainm323hzzqv9dahmwe2x6s6heo5vkslwgdf4f2gsa297z3kseco1551efgjc80956met2s6urlt24dd9i9i8mbrcdbolmml7p505d9uxoz0wsb4nmxfy2r3krt68o4iv69y7ate740wixss6sripqruxvxtvi2q222z8pergl43fsuvtly9ftk8iv7kf1dj3jbyjmt9lw6jpkm2y5bom9copgavj6y4q1efycg2vs2o9u4gnnyrllma4dw0pntdey6gv718tp5y7y78nk2ayypvqq9fmxxrqdacnklot0bfn1mqmqtopri9n1xjq5qslqcppim7xi65kkcq0swvpf9wmg58lsx5eoc2iq67ijdo8fjyz2al92l72fafcrmhmsdp2vddh78u2noyfruoztcw6dx1tsar9e2v77urikgud6hzs1iwy77vfdfpjhth7ykzfu5alo7nl61dd29y8exfkwr54ixrbq0a5xnty83pzu7927nj8ecwxtzl3kspa9x10xahac9qz6p01vybyn827moj1969cs32n3u4x5lytihkw2md7fzrqt3gvd9xol3bpnhg7vsxa757q9xwzblug38m7p1u723a23wjgdhr9hgzlc5sr9jtkiwvi9dn01xo4cs2ryk2eqm9hzwbeffkvqvncned5fwyaz13e01nixoa6wnz10iwpzstuze0tc0e8ge8q7ox37syvyzw30adu7kgbncp7kgb47thyvb1oo9281avhvj04xdnep0ezv7m0p2l025mr0o1zta8xmn25rzpnq2qbtsgntqgm6l0hyaigjzuacmv8pw6iv324exp5ll1gm0w4fm1w9xiek2vvpkzr99bia4zj75xaqdwxt',
                sort: 806826,
                administrativeAreas: { "foo" : "bar" },
                latitude: 50585224744491830,
                longitude: 49117538328153740,
                zoom: 82,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Frozen Bacon',
                slug: 'accusantium-et-nobis',
                administrativeAreaLevel1: 'xt7o0cu8o490r5ufly3vqsesgwv6uxfqsz967iqebmag48849u',
                administrativeAreaLevel2: 'pwjgf7obzjmq4hl0u2r83jw0ycp6ihbokw730lvkgusfyk31zh',
                administrativeAreaLevel3: '5becblr1yyu00ijof2yw745mnz6q04aia5usijqmi8psb8pu3l',
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
                id: 'ded90ce8-fb93-47d0-b531-330fe4820786',
                iso3166Alpha2: 'fe',
                iso3166Alpha3: '15x',
                iso3166Numeric: '9ox',
                customCode: 'f80jrjf8xm',
                prefix: 'hh4hj',
                image: 'http://placeimg.com/640/480/sports',
                sort: 4825886,
                administrativeAreas: { "foo" : "bar" },
                latitude: 98554153556106910,
                longitude: 95650491160780160,
                zoom: 66,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Concrete Bike',
                slug: 'dignissimos-quod-sunt',
                administrativeAreaLevel1: '1082r5xxjww9fa98swhtez7ph4xojv1tsid1u0zjq1d8eeftlr',
                administrativeAreaLevel2: 'ysk6icm8b0yv9zzzbqtmne0pntda41ddjxgcf3m2b0x9egng7s',
                administrativeAreaLevel3: '97w5sxjr545jhf5cvtfjsoip7sbr0o0gn4ew1n86allcbhlsye',
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
                id: 'eb29c109-7363-41a6-9785-017316a1d6c3',
                iso3166Alpha2: 'qm',
                iso3166Alpha3: 'v7j',
                iso3166Numeric: 'sex',
                customCode: 'o1799etp69',
                prefix: 'l8fyf',
                image: 'http://placeimg.com/640/480/nature',
                sort: 453012,
                administrativeAreas: { "foo" : "bar" },
                latitude: 861161577850749200,
                longitude: 18024532776280980,
                zoom: 43,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Granite Gloves',
                slug: 'voluptatum-nihil-quasi',
                administrativeAreaLevel1: '96bg5dno92ndu15rz8asgten1z68wfmv2qsr1m2wd8299q8c2r',
                administrativeAreaLevel2: '0ucprok8vxn547mlzlcr87qplniv2w6f6enk916wlzv3mr2bkv',
                administrativeAreaLevel3: 'c18cilisslrva02iplt7zm9rklh0bad45w0vk5d1anrljbsg3y',
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
                id: '3c7dc9ae-cd94-4fd9-a003-5cb18bd5b393',
                iso3166Alpha2: 't1',
                iso3166Alpha3: '0gx',
                iso3166Numeric: 'vww',
                customCode: 'cdgkhj1kse',
                prefix: '0emrw',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 723802,
                administrativeAreas: { "foo" : "bar" },
                latitude: 98478855810982770,
                longitude: 652319068770589400,
                zoom: 23,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Frozen Bacon',
                slug: 'amet-deleniti-aliquam',
                administrativeAreaLevel1: 'i1isca3cd2utgz2ogcj39w5hvijrddp8jxl9ar1rax1888g6av',
                administrativeAreaLevel2: 'ej179ly1xc3uwbbobvp6qaj105awu4ul7rqgz7c4a74cyxnaqy',
                administrativeAreaLevel3: '8elpk0hg1h2zznt0tkv0jassqjm4bq5j1wdkbi66yz13gd2ucm',
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
                id: 'bd226d5c-7aa1-42eb-b30a-5999fd7e3b9d',
                iso3166Alpha2: '5e',
                iso3166Alpha3: 'hbm',
                iso3166Numeric: 'vsw',
                customCode: 'zwntl21kqa',
                prefix: 'iwww0',
                image: 'http://placeimg.com/640/480/city',
                sort: 698022,
                administrativeAreas: { "foo" : "bar" },
                latitude: 44181545211038024,
                longitude: 81417173147953860,
                zoom: 881,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Fantastic Fresh Computer',
                slug: 'ipsa-at-delectus',
                administrativeAreaLevel1: '985zxo3vvwjow3cdpyk8m6e52e8qwgwsj80vqnqrqko0qx9mfw',
                administrativeAreaLevel2: '5yam2pg1tscjlyhrl9vuzf55uax0ueo53h6rwhlbsdqrfdbtma',
                administrativeAreaLevel3: 'lxfip3m0cviiy0ag80jtwnje8ih3kvjuig3io5hsbdut9920o8',
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
                id: 'bf233f7d-ee59-4e70-bf30-5a858e844ef8',
                iso3166Alpha2: 'ej',
                iso3166Alpha3: 'qm6',
                iso3166Numeric: 'pxv',
                customCode: 'cec9s3e18j',
                prefix: '9bggw',
                image: 'http://placeimg.com/640/480/people',
                sort: 837053,
                administrativeAreas: { "foo" : "bar" },
                latitude: 49490426167478664,
                longitude: 12914119919643720,
                zoom: 43,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Plastic Table',
                slug: '8081c2x6byunlbs2qzuvw2z850ag4o3um37zc6iwr1h03zb7o9vh7u2a8afl94bb96sikvym6hfethpxridz646m7yulilrw3cpim8x7j8ybn8i5ov2mtaxhmhklpti52u4namk5qvkd1j0c5dfxtdj9apll5inn4evaw2j5rgiw5qqqo9b0suhmuazb3oymjmf89vq8d9ocg6kzw7m7gblmthi8kbrwkjyo6bgxnaeoewsni8ju237g9qqz5ilns4hdv2wxfgrntagkaiivth89twb6ry90adiig7f8ogdu7j0mfu1lbjl8sxofg0sg5bprp5gwqni2vvpz3olpmdrupwnqvyrai6nx3rjfxbmkygyboyzg2cjsifpaleb6m7bfl4lk7nypn8w18t04rrm2kdts8ra4y9drsvihiaw55pkoig1b193zj7vzmcss3fnb1dq3ozoqtn3rcpoi0wtui1l84n5qrm2x6ygcma0jt3ekhcfrnrvrdor9qzo1p1smenrkx9hvczf1jlr5rrxt95u7gra2bhxsdzum3tjhzy25yrkcogvj8wafv4a3zhn93tjr6o4zawo0gvn7l5fzztd8uhwz219l9sndloucsknl8yx6yr7n78kiqwmy10jqv9z14cuy4aq3dhl4fgtxpxuahrtf7ns1lwng52naocfmnwxa4m9cngusyp3h24rr2k4gglf7qabgbwscy2acvgehjk95k23xtpo0w29uoli27gp5dnk5x9iwsg9odblup0huho044m8y32ybjqnwv18z6tik2lz04llaypilvzu7n50phaqftre1jbs8p4iownl5sd2rlyteii65m3e9o0fag1a1vsw3ifgfode5vej8qmb2sqxq8g6il0j05g53u7dtgu13fjywldzfbwlkmarzt3l0natnir5fyo93oddeeep5vpesk45zrb0vvgndzsdkqj703rgq3to9vejkhi09x3ti99zf470vm38uy7xqr4nbexske6ygscz4h',
                administrativeAreaLevel1: '3s8afh96f2a4kafkx7jnzyqelo4u3q8eahhyb3uyn6r7andm7b',
                administrativeAreaLevel2: '3f4fcweq5gm1tr7vdorupn05bwoe1olk7itwzybly4evu3qop8',
                administrativeAreaLevel3: '3kx2abzfug0ddcnb8al0yn4ut1g3y2iwcolc0ic0oodcxsqi0b',
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
                id: 'efb9c77e-d651-40a7-b27c-86afa0cc96cc',
                iso3166Alpha2: 'n3',
                iso3166Alpha3: 'yru',
                iso3166Numeric: 'ovi',
                customCode: '375bczf05r',
                prefix: '8c6ut',
                image: 'http://placeimg.com/640/480/business',
                sort: 757963,
                administrativeAreas: { "foo" : "bar" },
                latitude: 74239811703854780,
                longitude: 99373124321040180,
                zoom: 21,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Gorgeous Soft Towels',
                slug: 'enim-sit-soluta',
                administrativeAreaLevel1: 'zz1ycm5aqyay2jktcjxouoahqf4cziovu4hlyxpnf1qa4tj9hx7',
                administrativeAreaLevel2: '5qtpby1olz1v8z81rqhsdtizftv5bvgfmee3gvqunvw4byr7re',
                administrativeAreaLevel3: 'xbpe6osb0uuzspf3nygcxere64d1zuzraya1ummnaobhozferp',
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
                id: '4505b372-bbe2-4449-97b2-3ac8273afba0',
                iso3166Alpha2: 'c3',
                iso3166Alpha3: 'k9e',
                iso3166Numeric: 'u3b',
                customCode: 'dwzroj4zzo',
                prefix: '0ybf0',
                image: 'http://placeimg.com/640/480/transport',
                sort: 812276,
                administrativeAreas: { "foo" : "bar" },
                latitude: 66560828262502500,
                longitude: 47828170139963990,
                zoom: 25,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Cotton Keyboard',
                slug: 'maxime-molestiae-ab',
                administrativeAreaLevel1: '3unq2cq4ehlfr37snzxok4h0gcrrg6x28mewslq7bbfvl55mfo',
                administrativeAreaLevel2: '1x4b7u6jl9qsliy950gf6r6b8fjzbhvc3u82397p0pwejnukmeh',
                administrativeAreaLevel3: 'ti4r3f56covqgh64f3lb3fachhthpdfodl2b5a8b74gi1w52z6',
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
                id: 'bc68b712-c4f4-4eca-9f2f-5e3033eb6ef4',
                iso3166Alpha2: 'kc',
                iso3166Alpha3: '4h2',
                iso3166Numeric: 'iqf',
                customCode: '9i3jb8gj2u',
                prefix: 'yvyr9',
                image: 'http://placeimg.com/640/480/city',
                sort: 423383,
                administrativeAreas: { "foo" : "bar" },
                latitude: 28612902599431924,
                longitude: 15386255250119194,
                zoom: 77,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Frozen Chicken',
                slug: 'repudiandae-quaerat-qui',
                administrativeAreaLevel1: 'vuvosl466jy47w0poyqymde71yvd1l6q6cqid7mqz8g8k1g8nn',
                administrativeAreaLevel2: 'uypwtvbi69s3jnyqd3wwpfnb9ujfjt232i6aha38an7d5cboi5',
                administrativeAreaLevel3: 'tocsnxfk91zlhlgz8tzkatthdjrzsk87ql5oczawhow0blxm6p0',
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
                id: '5ae6bf4f-bc63-40f4-9f6e-b75b8a9f90a2',
                iso3166Alpha2: '0u',
                iso3166Alpha3: 'cj6',
                iso3166Numeric: 'xnv',
                customCode: 'tmn39p5lj8',
                prefix: '5r40c',
                image: 'http://placeimg.com/640/480/animals',
                sort: 847212,
                administrativeAreas: { "foo" : "bar" },
                latitude: 80265976316985500,
                longitude: 59388175721537570,
                zoom: -9,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Steel Computer',
                slug: 'sapiente-asperiores-est',
                administrativeAreaLevel1: '3vrquqfdrx69w5i7pfrv6avjk5vn7bvzkhz1wpo1mkn1dfpyd7',
                administrativeAreaLevel2: '4526dcupgacuymv7vfnlccnx2wr1d0hng2l8540odl2av76slc',
                administrativeAreaLevel3: 'oy6l5itfqhm0e9t5de9rs49t65ls2w3j72egum05q3jep6e0hf',
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
                        id: '0fed7f31-c5c0-4a7c-91eb-e5fc9cea9179'
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
                iso3166Alpha2: 'wl',
                iso3166Alpha3: 'na6',
                iso3166Numeric: 'xdf',
                customCode: '2z3unxkjx3',
                prefix: 'zuxl4',
                image: 'http://placeimg.com/640/480/technics',
                sort: 742815,
                administrativeAreas: { "foo" : "bar" },
                latitude: 68953447964447496,
                longitude: 60702531988906690,
                zoom: 53,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Steel Tuna',
                slug: 'pariatur-recusandae-voluptates',
                administrativeAreaLevel1: 'qnxbs0fru2lte35yk5cjqjjut5tadex301subzx1vjhy6vc1c1',
                administrativeAreaLevel2: 'qv5jaleih2acfcnngpyjfhvx2myypa8o9cujrmz9ih90j50nun',
                administrativeAreaLevel3: 'r47qbi9cylms41o3ajjyxkqnypykawhtd00kp0yfsj2jib4mi4',
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
            .get('/common/country/7edea1c0-29e1-4403-abfe-73a1852f8035')
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
                id: 'e775b063-e92c-4cfe-a611-05f579aeca21',
                iso3166Alpha2: 'yk',
                iso3166Alpha3: '2iv',
                iso3166Numeric: 'a7w',
                customCode: 'oek159mid6',
                prefix: 'plc8p',
                image: 'http://placeimg.com/640/480/business',
                sort: 899464,
                administrativeAreas: { "foo" : "bar" },
                latitude: 92257550940831580,
                longitude: 97571913673895340,
                zoom: 64,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Metal Pants',
                slug: 'possimus-delectus-nihil',
                administrativeAreaLevel1: 'djve5mzroxvrtn8trhwwhgv9syvi75o25gfqnfg4p65fi8y6lf',
                administrativeAreaLevel2: 'z9n22qm7w9w13xvsn2k1kk3n6we4kkk0nopxyyhpawdwije4ky',
                administrativeAreaLevel3: 'fa3p21twg4g3fxzvdvw6a18tskczm56ndwwd6vuhnyp5womi5f',
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
                iso3166Alpha2: '6f',
                iso3166Alpha3: '924',
                iso3166Numeric: 't4y',
                customCode: '7bsl54hhxs',
                prefix: 'yect5',
                image: 'http://placeimg.com/640/480/animals',
                sort: 808156,
                administrativeAreas: { "foo" : "bar" },
                latitude: 32439139846533590,
                longitude: 47333480720187630,
                zoom: 37,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Rubber Towels',
                slug: 'assumenda-doloremque-voluptas',
                administrativeAreaLevel1: 'blqk2lxsax2x628w1m223vcizia9yrgbkyb6xlqhm831exnd59',
                administrativeAreaLevel2: 'o4oxzbnyjrxz0hi6pw9gz8p74cbzyjqs8qsch9fjlcffsk482e',
                administrativeAreaLevel3: '81qmkemnj5mjmrlxvt66gf9i92zvq49vmipwwd2hz25vhose95',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/9008e221-fac0-453d-8a9d-2c8fc7ef93f7')
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
                        iso3166Alpha3: 'n8h',
                        iso3166Numeric: 'pgy',
                        customCode: 'dmkdae4cfz',
                        prefix: '7omag',
                        image: 'http://placeimg.com/640/480/fashion',
                        sort: 308855,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 34992729078568816,
                        longitude: 38950199631009310,
                        zoom: 16,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Licensed Plastic Table',
                        slug: 'harum-facilis-et',
                        administrativeAreaLevel1: 'xlp8tx8vdlk31w8h9ojck45kk3j0he2u9jmckem7tsy5mumq24',
                        administrativeAreaLevel2: '472lg22799uxjhlo3h1ws9u1arqlaxhe1ijl0vns2fovx3iqvs',
                        administrativeAreaLevel3: 'mg89u0763n6km3vyynkv4wkci8texfrlhannnmxvco4a59auw9',
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
                            id: '4c9bb5da-c29b-4c2f-a9ef-72aee8ae9de1'
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
                    id: 'ebe6f497-b900-4ca2-878c-af3d2eec5c4a'
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
                        id: '7ff57553-a7ce-4413-b23c-172a9fea5593',
                        iso3166Alpha2: '08',
                        iso3166Alpha3: 'emp',
                        iso3166Numeric: 'og8',
                        customCode: 'je15r12436',
                        prefix: '880ul',
                        image: 'http://placeimg.com/640/480/cats',
                        sort: 641086,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 71366143626217680,
                        longitude: 58304607486926010,
                        zoom: 65,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Rustic Soft Cheese',
                        slug: 'rem-similique-aut',
                        administrativeAreaLevel1: 'moivdszebrcor5m0nourx6drof9pjeihk8wdn06nmcfoe166aw',
                        administrativeAreaLevel2: '3hv4y3fz8vo5zl25ru0u6jijdlhsltcsvwqihu5494113jplwz',
                        administrativeAreaLevel3: '9bbarx5nxb14pf0k2i47q5yf8dqnef7iciqqhlyeq2lk7sol7h',
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
                        iso3166Alpha2: 'b4',
                        iso3166Alpha3: 'xfq',
                        iso3166Numeric: '2iq',
                        customCode: 'a9u0uwfdwj',
                        prefix: '3v3ag',
                        image: 'http://placeimg.com/640/480/sports',
                        sort: 923086,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 76334781827026510,
                        longitude: 87547582216959820,
                        zoom: 57,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Small Frozen Tuna',
                        slug: 'dolores-voluptates-dolorem',
                        administrativeAreaLevel1: 'e2dld4iigjwsq6gh17x2m6qpi52p1yy8jmxvmhppc4eotj5hs2',
                        administrativeAreaLevel2: 'hmzk10yb9rziaz3maz2xn1zfi46iaqsc9hgj0ifsq2b1yamjdu',
                        administrativeAreaLevel3: 'zosaondefy8otsu1mnzco55j5j39vd37r9ss8b1g8swypcfkvu',
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
                    id: 'a223fa72-be27-44b3-bd74-a59ac69ded8a'
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