/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '@apps/common/country/domain/country.repository';
import { ICountryI18NRepository } from '@apps/common/country/domain/country-i18n.repository';
import { AddI18NConstraintService } from '@apps/common/lang/application/shared/add-i18n-constraint.service';
import { MockCountrySeeder } from '@apps/common/country/infrastructure/mock/mock-country.seeder';
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
                iso3166Alpha2: 'tx',
                iso3166Alpha3: 'wtn',
                iso3166Numeric: 'eoq',
                customCode: '1e8dfr95aq',
                prefix: '1sgyt',
                image: 'http://placeimg.com/640/480/city',
                sort: 429462,
                administrativeAreas: { "foo" : "bar" },
                latitude: 24795753554354240,
                longitude: 21140516589746376,
                zoom: 20,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Soft Sausages',
                slug: 'distinctio-consequuntur-consectetur',
                administrativeAreaLevel1: 'nrcycmezvv9olgn1ap01v5nsi962tf33pn8guocavxjs9ufjbe',
                administrativeAreaLevel2: '7pq1v4mv4d8fg57h4j2ktdltl1908y8sd05qm98pajgxowh37u',
                administrativeAreaLevel3: '9p5ax9rn9ghd5y9tyxtue506ixi2yv7oxq4mo9gzs6zh3fyeg2',
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
                id: 'd1e8a9ed-1a8b-4941-a541-c5f786a786b0',
                iso3166Alpha2: null,
                iso3166Alpha3: 'frb',
                iso3166Numeric: '1jf',
                customCode: 'zr137z2m6b',
                prefix: '2lrtt',
                image: 'http://placeimg.com/640/480/technics',
                sort: 454456,
                administrativeAreas: { "foo" : "bar" },
                latitude: 19486687658876936,
                longitude: 84616390442185900,
                zoom: 67,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Granite Hat',
                slug: 'inventore-impedit-nostrum',
                administrativeAreaLevel1: 'wwnh2q6x6siubbuuuif6s1wpxezk7777ve2r85enjel6zy9qvz',
                administrativeAreaLevel2: 'h3x7cmmya5pv99n0y90g3asey8jjhl39dow6npbq5ijxdwpsgg',
                administrativeAreaLevel3: 'iztp3zqx64kwsuo1cvyxi97tws4ljn6xcpiwusfhk7zw24o32u',
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
                id: '64bb3fbb-6585-4846-b289-67912083b16b',
                iso3166Alpha2: 'nt',
                iso3166Alpha3: null,
                iso3166Numeric: 'apl',
                customCode: 'hr5nonkolm',
                prefix: '6n4cj',
                image: 'http://placeimg.com/640/480/people',
                sort: 659783,
                administrativeAreas: { "foo" : "bar" },
                latitude: 34864823025853468,
                longitude: 58636435207823736,
                zoom: 83,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Gorgeous Soft Car',
                slug: 'inventore-officiis-qui',
                administrativeAreaLevel1: 'am6hezv5qjm9176bg40o11lqqast13qnqrixd66tsdl7ll3gfo',
                administrativeAreaLevel2: 'x3s7hdivwu8nza078crprov7zkwbr5otc6216o2oxj0il71ftu',
                administrativeAreaLevel3: 'txek3q0u35hwyc6zzad2k8adp0qgpzkbsycx5tpgy8wxwqmxoy',
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
                id: 'fedba123-6856-433f-a622-fbde1f5758d2',
                iso3166Alpha2: 'zu',
                iso3166Alpha3: 'oxv',
                iso3166Numeric: null,
                customCode: 'v4lal14a6k',
                prefix: '2mmor',
                image: 'http://placeimg.com/640/480/business',
                sort: 682723,
                administrativeAreas: { "foo" : "bar" },
                latitude: 47661960197682010,
                longitude: 65627687981740070,
                zoom: 23,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Steel Bike',
                slug: 'saepe-magnam-hic',
                administrativeAreaLevel1: '1k4q0jdqemglawwetq0lg7c4qyvjbnnxi1dd3w5mcm25bz04am',
                administrativeAreaLevel2: '984bn6d0e9uk1bxumo46vyxwwk0uek5u3sqwv056vklihvvcx3',
                administrativeAreaLevel3: 'prs1xhkpu5970tcsmi7y0t91zbnog6bhxmjrhhve5pmn0qjymj',
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
                id: 'b52d218a-9b7c-4e7a-9e92-fd4581b17fde',
                iso3166Alpha2: 'g5',
                iso3166Alpha3: 'w8g',
                iso3166Numeric: 'ew4',
                customCode: 'gvc5wquydl',
                prefix: '2rlfr',
                image: 'http://placeimg.com/640/480/city',
                sort: 657646,
                administrativeAreas: { "foo" : "bar" },
                latitude: 34138293241848624,
                longitude: 58871364420593784,
                zoom: 66,
                langId: null,
                name: 'Handmade Cotton Pizza',
                slug: 'laboriosam-voluptas-est',
                administrativeAreaLevel1: '1aysrb41s0x33cziztrexi7gm1bahem7rkoyfp4tsp598mwzu3',
                administrativeAreaLevel2: 'dvvw0zr0m0q89zxsp38uruqptirg2tqy5kk9x5stpowkz468rb',
                administrativeAreaLevel3: 'du39repawjfex7om6vanlurzjd76bny75uok1pvxbx1d2eugii',
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
                id: 'c306d158-9f15-4d2e-a0e0-a9fd98213955',
                iso3166Alpha2: 'kk',
                iso3166Alpha3: 'bqw',
                iso3166Numeric: 'sao',
                customCode: 'dul2a5m2s8',
                prefix: 'dwo1x',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 817494,
                administrativeAreas: { "foo" : "bar" },
                latitude: 83328169188229470,
                longitude: 51167782202892810,
                zoom: 16,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: null,
                slug: 'commodi-excepturi-et',
                administrativeAreaLevel1: 'o9xyet4evfg5jx51rb983i4k2sttqc6i8sx50dcmwqyd3olts6',
                administrativeAreaLevel2: 'xblbyphlmmzut6duziz9ld0nz9t1f2c1151zud5ufwrzjgzcki',
                administrativeAreaLevel3: '792gu8u32anmlf45i4hk75qfptpbiia9lpzw05k2twchppxobc',
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
                id: 'ae26fe1d-cd84-4f56-b447-ecd69b99ba54',
                iso3166Alpha2: 'sw',
                iso3166Alpha3: 'mbz',
                iso3166Numeric: '2hj',
                customCode: 'cjboeix2xj',
                prefix: 'kpqry',
                image: 'http://placeimg.com/640/480/city',
                sort: 804226,
                administrativeAreas: { "foo" : "bar" },
                latitude: 30987468842622704,
                longitude: 45429777281055580,
                zoom: 74,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Plastic Hat',
                slug: null,
                administrativeAreaLevel1: '1zh749hn1qekqzymogs1vrtq57rk29wwn1f12txw345un8i153',
                administrativeAreaLevel2: 'e5i5qnvg8vmu0wotvbrl2chkdviq41vakx3c61d50ogecbr9wr',
                administrativeAreaLevel3: '42yarwxgfcmqohvjovcu2vy7payy14qnotmly8o1cucpsy6dh3',
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
                iso3166Alpha2: 'b9',
                iso3166Alpha3: '6qp',
                iso3166Numeric: 'pdh',
                customCode: 'd3eb21resi',
                prefix: 'bai93',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 181390,
                administrativeAreas: { "foo" : "bar" },
                latitude: 56215900453581704,
                longitude: 68065009998601530,
                zoom: 46,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Cotton Computer',
                slug: 'laboriosam-itaque-fugiat',
                administrativeAreaLevel1: 'f08mfkpl2fbkogr36vwq3ycq2afo6px9b3xyhyr0hip68bagb5',
                administrativeAreaLevel2: 'v8wbqwspue2v3s1s1fy4sb6e10l57kgj0fqragvp2nyfwwr8ja',
                administrativeAreaLevel3: 'iohkpzs62tcto37ajr1pszq9zbp38h30gd1euak98jkew9gdwm',
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
                id: 'cb1bb7b0-9ace-48bb-b2f8-7f681d775801',
                iso3166Alpha3: 'w9z',
                iso3166Numeric: '0kv',
                customCode: '7a103che6u',
                prefix: 'dnco8',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 541968,
                administrativeAreas: { "foo" : "bar" },
                latitude: 74251637109456540,
                longitude: 43891048448543860,
                zoom: 31,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Steel Soap',
                slug: 'dolorum-consequatur-ad',
                administrativeAreaLevel1: 'ndgna30eaxq1evfdafldwg1jk0qa1uxxajzxezan2vwv24cjfo',
                administrativeAreaLevel2: 'vf08sy7hbqer12n7rbmw4xffs4oqufgvk1hmp4ah69i3vt9445',
                administrativeAreaLevel3: 'zj76ud3bd2uwf5aw5gzrerdymcapwvkrvspmdk6ya82s3loc80',
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
                id: '662fa21f-241e-4ff7-94eb-fc652cc29962',
                iso3166Alpha2: 'p9',
                iso3166Numeric: '29f',
                customCode: 'iko9h5lzod',
                prefix: '8zcgq',
                image: 'http://placeimg.com/640/480/nature',
                sort: 740828,
                administrativeAreas: { "foo" : "bar" },
                latitude: 16569369269924148,
                longitude: 39813353350879260,
                zoom: 20,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Metal Fish',
                slug: 'expedita-eaque-sed',
                administrativeAreaLevel1: 'eu14t7e382jh1zqj7dbvj8xw7bs6dmoaoypaq4dhwfn3d937e5',
                administrativeAreaLevel2: '84pqwro52rrj2szjqj0fbpgdl68nmcuh8gjnx7nhsud0w56guf',
                administrativeAreaLevel3: 'kb3hkq2gg47dxamtu9tszyl2yyg2058ibncff6qnd530z1ktv5',
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
                id: 'fcfb5b79-7076-47f8-a74d-6b0b0436a694',
                iso3166Alpha2: 'wc',
                iso3166Alpha3: 't8z',
                customCode: 'b0z39lvjzn',
                prefix: '2hsx3',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 678835,
                administrativeAreas: { "foo" : "bar" },
                latitude: 67372087217478900,
                longitude: 14136310140940408,
                zoom: 86,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Metal Cheese',
                slug: 'corrupti-sed-incidunt',
                administrativeAreaLevel1: 'h6zagjvr34dvo2n4wvvflhis3sc2yjl8g7r86gjarywqlk6lio',
                administrativeAreaLevel2: 'eolrflf7ts1q43641s2rawp9zi0n51zl9b00v38jqkj4ca0acw',
                administrativeAreaLevel3: 'kxyghmpayj0p8qgf08neg7s215zrvsfs23lzmd90cozl0qkoz3',
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
                id: '4749504f-b912-4a8b-8f4a-c841916696a9',
                iso3166Alpha2: 'c8',
                iso3166Alpha3: 'hx5',
                iso3166Numeric: 'vdg',
                customCode: '0qiqddry33',
                prefix: '684bv',
                image: 'http://placeimg.com/640/480/sports',
                sort: 463271,
                administrativeAreas: { "foo" : "bar" },
                latitude: 41526930480007010,
                longitude: 98509504716271340,
                zoom: 81,
                name: 'Incredible Plastic Ball',
                slug: 'voluptatibus-quia-odit',
                administrativeAreaLevel1: 'zr78twinhh4yi0svy8mclikkx3k1shm7xzk2er5fbiqq9hfsjy',
                administrativeAreaLevel2: '9cu0lmjtglwl5588oc1ag3rqc5fubof7dk2slyqiggxk5c9hwv',
                administrativeAreaLevel3: 'go27yrxsewz63qbyja1q8t7ijxz9ex80qyq8ycmpbdjxuqgh0t',
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
                id: 'c2bffdbb-f3ea-498d-8e00-c7d1fbcec793',
                iso3166Alpha2: 'kk',
                iso3166Alpha3: 'jzm',
                iso3166Numeric: 'zi7',
                customCode: 'gi8mvqw3vw',
                prefix: 'phzz1',
                image: 'http://placeimg.com/640/480/transport',
                sort: 714448,
                administrativeAreas: { "foo" : "bar" },
                latitude: 91095404233271700,
                longitude: 17706752166773808,
                zoom: 61,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                slug: 'facilis-repellat-consequatur',
                administrativeAreaLevel1: 'g5rrk9bbz9utstgoefnxh8md0ty9jwfjgp164isqnarad3yaha',
                administrativeAreaLevel2: 'mpb90xdlwcre0jnckg0q3e3phr7fq2w1eykecyz991vdl9mshn',
                administrativeAreaLevel3: 'w9a1oz7jhnj8j0oksuv7wlu0r4q5ogoyecy4im2vfov50mvmsg',
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
                id: '746b76cc-1a75-43f9-b7fc-0d8ae910a172',
                iso3166Alpha2: 'oj',
                iso3166Alpha3: '68k',
                iso3166Numeric: 'h7f',
                customCode: 'bsuhyfasls',
                prefix: '50lsz',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 117485,
                administrativeAreas: { "foo" : "bar" },
                latitude: 25704760004649156,
                longitude: 20188340963378548,
                zoom: 88,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Frozen Gloves',
                administrativeAreaLevel1: '676ohc0lhnfyajkjn3hmdpp0o9bh0r6oif1mhmiioao784tbvg',
                administrativeAreaLevel2: '1jui27u3zbghj95ejn985ir9gvup5tdsr3p2nhxlt8b2yldm6u',
                administrativeAreaLevel3: 'wiu5wl0xs81zfo7g85gzv9w5au98z797jtpo8ylcu6oer70nnr',
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
                id: 'n9ym9yikruprzyngceaff6f1d4ywffc9tolvc',
                iso3166Alpha2: '5p',
                iso3166Alpha3: '4j6',
                iso3166Numeric: '8ne',
                customCode: 'e42wx5eofe',
                prefix: '1ozid',
                image: 'http://placeimg.com/640/480/animals',
                sort: 737127,
                administrativeAreas: { "foo" : "bar" },
                latitude: 71145468933736630,
                longitude: 19724080708976296,
                zoom: 80,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Wooden Table',
                slug: 'ut-architecto-exercitationem',
                administrativeAreaLevel1: '0ifs10o0yd228f8wzmdgrtqsc5wdo6tubj8qdlxi9w35t64n9z',
                administrativeAreaLevel2: '0b4qhbjiwq179yuanrgivmvgut7628ug1bvb4h223fl3ckp7up',
                administrativeAreaLevel3: 'k96c0ebq9p89nts88wh4tittebjehtl0p61ydyonfd6j5k1js6',
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
                id: '521eaea5-773b-4fde-994d-2807e1fdfb5f',
                iso3166Alpha2: 'y6u',
                iso3166Alpha3: 's1d',
                iso3166Numeric: '50y',
                customCode: '8imyztcvtf',
                prefix: 'odyu7',
                image: 'http://placeimg.com/640/480/cats',
                sort: 468533,
                administrativeAreas: { "foo" : "bar" },
                latitude: 61077115755796930,
                longitude: 93077959737223940,
                zoom: 41,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Wooden Soap',
                slug: 'veniam-saepe-aliquam',
                administrativeAreaLevel1: 'e3q7ofzn1zr3itrhrgvo3udou0d13y0hy4c8o7xhn3yagajsjt',
                administrativeAreaLevel2: 'nir3qmxtetkdbr7h8we0kuzce17dmgs5xomn3c3ed45y63skl1',
                administrativeAreaLevel3: '03dr3ugakedrvrqiwnquhs3nb068htd2d759vht6d8lvlk3z64',
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
                id: 'd6e803f4-bed7-4aeb-b84d-82fe45a25b17',
                iso3166Alpha2: '8v',
                iso3166Alpha3: '2sg9',
                iso3166Numeric: 'rpr',
                customCode: 'tetzdaqynb',
                prefix: 'gzjjh',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 991255,
                administrativeAreas: { "foo" : "bar" },
                latitude: 73473833347621900,
                longitude: 56354856647145640,
                zoom: 40,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Fresh Soap',
                slug: 'inventore-cum-velit',
                administrativeAreaLevel1: '18abc3k9gs4s5sl4jfgr2xgmgn8sola9oav4w4oh6mq6230mwp',
                administrativeAreaLevel2: 'ygrrwpnpxg4bq7jegpk3786fuonpps994ok4g3wera2z1h2554',
                administrativeAreaLevel3: 'a0r3bq7eopjh9ujqxkbjqlwk41a95rrjq2z42xyg0lqb3blsks',
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
                id: 'c957f8df-7b75-42c5-818f-a877029f3048',
                iso3166Alpha2: 'zb',
                iso3166Alpha3: '1ax',
                iso3166Numeric: '1rhu',
                customCode: 'lkggcbm5b7',
                prefix: 'j1kz8',
                image: 'http://placeimg.com/640/480/cats',
                sort: 898380,
                administrativeAreas: { "foo" : "bar" },
                latitude: 94933964490486770,
                longitude: 96952977276768370,
                zoom: 30,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Concrete Computer',
                slug: 'inventore-at-dolorem',
                administrativeAreaLevel1: 't02ixq847embvwn2ydkmdsam6ky0wfmylzeo468da2ugnw9jfm',
                administrativeAreaLevel2: 'j3vl1z5dmw3utnx22s6vfbitwt51dwva9rpc5xutyt9y9ht9lw',
                administrativeAreaLevel3: '72s0aeylywaca0ddr57os3zjl3ve4mgkaoqb8zegc55911l1lb',
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
                id: '2c122186-759d-4c67-9fb4-45ce8f4b327d',
                iso3166Alpha2: 't8',
                iso3166Alpha3: '3kd',
                iso3166Numeric: 'elm',
                customCode: 'mu7hp52wre',
                prefix: 'v1i9e',
                image: 'http://placeimg.com/640/480/business',
                sort: 604943,
                administrativeAreas: { "foo" : "bar" },
                latitude: 82050544331815220,
                longitude: 29148531101483216,
                zoom: 92,
                langId: '9ru3ocogdpsylvrwiy347si8nug8js3nej572',
                name: 'Small Fresh Soap',
                slug: 'voluptatem-sed-quibusdam',
                administrativeAreaLevel1: '9j29nfs0l3t81ym9ixm7ahyy56khtp7aj02sp2g3zjqt0edk2g',
                administrativeAreaLevel2: 'hw8zncxmo6q5sljmt6w1kxu7qb065eo5hdp1hauj9tw7r9u0xr',
                administrativeAreaLevel3: 'i7xk06w0hda7rpcqysu2fdt6849jpbwcrajbes7yg2us50mkkl',
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
                id: 'c8d51f42-3180-4599-89e1-49384199fd24',
                iso3166Alpha2: 'ya',
                iso3166Alpha3: 'bxq',
                iso3166Numeric: 'j1z',
                customCode: '8yvs520j6tl',
                prefix: '23izg',
                image: 'http://placeimg.com/640/480/sports',
                sort: 407088,
                administrativeAreas: { "foo" : "bar" },
                latitude: 56137806397620580,
                longitude: 11856483641171820,
                zoom: 73,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Plastic Keyboard',
                slug: 'totam-facilis-omnis',
                administrativeAreaLevel1: '4a2kppjrlck8rkexi54ox7460v902ux3xvyzigw3y4akv311b1',
                administrativeAreaLevel2: 't052mfqau8w6iphv5qmrdzreakwld90wyyrfya5qztoqod5e3l',
                administrativeAreaLevel3: 'vdtvb1a7p42ffpvgp99jkxe5au6cuw5jsiqplguw2s95wuqy1h',
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
                id: '11700581-5ab8-4c58-9a92-f390088349bf',
                iso3166Alpha2: 'o9',
                iso3166Alpha3: 'sa6',
                iso3166Numeric: 'ubo',
                customCode: 'dblfavpxhs',
                prefix: 'l1va4s',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 142308,
                administrativeAreas: { "foo" : "bar" },
                latitude: 77168747207366530,
                longitude: 90241719563423140,
                zoom: 55,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Fantastic Cotton Mouse',
                slug: 'sunt-sint-et',
                administrativeAreaLevel1: 'wgqzds5e9q27a4emqggk2vud8jxjj3zys2yoz90izewjnmhlf7',
                administrativeAreaLevel2: 'xt1qtm7ur2s8v6iih1d14j8clwbwyp21yn3rudup8dzrzyt9qk',
                administrativeAreaLevel3: 'p7l3ehff9ume6maptof2s48hon7zht0z23kcjicbmz5lha5bgl',
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
                id: 'bbc0fdf7-69ef-41fd-867f-446d9d586724',
                iso3166Alpha2: 'nc',
                iso3166Alpha3: 'g0w',
                iso3166Numeric: '3q9',
                customCode: 'cyxx64qftu',
                prefix: 'bsl35',
                image: 'dulipw433w2dprv9topq7qk6ikk8ndxbqxtflrr7wf5hqwg9uut47510uxbxtm7e7u3r1i8ogq0hbf3pi11fxy2z936vj22ale93blkm5ze5ubsihdubi7qyvmc306p23icsybwykfby1g1swke4m41xe4gasl7ytw2n26j2lr96pgfxk9ndhjxggobq46n50r3wuispj6dlc7of9t8q2r7n7dbgxbu038u74t2gomo7obka8l0ss0c1d6ojemnmiv83cyvcf1gw675fmlkzwtvm03s4uipau2tonivslh4rqswo5tkz86xmzf8vctmilk9z4r9yu7fd1exlrifvog3qcrhjgwfg8anxqo6vx5674cy6s2tvyelb4i6wdhmkf74ln8yqlwiddn1nk0mzderfsc9vben6mg3weejk4m4lq9k4m2bqhca5uci6td53woi4kyhev1k1h9tddjpsintthh0lkz48hurvggir82snoml0zoynjum32q4hznm9b8f6i0frg4jny984t0vue73ytr20osrkui5y17pxb7ceayl1vvkalleunz2h8yo4wxf31n3yivtuq1f4hd46jjhzblvchhmdsrmwza4szk5ycs7i88mvyh0cp4mfhuofgg99yapguqnsljkghrcosai2k0b0vna5v4m57k73k3nofd65gzj45e5e3b1egox8f511qs3853h7wu9n30gjxsvq763b0dz1i3nk7rf73a7mebiaigdamvpvnv7m3hf7m9xapkxgziqfcg16nxnmn41i52kxcwwko9tbmuyz061gh5y6c567xxeivzt56hd6ogk23yj5uwfv3gk2p13bnah5tt5ew60zss8m1daohyg0v11vyt6uayaywer4kohhpcjoejjbenmcrorg1triyag06y6zzdo9eip3hzcqkxqo6bwcxosdf9aypzkn432o9uxr2bolilbuxf24501y5mh9nco1iiz4nvr0oyv0d45hb8bsp1cctqyq59eedfdr5',
                sort: 796627,
                administrativeAreas: { "foo" : "bar" },
                latitude: 43171867049737490,
                longitude: 11719409829939976,
                zoom: 82,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Granite Ball',
                slug: 'eaque-sit-debitis',
                administrativeAreaLevel1: '61peidqqh9xdzfm8qf3l3weo04hxli6wtn5p4eq9dpt2ughqaz',
                administrativeAreaLevel2: 'txm20co9t9vdc99r11czu84d06rbvwp7angll413x522492u8c',
                administrativeAreaLevel3: '15713x8brficpc7ff3tvswmjil3nfnulk8nj9g7h0mdmnhrzz9',
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
                id: 'da4fd162-60f2-4a0d-a648-e54337c7ab55',
                iso3166Alpha2: 'g7',
                iso3166Alpha3: 'w9x',
                iso3166Numeric: 'qln',
                customCode: 'qwi5qjkuzg',
                prefix: 'tpfpg',
                image: 'http://placeimg.com/640/480/business',
                sort: 9591873,
                administrativeAreas: { "foo" : "bar" },
                latitude: 40747389710643290,
                longitude: 68270454686781270,
                zoom: 59,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Granite Bacon',
                slug: 'est-incidunt-optio',
                administrativeAreaLevel1: 'hhx7253ocxz9qosbd1n3ljdzzpkhtq1axf1whdjpszhmr8vs7u',
                administrativeAreaLevel2: '4o82r0obee4jjano1xxy3tcdeefmzlqhq1md3qczk1fz2zm4sb',
                administrativeAreaLevel3: 'zrro6mlrkli0wl5w3uan4s6shzfaalohpc18gaqtf2u6vtlib4',
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
                id: 'a74d5511-22d2-42db-b4d9-c4dc6513b87a',
                iso3166Alpha2: 'e7',
                iso3166Alpha3: '9ln',
                iso3166Numeric: 'yjq',
                customCode: 'gb75didm5l',
                prefix: 'c4y6r',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 425580,
                administrativeAreas: { "foo" : "bar" },
                latitude: 300032057398146940,
                longitude: 48186610118180640,
                zoom: 38,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Rubber Tuna',
                slug: 'rerum-itaque-ut',
                administrativeAreaLevel1: 'f3be061pxv6nlgnmstb40vwwzmr8fdkb75qncii4ngg6uvnbko',
                administrativeAreaLevel2: 'w1ygealm4qo68onz4cd2e0frq6qsiqqb696lnt8ic3kzcn3bx3',
                administrativeAreaLevel3: '2xrggmejv1bzf4pygrn0yk0xvbbhpf6dqwhi841wunqvk0q00o',
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
                id: 'c833696e-4fd6-40bf-ad36-6d726b560445',
                iso3166Alpha2: 'yz',
                iso3166Alpha3: 'dcn',
                iso3166Numeric: 'jzw',
                customCode: 'cvta9fe3on',
                prefix: 'vqt8i',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 173423,
                administrativeAreas: { "foo" : "bar" },
                latitude: 31402273477440156,
                longitude: 367990595380752960,
                zoom: 45,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Soft Chicken',
                slug: 'sit-repudiandae-voluptatibus',
                administrativeAreaLevel1: '2xczsijnhn8zlqykhbvdu6hzt3thni2kv29ru1wqkhtkfpnnw9',
                administrativeAreaLevel2: 'bbw9sxui6t9asnqkwi1tzszkih26fb8litnaf7hzdt09vs5c54',
                administrativeAreaLevel3: 'yft526laxy99ter0s93hp002hesruloev864s2zwz423tdwlr7',
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
                id: 'e9fd543b-1d98-452c-9b31-f8dc452fd1e3',
                iso3166Alpha2: 'z2',
                iso3166Alpha3: 'f3r',
                iso3166Numeric: 'nk4',
                customCode: 'g1mvhp64vk',
                prefix: 'vzvfx',
                image: 'http://placeimg.com/640/480/technics',
                sort: 414333,
                administrativeAreas: { "foo" : "bar" },
                latitude: 46978911089179580,
                longitude: 58273751145926200,
                zoom: 113,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Fresh Pizza',
                slug: 'ipsa-debitis-perferendis',
                administrativeAreaLevel1: 'gwr020bz1g9z6l4x5g1xl12bff5pvvi8jvjy7xv74528qio3o7',
                administrativeAreaLevel2: '2l4ub2ql5ojm0xi7y94zxw4hvafol6q964prhd6jadh0j3tfqn',
                administrativeAreaLevel3: 'buazqvrvic7wqk2p661u5c6cfakzq7q1qpa5vy5fqe8w56qtyb',
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
                id: '56f14bc1-4cff-4d62-84e9-e3a6382fae08',
                iso3166Alpha2: 'ka',
                iso3166Alpha3: 'yp7',
                iso3166Numeric: 'cko',
                customCode: 'bmlmglqkka',
                prefix: 'fo6wr',
                image: 'http://placeimg.com/640/480/nature',
                sort: 823636,
                administrativeAreas: { "foo" : "bar" },
                latitude: 77887805144298460,
                longitude: 34565582958439820,
                zoom: 40,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Steel Cheese',
                slug: '29larnnvnyzy2xt08z507jc887z8g4xurnm9d9yl5wh6gfqnj9bl3rl8puoa6cosgppxvw40nlsf4kdj68ws3z9sg979jg4a7ro77chp7mg5a6c647c738pjyperad7jmo94c3hhwd3unygigh7vbr9xerrcpjs0mgxbrr55woxechukgab142rqxqjur6l6j9rxk95pjpgp41qz93y4rhzpy6nr6fc1hi5j3wx4iuoi1731go3di5009ted4jdtb8j06ipgro0i0gdbjle9a0xjqquhj0e20x0vf6b6timaq1ko8lj5eexc3pj82ud9v4os4tgiuzlsi3pe666fep4bok3f86jin8sroherucx3w9lr8cql8m3c29nzxlq5gj51qis86r9sir7hvm790d3xi84b8mt5h52azj0dks2ccj91k1sg9szrbk8pp0kj2ml1jmw8j02pblja5ediafwsatkzsyg52wytraxo02dpfpg9n8pqq46v6adfn7he6216el003el6exqmm43gn7asc51nidxnt25w453ulvife8pmjncqkxm1526359hvl29ny9haz9286b06bc9zgi65n25538m9lpzeriogxyx8idj6y1swv1ge8ni47c4lhuh88ce5tv1j3dh6kaon84cwa3z7rcyxjzavf6fqkqxszig5h9pu0tocyxq0xw1cves53iaz8lanj2bwqdezlg5n4qc1xccd49yloz7up3c876yfcxot8u35n2lit90hump1kbkbmdsv3wcvnb3rjrtc23uiutr73e3vw62b83vkk8flakdj8ggke8icql85bim8e9wvi8ghnrdkgxhzxlfqcahboj29xedy2ihen497ah72j3gjfnr7gd95uk1qnq1tb7lw5ewe606xcyroeneeh7vorordkuzjrrspuwe891k4g6sr9m7kqhhv2k5mkchpn479qwna2tygr3g5r4mom1vbuhxrog8c6p3g8lien0avc03tpaznwiq5bk5qu',
                administrativeAreaLevel1: 'ib9hoqx5v4oq4vuwdjk4nkjpwngb1qh7edgk2mwcdtgo2cligg',
                administrativeAreaLevel2: 'fxfenov4fopdiwzd5jj1i52i6z0kgszakb2wddfxyddb2w4bzh',
                administrativeAreaLevel3: 'zghs509591kttkulmoekokj7kwaxo2zjaw5kw3p8ghw5g2lw1o',
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
                id: 'f86a7906-32b0-4556-83b4-f0cfb74b1fa8',
                iso3166Alpha2: 'bh',
                iso3166Alpha3: 'quv',
                iso3166Numeric: 'e4n',
                customCode: 'debnj09mvn',
                prefix: '4k3qm',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 420184,
                administrativeAreas: { "foo" : "bar" },
                latitude: 21994551041455584,
                longitude: 13000774372572016,
                zoom: 17,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Plastic Pants',
                slug: 'ipsa-repellendus-minima',
                administrativeAreaLevel1: '97ak7w1phrbvrnpksohb6sym3dwvr3wbmx0t2hkjsl63i8ocw9x',
                administrativeAreaLevel2: '7g7r7pe6omkte9dfa8jk20t16wwm5ew6g7yc8db5ab90bfy9b0',
                administrativeAreaLevel3: '41ukn6pkl21g0mdnumg1uu4bi84fw76rv4qz563vs2kb2ekzuu',
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
                id: '64ed6bcf-9632-4b14-bef7-865fe8c05fe6',
                iso3166Alpha2: 'kv',
                iso3166Alpha3: 'uu6',
                iso3166Numeric: '20s',
                customCode: 'klm99pphqo',
                prefix: 'gysjd',
                image: 'http://placeimg.com/640/480/business',
                sort: 301059,
                administrativeAreas: { "foo" : "bar" },
                latitude: 15563364264828674,
                longitude: 79618697725535940,
                zoom: 32,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Cotton Towels',
                slug: 'qui-qui-animi',
                administrativeAreaLevel1: '7fij6gh57pohfi8p2ibkgkkn3t2erl2y30mv0nq1bizkh7leog',
                administrativeAreaLevel2: '1a6jm98hhm44u2gpvwz41z1u8t55oe36uh2301vl8mtfbx3en0n',
                administrativeAreaLevel3: '98npsk98agks58wpw09zf7yljf8kwsd6ftjq7ala7tphe7q4lv',
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
                id: 'af1c99c9-b01f-4351-a700-bebe336521db',
                iso3166Alpha2: 'hh',
                iso3166Alpha3: '4h0',
                iso3166Numeric: '6f7',
                customCode: 'cnbk2nsp5m',
                prefix: '4gsfg',
                image: 'http://placeimg.com/640/480/animals',
                sort: 582152,
                administrativeAreas: { "foo" : "bar" },
                latitude: 55242935347174920,
                longitude: 74394868261764900,
                zoom: 49,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Fresh Pants',
                slug: 'voluptate-veritatis-sed',
                administrativeAreaLevel1: 'tujtguqnk77ik9b8h2xlx2iqpt2l56l0gfzt9kv352ih8o9wz9',
                administrativeAreaLevel2: 'vu8jxejqa4uogkvzmuao5cj577ew72f41tj9h83r7jp0q3c0k8',
                administrativeAreaLevel3: '9rafi38bqei37y64k29wc6g09dypixlrro3l84tzkhmpngr2uev',
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
                id: 'c03e6c53-fa27-4506-a53c-3ef3d0230dfe',
                iso3166Alpha2: 'zg',
                iso3166Alpha3: '3hp',
                iso3166Numeric: 'k2t',
                customCode: '0b2mykb228',
                prefix: '3mzx6',
                image: 'http://placeimg.com/640/480/sports',
                sort: 153354,
                administrativeAreas: { "foo" : "bar" },
                latitude: 47233642717101480,
                longitude: 52973753236043190,
                zoom: -9,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Metal Bike',
                slug: 'tenetur-ipsum-rerum',
                administrativeAreaLevel1: 'ot5hw5vy9vqz7rrc91z0mkqgwr8to5x6c6pvhf08tup9gekkde',
                administrativeAreaLevel2: 'yt3hsfsbq642al5rdl9o5s2uf0h5o0zse4z2q86u2lssbvw3jq',
                administrativeAreaLevel3: '6ajk3a433z2oldoe5t98qtxkr8y9nozrbqi6r12abpzkgwn48n',
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
                        id: '0604b9fe-76ab-49ee-a305-c7b0a0120d11'
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
                iso3166Alpha2: 't3',
                iso3166Alpha3: '5b1',
                iso3166Numeric: '6xy',
                customCode: 'p0oad62ied',
                prefix: '82329',
                image: 'http://placeimg.com/640/480/transport',
                sort: 381475,
                administrativeAreas: { "foo" : "bar" },
                latitude: 60421319974144040,
                longitude: 73936432301339360,
                zoom: 23,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Wooden Bacon',
                slug: 'rerum-labore-itaque',
                administrativeAreaLevel1: 'sx0kz2xbfk0ekckmxa9gfohbd6wjojm886nyigfvzboqnatjcz',
                administrativeAreaLevel2: 'qmi69gtj56f3jltymmhygon6u8euyfnyiqskjiqfsavsn1fwfc',
                administrativeAreaLevel3: 'vomalqx4jqwf3vppuf5nceprk0tdsxm4l4m41dxn5q26xgury5',
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
            .get('/common/country/2f962bfa-caed-4ca7-9b2a-b2637fa7adff')
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
                id: 'bcdc3e3b-2d0e-47fe-939d-81779dae697b',
                iso3166Alpha2: 'cw',
                iso3166Alpha3: 'tbh',
                iso3166Numeric: 'pk4',
                customCode: 'qk8n5udhhk',
                prefix: 'q9pmy',
                image: 'http://placeimg.com/640/480/transport',
                sort: 360889,
                administrativeAreas: { "foo" : "bar" },
                latitude: 92692262809674820,
                longitude: 83220738151409100,
                zoom: 50,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Metal Chicken',
                slug: 'doloribus-ipsum-quos',
                administrativeAreaLevel1: 'mgmuupz9rsbhibtqjv0t6974b4gxwdayiybfgdwexzr53apr9e',
                administrativeAreaLevel2: 'koabowtvg4vbndrkaf49oojhatv0myubsdzsh105yeybjiyb87',
                administrativeAreaLevel3: 'rj0016kco5tkepzhqukv2p1xkicbil1eb7qicp24olu8fz3bg2',
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
                iso3166Alpha2: 'k5',
                iso3166Alpha3: '0rg',
                iso3166Numeric: 'a8j',
                customCode: 'vqjgj86fi1',
                prefix: 'qf82l',
                image: 'http://placeimg.com/640/480/people',
                sort: 131560,
                administrativeAreas: { "foo" : "bar" },
                latitude: 41620767428158750,
                longitude: 42704282311989230,
                zoom: 51,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Fresh Salad',
                slug: 'et-consequuntur-voluptatem',
                administrativeAreaLevel1: '2rh8p2uqbdetu3ddnx0cufavdn82e141nxeb1154i7v7n45u9w',
                administrativeAreaLevel2: 'i4f8147n5j08n3nmrlst3sjrylydyg5p8ncjtazp448frsityu',
                administrativeAreaLevel3: '4cst8dplmx0oemrhybgj82yd9il26fvxmcnd6ivgxio31mqoqh',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/88e8605c-d1cd-485e-b47a-10bbbc132c8c')
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
                        iso3166Alpha2: '9b',
                        iso3166Alpha3: '9pl',
                        iso3166Numeric: 'j4v',
                        customCode: '42uye8eljg',
                        prefix: 'srseo',
                        image: 'http://placeimg.com/640/480/technics',
                        sort: 745379,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 54148395818205650,
                        longitude: 77175800938552270,
                        zoom: 27,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Unbranded Soft Towels',
                        slug: 'nulla-dignissimos-at',
                        administrativeAreaLevel1: '6smhbx8v15uche2dfbk8wd32fgr691mv3v10ulgltdlgjy6lav',
                        administrativeAreaLevel2: 'j3rikfbtpldqmc5iyl8plcwfi7kp4hrywin611tzruqz8c75xc',
                        administrativeAreaLevel3: '6u9ileoaimhrka1bd5jd15e7q73km4wx7x74gs0egnfchgr3ve',
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
                            id: '7fbe1370-905e-4406-b0ad-f93829cd0594'
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
                    id: '84766cf0-7392-4eab-b1db-5967916edaff'
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
                        id: '321b6547-2bc3-4ea1-a33b-41397add9755',
                        iso3166Alpha2: 't4',
                        iso3166Alpha3: 'yea',
                        iso3166Numeric: 'cid',
                        customCode: '9giklaed0w',
                        prefix: 'l6mh3',
                        image: 'http://placeimg.com/640/480/nature',
                        sort: 315382,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 43777953287048856,
                        longitude: 34194953319201388,
                        zoom: 41,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Incredible Frozen Car',
                        slug: 'harum-autem-nesciunt',
                        administrativeAreaLevel1: 'cecbbu483j3r2bil1r73psuahzhalt0xfm17mnfatrievech3r',
                        administrativeAreaLevel2: 'r1slb4qqdg26imxu7qqwzi6z1118ybhgkt07xlsc4nt46o497a',
                        administrativeAreaLevel3: '90mvp0jpavm52s3w9uhox869tld5ncp1mmuvyzhtkntyzzofj8',
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
                        iso3166Alpha2: 'xu',
                        iso3166Alpha3: 'v23',
                        iso3166Numeric: '51r',
                        customCode: 'c7eq8fdcix',
                        prefix: 'xbnq0',
                        image: 'http://placeimg.com/640/480/people',
                        sort: 633100,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 33810071965976850,
                        longitude: 61535741663439250,
                        zoom: 76,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Small Steel Chicken',
                        slug: 'dolorum-vero-consequuntur',
                        administrativeAreaLevel1: 'p240xxnrnkny07lqf58ifdwb1q9akeygd7jdchfpfwy1f49dii',
                        administrativeAreaLevel2: 'qrias4g9ofj4pc7y9p0oktjejyqpenqqhsvlql601r00ll5tlu',
                        administrativeAreaLevel3: '7nwmp2q0nabv029zzruifbep8lr1uai0ukx3n2t7ri5hy13qca',
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
                    id: 'fa5b42f7-5863-49bf-9a08-278884af9777'
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