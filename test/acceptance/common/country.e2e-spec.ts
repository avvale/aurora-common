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
                iso3166Alpha2: '3g',
                iso3166Alpha3: 'bpk',
                iso3166Numeric: 'frk',
                customCode: '2dxymv7gs7',
                prefix: 'ok7pk',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 935899,
                administrativeAreas: { "foo" : "bar" },
                latitude: 12707710613806108,
                longitude: 30277659234913084,
                zoom: 14,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Soft Pizza',
                slug: 'rem-dolorem-sapiente',
                administrativeAreaLevel1: 'ja6gdoh315y1vqjhnazlxiklson50h4rbj0pjnkl261qmzs0fd',
                administrativeAreaLevel2: 'tfj1em9hb7o57escdwznz79z04el4mmp8icvhc6tgbpwrwonfl',
                administrativeAreaLevel3: 'jxblos11nd1kutznpzv0mzvetib831829vwc0avmizbcjxkshq',
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
                id: '68bd7f11-1d55-4381-b7f8-e4402da03b66',
                iso3166Alpha2: null,
                iso3166Alpha3: 'vd5',
                iso3166Numeric: '3ud',
                customCode: '3pxnp6o43g',
                prefix: '5hitj',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 229608,
                administrativeAreas: { "foo" : "bar" },
                latitude: 85606407788330450,
                longitude: 86807492333483280,
                zoom: 34,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Steel Hat',
                slug: 'odit-tempora-est',
                administrativeAreaLevel1: '3rhlie5n0iv7l3e5ua3u6likam84xtzz6ua0n997wgxdhn42qr',
                administrativeAreaLevel2: 'gixeiod9u4kbom0wazpvuus9jg3qv7yhk1p0it8pb88h8nez2y',
                administrativeAreaLevel3: '68i8nl2hxftd2aenr7uzkffo2sw0et0ynzv2vy3l6qnsz3wnpj',
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
                id: '16269743-8b7d-4495-bb50-18e832568f23',
                iso3166Alpha2: 'k0',
                iso3166Alpha3: null,
                iso3166Numeric: '3yp',
                customCode: 'ht1xswy3vt',
                prefix: 'h7zo1',
                image: 'http://placeimg.com/640/480/people',
                sort: 793475,
                administrativeAreas: { "foo" : "bar" },
                latitude: 52395521091201750,
                longitude: 93658499499468880,
                zoom: 54,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Plastic Table',
                slug: 'eius-molestiae-aut',
                administrativeAreaLevel1: '3cdz5ok5n3ods7l1hgcej044f21si78qf82d1nr0737krhy7ct',
                administrativeAreaLevel2: 'xls91mb93ldzwvfcq9wa5cn3yk45qxqxga4u81jio82g4ux4rw',
                administrativeAreaLevel3: 'uew1vb43uzxl4emm7ml2oqjxkxcejgzdprxceyciszx8okixhg',
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
                id: '486fde60-a910-472e-9591-b2867a787431',
                iso3166Alpha2: 'mb',
                iso3166Alpha3: 'z86',
                iso3166Numeric: null,
                customCode: '0ro3w38moa',
                prefix: '4p9yq',
                image: 'http://placeimg.com/640/480/people',
                sort: 462949,
                administrativeAreas: { "foo" : "bar" },
                latitude: 63423043467898090,
                longitude: 92354664722531680,
                zoom: 50,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Plastic Bacon',
                slug: 'amet-repudiandae-odit',
                administrativeAreaLevel1: 'z28fk696b2qhaysredworqg04op8apgr3a9ul3ojy8zwn6wwlh',
                administrativeAreaLevel2: 'fdfrbnqgqtpqrj72awprysmh5xdava5xayr2evdhozrq0jqi1f',
                administrativeAreaLevel3: 'cysns5mfawd7rpw5o5sdb9nu7a4153sjh77fjmafa9rgnc7fpn',
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
                id: '87c25afb-5b87-44d9-a5b9-edf496d1a43d',
                iso3166Alpha2: 'ao',
                iso3166Alpha3: 'nih',
                iso3166Numeric: 'eji',
                customCode: 'dfdft4b6xe',
                prefix: 'cq9p8',
                image: 'http://placeimg.com/640/480/people',
                sort: 502635,
                administrativeAreas: { "foo" : "bar" },
                latitude: 26304571253287430,
                longitude: 75236997684276320,
                zoom: 51,
                langId: null,
                name: 'Licensed Granite Car',
                slug: 'unde-architecto-natus',
                administrativeAreaLevel1: '7f6ef4mi2ml3mko0b9fhogunaqepricfuzwz2zmjogr157zj90',
                administrativeAreaLevel2: 'qysmo0zum8gopblyv4uk7br0hfvl770uo77h1m4oxusf4ts40d',
                administrativeAreaLevel3: '44am7z3onsaauos1jviz2edycg3l54v0unbpqmshbuvupfswxx',
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
                id: '811f8a0f-9b7b-4217-b6ba-0b1d89da273d',
                iso3166Alpha2: 'm4',
                iso3166Alpha3: 'kc1',
                iso3166Numeric: 'fdr',
                customCode: 'r2pc3c60lm',
                prefix: '85a0c',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 323165,
                administrativeAreas: { "foo" : "bar" },
                latitude: 96685151734293310,
                longitude: 81517487869993260,
                zoom: 93,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: null,
                slug: 'rem-id-asperiores',
                administrativeAreaLevel1: 'ellr70ajqb9b6q05pdiz70sk4ox75zwhu4ekx077lryxunalup',
                administrativeAreaLevel2: 'nkdzmqihh2137j6dsz0wnfzq1znl3x51qfxn60yrcz1nsc18pj',
                administrativeAreaLevel3: 'k26yvw1czplnljwx6mgtwk1l7ni50f3i81quimk3yv3fcha9wd',
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
                id: '91a61801-81f8-42d4-aade-1953c1da7d87',
                iso3166Alpha2: 's8',
                iso3166Alpha3: '9j6',
                iso3166Numeric: '4yf',
                customCode: 's8brhocknf',
                prefix: '56rub',
                image: 'http://placeimg.com/640/480/people',
                sort: 555490,
                administrativeAreas: { "foo" : "bar" },
                latitude: 52347929146648610,
                longitude: 13227029403436844,
                zoom: 94,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Gorgeous Metal Fish',
                slug: null,
                administrativeAreaLevel1: 'c8hxxu7cqoh1m52fxsxra6psi1b9wegy3riiugrnjan9o1t421',
                administrativeAreaLevel2: '68yaxiwarmu3dqozzt1mi3njdssd0f8febv30wxrev6qag6fq8',
                administrativeAreaLevel3: 'z02ogtdbe5wxs58rvzzaryaon1y3gcoi8p6ju3t5smvpl6y2u9',
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
                iso3166Alpha2: 'ls',
                iso3166Alpha3: '5be',
                iso3166Numeric: 'koh',
                customCode: 'ju2gqlz0uw',
                prefix: '20fr9',
                image: 'http://placeimg.com/640/480/sports',
                sort: 491540,
                administrativeAreas: { "foo" : "bar" },
                latitude: 19323568872030308,
                longitude: 19401758809186200,
                zoom: 10,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Concrete Chips',
                slug: 'quod-ut-voluptatem',
                administrativeAreaLevel1: '1o753ljtdfj0plx8ubjnh2lo8lbsfmimrq2vu4fekish76wzsi',
                administrativeAreaLevel2: 'c0b7mfcbugnftjde51bmbe8ipdbfw5c5ik5ksjupq2in7dr2qx',
                administrativeAreaLevel3: 'mbefy445bpbjvmc2l27czr9xzpyft4goglri40gwm7abr7q3n0',
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
                id: 'a813baa5-f94f-4c89-a01d-4d5968d28b97',
                iso3166Alpha3: 'ns0',
                iso3166Numeric: 'unf',
                customCode: 'w040qpa5s4',
                prefix: '2adcf',
                image: 'http://placeimg.com/640/480/animals',
                sort: 984167,
                administrativeAreas: { "foo" : "bar" },
                latitude: 36483270173962216,
                longitude: 74996319185673760,
                zoom: 79,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Metal Bacon',
                slug: 'aut-recusandae-beatae',
                administrativeAreaLevel1: 'purfkz2iwxlbxtwk3gd5oky8pjtdazq5smhxx0mm5a7ct1evvj',
                administrativeAreaLevel2: 'xcnjz6wsfsf0ugngvglgqfjdngfkxsjnjv2y9n4d1wylzeq8vb',
                administrativeAreaLevel3: 'o5yi79iaceeady35j45jxd3ih8yp7l8o3pez3qa3hu6e8qyv1n',
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
                id: 'c6a94e9c-b9ae-47ca-9107-024fd78cbb1c',
                iso3166Alpha2: 'od',
                iso3166Numeric: 'fu5',
                customCode: 'z92jo7n4mc',
                prefix: 'cjjms',
                image: 'http://placeimg.com/640/480/technics',
                sort: 150117,
                administrativeAreas: { "foo" : "bar" },
                latitude: 16781770714212468,
                longitude: 15174883237552980,
                zoom: 44,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Soft Gloves',
                slug: 'unde-quos-harum',
                administrativeAreaLevel1: 'kt0mfci83zzs1cka88y5murtm5kn0yp8x78pytktc8f4p8rcxw',
                administrativeAreaLevel2: '55edy35klrm3uao2pgn1ujiwsivj4acvlt6wlfmp60u3il8n0r',
                administrativeAreaLevel3: '5fjbfwqndjhacp8szrysjz83fz0fx7sau7u2e99e0hlb9cvh1w',
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
                id: '1a3e3c57-a92e-4fd4-bd57-139d2e75946e',
                iso3166Alpha2: 'b9',
                iso3166Alpha3: 'j2j',
                customCode: 'mas67qwmvo',
                prefix: 'ub9rb',
                image: 'http://placeimg.com/640/480/sports',
                sort: 277002,
                administrativeAreas: { "foo" : "bar" },
                latitude: 39410647197282740,
                longitude: 42984650271050480,
                zoom: 12,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Concrete Chips',
                slug: 'consequatur-distinctio-perspiciatis',
                administrativeAreaLevel1: 'k27iq4arh8falu06ok4nuw7vjxh00egccdnxgd8nvjososi86u',
                administrativeAreaLevel2: '6by7skc5kvkomrpi26hohm3ehcxe6t0xl3mjtsexpn7in6tq5y',
                administrativeAreaLevel3: 'hgyp8t71rr0nevibf51pwwan75aalvuwi5fb7qx57gfjhkdc1m',
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
                id: 'fa635949-0d10-429d-a970-06696714a391',
                iso3166Alpha2: '9a',
                iso3166Alpha3: '30s',
                iso3166Numeric: 'w6f',
                customCode: 't6fwflc1dm',
                prefix: 'q00it',
                image: 'http://placeimg.com/640/480/transport',
                sort: 821061,
                administrativeAreas: { "foo" : "bar" },
                latitude: 43447324330844350,
                longitude: 13484002921525564,
                zoom: 49,
                name: 'Handmade Soft Hat',
                slug: 'facilis-nesciunt-voluptatum',
                administrativeAreaLevel1: 'lys9pfzo37p7brh6dim8pw49xyb2x2dih9vhgvkxs38b6ze76b',
                administrativeAreaLevel2: 'tfa2aon17cxmerw5k6ik10uw9dbnuwk04yan0nf80rgajxteft',
                administrativeAreaLevel3: 'tu1579dv22rpjp1bd0z0tzazm7x4kspv2fesnk6vyc16rubs43',
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
                id: 'b1b314bb-6e38-4c92-ae45-bf27998e060f',
                iso3166Alpha2: 'i5',
                iso3166Alpha3: '28e',
                iso3166Numeric: 'u0d',
                customCode: 'cokwfcnm6y',
                prefix: '5wka4',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 315706,
                administrativeAreas: { "foo" : "bar" },
                latitude: 30840586062440590,
                longitude: 72597777045592140,
                zoom: 27,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                slug: 'a-molestias-nam',
                administrativeAreaLevel1: 'v0pdm6m2emml6liicqv0wr30bt9di0hy83pvrbbw4kr681xeot',
                administrativeAreaLevel2: 'ooyox2xgbujd3kuo3d4f56v8ythe8autto0x221kfb5sxeg554',
                administrativeAreaLevel3: 'igx5ceysba3bsu652e72s56mkmwnuesmac4h8xrpjlbawjxek3',
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
                id: '9e39d969-dab7-4e77-876b-b1fbab153c95',
                iso3166Alpha2: 'sh',
                iso3166Alpha3: '86d',
                iso3166Numeric: 'j34',
                customCode: 'zfhgze9122',
                prefix: 'ohmcn',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 727324,
                administrativeAreas: { "foo" : "bar" },
                latitude: 23651710617705360,
                longitude: 58522675129071440,
                zoom: 87,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Metal Shoes',
                administrativeAreaLevel1: 'tpjnwtxjszlgub6r8r5kdmllw69vjk21ml1ro910uaxie8b95l',
                administrativeAreaLevel2: 'ubkel0e5rqntpxrfrg5h1nuljmddmcun11kby1uo6f6rp95zka',
                administrativeAreaLevel3: 'yltcdu33izzmc2idf53bgp7bthgj1g8p9drxwtgtnmdmd9y4cd',
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
                id: 'oxgxcnbiv9b25ivr6nx0h6baxj8rygz6w8jlr',
                iso3166Alpha2: 'zv',
                iso3166Alpha3: 'rei',
                iso3166Numeric: 'jr5',
                customCode: 'tqxkqbdxn0',
                prefix: 'l9re4',
                image: 'http://placeimg.com/640/480/people',
                sort: 151649,
                administrativeAreas: { "foo" : "bar" },
                latitude: 30200959817503536,
                longitude: 83877068856423250,
                zoom: 66,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Frozen Pizza',
                slug: 'non-cumque-dolorem',
                administrativeAreaLevel1: '2z2r37jzjyfmwzynz2eb0qhr8pujcwgw2vbzo881nbo1piqduh',
                administrativeAreaLevel2: 'n85dkewm4pibe1spavcj415seqr0mpimawzdbiaqzkjo1mtv8m',
                administrativeAreaLevel3: 'g9gqcawc8wp8xnhyl90gud6rcphzodbxq2dywfmbi3mf6uqkef',
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
                id: 'fa91a8db-8569-47f8-8ccd-107e566c9c08',
                iso3166Alpha2: 'glo',
                iso3166Alpha3: 'p6w',
                iso3166Numeric: 'lla',
                customCode: 'lqfn3w5m8s',
                prefix: 'xmyia',
                image: 'http://placeimg.com/640/480/transport',
                sort: 646626,
                administrativeAreas: { "foo" : "bar" },
                latitude: 77202731036814460,
                longitude: 92943406465461980,
                zoom: 79,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Metal Soap',
                slug: 'autem-voluptas-modi',
                administrativeAreaLevel1: 'dilp0j3jfrin8t57xph9nw3cobft0m7xg4a6rrgqq8xd2irybe',
                administrativeAreaLevel2: '17gsepttw3soa9ma4udlalgeeaanorncrpxjmk9iw53okdrxfw',
                administrativeAreaLevel3: 's830tlak9v3ex1z0jgmpxtgtpfp0h839vg33bpjkoy2qwdtyjh',
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
                id: '7f384bdc-3dc3-4a0d-a75f-76d9a682af05',
                iso3166Alpha2: 'x4',
                iso3166Alpha3: '67dn',
                iso3166Numeric: 'rok',
                customCode: 'u45mbbvq91',
                prefix: 'nssor',
                image: 'http://placeimg.com/640/480/technics',
                sort: 197504,
                administrativeAreas: { "foo" : "bar" },
                latitude: 24486996651592652,
                longitude: 73238897978627060,
                zoom: 67,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Granite Chair',
                slug: 'et-atque-aut',
                administrativeAreaLevel1: 'drcjicfi3uhbkcxbqzgdaesovvkk9jmd988bxef76cboj6mksl',
                administrativeAreaLevel2: 'ckir3qtfm4mvuhdqmeyaw556hdfscp4xw88cu8l57grwjg0h4g',
                administrativeAreaLevel3: 'b10i0jbalimswt71rkgz0tir28o5smcm3k6dwcw7l5ei56gn07',
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
                id: 'c680c4e5-bea6-4e49-9159-a150780a03ac',
                iso3166Alpha2: '5y',
                iso3166Alpha3: '5ar',
                iso3166Numeric: 'si9v',
                customCode: 'tti6ztw6qg',
                prefix: '87a7o',
                image: 'http://placeimg.com/640/480/sports',
                sort: 261165,
                administrativeAreas: { "foo" : "bar" },
                latitude: 59974865036707256,
                longitude: 20594894496896470,
                zoom: 53,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Soft Towels',
                slug: 'sunt-molestiae-quia',
                administrativeAreaLevel1: 'c8zzeew68lokrymz7m2gahihbhbz0r63yczi7uk7iu2k7tj9pm',
                administrativeAreaLevel2: '468hrqr9blyry23pgzq93qgxei6ekfj2h0rcq6bnjgbqd5kcsd',
                administrativeAreaLevel3: 'aoehthcc3pbxz2d73i95wn330r3gljpo8xebggtgz2acmk5h8b',
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
                id: '6977a21d-80ce-4f7d-bbb8-5f4a3d718005',
                iso3166Alpha2: 'xq',
                iso3166Alpha3: 'cry',
                iso3166Numeric: 'cvy',
                customCode: 'w056rl73fu',
                prefix: 'i8p9s',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 446682,
                administrativeAreas: { "foo" : "bar" },
                latitude: 61994198458765680,
                longitude: 13089357350012274,
                zoom: 94,
                langId: 'veogt8jl5zu1fn34s1xkg2y8e8ztw7oo9a79s',
                name: 'Rustic Frozen Salad',
                slug: 'ipsam-culpa-voluptatum',
                administrativeAreaLevel1: 'sa6ar7428vsrcvzar8jk116x8bqhn6rv0jy4fx0q9f97ijim8x',
                administrativeAreaLevel2: 'eied1o75o6a85rnvmjs1ug3oo360tqhmyvq648im9gjl0w9cva',
                administrativeAreaLevel3: '6rt8oymipintjpubrxnpmb0w6eafony8hunqnlapp9sgslbv77',
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
                id: 'df6ee2e6-9d77-4c17-8515-2da3ae39a695',
                iso3166Alpha2: 'db',
                iso3166Alpha3: 'bzk',
                iso3166Numeric: 'tqh',
                customCode: '6qrvq3pqck7',
                prefix: 'c2n74',
                image: 'http://placeimg.com/640/480/city',
                sort: 935005,
                administrativeAreas: { "foo" : "bar" },
                latitude: 88430245965651540,
                longitude: 91262251749793620,
                zoom: 37,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Rubber Mouse',
                slug: 'aliquid-neque-voluptatem',
                administrativeAreaLevel1: 'rehfrb0cz23hurnhqpks7efvbrwdagz7lj5jri93ww0cpy8b1h',
                administrativeAreaLevel2: '1ghep3n19waqvg9k8kb0dllnaw4f8qmpmc94s39iarv2yva08o',
                administrativeAreaLevel3: 'hk23fihisq5sug4u49xwk0smfv7eql1usd56k84qeihwve5519',
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
                id: '7737058e-c7a0-4362-831f-0f112e5aba98',
                iso3166Alpha2: 'bv',
                iso3166Alpha3: 'u5q',
                iso3166Numeric: 'le4',
                customCode: 't15x1njol5',
                prefix: '5rkryc',
                image: 'http://placeimg.com/640/480/business',
                sort: 945788,
                administrativeAreas: { "foo" : "bar" },
                latitude: 96105875509647580,
                longitude: 60095451894339550,
                zoom: 40,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Wooden Shoes',
                slug: 'ab-tempora-labore',
                administrativeAreaLevel1: 'oc4vjirjzg313jxx5rzv7y7eo6yizes7elhvj8a6di2t0ecpwr',
                administrativeAreaLevel2: 'r8xj9vc9p3pfgjbe1d82xb5x21ffep5aegqjrwmqo5adn6b8wb',
                administrativeAreaLevel3: 'rtzokj596owmrs1c6ovx3uee7z8wt9ukagwccorkkru3amfgxw',
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
                id: 'b10930f2-4436-4f04-814a-8377caf4668e',
                iso3166Alpha2: 'p9',
                iso3166Alpha3: 'ujh',
                iso3166Numeric: 'qyd',
                customCode: 't9qsqpg4n9',
                prefix: '1vm8m',
                image: 'g7afl36ijicsc9li4mzcnd4ud5x9ofygjoy34xbbttyrta6dfhi18ncq1mtp3ruigz46pnewkaih1hk0yuu1mtzy4n5auk3ku2f2ge1gb3yi4de098v9x4ck1sd8m38fsdvibroqirsvf2an3bsn34iolu0g7d29zp32bvkem83lvyyjciyifytjdqe14h7ya090stpj31rzzzd62lijud5iyxsr4co8w2afokn32m8i579fp2xyger0ol6m46cq0dpg1fxbzd9k7rsf1ohqey7y3mn7ku3pxgl4e3klg01kem66xlo3fimmvqdk44y4vuk23xsa7h15xktp2pyfi0hwf3mjx74n3p7t2ba6ipr3zmzwwoo5uj5zydu4ljy3d9xwnfgrsu2t4g9b9yajusntv22gd0qmjf2gfjehf55evev6fxnevfio4k8wdea3c1zlq1n95zwufwb1isvxlqab7ycwsig0tgvrudfi566z322jlhzmgfa8h4ov3pu7ux2yppbdn9pd49i0yuz9xnorgtlpdl3z3svbipe9ongc3o58y80kzzrsm0dhkf0ydj2vpjoeoakzo9sd09uv1qairrlsyxu72pf3u7hm81kwzrwtu1nhg2sact4a65u3vgqr5r5l1cp05daxoxhsds6dwbcpmh11ax90wtl8ra6rw0s570l5050wg50geb0mhuuw9mt7d9g6cmivn8y5zjyel0dw8di7na1todw5uh8eqik2v0pkymbtv6fgh3olonuwf36wv69bbrrkk1tqimz84n85a6za7vozqfcbz30gi0nfd6f38mvq167nzgpqjs69rgns8lgtwyopbdy8ayhddsbh9qv1ogm5p77emjt9km5vay46rl1uqacc8oy16hxnbvocky66581rldg3rc8l6b743zgjxczhbjouj43bxe4jwzajjd99puzjg23s7cie470jbxs79v2gcttdqt6f3wu1ub5xm4co804ady6apeq9i9vxw0ogeklyosjit',
                sort: 498063,
                administrativeAreas: { "foo" : "bar" },
                latitude: 68688240704873640,
                longitude: 16731430201142020,
                zoom: 92,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Steel Salad',
                slug: 'ex-optio-voluptatem',
                administrativeAreaLevel1: '2u5194d0gq1al7ana4fgzvpt71n2nclq42bf3ctaa3hplx8jt7',
                administrativeAreaLevel2: 'oou4pcjjww6xohiazrd7afy0m0tvmzhmbfs9z7mt044axsho6w',
                administrativeAreaLevel3: 'ow4tduumr85ep1w3h5dioca9orzi6haiw90atrrcztow5p4cn4',
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
                id: '37b5e91e-c0b5-4274-9744-ed8ca0adf4d3',
                iso3166Alpha2: 'b0',
                iso3166Alpha3: 'd6f',
                iso3166Numeric: 'fk2',
                customCode: 'f1zgn56xw3',
                prefix: '3cry1',
                image: 'http://placeimg.com/640/480/business',
                sort: 3569106,
                administrativeAreas: { "foo" : "bar" },
                latitude: 56166419068541060,
                longitude: 37517227699426620,
                zoom: 45,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Wooden Ball',
                slug: 'provident-unde-necessitatibus',
                administrativeAreaLevel1: '549mhu356p70j7m3sek3swq9wtz0bfv2p9iz7t4z4wr699rtte',
                administrativeAreaLevel2: 'wq4p1i94gru2q9s72ohnksc5dscrchy5a4movy3065ffjqruuk',
                administrativeAreaLevel3: 'y4id5c40mlww29eqd7c253wzo6e7hwrvrkw5td4sqiupmyn7q8',
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
                id: '32328071-3f9d-47b5-b60b-a51fa291c1df',
                iso3166Alpha2: '1v',
                iso3166Alpha3: 'b8u',
                iso3166Numeric: 'mmr',
                customCode: '0w4nv8nhgc',
                prefix: 'g1ihn',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 973043,
                administrativeAreas: { "foo" : "bar" },
                latitude: 424444160677015500,
                longitude: 15852019016244428,
                zoom: 55,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Plastic Chicken',
                slug: 'quia-cum-blanditiis',
                administrativeAreaLevel1: 't1ye12egbt3cqauimwsn9slw59drrrid4c6dyxsf1rygr1enbn',
                administrativeAreaLevel2: 'euq5f6zys4vqaewx3rkrif1dmb00y9sp7vek4qebzhc6c8v0ce',
                administrativeAreaLevel3: '6iuway821kdf9964am0ikendh374v0srozcempk78tukasqcue',
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
                id: '403acf8d-b256-4c3b-80a1-ae0e37b765dd',
                iso3166Alpha2: '5z',
                iso3166Alpha3: 'i59',
                iso3166Numeric: 'ycr',
                customCode: 'xfdwx8gqbs',
                prefix: '5e48d',
                image: 'http://placeimg.com/640/480/food',
                sort: 501853,
                administrativeAreas: { "foo" : "bar" },
                latitude: 80710585158933760,
                longitude: 429711390840190900,
                zoom: 64,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Concrete Soap',
                slug: 'iste-odio-beatae',
                administrativeAreaLevel1: 'blxicgr7rxef4odbzy5ea6ry1oxennot3ger32hp766dgv2yl5',
                administrativeAreaLevel2: '1vgfgjecu8me2oyq82d0uvsiv5wugehpmed4xvp4g7xo9e2vof',
                administrativeAreaLevel3: 'u5vgmzsroln1r0wyt3t09kjnu4xgw1ttw58adm7gcjohamdfof',
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
                id: '7a206746-5630-4907-a696-ebed5c81c752',
                iso3166Alpha2: 'l5',
                iso3166Alpha3: 'pyf',
                iso3166Numeric: 'q8v',
                customCode: '0xbmuzhunw',
                prefix: '2z324',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 717579,
                administrativeAreas: { "foo" : "bar" },
                latitude: 46499106764003464,
                longitude: 71720691507718850,
                zoom: 246,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Plastic Pants',
                slug: 'quis-quia-ipsam',
                administrativeAreaLevel1: 'bvw7ph8d6105ky9o9sof2rn4ck2xft8g5n2euzizy27mea6ehd',
                administrativeAreaLevel2: 'ouqzo1269wavude6iz91q6j2ii7bwb6d06asp7q33qlpmz9do0',
                administrativeAreaLevel3: 'ty8ccwcczhvr2qbrmaremym84jn3e5v41pfj0j0qtb82bsb0g9',
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
                id: 'fc19393e-cd1e-4d69-a7a3-6a0f702f64eb',
                iso3166Alpha2: '5r',
                iso3166Alpha3: '0ke',
                iso3166Numeric: 'f5n',
                customCode: 'uccc4sm77h',
                prefix: 'govid',
                image: 'http://placeimg.com/640/480/nature',
                sort: 950571,
                administrativeAreas: { "foo" : "bar" },
                latitude: 66991185305895580,
                longitude: 55447143801222824,
                zoom: 66,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Cotton Chair',
                slug: 'crhyj9d6vfbummaqd0caooa587ga72rcu6867ewrl3jf2sg69a30besfqkgxy5abb8cd8wbavz4dwdgn84ybm9ktd5d9c7hka17bt6xl1qpko6rbzwg3bvingzcjs5hmy4jfqf6bdiiz4gf92ow0fzas7zor0gnr0g3bmqay68hchu31gj3u36zdmfstpjak4sb9z2bogsjp1vc5k42by1xrc4ztjpf5lt5syeh8z1vg5u9kxjtcrhkgkl7zk05ww0k9qamf3uma9vndnx2oou6zfln79ki30jiy2jnsin9tjbe0weyz382mcw1mwn2vb3t7je3i7rb3b4lmhfx2n3fz6kxyoshe5dri5h97e97mfpeqc75pnj5cyku96cknq3gqaeivutzgenqg68ggjjzz6givrangt5984vq8r5bgt6qkuzb2woh8lp2n5d13eef3r16ajzob0uqyr5vupebpjpfahk2dho3jjus0dlp0pbx9cot23qjdsl7m5wnyaiyu05kekgg0005ac09va8upmqwdxr38i9n5aap2ntagwbvalp439ogdsh13fv4n3609i50zhim9miv5kg3t0lil0hp53xxtt7aqlv5z25cno68m26kc0u3ebalruv90qvyif6dre7zqqtnfy61p1d4hqyvka2tziimmf02qhdm76z3rups71rnd96oxbj1ulvji1l30vvmkllcj8qr3qpltczmt97r34gyr8w1tarkou3d5vucsbneb7exh0ffsvjmelwzwr02sgslnirj3rl5anaefn65si1zuq93ow0u0mjtno2lnr1ptcl2zg5oxph0jgiqym51g0omdiy3hfjgj3i9v6jlirpz61iqo8g9n5wl39s3a2h3diq4q2zzfqb0qwr1ol0sfvf8tujo7r14jqvgb7pfag0bad5g2n0dgxme3ho2f15584iy2aqf0vcxnp6wyxwmuw9zwlwsmcptv8u4u2d3hnw0y83hqmo6cye0g85z8uart5mx38wv68',
                administrativeAreaLevel1: 'kge46t90usvx7g7vzdjtm06inf0jvrxy83gwqk2nvunwr5bbv7',
                administrativeAreaLevel2: 's8bgk2e4pgr2npo4ww5i3pc0l9blapwy39huezuk76aodnxiwx',
                administrativeAreaLevel3: 'wj7kaf9mvh6z99iiy81jdap12k8mstplel6jf9tydb8b9pmucc',
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
                id: '1e47c0bd-9faf-428e-ab39-8509c6ac9b5b',
                iso3166Alpha2: 'wa',
                iso3166Alpha3: 'rv9',
                iso3166Numeric: '6m0',
                customCode: 'j995lnchyr',
                prefix: 'rmuwc',
                image: 'http://placeimg.com/640/480/technics',
                sort: 551419,
                administrativeAreas: { "foo" : "bar" },
                latitude: 69979778352989970,
                longitude: 83957192588924540,
                zoom: 58,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Wooden Pants',
                slug: 'quibusdam-sint-aut',
                administrativeAreaLevel1: 'zjx8hjxfwskq4g8lypbz2fyradz0qdy7gf7ab8wlat9muwi56y7',
                administrativeAreaLevel2: '1ypugqxsv0lnul0zaoq88b3cq2ggdyo6s7psju8qh10yek4cvs',
                administrativeAreaLevel3: '091gu7lrmrcp306tirtig7b5hnjqeuegfjdwysefchoqyy8hw8',
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
                id: '580ff970-c6d2-4efe-9c6d-01abb38f7022',
                iso3166Alpha2: 'v8',
                iso3166Alpha3: 'tt4',
                iso3166Numeric: '8uh',
                customCode: '48d8b62ql7',
                prefix: '6vfow',
                image: 'http://placeimg.com/640/480/technics',
                sort: 788400,
                administrativeAreas: { "foo" : "bar" },
                latitude: 38885997357674610,
                longitude: 53444875768172696,
                zoom: 91,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Soft Pizza',
                slug: 'natus-nihil-id',
                administrativeAreaLevel1: '1yum4828r2fpy0fzahea4jwlb7vc0zls8enl80mpgevx1c8b54',
                administrativeAreaLevel2: 'l54hzig1epr7jze1g7aule939e5ruh86bhbbmg8dvhcpm1wqfwz',
                administrativeAreaLevel3: 'p8f6ycvujoz12wobbp0f14vpaubprc8qnn3y2s0vadiby0pogl',
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
                id: '91889e38-8d2e-4eec-be4e-258e01243e2b',
                iso3166Alpha2: 'd1',
                iso3166Alpha3: '353',
                iso3166Numeric: 'nmj',
                customCode: 'uc1dayp0fz',
                prefix: 'w0kui',
                image: 'http://placeimg.com/640/480/transport',
                sort: 640222,
                administrativeAreas: { "foo" : "bar" },
                latitude: 67186121684508530,
                longitude: 35123398751750576,
                zoom: 96,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Granite Hat',
                slug: 'voluptate-in-quisquam',
                administrativeAreaLevel1: '60cf7on7kkhh9tldxyelmrmaolsu0vjvbjtux1cciwg2kbpek2',
                administrativeAreaLevel2: 'herqxks70aqvjph240jc1sdaym1k86243eyf1853x41m5c2lgk',
                administrativeAreaLevel3: 'zi6fo76osowo0d7e5cakyzdsvgdxgn470jo5xh4t184dj4gha6a',
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
                id: '1791625d-f0b6-442e-8b97-3d49904722d9',
                iso3166Alpha2: 'bh',
                iso3166Alpha3: '9dk',
                iso3166Numeric: 'p4d',
                customCode: 'gulk20tida',
                prefix: 'x8mj0',
                image: 'http://placeimg.com/640/480/sports',
                sort: 731661,
                administrativeAreas: { "foo" : "bar" },
                latitude: 67166327278391060,
                longitude: 91831943735245780,
                zoom: -9,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Plastic Shoes',
                slug: 'maiores-non-a',
                administrativeAreaLevel1: 'h1nvfdvozd4xky9e1n1xlrnmpt1iwue1cy0yip10cfglquy9nf',
                administrativeAreaLevel2: 'jkkl9nzwvvwr3ryy4526ahpdxxyf7verq7p6j0io8kdmgxtqqm',
                administrativeAreaLevel3: 'gi53eteq0y7ruo0i0s8e1sdbhaqr8st120sytrjnsi4vg3k2on',
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
                        id: '0d8b2545-e054-40e2-937e-7dc4a068e36f'
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
                iso3166Alpha2: '8n',
                iso3166Alpha3: 'lxs',
                iso3166Numeric: 'lyv',
                customCode: 'kvkhjlclqu',
                prefix: 'gebv2',
                image: 'http://placeimg.com/640/480/technics',
                sort: 247843,
                administrativeAreas: { "foo" : "bar" },
                latitude: 73725042584734700,
                longitude: 87927208366292590,
                zoom: 52,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Gorgeous Steel Ball',
                slug: 'sed-delectus-quo',
                administrativeAreaLevel1: 'bkaxbwxy3i77h2rqkswh8yoios4x6m64a40c27umuz1ke1354d',
                administrativeAreaLevel2: 'faismruhrjussr1t1tga0jlc7z7mydvrnu2avt8cr54dff6jlg',
                administrativeAreaLevel3: '1rihutmqdfz6u9qsb33tdxtbtlxrr9x8cwgkodu5hjkvus15as',
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
            .get('/common/country/f6d59f5d-cf48-414a-8abf-6f58852f9541')
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
                id: '5d85e438-a2c1-41c2-83c9-7d8fde58d519',
                iso3166Alpha2: 'c4',
                iso3166Alpha3: 'w58',
                iso3166Numeric: 'eu9',
                customCode: 'ocfk8pgns7',
                prefix: '1ennh',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 140668,
                administrativeAreas: { "foo" : "bar" },
                latitude: 36411961255365150,
                longitude: 34147638255078810,
                zoom: 63,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Cotton Computer',
                slug: 'beatae-quia-facilis',
                administrativeAreaLevel1: '8ydf7y1xmpf36qkupi5plxjckx0cr3yhj5kxl09289c4j17pnv',
                administrativeAreaLevel2: 'f0htjj8hd846uuexbk0u11q90a0h3ehqmqz39ypajv0tb324dq',
                administrativeAreaLevel3: '5b9yev13e8voa7uqh3vara1lhmgljy2proxi85amsu60m5846v',
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
                iso3166Alpha2: 'nd',
                iso3166Alpha3: 'qu6',
                iso3166Numeric: 'x3a',
                customCode: 'rnsfsl0lg7',
                prefix: 'alzkp',
                image: 'http://placeimg.com/640/480/technics',
                sort: 368407,
                administrativeAreas: { "foo" : "bar" },
                latitude: 68352739160230650,
                longitude: 79362946247695040,
                zoom: 28,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Cotton Pizza',
                slug: 'molestiae-ea-ex',
                administrativeAreaLevel1: 'qq613yf9lm9y6z1jfqbfpeydvna7vt7o0tpc9vg7livbnb3v3h',
                administrativeAreaLevel2: '2a3zubnsmzvu0macgkuba6gpnxurtbpstvavwh8omvzy4pqowu',
                administrativeAreaLevel3: 'qtw0zphhopprcof3coyruuyprpfyu1gah3hxcflom2a7xcaxqn',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/2d7e1772-9dcb-42d2-828f-7f7c62752719')
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
                        iso3166Alpha2: 'ep',
                        iso3166Alpha3: 'u4k',
                        iso3166Numeric: '7n5',
                        customCode: 'i84ulw4g9b',
                        prefix: 'a5b0r',
                        image: 'http://placeimg.com/640/480/fashion',
                        sort: 771755,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 41088763963563380,
                        longitude: 86539840945755360,
                        zoom: 56,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Licensed Soft Table',
                        slug: 'voluptatem-ipsum-ex',
                        administrativeAreaLevel1: '8434k64supbj21270gnnkxn9qyuysekz2w1iymc38cm05lk3yj',
                        administrativeAreaLevel2: 'tg63mg2bdtn1ss1125pq9bg2fe7joywjfadfmggfonqnrz50u2',
                        administrativeAreaLevel3: 'gi29igup5a71gohx51hdc7xb70on2np5dac8dvixhak4wbsbuw',
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
                            id: '1a9022f0-4c11-4d1c-9228-7f255debf8de'
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
                    id: '3ccab890-dd3c-44fd-8511-e79479593e92'
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
                        id: '078be4f5-f4f6-4c41-a7f3-b8bf63d346cb',
                        iso3166Alpha2: 'n5',
                        iso3166Alpha3: '68u',
                        iso3166Numeric: 'p1p',
                        customCode: 'm6llxf0lto',
                        prefix: 'abvdo',
                        image: 'http://placeimg.com/640/480/technics',
                        sort: 440278,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 61238962560561870,
                        longitude: 14485940837572816,
                        zoom: 74,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Small Cotton Shoes',
                        slug: 'quam-quod-odio',
                        administrativeAreaLevel1: '8t2juu3rlvwxjp5ja4vnuhkz76x715pcwtafzapnv1qc26b6yk',
                        administrativeAreaLevel2: 'nc8mmhg6syo25bhvmg380umg3xobhhyy4h2uaucz3jv1vxulnt',
                        administrativeAreaLevel3: '0qtm8n4f23tdotkeskhnsxg8n0pwfohbfk3km0daaagl987cv7',
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
                        iso3166Alpha2: '41',
                        iso3166Alpha3: 'zmv',
                        iso3166Numeric: '6mr',
                        customCode: 'rk9fe37tln',
                        prefix: 'bbub1',
                        image: 'http://placeimg.com/640/480/technics',
                        sort: 606973,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 11164359237482912,
                        longitude: 25646491943858052,
                        zoom: 49,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Fantastic Plastic Shoes',
                        slug: 'velit-necessitatibus-atque',
                        administrativeAreaLevel1: 'exhkoisost8lj9570yr97qollyfpmvmytsgnhlzadog9atvff2',
                        administrativeAreaLevel2: '70ynuyig8hv91ry7n7h3gjenoqp3j3san9bz5gr5q1s84djllo',
                        administrativeAreaLevel3: 'a8t2u3jhxygtp5ti1r6eb1wmi3r66hsoc7mnlz24tdewssuma2',
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
                    id: 'c20044b6-f7d2-44b8-bf56-5177b19abf3a'
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