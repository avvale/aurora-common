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
                iso3166Alpha2: '3j',
                iso3166Alpha3: 'is7',
                iso3166Numeric: '2z7',
                customCode: 'zuv6owy3kb',
                prefix: 'sggye',
                image: 'http://placeimg.com/640/480/business',
                sort: 422933,
                administrativeAreas: { "foo" : "bar" },
                latitude: 26777212747586330,
                longitude: 65008822870290040,
                zoom: 59,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Concrete Sausages',
                slug: 'eius-aperiam-maiores',
                administrativeAreaLevel1: 'otzf6h9yc8c2csfuyl23o3ikoa1h1ms6w7wlnz7r5ld7hf377v',
                administrativeAreaLevel2: '0u1c1ydborhphus9wjprnntr2azdtzl8dvl3j96391tx9m5nw7',
                administrativeAreaLevel3: 'tk20ox20bxjqr636fdu3hnslk8a37n77oat4vg4ujzoca5hrq7',
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
                id: 'da5457e2-14b8-4a0f-a239-00007168b1b9',
                iso3166Alpha2: null,
                iso3166Alpha3: 's8r',
                iso3166Numeric: 'ht8',
                customCode: 'ecl6rv7am6',
                prefix: 'nsh13',
                image: 'http://placeimg.com/640/480/cats',
                sort: 533789,
                administrativeAreas: { "foo" : "bar" },
                latitude: 76920935589378770,
                longitude: 37623550784891280,
                zoom: 88,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Granite Sausages',
                slug: 'similique-veniam-eius',
                administrativeAreaLevel1: 'r0va39dlj40mpbek5ceak6anqawtp4t49rkslfynvmyesfl0y2',
                administrativeAreaLevel2: 'a12p474qk8ztvyp43utd37gpsj0ihgs1e6q0wxcenzr2a06z3u',
                administrativeAreaLevel3: 'fcwb2njr0mc5fvei47hsfopgf9k8xzblbbtastwchlkw1hvd56',
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
                id: '846296f5-0f1c-43ac-bba1-6c7b6c663403',
                iso3166Alpha2: 'wq',
                iso3166Alpha3: null,
                iso3166Numeric: '2pi',
                customCode: '589xsnx8is',
                prefix: 'nv2r5',
                image: 'http://placeimg.com/640/480/technics',
                sort: 292994,
                administrativeAreas: { "foo" : "bar" },
                latitude: 25256520228454480,
                longitude: 24088187078752956,
                zoom: 61,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Wooden Car',
                slug: 'nam-quos-voluptatibus',
                administrativeAreaLevel1: 'klkpw6nnqweyeouhosx7q5xs6ij4zp89sqe1z43mdez8hs20gh',
                administrativeAreaLevel2: '50kv9v0qq0nugme6x7md1b4ud9ncro5devlwynn67xjd1cte63',
                administrativeAreaLevel3: 'h6tgb5wl4odc5eaufr3pbruu3yit2a8vu8k0ssa5inf4b27855',
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
                id: '4ae925bf-76ea-48c1-b6aa-cec358297086',
                iso3166Alpha2: 'cv',
                iso3166Alpha3: 'b1s',
                iso3166Numeric: null,
                customCode: 'zoyf9we0m3',
                prefix: 'lxo6o',
                image: 'http://placeimg.com/640/480/food',
                sort: 449200,
                administrativeAreas: { "foo" : "bar" },
                latitude: 72057060362893600,
                longitude: 92960737913791760,
                zoom: 65,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Steel Mouse',
                slug: 'illo-est-et',
                administrativeAreaLevel1: 'c1r7uo9jhg3ztwwvodupdod0geb23wuorg01gxkcroww09jog9',
                administrativeAreaLevel2: 'izskwb6xvn40d7pu7n27rjj6frg9kymzw8jcrbrt5o1zfqhdwc',
                administrativeAreaLevel3: 'm6jxkz73jgkuggwpu9v65z1ygounit5yvr1hqcct7e15nanihl',
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
                id: 'e806cfcb-fad8-4842-be0b-b33d3ac7d6e9',
                iso3166Alpha2: '15',
                iso3166Alpha3: 'l1k',
                iso3166Numeric: 'ltz',
                customCode: 'okp9omk8e3',
                prefix: 'x0p4e',
                image: 'http://placeimg.com/640/480/technics',
                sort: 597744,
                administrativeAreas: { "foo" : "bar" },
                latitude: 10119133689971054,
                longitude: 48856431233702184,
                zoom: 90,
                langId: null,
                name: 'Awesome Concrete Sausages',
                slug: 'laborum-voluptatem-odio',
                administrativeAreaLevel1: 'l912dhx2xvu9sqxpmlgkzgmot84suexkumm08j2xlol77jjgnc',
                administrativeAreaLevel2: '2r3lelcxf7mdgp0zof8fqwr2oez0tadifx6bzi0csvsquo5esw',
                administrativeAreaLevel3: 'h5acubs7pzp092bypmv4w160lq3tx6j299j876xeksmeqyu0k6',
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
                id: '704973c3-9ba7-4908-ac6c-77f735452e20',
                iso3166Alpha2: '6l',
                iso3166Alpha3: '3d5',
                iso3166Numeric: '2rm',
                customCode: 'hl3nfngz96',
                prefix: 'v363h',
                image: 'http://placeimg.com/640/480/people',
                sort: 118361,
                administrativeAreas: { "foo" : "bar" },
                latitude: 63851391382317090,
                longitude: 41882386187888480,
                zoom: 62,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: null,
                slug: 'aut-recusandae-voluptatem',
                administrativeAreaLevel1: 'zae0k5hwmrn8v2x9oy82dlc36p8vx445u656wdsmv6w67f71l0',
                administrativeAreaLevel2: 'y042z358nfhwz9rhf6u12tnanhs7uyk0ztb8lk7gqvbk34tfyp',
                administrativeAreaLevel3: 'beoqt2sl0k9zrdsuo1mzl9gwl6d87icmeqfjflu78hvkxtozzg',
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
                id: 'b4ba6d33-5cf6-4d8e-ab1d-cf75a1bbafad',
                iso3166Alpha2: 'x8',
                iso3166Alpha3: 'nd6',
                iso3166Numeric: 'pqk',
                customCode: 'epskbxvq23',
                prefix: '7jvtx',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 772743,
                administrativeAreas: { "foo" : "bar" },
                latitude: 52868548533799464,
                longitude: 31323861827567076,
                zoom: 77,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Concrete Tuna',
                slug: null,
                administrativeAreaLevel1: 'mgc0c1yplq7j1sl5382xj0cnq96x349ptsa1elr9e0a8qrzyom',
                administrativeAreaLevel2: 'kuxo8275r28zegb6ahxuuusln1ufhr0zqinx0qr2s2zz9u0x13',
                administrativeAreaLevel3: '619etczw4rh8gteum0yy9qkg6yut6tqlzjk0dokush9l6jaqaa',
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
                iso3166Alpha2: 's8',
                iso3166Alpha3: 'pdc',
                iso3166Numeric: 'xg8',
                customCode: 'w8zx9n67ph',
                prefix: 'ljacz',
                image: 'http://placeimg.com/640/480/nature',
                sort: 906191,
                administrativeAreas: { "foo" : "bar" },
                latitude: 82677864132736100,
                longitude: 47287814998222020,
                zoom: 75,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Fresh Tuna',
                slug: 'delectus-exercitationem-temporibus',
                administrativeAreaLevel1: 'hz17owi5k1tuku3fjt7uq6kati7celeveire507yq27sdzv8jf',
                administrativeAreaLevel2: '2nfpwm86s1suof80x7d0y1tadrn1nkmt2tkcyzlugioxz0kyaq',
                administrativeAreaLevel3: 'l9s2ourpcvfcnabsrhxho3aabo4ghk1nuemtuevbqk6z64ejh8',
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
                id: '63549b9b-85ac-4a0f-accc-543a5b4b53fb',
                iso3166Alpha3: 'tps',
                iso3166Numeric: '173',
                customCode: 'iphwahj4wy',
                prefix: 'uk3mm',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 786119,
                administrativeAreas: { "foo" : "bar" },
                latitude: 41423324538295040,
                longitude: 78137060663548600,
                zoom: 15,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Concrete Shirt',
                slug: 'cum-sed-a',
                administrativeAreaLevel1: '3y6pm82e8s3cq7cf5q2ewnncdgui9kfnr5kr9baitg7i4j653c',
                administrativeAreaLevel2: '280uhbvm84sk05k7xvt1gvn6kq6bf2n0je1cssiye66bmynt5i',
                administrativeAreaLevel3: 'feg1xwsqfrnuynpke6bi9hx5hgumvxdppaavifl7tiiexfegij',
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
                id: '14b30966-59c5-446a-929d-d3a059fbad72',
                iso3166Alpha2: 'o2',
                iso3166Numeric: '18h',
                customCode: 'r78msg4pnd',
                prefix: 'z6fjo',
                image: 'http://placeimg.com/640/480/food',
                sort: 869552,
                administrativeAreas: { "foo" : "bar" },
                latitude: 60777599101390750,
                longitude: 79570585539205150,
                zoom: 46,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Steel Chair',
                slug: 'sequi-nulla-ducimus',
                administrativeAreaLevel1: 'ev9t8qqia31axoj7iqsc9vf09gabcxtz8f1ub00dv2m2tgqf0s',
                administrativeAreaLevel2: '4av0gv5sxph9ldw2sw1rn2k40z87w3o3tfv7gply49xu7bl8hk',
                administrativeAreaLevel3: 'jr8084to54z0ne40lp5i1lds37561scy3kpz7br6a3txce6h1s',
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
                id: '669f97ca-2cac-4649-bc4f-447184a66f60',
                iso3166Alpha2: 'fk',
                iso3166Alpha3: '7u7',
                customCode: 'k8a8ri1tjo',
                prefix: 'hk083',
                image: 'http://placeimg.com/640/480/transport',
                sort: 521913,
                administrativeAreas: { "foo" : "bar" },
                latitude: 44710708148419000,
                longitude: 82604477955823980,
                zoom: 94,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Wooden Bike',
                slug: 'qui-voluptas-itaque',
                administrativeAreaLevel1: 'nuax5lj34l5nqkx5d6gfrdnjs7u354pw8lyd6xsnoux4pksxg3',
                administrativeAreaLevel2: 'fk7vzv49bt4ylhkwr8enqdcymj8q05p7wjd8behq9hlx5fe4zk',
                administrativeAreaLevel3: '0qnbdpuocv36b7z9llzidqf20di3pjzx7nbk0dys7vb9h3o5ls',
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
                id: '6eb10f7f-5ec8-4604-8ebb-aeabce49d181',
                iso3166Alpha2: 'ju',
                iso3166Alpha3: 'utc',
                iso3166Numeric: 'ahb',
                customCode: 's2galb912a',
                prefix: 'goh7l',
                image: 'http://placeimg.com/640/480/technics',
                sort: 465901,
                administrativeAreas: { "foo" : "bar" },
                latitude: 44027415211658370,
                longitude: 29341218763980120,
                zoom: 44,
                name: 'Ergonomic Rubber Towels',
                slug: 'natus-temporibus-quod',
                administrativeAreaLevel1: 'z8zv9nzva17oau8d51h3ehebl3rxta9rslq43ye8280rtg8az8',
                administrativeAreaLevel2: '56tajm7nknosuytkp6jg7y3oo67dptltekw0ibylpy10u9q4ri',
                administrativeAreaLevel3: 'j4w0s9limrog9c5i34lkurhxlc26v72b4hhpf0x7eba2gqzq2b',
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
                id: '4a974632-de39-4b8e-8de2-24c7c0b4381a',
                iso3166Alpha2: 'dz',
                iso3166Alpha3: 'aoq',
                iso3166Numeric: 'rye',
                customCode: 'a00bhmfxbc',
                prefix: 'm1nyp',
                image: 'http://placeimg.com/640/480/food',
                sort: 600539,
                administrativeAreas: { "foo" : "bar" },
                latitude: 37731333639013870,
                longitude: 22161917625373660,
                zoom: 97,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                slug: 'saepe-quod-qui',
                administrativeAreaLevel1: 'hzmmedntoy1wekka8n5qnk55zez4a9y5oulpdvdm4wuc4gxf5e',
                administrativeAreaLevel2: 'mb2d3dlpjarc2j60b3kp77eaejk05qlw2dmtp5elxuqkzx2z32',
                administrativeAreaLevel3: '7di29yv7juekld1qg3uo4kfw8v648pg7s2macynm1ie4j3p3jw',
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
                id: '11b8744d-2d54-4144-ba9a-299be7355ad8',
                iso3166Alpha2: 'we',
                iso3166Alpha3: 'k56',
                iso3166Numeric: '4ok',
                customCode: 'ziccpyj4om',
                prefix: 'igjw4',
                image: 'http://placeimg.com/640/480/technics',
                sort: 549937,
                administrativeAreas: { "foo" : "bar" },
                latitude: 82119947266344780,
                longitude: 25970597999505960,
                zoom: 23,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Cotton Pizza',
                administrativeAreaLevel1: 'cl2fehlk9put6y7mrqy1j0esoeok2z10maffjivf3hw96puv82',
                administrativeAreaLevel2: 'xmls9pgt3tusdyr51wa5zzm7idtss57o4iwcvlbqtazl1ty70q',
                administrativeAreaLevel3: 'v2jnaemhxzm7xu5isp1iyihkvhxf67erjgdokzvw7ifl0ekalj',
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
                id: 'iw2fx9uyimlmwwg1jig3ven6mfkp2ekbsp33y',
                iso3166Alpha2: 'r4',
                iso3166Alpha3: 'khi',
                iso3166Numeric: 'sfo',
                customCode: 'uqyq2671ld',
                prefix: '1g6p4',
                image: 'http://placeimg.com/640/480/business',
                sort: 394786,
                administrativeAreas: { "foo" : "bar" },
                latitude: 52987614337958610,
                longitude: 81826166009324850,
                zoom: 94,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Wooden Chips',
                slug: 'blanditiis-id-neque',
                administrativeAreaLevel1: 'ofnrbr0v00rbjxiwru4h5okg4r4ebqpf16xyzmyf7be4duljgs',
                administrativeAreaLevel2: 'uhollxmvcx2fk29j81ej2a5emjahfewjjar320miwsd9rvl894',
                administrativeAreaLevel3: 'i37nmlpcsfzh1t167ztwea398hoks1aj4wy5vxtw9w9qt8h3io',
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
                id: 'fdab0556-ee43-4cae-a081-96969e092f4e',
                iso3166Alpha2: 'z4d',
                iso3166Alpha3: 'zln',
                iso3166Numeric: '8an',
                customCode: 'jp7ww5tfzm',
                prefix: '4hvvd',
                image: 'http://placeimg.com/640/480/business',
                sort: 730956,
                administrativeAreas: { "foo" : "bar" },
                latitude: 33920079721999070,
                longitude: 74345617611605230,
                zoom: 19,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Granite Computer',
                slug: 'fugit-deleniti-nihil',
                administrativeAreaLevel1: 'dc94d8a8feqhmw3h96hhy8de7jfewir7bpybvf1rl86lisjr1r',
                administrativeAreaLevel2: 'a31pskxjfz5yz7kp3piidvx7g4p6e3kku7fqq74iu7d5m3mhbd',
                administrativeAreaLevel3: 'jd3e9siloe2wvlsjlcpylhch3utwq0wd0h05h0gd9br64fn5qx',
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
                id: '402cc288-5fae-43a5-b0fc-7d0cb4f52481',
                iso3166Alpha2: 'zh',
                iso3166Alpha3: 'rlt3',
                iso3166Numeric: 'd6p',
                customCode: '5ektj7prjn',
                prefix: '8c94v',
                image: 'http://placeimg.com/640/480/nature',
                sort: 445198,
                administrativeAreas: { "foo" : "bar" },
                latitude: 54701298525999540,
                longitude: 90013062891304030,
                zoom: 85,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Wooden Bacon',
                slug: 'maiores-voluptatem-voluptas',
                administrativeAreaLevel1: 'bc1c8zxg4i6eyhyc7er188b1m55m1akumuz00ct58r0bz11vvc',
                administrativeAreaLevel2: 'uuxdv6q4xvjp4isykucn0teafepxv08flya2g72iu063f3ay0s',
                administrativeAreaLevel3: '5qpdo8ecex26kms9e2x2j3b672mgkf3k32rwi4ljfg6v4s6xg2',
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
                id: '3d4c2310-7d8b-4b74-beb9-1c65f9433ddd',
                iso3166Alpha2: '45',
                iso3166Alpha3: '4hp',
                iso3166Numeric: 'g232',
                customCode: '8rrx6lyi91',
                prefix: 'f99fz',
                image: 'http://placeimg.com/640/480/food',
                sort: 746558,
                administrativeAreas: { "foo" : "bar" },
                latitude: 44879070620475230,
                longitude: 98068596875968720,
                zoom: 97,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Soft Bike',
                slug: 'autem-officiis-et',
                administrativeAreaLevel1: 'tn2fpjzn6kzesgejs0b9nru8nco62na9af8818vj4f2grhuwng',
                administrativeAreaLevel2: 'ztszdvzyawz9wpkla4hknp2hm5kt8muzj2qahu5luyq6fhlw7b',
                administrativeAreaLevel3: 'ft6h06iw4lh2fe1741z53flof1d9ql7q3ef6gukqff6isa7534',
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
                id: '1f93477b-3adb-4026-bcdc-010df9506aa0',
                iso3166Alpha2: 'v9',
                iso3166Alpha3: 'imz',
                iso3166Numeric: 'qml',
                customCode: '9fpqhgyry5',
                prefix: '73trx',
                image: 'http://placeimg.com/640/480/animals',
                sort: 143885,
                administrativeAreas: { "foo" : "bar" },
                latitude: 10686130173470960,
                longitude: 33752369574610904,
                zoom: 26,
                langId: 'o04slm9415eu81bngkjutynpxkseafitdbdlm',
                name: 'Tasty Steel Towels',
                slug: 'et-dolore-aspernatur',
                administrativeAreaLevel1: '26u8ov3d29p4z57c102fdaiy64f5ti8w1rvcwnkrook1susg4k',
                administrativeAreaLevel2: 'evl71ostu6t69qjast3s9etf494qmshfdflauzpb2ks2jdhxzk',
                administrativeAreaLevel3: 'uf41tram3pfnx74dz5k05uqyptsnxrgjrdmg73rs04ci3ad61b',
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
                id: '9cfa12b9-b6c2-40a8-9141-baa8703931a3',
                iso3166Alpha2: '3s',
                iso3166Alpha3: 'xvm',
                iso3166Numeric: '1sb',
                customCode: 'skrb86hgwqw',
                prefix: '9go9v',
                image: 'http://placeimg.com/640/480/business',
                sort: 755263,
                administrativeAreas: { "foo" : "bar" },
                latitude: 36257322803750460,
                longitude: 12968861752330274,
                zoom: 95,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Gorgeous Steel Shoes',
                slug: 'quidem-consequatur-non',
                administrativeAreaLevel1: 'q7fnp89z8k3et3ru6oqdi8stxjiudwlked66qd36pi5s6zcgc7',
                administrativeAreaLevel2: '0utvoeow7fmro0yvqzhksij74zicp3h68faqc8wde287sorau9',
                administrativeAreaLevel3: '77t21qy9ymu0c7ozfs5sw6cjm5c27jkcngahe7qvqkh2egzkm2',
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
                id: '8ec422b2-a842-458c-817f-622fc523e931',
                iso3166Alpha2: '6a',
                iso3166Alpha3: 'mt2',
                iso3166Numeric: 'sla',
                customCode: 'e6n0gotc0a',
                prefix: 'nq8mel',
                image: 'http://placeimg.com/640/480/transport',
                sort: 128953,
                administrativeAreas: { "foo" : "bar" },
                latitude: 70500650499415736,
                longitude: 87469936888514290,
                zoom: 64,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Rubber Chair',
                slug: 'accusamus-rerum-ad',
                administrativeAreaLevel1: 'cjvcaem52n5sto1rttyt0yj13a22saqwc4nkqnmsyqatw88fe6',
                administrativeAreaLevel2: 'i2rmpfj5x4x7zl31s6mwnnm52tftf8vq9dwe09z2ypbosjjcq5',
                administrativeAreaLevel3: 'btashpie5v3idjdl7gsdp8hc54cu1xbk8qop19ht01n677pnx3',
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
                id: '6cf08e66-8d03-4239-9db8-f02fe0835c6f',
                iso3166Alpha2: 'ge',
                iso3166Alpha3: 'gqz',
                iso3166Numeric: 'lmw',
                customCode: 'phjntetufo',
                prefix: '6m56e',
                image: '15czvpvfmqj4mjmnt3oa98dettd1cuz1vzqmzlvzadsd2v47nm5hm7kmbzzbub5d0onr2qrjvfesok6c2kba7jztj09ufaexilkut1id538h3ku52q8juo2eaa8hgzgxdioxzwfnxeb403px49ezz5bbjn5pnq5gzeybe7sv96txwvghu19xtxgd5ihdxzix1hwalsm0o1y1cdmpjm8ep7aaptva6jc1ilr89i3vxec4vnw0r8rwxc5ehb0iq5r99d8jzb0sbsnstjjx8evcc4cttoawocqcjt8s2ttni1p7fxaecpj7adtes28hpx1kofcqcx19zi7d775g4v1a2vug8c6g7x12n3fkg3lutcot3eds5f9y25gjr8sxknn9vqobsfhs5rzpfxducakbtz60hc45d5iiust7xmpped3g4z08b6ymoy3lcrsgdi2vqz4gahlp1t6f4ucr9xq2joyyt54oi790gpycp2r625byxvbrbzv3bcc1je94ml8s6lm8wurleway2a1hhklr0m2uf5yah5sncn8icy13fku2ugvse8pj1tvo9a8y7zm7k2yjjyav5qf1ew7zllhfph7yhefmbjditkuqrl48m8fp7j72cof4knyl2091b3k9gr442n2eh3m5kcalat6reyrbzwtasavobzw2r9ts6wdth0n4cfhox6yiu65uwkd1le4ntfyk8aeugf6bghv5i3c6o60tzk88s0kjc7vjgu3beuauj9i1ga44xeremacgelz612kib9ox8hvbqcm73qfaju7tyrb5fuspdwljp1qua6jtfb1kq2nzqq2fdv9kigrykusmrik5xnzocskpzmkjd0aleuq1z28m3i3dcyi7squ535qsvf9pvxfyddesi6cromoi0csb7h6lkgnqeythszqw7uuq948x7w8mr8t8cb23emxkllhsp3ey1yi2fl9kwa7zrwbj4u0fjrqvnc9vatiinmdrtddn230p9ujvaaig264hi919lkea7si2l',
                sort: 666372,
                administrativeAreas: { "foo" : "bar" },
                latitude: 50679093072003510,
                longitude: 83351893510314780,
                zoom: 14,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Plastic Fish',
                slug: 'sed-consequuntur-tempora',
                administrativeAreaLevel1: 'zkprbnnx6l90ehx44fho877sl6yanvh45w6dux1mvr2jtzmvlx',
                administrativeAreaLevel2: 'opf4ozn9baaad53nngtb0w4um8j5dna7l1vjuondpj576arcob',
                administrativeAreaLevel3: 'z454xwwgwt1lj2nruy4jdvw3pxmikv2t38lfosqxukg92mtsk0',
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
                id: '9ad1deec-68be-4ed6-b2ea-34701416ff25',
                iso3166Alpha2: 'fo',
                iso3166Alpha3: 'ivo',
                iso3166Numeric: 'v6w',
                customCode: 'e18mwssnla',
                prefix: 'els68',
                image: 'http://placeimg.com/640/480/people',
                sort: 3291958,
                administrativeAreas: { "foo" : "bar" },
                latitude: 82847708102186850,
                longitude: 38856962605719490,
                zoom: 92,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Soft Shirt',
                slug: 'iure-eligendi-vitae',
                administrativeAreaLevel1: 'puc2dxpmuuya770310sszdu0msfx0xj6l4danjf5mv5yrjrcja',
                administrativeAreaLevel2: 'jdy05nzhoki66bb47j3gyn2o9qlu1qbg2j4dglm5s9smpenk3d',
                administrativeAreaLevel3: 'm6kh9e0bt6qoaz413d2chfyxov1tylwus9kv32xnmusc6bkzmd',
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
                id: 'dd31d2bf-2755-4a59-a95e-b8313e44130a',
                iso3166Alpha2: 'ba',
                iso3166Alpha3: 't4r',
                iso3166Numeric: 'xkd',
                customCode: 'i96lvpbfrb',
                prefix: 'qdbc9',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 939791,
                administrativeAreas: { "foo" : "bar" },
                latitude: 969237310263147900,
                longitude: 94285113407919680,
                zoom: 40,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Concrete Keyboard',
                slug: 'perspiciatis-quidem-perferendis',
                administrativeAreaLevel1: 'onduyue6eua41nu2dt8kuto4sa9o4t4tihmf0rp0frk396mpeh',
                administrativeAreaLevel2: 'wh8qzst8j9x4xfkce90nsk9744r84rrbyv5cv09jifyuu0vnpi',
                administrativeAreaLevel3: 'fznmq7p6mm2r1t6rfs7c72q972t5vbur06zpw78rbd0wi55wyd',
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
                id: '18d23912-6697-43a1-b4d4-fdfbb471acb6',
                iso3166Alpha2: 'ic',
                iso3166Alpha3: 'yqp',
                iso3166Numeric: 'y47',
                customCode: 'c8986dtxqk',
                prefix: 'gwbrm',
                image: 'http://placeimg.com/640/480/transport',
                sort: 504312,
                administrativeAreas: { "foo" : "bar" },
                latitude: 93802914753208080,
                longitude: 612585919405429100,
                zoom: 73,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Concrete Keyboard',
                slug: 'qui-ad-recusandae',
                administrativeAreaLevel1: 'vfncpnyuw0vlvscgcquih4gvyy6lsweixeztdctzbu8y1j4ede',
                administrativeAreaLevel2: '7owpawxjgoowol6xstorqsxqe69fzcxxaawia88hra71sycwjr',
                administrativeAreaLevel3: '61z9wbsg9b9b1tkddfrh65r62da0l54l5jaoapp5xox31v0x2f',
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
                id: '969efc85-2ab1-471f-98b9-26b96ed8247a',
                iso3166Alpha2: 'wn',
                iso3166Alpha3: 'rf5',
                iso3166Numeric: 'gwa',
                customCode: 'pt2pi7tbbm',
                prefix: 'i5gzc',
                image: 'http://placeimg.com/640/480/transport',
                sort: 843450,
                administrativeAreas: { "foo" : "bar" },
                latitude: 75329254638875520,
                longitude: 15282765119854024,
                zoom: 234,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Cotton Shoes',
                slug: 'expedita-aliquid-aut',
                administrativeAreaLevel1: 'gy9nkz780mi72manui1ran4p9vzef1u1r8ue7ot3jojcne8zy3',
                administrativeAreaLevel2: 'fibe45te3zezd2ytzost2yfzkflx399p0ysz0bdhlwuuin0f9r',
                administrativeAreaLevel3: 'l7iry3ahlbrilp6n0kv04cloiee28eh4p3gt6j0mtast3m16rm',
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
                id: 'f41ea806-6675-44ce-ba74-bc055789e84e',
                iso3166Alpha2: '2q',
                iso3166Alpha3: '4m1',
                iso3166Numeric: 'jzj',
                customCode: 'f1v9hpduso',
                prefix: '5ajvk',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 434911,
                administrativeAreas: { "foo" : "bar" },
                latitude: 89037871843784940,
                longitude: 44121784956590920,
                zoom: 80,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Soft Salad',
                slug: 'fprrocy48g25ysxjxokvtzoojvihma2vy1z2a7tl6tsey3hc69v6nsk1hlraz63sxkkumtf6h8crcyufql9bfrvdccx59q9jcnya9a5fkmo8ohq2b9ld7g3xg8iioppz2lum03bpgvwsxdh1ht2orkhtmw1mh0yu3xcjhm0o5ooku7vk576s7th9ju862z1yvjz52vgsb9v7i76yavbu9ukjbnac6l9136dpufrsgm4vfw3xdxyny1aiq864607u99au1bs7bd1pk7zjirk05nhwbaacrs1hufnu7qsibbzljj9wqqpvo7rvs3ryud3v0sj0efle8ccc5j3tolso8kuohzhpyxriysypa7kem32rvm74hecepe3acxu4tr86jf4jqisv3ewex5sfo73iqwjdas60bt4j65rydkptw4pudrjk8et0vi6jga37svz39o9hszbgb4pi62718urrzrtxz3hc1d0pllm1sg0ulw0y5luymqc3jimrrmjwf904w4617sbt9qygk221xdc6q00w44ey783oq8y27cw28gm25l6ohiv3d8plpxd7ggus8ae1nbpfkwoe2o8ampsza5xcyh3rurwvt63ljlfet03hwr08fnlnnxu5o39afdpsl3n69birhsjya5a64zpgoqombgn0c100u2s0c5wfa2nbu9wd8cwucgmogc7bobl96udeai556y4f9au9lgisdw87m1dn9ujrzrxicpia7t95tjvj8gdgkvjab21zs6wp09svkouqndcqt5pstpa3a5oqmb5knf7yon0vkteatpgf8zu7n5ky9i1zpdm18vh333awcpgfurf549hj264u1wgnky8ohzqoxfocpf3vsko7q9a0t3a0hwr3jll2ec11ke9ttrygf8fum9hez29sksgon4ifv8geny5vlfgd62ezmg5fmtn86xb6a7vn71z4xxddgz0svtsdj4l01cxnx3dfragrlgq7wphkhx00mke1d7iut48onof13zr3dxcxf',
                administrativeAreaLevel1: '6foar8vldickyk93gav08f0eggap9bx2o28y07gbzzwlvbq09y',
                administrativeAreaLevel2: 'c1rklvlqehhkblrxmxzo8rzquyj1iwe1xrdyessr0vezyniv1i',
                administrativeAreaLevel3: 'vf5o62zg0ujnpu3ydpzwy3k1shhyv05q7zmb1qmja2jc50a25g',
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
                id: '0a68fa61-3cc7-4fd4-a221-a74eea588ee6',
                iso3166Alpha2: '51',
                iso3166Alpha3: 'hcr',
                iso3166Numeric: 'ioi',
                customCode: '2xsv443ipu',
                prefix: '3r6vg',
                image: 'http://placeimg.com/640/480/business',
                sort: 391678,
                administrativeAreas: { "foo" : "bar" },
                latitude: 65009607390765610,
                longitude: 38715092652503896,
                zoom: 29,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Frozen Cheese',
                slug: 'temporibus-consectetur-ad',
                administrativeAreaLevel1: '01mo8qpnjkn0n74avfjbwza50bflum97zpiee969fy4ubbimdgd',
                administrativeAreaLevel2: '6nrre3i9xnwr9nyzpocmg4eqgszypm0vh44y4mqjonjafmvelj',
                administrativeAreaLevel3: 'wyikb1xs8x34asp2qsa15taiysue981frz4y3m1yix9lhn6i0i',
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
                id: '605dcf96-fc45-48c2-99d5-beba619f1d2a',
                iso3166Alpha2: '3o',
                iso3166Alpha3: 'krc',
                iso3166Numeric: 'mpn',
                customCode: '70ywrzefky',
                prefix: '0arkj',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 532429,
                administrativeAreas: { "foo" : "bar" },
                latitude: 84344521274888510,
                longitude: 42820807240216820,
                zoom: 28,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Steel Keyboard',
                slug: 'nostrum-voluptates-exercitationem',
                administrativeAreaLevel1: 'loygq37tilwohn136gg02xuqyffpm3zqc5djcu9ude5h3gq1x4',
                administrativeAreaLevel2: '41s0i7jhobi0z52h42uw4y4epg3b0qqg3hhi7atkx6yr3pl8d9y',
                administrativeAreaLevel3: 'a0v44y77hbzmkmt9etbhona64p0m1x4oltfh5u46c1299gjo5w',
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
                id: 'f4c92f06-fa21-4a30-86ed-6e0942652d10',
                iso3166Alpha2: 'mc',
                iso3166Alpha3: 'g99',
                iso3166Numeric: '822',
                customCode: 'gox4rsq3tq',
                prefix: '1eq5l',
                image: 'http://placeimg.com/640/480/nature',
                sort: 207145,
                administrativeAreas: { "foo" : "bar" },
                latitude: 25179082409043830,
                longitude: 74696367941150880,
                zoom: 19,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Cotton Towels',
                slug: 'cupiditate-sint-adipisci',
                administrativeAreaLevel1: 'gb5k5eue8otargaxsfdrdlkmbblbfs7ehs7ddrf6lwtxvjm4dx',
                administrativeAreaLevel2: 'kzvw0x008vkcarhrzlzlrlpk55kybt610a19adg82bso9oji0j',
                administrativeAreaLevel3: '1s21cnxdtelptixu1lask5257ckwnktq4af382emy8rgf2m0ekg',
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
                id: '223fe91b-5d58-41ac-8c12-f63c6c02ab8d',
                iso3166Alpha2: 'xs',
                iso3166Alpha3: 'nwh',
                iso3166Numeric: 'j05',
                customCode: 'hsrdjfvmbc',
                prefix: '804qd',
                image: 'http://placeimg.com/640/480/transport',
                sort: 695396,
                administrativeAreas: { "foo" : "bar" },
                latitude: 11668974696438896,
                longitude: 69253516425001570,
                zoom: -9,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Steel Salad',
                slug: 'consequatur-consequatur-quia',
                administrativeAreaLevel1: 'b80cnzzl4kev6hc2x56li4kbv3ooef7lrypqthprub6aeuhhxk',
                administrativeAreaLevel2: 'ox9hvmiemz0ivbwhwcnjod17hiw637mght042s4blwm4tgowwn',
                administrativeAreaLevel3: '7w5slz2f0lbzd0t0v89x941if7i69l5ciqx306m42lpiwaj79y',
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
                        id: '042ed853-06a4-40f2-8af5-dccea4000c81'
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
                iso3166Alpha2: 'z2',
                iso3166Alpha3: '3io',
                iso3166Numeric: '7hg',
                customCode: 'r0n6cjxf41',
                prefix: 'ydfty',
                image: 'http://placeimg.com/640/480/people',
                sort: 179587,
                administrativeAreas: { "foo" : "bar" },
                latitude: 57774093189175260,
                longitude: 38666159842225490,
                zoom: 43,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Frozen Keyboard',
                slug: 'impedit-explicabo-et',
                administrativeAreaLevel1: '6txixt5gd7n3vpdmaukjbpjoyx3c88tg7d77c1qzval4w3wkot',
                administrativeAreaLevel2: 'gdm5so7ceqa2q5zd32bmo0847xgpbruz8gmy1dsbwmx505ycgz',
                administrativeAreaLevel3: 'wq7nuh0p2php59vwedxjqvfcufir3hhsuobcfcistpk065r1mq',
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
            .get('/common/country/d2241a33-7f42-4289-b5e6-8b897991d290')
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
                id: '454cd8df-6268-4e15-970f-6fb11d35badb',
                iso3166Alpha2: 'zz',
                iso3166Alpha3: 'v56',
                iso3166Numeric: '7wy',
                customCode: '3i8xy472ne',
                prefix: 'lyexs',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 779082,
                administrativeAreas: { "foo" : "bar" },
                latitude: 32309934565686028,
                longitude: 54852666333475410,
                zoom: 90,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Gorgeous Steel Chicken',
                slug: 'illum-sint-rerum',
                administrativeAreaLevel1: '74s19zw3sth4fah17962ff4fsz3djhr7n4py3lxgucei2oaq7e',
                administrativeAreaLevel2: 'ozomi9kzhw2juq9bmfgbhu77cddx1tfafy9jok6pdh8r86zslu',
                administrativeAreaLevel3: 'mdont07ol9h3joshup210547dyp954wc8aueqyn5dq4pr89mrj',
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
                iso3166Alpha2: 'rk',
                iso3166Alpha3: '30r',
                iso3166Numeric: '0kc',
                customCode: 'xxlzsn0t7s',
                prefix: '4gpsi',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 963418,
                administrativeAreas: { "foo" : "bar" },
                latitude: 60930197913105210,
                longitude: 71591262957996740,
                zoom: 74,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Granite Chips',
                slug: 'deleniti-sit-aut',
                administrativeAreaLevel1: 'onjsb8ug7sstxkx6pg9rv876qhzd5esrmv8fkiaumu0912mcis',
                administrativeAreaLevel2: 'ztmorop9ba6pt7mfb0mztva61kpjxane3n7jx74y628ziqdlrl',
                administrativeAreaLevel3: '8va1a94zds0vgo8pi03rcprg536a121guyvay0ls64hmmsohiy',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/2dea1a14-b3b3-4c6b-bd4d-7f43f2aa2c5e')
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
                        iso3166Alpha2: 'qr',
                        iso3166Alpha3: 'dp9',
                        iso3166Numeric: 'pkr',
                        customCode: 'gtc17sh4ov',
                        prefix: '88f31',
                        image: 'http://placeimg.com/640/480/transport',
                        sort: 742676,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 52188481400186136,
                        longitude: 90035273547788300,
                        zoom: 57,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Generic Granite Chicken',
                        slug: 'possimus-odit-unde',
                        administrativeAreaLevel1: '06qt5oc1hs96e0au2mbv32b32a7ezgtw95koe4wni7rielp6jv',
                        administrativeAreaLevel2: 'fmhxbajp3sio0suo95kb31f2ygybjgixpxkem5x1puptb4blfk',
                        administrativeAreaLevel3: 'nyumhkaom6smwma72lemfdfyhqbdijgxi3ep7e6wmfnhkjh93b',
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
                            id: 'e9dae7cd-b5f5-4d9c-b6a7-65e45e2b6765'
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
                    id: 'f464a2d0-6a2d-42cd-9a6e-df5aad4d7306'
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
                        id: '02530547-1b92-4de4-b4c9-877724524f97',
                        iso3166Alpha2: 'la',
                        iso3166Alpha3: '3hw',
                        iso3166Numeric: '0m3',
                        customCode: 'sqxptmwy0d',
                        prefix: 'mi059',
                        image: 'http://placeimg.com/640/480/abstract',
                        sort: 910496,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 16936765989076944,
                        longitude: 98543958096950940,
                        zoom: 74,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Gorgeous Wooden Tuna',
                        slug: 'quos-officiis-assumenda',
                        administrativeAreaLevel1: 'j1au9nyagmsguq4vvtgla4ux84xr2x6z8rtv4mr16wt0gqgmfg',
                        administrativeAreaLevel2: '0tgii4nnprgpi83096l8ev7i6y4d77sxgenzbwd03bel95anp6',
                        administrativeAreaLevel3: 'q7656bcr2cdo77y6w2q4mwjmydws0esld7gl28ut90d5nu54y8',
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
                        iso3166Alpha2: 'dl',
                        iso3166Alpha3: 'uf4',
                        iso3166Numeric: 'fli',
                        customCode: 'iqvhis69cp',
                        prefix: 'bzxdo',
                        image: 'http://placeimg.com/640/480/cats',
                        sort: 636892,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 49084787672395840,
                        longitude: 25799089329144890,
                        zoom: 42,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Sleek Rubber Ball',
                        slug: 'voluptatem-autem-vel',
                        administrativeAreaLevel1: 'g5ozp6asajpxivyo655wbxnvuv1qx8ah78jg79w49qzvq8hb5b',
                        administrativeAreaLevel2: 'wlbn34dfhazzstv3cubgboer5sq348z66hcctwq28izffuuc65',
                        administrativeAreaLevel3: 'xda73ye34y13xmabkctjx3zsjvki338ngfr6hmt1hrvkhjq1hg',
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
                    id: 'a2bb3c67-863c-490e-a2f9-1d3ad9bd7075'
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