/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '@apps/common/country/domain/country.repository';
import { ICountryI18NRepository } from '@apps/common/country/domain/country-i18n.repository';
import { AddI18NConstraintService } from 'aurora-ts-core';
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
                iso3166Alpha2: 'sp',
                iso3166Alpha3: '3v1',
                iso3166Numeric: 'bqn',
                customCode: 'sve3u855c9',
                prefix: 'k32mg',
                image: 'http://placeimg.com/640/480/business',
                sort: 447028,
                administrativeAreas: { "foo" : "bar" },
                latitude: 66223445215105210,
                longitude: 96831571351875600,
                zoom: 87,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Fresh Gloves',
                slug: 'asperiores-et-error',
                administrativeAreaLevel1: 'pd1l9cgg3ze81hihvsqoi4y0qlrarxrlxyneybnqxip3uj33bx',
                administrativeAreaLevel2: 'jwwri9zjxnn5btt73q2orfa44qwk0sdxmwmdw7o8ltv2jmt2sv',
                administrativeAreaLevel3: 'btu9okzzx1xgtyhpusfl8090uu1guywms3ok5shir7c74n7a4y',
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
                id: 'fe8423d6-2500-42ed-ba4c-59af21f5b666',
                iso3166Alpha2: null,
                iso3166Alpha3: 'bly',
                iso3166Numeric: 'nmh',
                customCode: 'mpnpq0g079',
                prefix: 'dl0mr',
                image: 'http://placeimg.com/640/480/sports',
                sort: 879707,
                administrativeAreas: { "foo" : "bar" },
                latitude: 68316756199905780,
                longitude: 35973151624558620,
                zoom: 58,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Plastic Gloves',
                slug: 'non-animi-voluptas',
                administrativeAreaLevel1: 'iz25afdmjjdv4irvih94vu5f77qf5oi6ro1vnjdvz78wftuv0i',
                administrativeAreaLevel2: 'lpy58pxlj759ut1fpxu1opvt6pkinthac9w4zubdtxxhry139s',
                administrativeAreaLevel3: '077w0uierzcr3wj9ep3q50n6xfa1spiixj35qmrls3v72ns9lc',
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
                id: '3cae2ab1-c08a-4903-ab4e-224f681010c8',
                iso3166Alpha2: 'db',
                iso3166Alpha3: null,
                iso3166Numeric: 'ujo',
                customCode: 'uo1fd5h8ak',
                prefix: 'tv2rn',
                image: 'http://placeimg.com/640/480/business',
                sort: 835695,
                administrativeAreas: { "foo" : "bar" },
                latitude: 27526727652821144,
                longitude: 97515363526609250,
                zoom: 68,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Cotton Ball',
                slug: 'ut-odit-velit',
                administrativeAreaLevel1: 'qi3paqarfn6l71c3zheu38j5xg756ty2nezjk1a3jne0k86y4l',
                administrativeAreaLevel2: 'nxsex5w4p3cvcdib989n79d5prkfxuzqz3nvtidpsxrpv36ipp',
                administrativeAreaLevel3: '2pqzec93lod9uy7ex8iwmddqgpx4hybqnmj4q9w7hqee83xaui',
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
                id: '7023a936-7c92-4074-ba63-772b701cdfb1',
                iso3166Alpha2: '9p',
                iso3166Alpha3: 'un7',
                iso3166Numeric: null,
                customCode: 'lhrvy72ugc',
                prefix: 'ymv6r',
                image: 'http://placeimg.com/640/480/technics',
                sort: 486544,
                administrativeAreas: { "foo" : "bar" },
                latitude: 38725392120310900,
                longitude: 98835607509432880,
                zoom: 24,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Cotton Hat',
                slug: 'et-est-qui',
                administrativeAreaLevel1: 'ivd2vfj6ovq3ujwm5w3bkg6l63nyc8ivb0q6u7by6go1yu0shx',
                administrativeAreaLevel2: '796vf5zlgq0qcyn0llvkbv8o2329mjmevdbfzkyj2jz4x6half',
                administrativeAreaLevel3: '2cp9ijjhtfwjyph7fbpvtepdvq78igp5s3be89agf05zf11mzi',
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
                id: '9799b16f-14ad-413a-9476-219176e8301b',
                iso3166Alpha2: 'ba',
                iso3166Alpha3: 'btx',
                iso3166Numeric: 'ekt',
                customCode: '4v0rt6hm3s',
                prefix: 'pg4kk',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 319054,
                administrativeAreas: { "foo" : "bar" },
                latitude: 45418842985695820,
                longitude: 29572437816495720,
                zoom: 36,
                langId: null,
                name: 'Sleek Granite Chips',
                slug: 'tempore-nemo-deleniti',
                administrativeAreaLevel1: 'bg7f4s9f4us76k6ybb0bjmi7qwnkc6slzi4b7me8yqgsy4mymn',
                administrativeAreaLevel2: 'ho7its421um0g6kd51qu8bslo0tgk3i337wvwv0rqb6gfa06rs',
                administrativeAreaLevel3: '4sqccsr92em0az0o1yxepe4rxbb03y0c6hyw4qs4jnslcxnlx4',
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
                id: '9753afaa-8936-4619-a54e-9a9b74e097f1',
                iso3166Alpha2: 'hd',
                iso3166Alpha3: 'wnn',
                iso3166Numeric: '9us',
                customCode: 'gp9a44tlnf',
                prefix: 'y5mjf',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 458782,
                administrativeAreas: { "foo" : "bar" },
                latitude: 24124394873746364,
                longitude: 38158539608123180,
                zoom: 50,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: null,
                slug: 'reiciendis-mollitia-est',
                administrativeAreaLevel1: 'fdig54pmhv4waq8ibsmisub31hk0tp9jpoat080c2qwfa2szlr',
                administrativeAreaLevel2: '6h57t0nsl7w1mamxjiiid5w680b9jbzpg3b1imzibm6n0yvw1s',
                administrativeAreaLevel3: '2q3vq7kht77o3qfyknkx13tdrbvb5zc8hv4h679b66jnkby289',
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
                id: '625e9b75-4648-40c5-bc19-0bdc062ebff3',
                iso3166Alpha2: 'sc',
                iso3166Alpha3: '4lj',
                iso3166Numeric: '6gl',
                customCode: '7yys4gskyh',
                prefix: 'x30z2',
                image: 'http://placeimg.com/640/480/animals',
                sort: 210296,
                administrativeAreas: { "foo" : "bar" },
                latitude: 16194395387583144,
                longitude: 39482373325326570,
                zoom: 12,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Steel Shirt',
                slug: null,
                administrativeAreaLevel1: 'ol1uz6s8ucgahx80lw6a5e9i818r6bbxsfe588enlcmdoax5pd',
                administrativeAreaLevel2: '3wcw1c5rwbn7dcuftmb818i9cmfpr4ms1wtcum11tabsmpmzp1',
                administrativeAreaLevel3: 'xwc9o5gq9lra11wp22cducauex8s33u1zaq0o5kk2itfqabxvt',
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
                iso3166Alpha2: '4c',
                iso3166Alpha3: 'e1y',
                iso3166Numeric: 'w2p',
                customCode: 'a4uo67buol',
                prefix: 'dxxeh',
                image: 'http://placeimg.com/640/480/city',
                sort: 217758,
                administrativeAreas: { "foo" : "bar" },
                latitude: 73088641457282620,
                longitude: 15835773456920148,
                zoom: 99,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Plastic Towels',
                slug: 'quos-facilis-nostrum',
                administrativeAreaLevel1: 'vr2a32t74hrv4ryb31dtnegffaeo25fue6nq3otzg4zs03oz1z',
                administrativeAreaLevel2: '2adzm6w7lo76iw46xjyxsku9m5nteo0p9251czmdrsc4alsb04',
                administrativeAreaLevel3: 'hbkzxqtp9cc1vwch3t9011b2pyh1a964yfxuhuup8j14fftlg4',
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
                id: 'da4362cb-000d-4ce6-918b-d7030e817b89',
                iso3166Alpha3: 'f74',
                iso3166Numeric: 'l7t',
                customCode: 'd8vldx4ivv',
                prefix: 'eza49',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 598462,
                administrativeAreas: { "foo" : "bar" },
                latitude: 37144891273493976,
                longitude: 33987354836208864,
                zoom: 54,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Plastic Shirt',
                slug: 'inventore-voluptates-reprehenderit',
                administrativeAreaLevel1: 'd0u1qbbljxyp3lf3pmus0gwwf380eq1dck8p4sozuigj2rrgo1',
                administrativeAreaLevel2: 'khibh82yxy7uf0deugox42emnnikesjxtmwcwujosa11y0p4sm',
                administrativeAreaLevel3: '1i15lnf99w6wxtpchbjixixsr9ii3j83ngp5itekhq97y8qtfx',
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
                id: 'c8bd0dd5-7370-4d14-993c-e1afac51ea9a',
                iso3166Alpha2: '4j',
                iso3166Numeric: '4r2',
                customCode: 're6on19fof',
                prefix: 'eoja0',
                image: 'http://placeimg.com/640/480/nature',
                sort: 384368,
                administrativeAreas: { "foo" : "bar" },
                latitude: 72561072795702860,
                longitude: 82695569612937550,
                zoom: 49,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Frozen Pants',
                slug: 'fuga-aspernatur-cupiditate',
                administrativeAreaLevel1: 'tqneq3meenofmbfe986htmed09z7hf8zitdj39zv8gh56wyhcb',
                administrativeAreaLevel2: 'q7doitjrqtauxc1vbwy80q163vdv8shcydhrpe3fw0zc9x72r4',
                administrativeAreaLevel3: '3i8x58qy0k0fvidmc1gjhnre1ptrjoykia9dippba8gt4wfz2b',
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
                id: 'a24c4451-bf78-47c9-a1b2-f3a0da43f3dd',
                iso3166Alpha2: '9a',
                iso3166Alpha3: 'efw',
                customCode: '622o2o0slq',
                prefix: 'vtzjt',
                image: 'http://placeimg.com/640/480/cats',
                sort: 716022,
                administrativeAreas: { "foo" : "bar" },
                latitude: 91325598209777060,
                longitude: 15719438910724800,
                zoom: 17,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Plastic Car',
                slug: 'quia-nobis-expedita',
                administrativeAreaLevel1: 'fkvzm2fertvl2ajo5oqui83pi7jbyzck42f38gl70xird04kgw',
                administrativeAreaLevel2: '60akf83y9taugid5jhuctc6co745ovynsxkt0j9gltwl4rct4p',
                administrativeAreaLevel3: 'wme8swxlftcbuo9mrhdhdb4tylz3ctsf19ivi6u20zy00hgxt7',
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
                id: '3622adb7-452f-4f77-999e-af14c8b89e0c',
                iso3166Alpha2: 'y2',
                iso3166Alpha3: 'qhp',
                iso3166Numeric: 'ok5',
                customCode: 'thn78xobqi',
                prefix: 'uwbyr',
                image: 'http://placeimg.com/640/480/nature',
                sort: 914778,
                administrativeAreas: { "foo" : "bar" },
                latitude: 30167151824218560,
                longitude: 86305649598039950,
                zoom: 84,
                name: 'Handcrafted Fresh Computer',
                slug: 'dolorum-itaque-quis',
                administrativeAreaLevel1: 'zl7k7wyx9at57kglf4vob43r29k2no3blu8ke3k6dikixy3iq4',
                administrativeAreaLevel2: '020lxcjpatdpqzvnz6mvb01w1sbfbrpdjonxtob91kozse2gti',
                administrativeAreaLevel3: 'zra33bpvo435l419k7bzcewa9s2ljeo1c5lyy3krtrhzhf0x01',
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
                id: 'e215936f-62a0-4db7-aca9-43d4d521a99a',
                iso3166Alpha2: '8a',
                iso3166Alpha3: '91o',
                iso3166Numeric: 'luf',
                customCode: 'qswa2u5zbw',
                prefix: 'qvkof',
                image: 'http://placeimg.com/640/480/technics',
                sort: 428204,
                administrativeAreas: { "foo" : "bar" },
                latitude: 55282641085144960,
                longitude: 89685149459141600,
                zoom: 42,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                slug: 'delectus-suscipit-veniam',
                administrativeAreaLevel1: 'wssy5cglw51xn9hft0ow6mryvkwzrndyh8s80g73tv92x3fsh9',
                administrativeAreaLevel2: 'x68w9n2jm0yzwpykvir94x8euvgu43cz0d9kah1aocjyg4uies',
                administrativeAreaLevel3: '35c7vmrmm14swcauwx2395rf4a534vmuqqpx6qsjg37lty10ul',
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
                id: '819bee8e-3fe0-48a1-bdb8-6693c53aa43a',
                iso3166Alpha2: 'gz',
                iso3166Alpha3: '20y',
                iso3166Numeric: 'eoe',
                customCode: '7drixr583d',
                prefix: 'tgwxz',
                image: 'http://placeimg.com/640/480/cats',
                sort: 639940,
                administrativeAreas: { "foo" : "bar" },
                latitude: 39726317281812940,
                longitude: 45444465839008480,
                zoom: 68,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Metal Tuna',
                administrativeAreaLevel1: 'hvgx23pinb3nnyatiqy4hbl5maisoor0kpf2f5s3r8sdhrj5dv',
                administrativeAreaLevel2: '0jn83yrelncpy5qm26cf9koqmaggpqp872bieh8bngzz5hzvnu',
                administrativeAreaLevel3: '8h34zcguzv8u8962zcxpy6d3wypujsowrsyobzihlkjj8o3vzm',
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
                id: 'q8fy9bicqan248lukmf9xp8qaxbd3j9j709fr',
                iso3166Alpha2: 'x1',
                iso3166Alpha3: 'txt',
                iso3166Numeric: 'osk',
                customCode: 'my502smdx8',
                prefix: 'o6pvp',
                image: 'http://placeimg.com/640/480/food',
                sort: 550990,
                administrativeAreas: { "foo" : "bar" },
                latitude: 64853231321297620,
                longitude: 64574054196141530,
                zoom: 90,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Soft Chair',
                slug: 'et-natus-quia',
                administrativeAreaLevel1: 'sfu7qgpr2lvagus4me00ovcqy86fdpb2y2qdhxh9k4kyhtde8m',
                administrativeAreaLevel2: 'xtlws6pystp4ice3x3wkln7tpz9qd5hw7yn1hqo3m9ebmeacgw',
                administrativeAreaLevel3: 'i4sh7ny6b7uvfy267bzi3yfkgdbhvdpuekfwhwc53623az0whd',
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
                id: '8e01d60d-b37d-46ff-be3f-706cf63903d5',
                iso3166Alpha2: 'qjx',
                iso3166Alpha3: 'w23',
                iso3166Numeric: 'v4x',
                customCode: 'e7e6pxmy7k',
                prefix: '87ugc',
                image: 'http://placeimg.com/640/480/food',
                sort: 472728,
                administrativeAreas: { "foo" : "bar" },
                latitude: 18356289109742572,
                longitude: 58846244442865770,
                zoom: 16,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Concrete Chair',
                slug: 'quis-eveniet-quas',
                administrativeAreaLevel1: 'vu2yiy66009u7r0sdx8zcv09e56om7no6txc0ngoyc6pppo3sv',
                administrativeAreaLevel2: 'hztcypvd93lsvm5xv47gmmuycqh1odfz9dpe3fax20ail9zhie',
                administrativeAreaLevel3: 'ptoq4x88yh9l9xu0gwf1dh45vwmr2tvlzjt3tf4x4c83yhs0xx',
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
                id: 'fb861a49-7e4e-4e1e-9204-83bba3a4b291',
                iso3166Alpha2: 'li',
                iso3166Alpha3: 'ogh8',
                iso3166Numeric: 'va1',
                customCode: 'wx6m1q4zet',
                prefix: 'imhow',
                image: 'http://placeimg.com/640/480/cats',
                sort: 694804,
                administrativeAreas: { "foo" : "bar" },
                latitude: 49097185700769360,
                longitude: 10995547675344858,
                zoom: 85,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Cotton Bike',
                slug: 'vitae-possimus-est',
                administrativeAreaLevel1: '9brufa2tgso2nn1yaa123om3gvmurj5prscapzzfs6nfozyagh',
                administrativeAreaLevel2: 'obkmhx84ke1qyxl0ymytom6562mprbtxcecr45ei3r3v0t2zdd',
                administrativeAreaLevel3: '1opfju5yb5enbke6c43jgf5f493nkzbln230praiknb58ng1ph',
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
                id: 'baec737e-8e75-4a29-a115-60129163841c',
                iso3166Alpha2: 'mb',
                iso3166Alpha3: '13m',
                iso3166Numeric: '1wgq',
                customCode: 'lw5z1e3f3t',
                prefix: 'rzapx',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 379555,
                administrativeAreas: { "foo" : "bar" },
                latitude: 62296327921396670,
                longitude: 20736805146074040,
                zoom: 74,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Soft Towels',
                slug: 'ab-dolorem-ipsam',
                administrativeAreaLevel1: 'onr1i8d0ls34ojde6btf3xaqls7ywdrs5h37kwa4bbbqtcv0y8',
                administrativeAreaLevel2: '7hn1ug8ij5cmmsj7pmb4swa7ag87qrkf0u4vjfspk0nvbfjfn9',
                administrativeAreaLevel3: 'iex0vqrq43mams2cwptmpmx9arjkbe8ee1jyg16ghkumn7g5fz',
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
                id: '42ff949d-978e-4b49-aeba-f149ef7082c6',
                iso3166Alpha2: 'l0',
                iso3166Alpha3: 'dtm',
                iso3166Numeric: 'eae',
                customCode: 'hgs1qolw47',
                prefix: '5mvwz',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 450790,
                administrativeAreas: { "foo" : "bar" },
                latitude: 29940195069529624,
                longitude: 43901987167113944,
                zoom: 22,
                langId: 'vy3g2kr6iigeb3q74ilp54dc94crrsue43u5c',
                name: 'Unbranded Wooden Hat',
                slug: 'aut-eos-laudantium',
                administrativeAreaLevel1: 'vlp7m0qe9rl3uggosqjgr1gcd9l16hw2cedo9n3ccv05keyl0o',
                administrativeAreaLevel2: 'dwbznwamui1flg2x8up4gdjcdu4yx0jhvz0rpyjbju75zcisil',
                administrativeAreaLevel3: 'ovulejmv3le7leqaur0f44aek40hch7f2w5o8nejd6q4zs4251',
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
                id: '7aee8ffb-3828-4596-98da-39ef717b53b4',
                iso3166Alpha2: 'zj',
                iso3166Alpha3: '284',
                iso3166Numeric: 'cis',
                customCode: '9rrf02rygq1',
                prefix: 'zhqwt',
                image: 'http://placeimg.com/640/480/business',
                sort: 339508,
                administrativeAreas: { "foo" : "bar" },
                latitude: 77008531810914340,
                longitude: 50394695751622340,
                zoom: 51,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Frozen Salad',
                slug: 'qui-quaerat-corporis',
                administrativeAreaLevel1: 'krcy7xig60mk1nrz27wlcj7wdc8tozp1lfk8fcp9ln4i7jykjb',
                administrativeAreaLevel2: 'zgh3fdj89sg78a0ib5v2e1u018q6h6mbeelfcjb08am6354kfr',
                administrativeAreaLevel3: '8c338pjc63tkxxxnh84snkteoymtn8qkrfbg0lhn8ioso34d71',
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
                id: 'dec26b08-a654-4f3c-9ce8-f0b44c8bb82f',
                iso3166Alpha2: 'wp',
                iso3166Alpha3: 'r5k',
                iso3166Numeric: '8cf',
                customCode: 'guxqmcc2dv',
                prefix: 'tz4g8b',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 483787,
                administrativeAreas: { "foo" : "bar" },
                latitude: 55349101369120344,
                longitude: 12481836386642352,
                zoom: 92,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Fantastic Plastic Shirt',
                slug: 'ea-fugiat-quae',
                administrativeAreaLevel1: 'ncto9bqmzgcca9f7mehebr1e2jsnb9j87zj34l0lcgb2jtz7xm',
                administrativeAreaLevel2: 'a3w00i9ad4n8yij0988s6e9dtjvqf3ar1eodz0robpve68f8nw',
                administrativeAreaLevel3: 'sroj0be6x6loofay8an2q0z95f5k9padwb80kfccxvnetoyowi',
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
                id: '9c12e346-2508-4e1d-a0df-e2785d1f94b6',
                iso3166Alpha2: 'jo',
                iso3166Alpha3: 'nlk',
                iso3166Numeric: 'dfz',
                customCode: 'llr2zxzh8s',
                prefix: 'wtrhf',
                image: '9ctxum5asxifxevxqfehc5mh6ewknfccjmxyd1lqlde97r2sa3sd0e53mqin1iamva44r3uik25ykhsqof1bbfgc3opgrk0fm8chry5dsn038vt1ueuphb4wjrmi1hu30g5esc6wlgh8h3wqrc14yw147qnyd7vmmm4avea4tf10eq96w8a12azca5epau39pg8pglra7dhqlg49a3aqefjy1dxnfplxkzkfw3u20wqozjqbf0f7601w53h2pnq4aj0zrg1q7qqzeajk0t5b0tjbovns9scs0v5sk23saej0nbvuypt68x2cbww2sbw74ax00pvhqfp8pn1jeg8weeo4yf169dquhx5kj11z82s4ytwljzdur36oj9p59z9r31jbsv2n92ya8u9fcnu4mhd2iv0xuj61b0wdufc5bsbveicc59jb3mp90oq8xcbi7g1jxcracnuzs5qme6ndo202m3q8z26oif5our0zr5h6wsmk54x74wklu7jm3q44n0tbkg897lesk42xnh1vfxhifnfj8o3gdtmx7af1slckgzx9357aytb7fctxuiupjoupmjs63ung5eejqo3dbmhf8fp98ud0rcruk18txtwz7r03ogahv0wubl3rjqoo7idh8caix453l4xyequmybxnbr86a5eemw848ont2m3s9qi9qwejifde2l6zkmg3gz7njt4aqk0xdv65582vgzmi7hybnisz5sna68exenvc4aug3sjlstvpj3du7som8egjt15ton38xosjw726dt1xp7chss6s4i3oqm3xln1jymckka989tp5bas1ermn58adelsrfss7zwj5rmolvtjk6oq79zcgfazbzh5oef8pslvpk73staqis922hz2r3031ta6uav9f6o9awj0qgfi1ic1v1zv1czhj4sx4w2ym7yzfaqts80nq8h6502jjabnh7vpn1gh81qbyy6ptn6r8vrj6w75zrwxpn92m7ng2lwg296q6zx80mq1yyp6sg',
                sort: 512703,
                administrativeAreas: { "foo" : "bar" },
                latitude: 98115441301341330,
                longitude: 17416550451188012,
                zoom: 98,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Metal Fish',
                slug: 'cumque-magnam-quod',
                administrativeAreaLevel1: 'n6p80d4fnxa0kscucuzrnmkhv18l1wdyoyhiut6scjyaycg6jb',
                administrativeAreaLevel2: 'mplqx0vs6768wvi2njqin0a4oplme5efx54nhh4ju1gsnlpnbp',
                administrativeAreaLevel3: 'baduty937fqd4v4kiu0pbt78j83t20lgv5j5t091mv5bth264c',
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
                id: '710c4a6f-f6e5-409d-92e4-f97e68487ae5',
                iso3166Alpha2: 'eu',
                iso3166Alpha3: 'ev5',
                iso3166Numeric: '4wf',
                customCode: 'fglccjoiy7',
                prefix: 'xd2ef',
                image: 'http://placeimg.com/640/480/technics',
                sort: 5485792,
                administrativeAreas: { "foo" : "bar" },
                latitude: 36080714826458270,
                longitude: 38702837846589550,
                zoom: 74,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Granite Shoes',
                slug: 'ut-voluptatem-minima',
                administrativeAreaLevel1: '0t4dvcf0yufdoy39ua4mhzvge5s52p8ykhsu7ghd1zqpaerl87',
                administrativeAreaLevel2: 'xlmzie0bw2e204zfhcjnso5gowdcpsxgmho2f92q80lpw108bz',
                administrativeAreaLevel3: 'jo2dkihwd0wvwsfgcn99wybmuy8wj3ovkux9fnwv6yx5niyqh5',
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
                id: '06fd76f4-3613-4b7e-bc03-6f2afc4c903d',
                iso3166Alpha2: 'wl',
                iso3166Alpha3: '09o',
                iso3166Numeric: 'bkz',
                customCode: 'r9pv2cvewh',
                prefix: 'ns3dk',
                image: 'http://placeimg.com/640/480/transport',
                sort: 480150,
                administrativeAreas: { "foo" : "bar" },
                latitude: 337894301531801660,
                longitude: 58376403854353670,
                zoom: 39,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Metal Keyboard',
                slug: 'veniam-porro-ut',
                administrativeAreaLevel1: '7d8gb7kitwywb5beuflzrt6cnnlf0ndcp60uipjs815raasncm',
                administrativeAreaLevel2: 'kmdwh639tjq9vmf86ez67cayyynkzy3px9ldtuz3m3zbdbh7ls',
                administrativeAreaLevel3: '17mw2gnk9929vfgmyi4kl0483mntkjp31ve5vwlitw5c8y6j0p',
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
                id: 'fa0c76dd-00db-40cd-a767-66a0db959e74',
                iso3166Alpha2: 'o7',
                iso3166Alpha3: 'jjt',
                iso3166Numeric: 'zy1',
                customCode: 'avy4h8vn2c',
                prefix: 'ube34',
                image: 'http://placeimg.com/640/480/people',
                sort: 387117,
                administrativeAreas: { "foo" : "bar" },
                latitude: 82887783310641940,
                longitude: 484145755397214200,
                zoom: 80,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Metal Mouse',
                slug: 'harum-voluptatem-occaecati',
                administrativeAreaLevel1: 'qdlfe8khuviicgmjxm1t4xm77zerxbtf2zl7uup9rnlw3mn1xh',
                administrativeAreaLevel2: '3y9q9paazz2g459zqfdxj7u0oa2yj6rmxbi7qwzalfvtsjg0gv',
                administrativeAreaLevel3: 'yc8awoy0kklci5uew56r3pjkp9dja1cr3laoox1jzv4rz2s3v8',
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
                id: '31d5f1f0-5923-4fa5-afa0-859720649553',
                iso3166Alpha2: 'x8',
                iso3166Alpha3: 'jtc',
                iso3166Numeric: 'xos',
                customCode: 'szkuyvjb5f',
                prefix: '8s790',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 110673,
                administrativeAreas: { "foo" : "bar" },
                latitude: 66514920619061860,
                longitude: 91418221478145060,
                zoom: 189,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Concrete Cheese',
                slug: 'incidunt-repudiandae-quia',
                administrativeAreaLevel1: 'c8nzidzp7g0t94qsfbjdyy2vy12fpkpc2rf8ge2a4azmw6m866',
                administrativeAreaLevel2: 'n3ggdh8pty9dc02jrswoe6w4wkfmqinwq0myngt1kqdq2vlou6',
                administrativeAreaLevel3: 'f9ki22bdm9ij32j9y0t928bf9vyyg8224i6v70q9jxvfqewkw8',
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
                id: '8b17cf71-ff8d-404b-a592-08fedb0c9688',
                iso3166Alpha2: 'tr',
                iso3166Alpha3: '01q',
                iso3166Numeric: 'k1z',
                customCode: 'k6m8w4cvq7',
                prefix: '3jcpe',
                image: 'http://placeimg.com/640/480/sports',
                sort: 167789,
                administrativeAreas: { "foo" : "bar" },
                latitude: 92370991581203280,
                longitude: 81146851546135580,
                zoom: 79,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Granite Soap',
                slug: 'noul2764jn5max9m66so93tsittzbghlrrto5v5jcb5suw6xarjigp2autih11ugzfws47tr1vhki8e7g6zjo2z2o6on3qdbnq07nv4zespxfaz7r43ncd4c5hct7s05xbahs8191hx23zcdomhyu5weimbnk7zo5j6zayaq2fgnwom91bss7duog1zv5rwt6vj8kjbfvr5fx5hhxnlmvfg9hzu9ct4qbk8frq37mba7lvptggiiykokx8gh7tvu8rw28ffvijsky6sajajc1jardppozfxwghh15c6jgt78jfw48ldm055zk51m7kjtxn60f2wgdanekf352eegs25rktsq903plrdthygmslxxaf78oqaq18d4xwpxqiu3ggmcrl2nhxecvxrcik085x5fkqj2c0y4diu1vaxvwb98i6xh1nuvjy7r7z4pkxd873pc3pxveyvtw1zdehbwejdj9hiltcw5gb03wpp2rpi8xen1x5awpmdgz456yh18c8db2jo9ym0vepo8z3syg3xw74nasaxydh34b7gdbk13y0xqa16g26szwurbt47gltrfi2xh8cpljhfgg80sfg8sqwfx9itg0wp0yfgod60jmyqxj7c8zjwroshhbpu3s6ltznhb6gb3t1isbw14d4v24iyfulqekz8j5bolt8yaxoo8e1ib0u0oltsqld7zdj0ngibgi3i0fv6xh1a0lbigehjzrfn1p27na29mmp8pob2mi8v5fbet5xcujbmheu6zm3ne5hy098xhzu751q8hbbjjdqrggz37tpbxen6u7bawxql20qpa8ackf23adcnkxpke164h24byehqgfh1uxabgcq5mcv10pz3dxsszfy04qgj3rg39dcwznlxh7s7jv4200b2t33wdqwnr9bom4cb7j01ju64ccdnapdefwgytu3ig6cj2w3297rc4lucpb0fu4dadlvh4uewj2jaeianf8vvi4kbuelusvxbjxkfzcdaijuorxqop1anfs',
                administrativeAreaLevel1: '117q959slxdevfg95ezjs065ttacsdkk2nwt7mrw6hfzyuhtor',
                administrativeAreaLevel2: 'n0golyd2d5kyz18239wqzs981qfqoar4svx91cs9vxz79flr7o',
                administrativeAreaLevel3: '76k5hr9rx2dmv6bf1f74x5iaqjzdomt79nnp2m83arfuud8jjw',
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
                id: 'eff877ea-66ae-4705-9cbc-809b766cb00e',
                iso3166Alpha2: 'i7',
                iso3166Alpha3: 'sa0',
                iso3166Numeric: 'gsx',
                customCode: 'l91bt1c90a',
                prefix: 'gr1ts',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 956100,
                administrativeAreas: { "foo" : "bar" },
                latitude: 44247263740549040,
                longitude: 54683101612356450,
                zoom: 84,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Concrete Keyboard',
                slug: 'unde-quisquam-porro',
                administrativeAreaLevel1: '4gm0hpp5g9kegv4rac7ku3jix1oeucwrzxu7g9gw2t2f1ajnywu',
                administrativeAreaLevel2: 'u2o1d9aawqpja4ds1m4qvwbf0srxagc3z3sfk5qreg4wn5fw60',
                administrativeAreaLevel3: '78mep9acet9cq1z4u4bpts6p9w3qrfug5urwxjvobl4y71gwbi',
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
                id: 'd8bf79c2-9770-49e6-b857-f8bcd7311325',
                iso3166Alpha2: '1i',
                iso3166Alpha3: 'g67',
                iso3166Numeric: '7e9',
                customCode: '43l20u03c2',
                prefix: 'ynwgc',
                image: 'http://placeimg.com/640/480/food',
                sort: 896153,
                administrativeAreas: { "foo" : "bar" },
                latitude: 37129294149472430,
                longitude: 60176364411985784,
                zoom: 30,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Fantastic Cotton Gloves',
                slug: 'sequi-id-quidem',
                administrativeAreaLevel1: 'jwwu4n6hdya6m0qjhmxna4xnqaquzgsp97qqzk9nu1atswbwu8',
                administrativeAreaLevel2: 'mls7wfzmmx1kwrarj45ya2xos08n8yo0dzg35v5v0d5s613r0rp',
                administrativeAreaLevel3: 'zmbu040ue2a8pfcysu0qucpq2h9mj7zp3cyv860axq493am8n7',
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
                id: '8cf90972-7e2a-44de-a81c-f5e7f4ec721c',
                iso3166Alpha2: '27',
                iso3166Alpha3: '3oc',
                iso3166Numeric: 'lat',
                customCode: 'wsrnkkanjy',
                prefix: 'wvw9k',
                image: 'http://placeimg.com/640/480/food',
                sort: 828840,
                administrativeAreas: { "foo" : "bar" },
                latitude: 52961097955614590,
                longitude: 12741589882328634,
                zoom: 12,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Plastic Bacon',
                slug: 'maxime-eveniet-ut',
                administrativeAreaLevel1: 'uxghpa8nwtv6mo598incxtqabl15srcx702k921kaofu7e9jwc',
                administrativeAreaLevel2: 'ilok4lbsl6j56z2nuwjnqit3af42i4tij8n8ru8apbz67izmfx',
                administrativeAreaLevel3: 'xkv8a2nx1cl5q0k3cijr28skbtm6mst4mi7saz80y6p4uh0n0ka',
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
                id: '8f2710a2-c515-4134-a140-4dcd2928146d',
                iso3166Alpha2: 'wv',
                iso3166Alpha3: '6az',
                iso3166Numeric: '5fk',
                customCode: 's4swkcupmp',
                prefix: 'lrm3e',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 310009,
                administrativeAreas: { "foo" : "bar" },
                latitude: 85751740033797620,
                longitude: 28970930142225216,
                zoom: -9,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Frozen Tuna',
                slug: 'quisquam-eaque-eaque',
                administrativeAreaLevel1: 'mlar2f4fq12hnm9mblqe069dvwxyy1wpayrxqgcyvsv0w44sf8',
                administrativeAreaLevel2: 'tc8nzkqilktj3xaa2aeyjni9up2s4lpdpqja6un078m5lq6x2d',
                administrativeAreaLevel3: 'ro2hxn6mylz2zl5q1segtx918rx3hsuh95l6iizg2bgxu81hl2',
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
                        id: '8f43067c-e47f-48a6-bcaf-86433bcb3d68'
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
                iso3166Alpha2: '9b',
                iso3166Alpha3: 'coq',
                iso3166Numeric: 'zkh',
                customCode: 'jq6bq2fnro',
                prefix: 'i86fb',
                image: 'http://placeimg.com/640/480/technics',
                sort: 507513,
                administrativeAreas: { "foo" : "bar" },
                latitude: 74849022560369060,
                longitude: 37800587010211310,
                zoom: 58,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Plastic Car',
                slug: 'quas-officiis-illo',
                administrativeAreaLevel1: 'jhyglri2avvwc33l6zpp6bkx7xstzrampvyequck4apry6crae',
                administrativeAreaLevel2: 'byiyaeemuy2d8osv6y1k48btgrgr8v8zuty7gb8xaz8m3bxws5',
                administrativeAreaLevel3: 'g935tz3gbvs34bpmv9n37volr176fylc5g02xnxx69z2vq3y4p',
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
            .get('/common/country/708153a5-91ec-4ab8-abfe-e107ba13f884')
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
                id: '34fc36b7-c67e-438c-91c2-20c2e8ce711d',
                iso3166Alpha2: '8w',
                iso3166Alpha3: 'd70',
                iso3166Numeric: 'etn',
                customCode: 'hj03n0ote7',
                prefix: 'irkng',
                image: 'http://placeimg.com/640/480/food',
                sort: 739395,
                administrativeAreas: { "foo" : "bar" },
                latitude: 71023812484390480,
                longitude: 85890634415184400,
                zoom: 40,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Plastic Sausages',
                slug: 'mollitia-repellendus-dignissimos',
                administrativeAreaLevel1: 'e0ofbxc42qlut4r0jzsi11kqmwk47xwcjxzipd9jzc6e8jutuy',
                administrativeAreaLevel2: '56pdqjpjje4ofna9c6u06gotcj04mutelrdgno4a89i9zgyqfx',
                administrativeAreaLevel3: 'eg99p2j7ubw8mgmibthopxykfbojtbxydrxirr9nrkgojeea7f',
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
                iso3166Alpha2: 'hc',
                iso3166Alpha3: 'jro',
                iso3166Numeric: 'r89',
                customCode: 'ocupvg3n8g',
                prefix: '6krs3',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 236294,
                administrativeAreas: { "foo" : "bar" },
                latitude: 47738907266759784,
                longitude: 65187575056230170,
                zoom: 83,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Granite Chips',
                slug: 'fuga-veritatis-consectetur',
                administrativeAreaLevel1: 'smvigpftknteo06uzfwwacp6zjxq4o1d16r1orgz6e4z6jwjdu',
                administrativeAreaLevel2: 'uhk64dce9q309t260atrawly8kwt36zp7zrn9wa9p9idgh1x80',
                administrativeAreaLevel3: 'e86fq8h9audq332cs2erewg6w37wfyg8z6v7b1fx2i8sd9o1pi',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/6d837409-fc63-4f02-bc16-45919c150c1b')
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
                        iso3166Alpha2: 'k9',
                        iso3166Alpha3: '5fl',
                        iso3166Numeric: 'kjb',
                        customCode: 'prqwtukekk',
                        prefix: 'pm17y',
                        image: 'http://placeimg.com/640/480/abstract',
                        sort: 927057,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 37092675823227610,
                        longitude: 21797122688986836,
                        zoom: 72,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Tasty Cotton Bacon',
                        slug: 'dolor-amet-minus',
                        administrativeAreaLevel1: 'pms0ggeuyrg8xis4874pqg5an8j716ng58ynsr0gldgttt8tar',
                        administrativeAreaLevel2: '1uney7b1zov2lo3gyk56yay2r248myzh4jqfd4hmx971pueowg',
                        administrativeAreaLevel3: 'l22r8dqge7hoc9wx7x3w6gph2e05oc02t37fmvq58b2kw9vjtq',
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
                            id: '35d93b88-4860-47d6-8f4d-5de2cb7c056e'
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
                    id: 'ac39e2b0-498c-4e36-a8a4-7091bc175beb'
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
                        id: '15e9907e-e499-4bdd-80b2-0a715acc5afd',
                        iso3166Alpha2: 'h8',
                        iso3166Alpha3: 'ky1',
                        iso3166Numeric: 'n60',
                        customCode: 'u8qyv4y2ak',
                        prefix: 'qrhv1',
                        image: 'http://placeimg.com/640/480/transport',
                        sort: 953225,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 75694003999534720,
                        longitude: 17904624113557336,
                        zoom: 83,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Small Cotton Ball',
                        slug: 'autem-in-harum',
                        administrativeAreaLevel1: 'ogvfea0lqf58xr33cx98urlrfc6ko4abggdsuckg7664p64g92',
                        administrativeAreaLevel2: '6qecp5jo9ow1w3el3cnefxwucfn6byhvf7nz3wi3b3mmu7fo79',
                        administrativeAreaLevel3: 'n652wr0ewsme71tvkpzu6dw54grzkevng66bvnseckxqxiozkb',
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
                        iso3166Alpha2: 'p2',
                        iso3166Alpha3: 'ukj',
                        iso3166Numeric: '2iv',
                        customCode: 'so6m4gcg6f',
                        prefix: 'uwnuv',
                        image: 'http://placeimg.com/640/480/fashion',
                        sort: 341329,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 35261428585280210,
                        longitude: 89671165872881250,
                        zoom: 19,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Generic Steel Shoes',
                        slug: 'eos-in-sed',
                        administrativeAreaLevel1: 'xom8dl0txlivu6ph2v0669m5fd5w61q9r87ovwz32h5sk9pb70',
                        administrativeAreaLevel2: 'q3rnx18btc8195ov2xbgp1dp9p6poswf03pn97974nnfiphjeq',
                        administrativeAreaLevel3: 'fgcsc9f9a9grpuk1jagazut2xv27gforqymi7gc9i287u8au6k',
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
                    id: '40e7b37e-4258-4fc5-84e3-9aad32771f45'
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