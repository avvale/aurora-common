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


// disable import foreign modules, can be micro-services
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
        await repositoryI18N.insert(seeder.collectionSource, { dataFactory: aggregate => aggregate.toI18nDTO() });

        await app.init();
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: null,
                iso3166Alpha2: 'vu',
                iso3166Alpha3: 'mhw',
                iso3166Numeric: '5ib',
                customCode: 'tz8ckhcnrz',
                prefix: 'ylghu',
                image: 'http://placeimg.com/640/480/business',
                sort: 256256,
                administrativeAreas: { "foo" : "bar" },
                latitude: 53174713832559010,
                longitude: 57362755910249704,
                zoom: 35,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Steel Sausages',
                slug: 'unde-eum-sed',
                administrativeAreaLevel1: '2ag45cix63dhxreigwi5jsd4yhzl62uadyegqbd2mo4b5w2szp',
                administrativeAreaLevel2: '3v2tuptd1aepx2f4zntpbde71qfrciy25kzil1e8eldq9lfne8',
                administrativeAreaLevel3: '6elnpwfd47kbdsxzd7fanqd5a5kdlo8d5xoq3bla6lhvr3hlqb',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '3bcc7bbb-5002-41af-b834-8a4ac5a076c7',
                iso3166Alpha2: null,
                iso3166Alpha3: 'nk2',
                iso3166Numeric: 'eby',
                customCode: 'fltg8far4u',
                prefix: 'enmvc',
                image: 'http://placeimg.com/640/480/animals',
                sort: 706356,
                administrativeAreas: { "foo" : "bar" },
                latitude: 43424022883814130,
                longitude: 14535636883175952,
                zoom: 63,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Metal Salad',
                slug: 'iure-ea-saepe',
                administrativeAreaLevel1: 'ban7khgjbqdo99pwc7ye71ysecan3fisfjbgp2wsh0ii9mac4k',
                administrativeAreaLevel2: 'rfxed9l4el1oinvgu9q1ynyis00x0v9mc0tx7apknhzwmbms7g',
                administrativeAreaLevel3: 'n8djydm2gk9d2gn02sl53d3t3shsvdart3uoqxlrqc26w4vq19',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '67e321e2-ba72-42fb-a62d-118e5aeeae3d',
                iso3166Alpha2: 'j0',
                iso3166Alpha3: null,
                iso3166Numeric: '69r',
                customCode: 'f11etlklo4',
                prefix: '3kpqa',
                image: 'http://placeimg.com/640/480/business',
                sort: 549825,
                administrativeAreas: { "foo" : "bar" },
                latitude: 12536692486981144,
                longitude: 60730442017326470,
                zoom: 90,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Plastic Keyboard',
                slug: 'qui-dicta-velit',
                administrativeAreaLevel1: 'xe3w27ggg3vdnlwmbhcs02m7gbtvdd2o4kkud2gwl1545pm9zp',
                administrativeAreaLevel2: 'r07iinivzwe378xz1osbxhkpic8qvnhx46xyktq6jea315qihb',
                administrativeAreaLevel3: 'sbqbhlmimssead8swad3bnslx1tbepc5zktjvcbihel2lfaq9o',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Numeric property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '4045fee0-543f-4035-b71d-80bdf54fae1b',
                iso3166Alpha2: 'sv',
                iso3166Alpha3: 'iqs',
                iso3166Numeric: null,
                customCode: 'u0vqh6qgbz',
                prefix: 'vb7g5',
                image: 'http://placeimg.com/640/480/city',
                sort: 347277,
                administrativeAreas: { "foo" : "bar" },
                latitude: 29848814515485492,
                longitude: 27169381112878264,
                zoom: 62,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Concrete Ball',
                slug: 'velit-eius-explicabo',
                administrativeAreaLevel1: '7p5vm4ldvp6yueph7qsnf4x369ak63m31vfxglrwibw7058auj',
                administrativeAreaLevel2: 'sgy0d7fvx3tfh02hq4bc06l7f52f09sby8mgekxkp0pcz1ic32',
                administrativeAreaLevel3: 'r3tc466osliqi5ddoilt222pzvnw26r0v104k2pjf4iryvqakh',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NLangId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '721545da-86ad-4ed5-961a-8cbad4890bf7',
                iso3166Alpha2: 'mn',
                iso3166Alpha3: '54x',
                iso3166Numeric: 'fp5',
                customCode: 'w9d2ug5waq',
                prefix: '1ihe7',
                image: 'http://placeimg.com/640/480/sports',
                sort: 464624,
                administrativeAreas: { "foo" : "bar" },
                latitude: 15160688022615652,
                longitude: 54852962247071670,
                zoom: 65,
                langId: null,
                name: 'Refined Steel Pizza',
                slug: 'aut-ullam-non',
                administrativeAreaLevel1: '6kz320zhvzcbtw9uwg63qflu7mn3ctonqtvxk7awn1dt8cjjh8',
                administrativeAreaLevel2: 'lq8nu1wp2uoaxuz3mcw9uxj63dlczhb7xngewuedl44op3df0j',
                administrativeAreaLevel3: 'qwumdhqyxuixlm9vh5isrh6mkp2pfk7nlad95d9vcr5ab1bz3w',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NLangId must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '385b77bd-ddca-40a0-ac8d-38a8a7b3e3b7',
                iso3166Alpha2: '8q',
                iso3166Alpha3: 'z5e',
                iso3166Numeric: 'ms4',
                customCode: 'o05fz5gwig',
                prefix: '4wtzj',
                image: 'http://placeimg.com/640/480/food',
                sort: 828837,
                administrativeAreas: { "foo" : "bar" },
                latitude: 17280848532710128,
                longitude: 18861704884788796,
                zoom: 31,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: null,
                slug: 'aliquid-et-ut',
                administrativeAreaLevel1: 'in1iirfoxygb7fqv9dinw29ejk8kdd0w52rgh2ec3musn7945k',
                administrativeAreaLevel2: 'k8a9w9qx0c5360bm2zngvsruran50uluf2ifyo7nvdrkn3rzzs',
                administrativeAreaLevel3: 'txqe626lelgnt1bvhh1m8mgg99ptvnhnnxel5277anhtcxwys8',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NName must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NSlug property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '871fa0f5-c942-4253-805c-aee74d583fc2',
                iso3166Alpha2: 'gm',
                iso3166Alpha3: 'ctp',
                iso3166Numeric: 'z87',
                customCode: 'asgsesch9k',
                prefix: 'ubrrh',
                image: 'http://placeimg.com/640/480/sports',
                sort: 416236,
                administrativeAreas: { "foo" : "bar" },
                latitude: 99334400243412530,
                longitude: 33762546817305012,
                zoom: 48,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Wooden Pants',
                slug: null,
                administrativeAreaLevel1: 'ggereka17hgdj0oleo5ptdenfuyavomqmqgizn1grh1a8detn6',
                administrativeAreaLevel2: 'v35e6tuwkbq0g5j1r79ger3xfsftjfa3a1ccts7euwi1228aw5',
                administrativeAreaLevel3: '61twd0lbpyk9iwri6kxypadukuj1du2sar373iph8k0y41lfwp',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NSlug must be defined, can not be null');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                iso3166Alpha2: 'si',
                iso3166Alpha3: 'w10',
                iso3166Numeric: 'teb',
                customCode: '5bpfb94oft',
                prefix: '9m6ws',
                image: 'http://placeimg.com/640/480/cats',
                sort: 623378,
                administrativeAreas: { "foo" : "bar" },
                latitude: 11233075582881058,
                longitude: 52511992963404344,
                zoom: 83,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Wooden Salad',
                slug: 'deleniti-necessitatibus-atque',
                administrativeAreaLevel1: 'aqhgn1rw0s01njeoj1uqvyox6hlhsyp8dbbskn6bm00xxzl2lk',
                administrativeAreaLevel2: 'w4i0crzpshvvhd9rex0k7wri9nieq6v98tyeahl92vg1vrf17i',
                administrativeAreaLevel3: '07hveajz59k096fitc155n4vqnh08f1b9n2xh3z4pl6trk7bzi',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '87406ac1-aa20-40ea-b2d3-40d6e5335788',
                iso3166Alpha3: 'rg7',
                iso3166Numeric: 'hu3',
                customCode: 'xlei35ni6o',
                prefix: 'lbd58',
                image: 'http://placeimg.com/640/480/nature',
                sort: 192771,
                administrativeAreas: { "foo" : "bar" },
                latitude: 21236200468894630,
                longitude: 94746013401861920,
                zoom: 22,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Rubber Bacon',
                slug: 'minima-voluptas-est',
                administrativeAreaLevel1: '4xo8t4za3fb4to329hhspvtbv3jl1zqk49pihpjuwt52wkkwqc',
                administrativeAreaLevel2: 'l5qnuuss8s5fp0xqt38z127rxplhhnws150p0ycqs8jknypjbs',
                administrativeAreaLevel3: 'qyjjz66c4ply3sy1qzlkgryq4bjsleibly55ul7wt7zz99s9lf',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '44cda6f8-9f70-4af8-a448-dd8b5bb83e63',
                iso3166Alpha2: 'o1',
                iso3166Numeric: 'lsv',
                customCode: 'fzmnkzudw0',
                prefix: 'bx58s',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 103752,
                administrativeAreas: { "foo" : "bar" },
                latitude: 56019707524907280,
                longitude: 70062311229627640,
                zoom: 41,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Soft Keyboard',
                slug: 'et-numquam-natus',
                administrativeAreaLevel1: '1d22ith56nalz4saxf85fihnyk2cbnydwaiqvey29xnebpfbsn',
                administrativeAreaLevel2: 'e9my4xmwp02c7kcrmy067dkdxaip0dhpc34wupi6krpewshko5',
                administrativeAreaLevel3: 'mmsgtcp9fca4bzsousvdt45i8pxwiicvbka3e98l6rwecmod5r',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Numeric property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '8bab28f2-db7f-4db7-987e-1c6a63e4276b',
                iso3166Alpha2: 'ef',
                iso3166Alpha3: 'unp',
                customCode: 'xcak12jcyd',
                prefix: 'vo1e6',
                image: 'http://placeimg.com/640/480/people',
                sort: 216185,
                administrativeAreas: { "foo" : "bar" },
                latitude: 31084515178094720,
                longitude: 15283555712196076,
                zoom: 93,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Frozen Tuna',
                slug: 'officia-quia-voluptas',
                administrativeAreaLevel1: 'd2do5aps9j6powqgl7nfw05wakfn4kbyxyy7pcvnhkza1y125q',
                administrativeAreaLevel2: 'j00h14qt3exi4w046fju2m5qfy7b5jlrqu557j92uh6rjd3p36',
                administrativeAreaLevel3: 'etfm50lydwu28u9c9u14oxtlq7tkof0vhc0f6z1xxlk872xuk7',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NLangId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '8b54f47c-b2dd-46ea-a6b5-51c777fd72c5',
                iso3166Alpha2: 'ii',
                iso3166Alpha3: 'muk',
                iso3166Numeric: 've7',
                customCode: 'cuzfashgjo',
                prefix: 'aqd8i',
                image: 'http://placeimg.com/640/480/food',
                sort: 843082,
                administrativeAreas: { "foo" : "bar" },
                latitude: 92982749231878750,
                longitude: 32806259970181228,
                zoom: 29,
                name: 'Tasty Concrete Salad',
                slug: 'animi-natus-commodi',
                administrativeAreaLevel1: 'mz3rz56fhkjnonozpr1us4m08zp4dlpbfgg764hjfj77dcgwc8',
                administrativeAreaLevel2: 'xj9z1dt5ldp9pgh5ihzjjm6qgtwpufuhq931xynviw1hxe4gcz',
                administrativeAreaLevel3: 'b62j5m7zskoxarja0lt01vi58g98tx6zis1tx0w4uij8hu5wqj',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NLangId must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'ed5dca44-1880-4784-b79c-ca98ff861464',
                iso3166Alpha2: '4e',
                iso3166Alpha3: 'g9n',
                iso3166Numeric: 'h53',
                customCode: 'l4fzlzftmr',
                prefix: 'z8r77',
                image: 'http://placeimg.com/640/480/technics',
                sort: 689329,
                administrativeAreas: { "foo" : "bar" },
                latitude: 93822674080157040,
                longitude: 72441342746921710,
                zoom: 48,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                slug: 'recusandae-amet-et',
                administrativeAreaLevel1: 'mu3hhpzlj9ytjh5uu9bxgfiebg3a77iw8zw8lzsjerqy1qprwh',
                administrativeAreaLevel2: 't0qhs4mfhhk7ux9huam732r4x6nok69hdbmavykf2j321666ii',
                administrativeAreaLevel3: '143rtfwkh04bnl36z8qw0j4qcfqlvz7ru4xq3dd0xb2pl6g5p9',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NName must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NSlug property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '0785b321-34a4-492e-8cd9-40dfe1710618',
                iso3166Alpha2: 'ch',
                iso3166Alpha3: 'eeo',
                iso3166Numeric: 'st5',
                customCode: 'oi2emyimyl',
                prefix: 'm29cq',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 430774,
                administrativeAreas: { "foo" : "bar" },
                latitude: 38590828670705010,
                longitude: 92635951072730580,
                zoom: 88,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Fresh Chair',
                administrativeAreaLevel1: 'newrpt97xjs1iaczjomvj2ep8zhgxac6nw4llhnwvl4p40217k',
                administrativeAreaLevel2: 'whmafxr7ptodfna3izx0spgb4gbvgkvzv8jdireld8oznl8n1p',
                administrativeAreaLevel3: 'kyzy6k571mma3q0zujoxolyye8pnagfu3steua3c2qyl78a4qr',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NSlug must be defined, can not be undefined');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'k0getsbzrjy4ujds720j5pp8f2lktf9j4s4ru',
                iso3166Alpha2: 'wc',
                iso3166Alpha3: 'n2l',
                iso3166Numeric: 'k6x',
                customCode: 'phds2zzstw',
                prefix: 'tvm2v',
                image: 'http://placeimg.com/640/480/food',
                sort: 888017,
                administrativeAreas: { "foo" : "bar" },
                latitude: 65845057535201704,
                longitude: 50364392313985240,
                zoom: 47,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Frozen Shoes',
                slug: 'praesentium-optio-nulla',
                administrativeAreaLevel1: 'dkem5f62bmadan3p40xbxwah4679qif32xzuwtew7g4ia0puxh',
                administrativeAreaLevel2: 'c525vzakogayyx6krk4d1sr54vi3gvsnlc4wkeaw7u37n6y2bt',
                administrativeAreaLevel3: 'ln2nqrpswikgp2rpsthe9pdp8tf78vloi9lil5da3aazvdnbzi',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha2 is not allowed, must be a length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '2d7733aa-05b8-42a3-85b7-658e7c071435',
                iso3166Alpha2: '7gq',
                iso3166Alpha3: 'n20',
                iso3166Numeric: 'nlw',
                customCode: 'oweb2wnfn7',
                prefix: 'qsedp',
                image: 'http://placeimg.com/640/480/transport',
                sort: 739568,
                administrativeAreas: { "foo" : "bar" },
                latitude: 31010643185418696,
                longitude: 86701654140664050,
                zoom: 68,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Fresh Salad',
                slug: 'delectus-ut-consequatur',
                administrativeAreaLevel1: 'xw066w66tjox4u5xj7y07bt05z4e878613hmrowrv8byk3ql5g',
                administrativeAreaLevel2: '3qp8gkaobbhivhxawmdfepmxd1rk1ow6nl61oqnh56kpph8tdz',
                administrativeAreaLevel3: '709j7portgbdvjirqgr5hehg8ee2l8aqtgjdiudcqb297uxc0z',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 is not allowed, must be a length of 2');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Alpha3 is not allowed, must be a length of 3', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '1de8c7d2-b9f6-4dfd-9f50-c24b6903a412',
                iso3166Alpha2: 'yh',
                iso3166Alpha3: 'yogo',
                iso3166Numeric: 'tdi',
                customCode: '4y2ycn0w4y',
                prefix: 'ic0b4',
                image: 'http://placeimg.com/640/480/business',
                sort: 613075,
                administrativeAreas: { "foo" : "bar" },
                latitude: 27503752926351624,
                longitude: 65079990780082360,
                zoom: 27,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Steel Ball',
                slug: 'ratione-et-incidunt',
                administrativeAreaLevel1: 'ayv0by9mti16aeee9qaznypiwv2oy1sfcsxf8cow6zvl9j2u6r',
                administrativeAreaLevel2: '3vzlmhkx8lqzn990f3mq88qhajzgi113gyak88yexrjt4s41jp',
                administrativeAreaLevel3: 'd9d5whh04yg6kwlgsioe78wvj5upe389i752ims3ouavvh9yxa',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 is not allowed, must be a length of 3');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryIso3166Numeric is not allowed, must be a length of 3', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'bdab0e74-592b-46cb-b69a-641f56c72f99',
                iso3166Alpha2: 'pc',
                iso3166Alpha3: '676',
                iso3166Numeric: '5oee',
                customCode: 'rsvjsvq5zp',
                prefix: 'n57ic',
                image: 'http://placeimg.com/640/480/sports',
                sort: 263127,
                administrativeAreas: { "foo" : "bar" },
                latitude: 78814967578115100,
                longitude: 63782608649375220,
                zoom: 50,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Gorgeous Fresh Fish',
                slug: 'minus-laudantium-doloremque',
                administrativeAreaLevel1: '3486vq3wtd2840mvi1w7e8d1za5dsf5c18rr6qnrl81pgqfu3k',
                administrativeAreaLevel2: '23otlpfwt0ov3sp9lvjw6abi54j7kgm74hmd15hkc034mcqvt6',
                administrativeAreaLevel3: 'm2lum74x01fj854wnejfmhaefuv8i989n8rpd2vgzizcfd745r',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric is not allowed, must be a length of 3');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NLangId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'd1c08c6c-5bba-4afa-a89b-62b1605b8905',
                iso3166Alpha2: 'vw',
                iso3166Alpha3: 'zi7',
                iso3166Numeric: 'iba',
                customCode: 'drzudeg1an',
                prefix: '76fsa',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 212058,
                administrativeAreas: { "foo" : "bar" },
                latitude: 64382205832909090,
                longitude: 40836925995475250,
                zoom: 19,
                langId: 'q5ehe83r5ttpq8z9fe3jwk5r5xjucyuusgnoq',
                name: 'Licensed Cotton Towels',
                slug: 'et-aliquid-enim',
                administrativeAreaLevel1: 'hd7w8wmn0t7kv85xjvjtd481cb3r5az7j9vs8fs7dxyr0injx6',
                administrativeAreaLevel2: 'xphuz10l6jwc7tv8sdqxd8tjv7mf4w1h3b0dq3btr8cova4q80',
                administrativeAreaLevel3: 'r8ume9roet0ktuibinexdkih4cstguwftzypcjae8l2si905bi',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NLangId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryCustomCode is too large, has a maximum length of 10', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'b24e8c40-9d4d-43e2-a6ab-ab4c9d8570ae',
                iso3166Alpha2: 'hd',
                iso3166Alpha3: '4t2',
                iso3166Numeric: 'j3k',
                customCode: '8x3fcqprhjc',
                prefix: '9xaf7',
                image: 'http://placeimg.com/640/480/technics',
                sort: 119151,
                administrativeAreas: { "foo" : "bar" },
                latitude: 15540446755127456,
                longitude: 10246624174161790,
                zoom: 72,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Plastic Pants',
                slug: 'nulla-sed-quam',
                administrativeAreaLevel1: 'zr318dcbbn677p6sksdvaz3m6qu04v31b0vj87vc3s8nmckr7i',
                administrativeAreaLevel2: '4kx6by9su6tb6zgv7qqjx8ig9pmlo5qnivnf5lfx5p62bq6r8m',
                administrativeAreaLevel3: 'ypaikfvznp68mqvoaa5q1fgrgiipqm8se65pt3iv7y4nsv7e3y',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryCustomCode is too large, has a maximum length of 10');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryPrefix is too large, has a maximum length of 5', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '90e430cc-6462-42e2-92b4-6613339428b4',
                iso3166Alpha2: 'th',
                iso3166Alpha3: 'tsm',
                iso3166Numeric: '3hd',
                customCode: '4rrayo4d6j',
                prefix: 'xnzez9',
                image: 'http://placeimg.com/640/480/animals',
                sort: 682607,
                administrativeAreas: { "foo" : "bar" },
                latitude: 47211052727845980,
                longitude: 77458108735971840,
                zoom: 66,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Frozen Pizza',
                slug: 'nam-eos-ad',
                administrativeAreaLevel1: 't2hzzar7i960o999cbjlgj2mqsc6ej0kzpwuze7bld1xdv5zo8',
                administrativeAreaLevel2: 'y1d6bf9t7fowqzlff76ozemxqb9ff35ofjfzvice2lqotx4jj9',
                administrativeAreaLevel3: 'x7hmw11myvz96mhlxo091f2ybf351ltlgpw7ecb9kodmxjcu30',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryPrefix is too large, has a maximum length of 5');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryImage is too large, has a maximum length of 1024', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a4a1cbab-38ec-47e6-aac9-d5cbccd51acd',
                iso3166Alpha2: 'up',
                iso3166Alpha3: '9ea',
                iso3166Numeric: '2k5',
                customCode: 'b1oe903jz5',
                prefix: 'a3iqo',
                image: 'trvobmf7daelv06unrzqie8nzi6m87y8i1o32bm63fav99mkuz3pfl921uvtu96n9q8jt81wpp47pwopne7ra56g3chieasm2d6tsoebgm7uq61qggbryvktr1dp3wll53gcxxmo176l94fmohnzwrh8iirnaagep8unb3wn0uvtghjgs27rsdnyuw2tpt5b12aetmafk2zqr420wzlc8q8j5hmkvlthj2ppajglktlwabav4hn0ry8hbhlpcqyl8muk8oxbho3pz4gta1q3l235te1nsel9q20juue5q8ty95for49f6b089fbogc1rnus5r79kvh8p34pjkngi3hf45sput8df42e29dhmdfeul1a7wbi228enawi27467vqwmw2t9v4meibuygrf8jm53sst4ynyy6jgxtn39x5zcqwjkvclmfmjwfygkhajhh7shyk9ezjh6lqr85v1konotrgoass9j221jnhw7si63gubwgvc0vmx3tp1zqsoins89hnorswlxpjnlslr9t9t0ph9nrssy6j6ermzqy1grm7j5n3nce6ytyyzq01y3g2xojnvlr4ad36xrxrv1jckyoyuuhw4izplc607mi9q0wd62d9ypwokpafxe72fi6gk6jljybeap4yuwfz77uo8qqbfercdzf23jzg4gjx0scs6ulf2j2fqhkb25ztub1eillw76ze6dsiafbezwb4osg57iznpmgdc207aw8s63jqtq5s2hr437wvtfk0c803zgirub0ytgy8a0j9jmvj9pdikihu94jca3qztvelfc7hnbgjd1fiyialzgvwj1i5q1fuawho0e5h8aik1aabmf7n49z1g5da5bid3v06n9y8iki329mqqzeaci1cv5bm6h2jfne06ztzsap11y4cyd9x2okywn1kvfohobt248vwjjgkdezy373a3jc1orvxqooj47skg1milc57k2ixeq38utisgqzf2aaigyzs00xyzhtpqh13l7yk0ymin6z',
                sort: 317998,
                administrativeAreas: { "foo" : "bar" },
                latitude: 74516944648377820,
                longitude: 67052475857084056,
                zoom: 44,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Fresh Bike',
                slug: 'nemo-voluptas-fugiat',
                administrativeAreaLevel1: '1g42l01s4sxdtd93v4t9wl4kvscl8jqgjeftmr5k9hb5cdxro6',
                administrativeAreaLevel2: 'lvfo2pntxbqwwmyw6qhyfuuhjyygys42fmpkmebfjoqwg4a47c',
                administrativeAreaLevel3: 'lttq2ciri7w012robo7tg7i040m6bk2bx55ksujd2nm76nz29g',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryImage is too large, has a maximum length of 1024');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountrySort is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'be1e9550-2032-4018-b7f9-517d6857a1d5',
                iso3166Alpha2: 'ct',
                iso3166Alpha3: 'cru',
                iso3166Numeric: 'q6f',
                customCode: 'uk0d9l0ck9',
                prefix: 'x8oa1',
                image: 'http://placeimg.com/640/480/technics',
                sort: 7745128,
                administrativeAreas: { "foo" : "bar" },
                latitude: 47244368151113624,
                longitude: 35529551004393812,
                zoom: 60,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Plastic Soap',
                slug: 'consequatur-et-velit',
                administrativeAreaLevel1: 'g45tzjc4jm42wdfovedbrsczl5zoit39ow5g8fdkcfgah1oweg',
                administrativeAreaLevel2: 'i5o7p57d0chz89cafjnnawzwfrjghpswbfqp8xaka5d8nhibw4',
                administrativeAreaLevel3: 'ajqrrloxaawh63fpz5wmm0ib2lauvldzbu8q4vsceuj72xb724',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountrySort is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryLatitude is too large, has a maximum length of 17', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '2dc2244f-42bd-4a12-b363-9b2bb9746df6',
                iso3166Alpha2: 'ik',
                iso3166Alpha3: '5wt',
                iso3166Numeric: '48o',
                customCode: '933ttcu76o',
                prefix: 'r0qkz',
                image: 'http://placeimg.com/640/480/food',
                sort: 195895,
                administrativeAreas: { "foo" : "bar" },
                latitude: 194732570671125860,
                longitude: 75338941197312820,
                zoom: 15,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Rubber Shirt',
                slug: 'aut-corporis-et',
                administrativeAreaLevel1: '4aftyeujo9e49l8gxwamrkxtiyk682v9g59ztjqwdu4y6y4ezq',
                administrativeAreaLevel2: 'xy9sjf94uufkz1q7gup2ncslwlvsi4xzhsa8cq5plfmx9y0x9h',
                administrativeAreaLevel3: 's9t2wpqtiw8lacnijy6d6tcimwlw3oiegdvcfhfe4ncxd93hx5',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryLatitude is too large, has a maximum length of 17');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryLongitude is too large, has a maximum length of 17', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '57997604-71e8-4b17-848e-a1dd7c8c3a8d',
                iso3166Alpha2: '3i',
                iso3166Alpha3: '4f5',
                iso3166Numeric: 'wsa',
                customCode: 'wed9yun9um',
                prefix: 'bdf2p',
                image: 'http://placeimg.com/640/480/business',
                sort: 302452,
                administrativeAreas: { "foo" : "bar" },
                latitude: 57091830122880620,
                longitude: 499117293814272100,
                zoom: 54,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Concrete Chair',
                slug: 'officia-velit-ea',
                administrativeAreaLevel1: 'ww391sumszrbquow4c8if9lqssem6u2jazgiul3w6u1ab1p6v7',
                administrativeAreaLevel2: '85pekddmlk38wqctnuv9et0jlspcfbyygo827dzfmsgfgi768y',
                administrativeAreaLevel3: 'g6ua5slbwvraug76if8qsf6ufsips6gxty27tj70xvcqzrany6',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryLongitude is too large, has a maximum length of 17');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryZoom is too large, has a maximum length of 2', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'b7c84e02-1fba-451d-8bdf-d1d219f485a6',
                iso3166Alpha2: 'gu',
                iso3166Alpha3: '66c',
                iso3166Numeric: 'skb',
                customCode: '0pnzhzz5h1',
                prefix: 'a1vtq',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 107067,
                administrativeAreas: { "foo" : "bar" },
                latitude: 82095564887236830,
                longitude: 37307296509931250,
                zoom: 316,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Soft Shoes',
                slug: 'id-aspernatur-ab',
                administrativeAreaLevel1: 'wfuryy8oo9tz4i0d2lhswwfzc73pg9pd37ztjrm1hsydn2na05',
                administrativeAreaLevel2: 'wfr7ufotmz1qufjg3dijt3o9ngk5qye45lgczp93ofnraibr25',
                administrativeAreaLevel3: 'kbyu5a4nc8u7n1gtlktttwrrvalzqlawr4ef0oiq5zls9bn337',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryZoom is too large, has a maximum length of 2');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NSlug is too large, has a maximum length of 1024', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '63db3333-7d53-4408-8bc0-6660c45a49af',
                iso3166Alpha2: 'op',
                iso3166Alpha3: '64f',
                iso3166Numeric: 'o4y',
                customCode: 'cnl1l9i93q',
                prefix: 'nsz0h',
                image: 'http://placeimg.com/640/480/sports',
                sort: 239348,
                administrativeAreas: { "foo" : "bar" },
                latitude: 11856551294643824,
                longitude: 95209948227624770,
                zoom: 18,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Soft Shirt',
                slug: 'l5b38ocf7lm15pi4outd4so7esrx2slfpxf3pirx94irj3tpd86qsfkf301g0qkf5enmwgvngisykt8wy0w4qrxgr0ulbw57z6iuxz3b9wl07e9utan921rlg3jp6b7z6449nhfqx6aoq77w7ejdqll7pc1se5qi33979g7sv9ry6zb279aoh2g9t9sfwmd5ehl9j1gjswb848l5z1e665p6cr0qsgce9k1qdlodn9vwn5l57j57jucl19qysxu9mucok8ujezczk2yz8ozsgx6rlfam8znzy4jyw05uix4q9pqlhzngazg5fq29whe6dzoejqq8k5ev07ilvhyoptraibfynn3coucstzn48y24axrt4v9ysrxzv0qiiry3i5lsb7i8an13dqjyrl0jgzxk818ar9qy1jblwzxtbj7s2wu6w30jp6dh72nfem9u4y4nlke1stl305wnpwfpkja8j8y8juusvpkottrrfpglr7u4c8tmvbo7pzkevii3c69q5hthqqk1husybrdgwnd0hkzk10osox75nhy1inpmol62ijmebkcqmca2pkoism2j4vjtuvlxbzzdxdave710kx3etooszinc9gjgu4avw0r9uoi8cyqdq0b8xlygo2kpp59fvacywownki8r8opqhn2rra17xrhu997kmwwpnzle376ant8pf4oe71yk4e4nh70w2pce4kzgac5zgeulydtl0y647jy6l34070cfjod2rwytbx9dhazfhlenypq0gr0fc7h4xmy3hvd81dw5uzyj8z1pyv5t9m4aw14yfswfgv7dnrvgaiac611ajbr4hv1mj1idtwlujg8vtsxvam6dk6vfi8jjvpwyc8vxuvuel442z1rx79e6sz84lla8ijakbmhdsn8xgfiz1kkahee0ry1a61sr2wvk6vlxz95vxv7jgy654sn1vxmvi9z0ii3vv9rkdcruj7a8gb10u4g0q45yc8ylgr4uvl9sqqardfjg66sjiry7ez0x7',
                administrativeAreaLevel1: 's3kgz783wvwhsdjuexlqsv9icryxa00s7swtg87xh0qjc6co4a',
                administrativeAreaLevel2: '1z3s6kp5ipycrwfucpjz97gpjgjzz5whk5290tocsqepbx7vhz',
                administrativeAreaLevel3: 'xpj8p4cj7loaw8k914dovnxp8aqpk3mlsdcp9j73hrwaj0u521',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NSlug is too large, has a maximum length of 1024');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NAdministrativeAreaLevel1 is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a96f22eb-cded-471b-922c-2a69ca9bb343',
                iso3166Alpha2: 'ml',
                iso3166Alpha3: 'u0c',
                iso3166Numeric: 'emk',
                customCode: 'cbdg9rbc6a',
                prefix: '45f5j',
                image: 'http://placeimg.com/640/480/transport',
                sort: 105275,
                administrativeAreas: { "foo" : "bar" },
                latitude: 77981132979021250,
                longitude: 76294448816591140,
                zoom: 80,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Cotton Table',
                slug: 'facere-occaecati-libero',
                administrativeAreaLevel1: '487c83rshx8i7eaoofdkg4ekhy36ouwkpl4p94iiwtgtv8uwh64',
                administrativeAreaLevel2: '3pzs60dhj3zcvwav3mahmwbpcict59h8lf78z6wzmvrpbho3dz',
                administrativeAreaLevel3: 'tinnp3h9ihfuxicjasu056cyreu42gplqaavo5k8umz0wjh59e',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NAdministrativeAreaLevel1 is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NAdministrativeAreaLevel2 is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'b4bbd33c-13bc-47bb-8af6-2ab9e08587a6',
                iso3166Alpha2: 'yg',
                iso3166Alpha3: 'vpd',
                iso3166Numeric: 'iyz',
                customCode: 'qx4748kxbl',
                prefix: '8lx2q',
                image: 'http://placeimg.com/640/480/sports',
                sort: 213123,
                administrativeAreas: { "foo" : "bar" },
                latitude: 64047332352963064,
                longitude: 32881066485549284,
                zoom: 22,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Gorgeous Fresh Gloves',
                slug: 'et-ut-quis',
                administrativeAreaLevel1: 'gieoy6sta7k6qvmux4c4onigrp5kb21qtfv9q6vhebbozj1hn2',
                administrativeAreaLevel2: '3zrq329qyp8kdcmtjvpotvwo46rdlp1pv1l3xvtmepm0g1as1eb',
                administrativeAreaLevel3: 'xls5qiy6vrv91kb3782z48j7bz4478oy0hsfy9gxlr5r86yk9p',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NAdministrativeAreaLevel2 is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryI18NAdministrativeAreaLevel3 is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'd7fe7ad9-8981-459f-9cb2-3635643700d1',
                iso3166Alpha2: 'ii',
                iso3166Alpha3: '5bf',
                iso3166Numeric: 'ezw',
                customCode: '3oryvhio6c',
                prefix: '8vnl5',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 274689,
                administrativeAreas: { "foo" : "bar" },
                latitude: 99991791538434030,
                longitude: 53710154607357976,
                zoom: 77,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Granite Shoes',
                slug: 'facilis-necessitatibus-ea',
                administrativeAreaLevel1: '6x6pjqbv74gwgg0jv7x8jqngg9efqorclzm1k8u9pc3znrvpdl',
                administrativeAreaLevel2: '1vj9f45r1dvl63klcno08g7z0oei8k2jcvkufpc3udeqjtvncg',
                administrativeAreaLevel3: 'e1s8eznfol9or6okyfme8ctoy28k8pt48wo93h5mbow7s9pd1rs',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for CountryI18NAdministrativeAreaLevel3 is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST common/country - Got 400 Conflict, CountryZoom must have a positive sign', () =>
    {
        return request(app.getHttpServer())
            .post('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: '199fddd5-5fe1-4c31-afd5-4b20e6076632',
                iso3166Alpha2: 'ni',
                iso3166Alpha3: 'x52',
                iso3166Numeric: 'ss0',
                customCode: '0tjyvmcece',
                prefix: '45u48',
                image: 'http://placeimg.com/640/480/transport',
                sort: 280708,
                administrativeAreas: { "foo" : "bar" },
                latitude: 69517769006367224,
                longitude: 10894962986283376,
                zoom: -9,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Soft Car',
                slug: 'incidunt-fugiat-deleniti',
                administrativeAreaLevel1: 'iwdl5dho3p6lou2h90xvy9ucglp3whko773jx8yfu13gnhj6yo',
                administrativeAreaLevel2: '2xe5h7w6otblentmktew3ti3vbba0xxw73etvl56v208indv87',
                administrativeAreaLevel3: 'mhhy54d49dmmscg3n1s5hem409ryq0gkqony2ghfa7z0j6og4a',
            })
            .expect(400)
            .then(res =>
            {
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
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    count: seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    rows : seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
                });
            });
    });

    test('/REST:GET common/countries', () =>
    {
        return request(app.getHttpServer())
            .get('/common/countries')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
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
                        id: '4da372e6-b66a-4375-973f-980446ad495f'
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
                iso3166Alpha2: 'gf',
                iso3166Alpha3: 'grd',
                iso3166Numeric: 'adp',
                customCode: 'g5itxwlals',
                prefix: 'e9qiy',
                image: 'http://placeimg.com/640/480/transport',
                sort: 662534,
                administrativeAreas: { "foo" : "bar" },
                latitude: 64960772049365384,
                longitude: 92567994049310860,
                zoom: 84,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Concrete Pants',
                slug: 'nisi-impedit-perferendis',
                administrativeAreaLevel1: 'fh002zqm9dqpg8e2kvabvowcqmkf0kirvjwwjqtuajok36da1d',
                administrativeAreaLevel2: 'ucjt3ioza5gtew6eq5ufrfgtui9g48jgqguyhpdwzasm844r8w',
                administrativeAreaLevel3: '1havbiqkixgl9y6dodk4p2fap2qb5h3c7zvg6fl9tatqgwnevi',
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
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:GET common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/common/country/7eb14ae8-cad3-421f-b685-2d92d3934e56')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET common/country/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/common/country/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT common/country - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/common/country')
            .set('Accept', 'application/json')
            .send({
                id: 'abf16d7b-5933-4b89-8ba2-53aa1b461121',
                iso3166Alpha2: 'h3',
                iso3166Alpha3: 'q03',
                iso3166Numeric: '856',
                customCode: '0l2gtu8ezy',
                prefix: 'tnpv2',
                image: 'http://placeimg.com/640/480/transport',
                sort: 246933,
                administrativeAreas: { "foo" : "bar" },
                latitude: 63264802384029944,
                longitude: 73186214554919710,
                zoom: 32,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Granite Towels',
                slug: 'accusamus-in-quisquam',
                administrativeAreaLevel1: 'h47r0xaajac6l40v7jp7k6d22u7jpjwyrwgcqw2chiu9q6al99',
                administrativeAreaLevel2: '5o3w39lf2fubzg4a281ortkpbfaplq14l6bbmfp0ts0jy0t1de',
                administrativeAreaLevel3: 'cz9zwfqv85mb02dja9su9fe8x8cetl8ptgshabn7v1os1vlqwr',
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
                iso3166Alpha2: 'ti',
                iso3166Alpha3: 'f1j',
                iso3166Numeric: 'xpp',
                customCode: '53a603c3w9',
                prefix: 'uc69f',
                image: 'http://placeimg.com/640/480/cats',
                sort: 973928,
                administrativeAreas: { "foo" : "bar" },
                latitude: 28047457468134616,
                longitude: 24942155979916010,
                zoom: 40,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Metal Shirt',
                slug: 'sint-provident-voluptatem',
                administrativeAreaLevel1: '1q5dqcx338bnx9oxdp5nrrg21d1vy2yutmaubkgynlbfidb847',
                administrativeAreaLevel2: '59bjh6tlpmr44c5y61bm0imgvp40l0ag499fjqsogcj3qdoqc6',
                administrativeAreaLevel3: 'vr8hsp3skjdsr99ma62xyl1a9pe143zx2w99bzl1hwk8ko9cga',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/28158571-7b95-40bb-ac36-f8e3dfef92b7')
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
            .then(res =>
            {
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
            .then(res =>
            {
                expect(res.body.data.commonPaginateCountries).toEqual({
                    total: seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    count: seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').length,
                    rows : seeder.collectionResponse.filter(item => item.langId === '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a').map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
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
            .then(res =>
            {
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
                        iso3166Alpha2: 'vy',
                        iso3166Alpha3: '9mv',
                        iso3166Numeric: 'xmk',
                        customCode: '1a5w3b38am',
                        prefix: 'mxo8b',
                        image: 'http://placeimg.com/640/480/food',
                        sort: 848874,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 34033373593858180,
                        longitude: 11112618623940964,
                        zoom: 43,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Fantastic Soft Pants',
                        slug: 'cupiditate-quidem-alias',
                        administrativeAreaLevel1: 'q55pigpps1ceorl0zoyqur88cklzxstuevue5ol0u8vnyxq38f',
                        administrativeAreaLevel2: '36e7hhtckrv6wh1rj8bi8rqtweaabtwuw8octeqxjl3ecxlzl5',
                        administrativeAreaLevel3: 'r0tbc8yhk0tcr5qjtdlizrd1brhxios189avtjjfribjyn3290',
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
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
                            id: '6c206f3d-78a9-45fb-8c79-29e9fe2ddaba'
                        }
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
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
            .then(res =>
            {
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
                    id: '512e9ad4-75c3-4f40-a99a-17f52ca0d7f9'
                }
            })
            .expect(200)
            .then(res =>
            {
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
            .then(res =>
            {
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
                        id: '38abb6f4-f5cf-4ae3-9723-322622e90e72',
                        iso3166Alpha2: 'bm',
                        iso3166Alpha3: '7xg',
                        iso3166Numeric: 'uiw',
                        customCode: 'a09um8drqc',
                        prefix: 'pzxus',
                        image: 'http://placeimg.com/640/480/sports',
                        sort: 276009,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 23208734470681430,
                        longitude: 13232642506693500,
                        zoom: 15,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Licensed Soft Mouse',
                        slug: 'enim-mollitia-animi',
                        administrativeAreaLevel1: 'mdb7mhru645rvx9m8xpmcckncp1i2y7hw7nca1ookdc28wwj9n',
                        administrativeAreaLevel2: 'w59xn78sir3tse5puzu72y30ypuls2wg06iz60wedhd5ohmbkv',
                        administrativeAreaLevel3: 'pmopa72g5mb2abmup7epxmvtzxxj8ynjdwhzq2yr7nfs9ptvn1',
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
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
                        iso3166Alpha2: 'zf',
                        iso3166Alpha3: '25o',
                        iso3166Numeric: 'ice',
                        customCode: 'ohxphoq1wb',
                        prefix: '3gt28',
                        image: 'http://placeimg.com/640/480/food',
                        sort: 280104,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 78509862369183800,
                        longitude: 28059396560271304,
                        zoom: 56,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Handmade Concrete Keyboard',
                        slug: 'fugiat-in-molestiae',
                        administrativeAreaLevel1: 'bxg3ih8t1ipbcswgjq3wyu06w6ym38khayuxeivkywk7sin9bw',
                        administrativeAreaLevel2: 'kxv1nqdvx8y2q7bmlziappla9zj17g8kldp8rylbnyiq4a86jm',
                        administrativeAreaLevel3: 'j52mgsk2edwutxpmdsx4rj5yuaeo8cne4xqwg2yjlk057xb6xl',
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
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
                    id: '558e2c91-49b7-4b12-af20-a2a6bffebc3f'
                }
            })
            .expect(200)
            .then(res =>
            {
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
            .then(res =>
            {
                expect(res.body.data.commonDeleteCountryById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});