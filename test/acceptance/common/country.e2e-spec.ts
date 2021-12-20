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
                iso3166Alpha2: 'kc',
                iso3166Alpha3: '5eo',
                iso3166Numeric: '00g',
                customCode: 'sxvyvmw67o',
                prefix: 'iiv0n',
                image: 'http://placeimg.com/640/480/animals',
                sort: 423106,
                administrativeAreas: { "foo" : "bar" },
                latitude: 60886954000180920,
                longitude: 34810460787958396,
                zoom: 83,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Metal Fish',
                slug: 'rerum-dicta-cumque',
                administrativeAreaLevel1: 'ydg3prxyqpmpld8lad7agoqul2uxo2rl27b8irufhim4y6wje4',
                administrativeAreaLevel2: 'irsk913udwfvkv1htxt9cc8puc1p7knuooycs6bvcry9v3zbvi',
                administrativeAreaLevel3: '4z8k0tcaaci2wbdkv3dfmh50xntd8uvq3gbbdhyoavmp5rl0sg',
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
                id: 'd7f87303-3f63-474a-b248-212e234efbfc',
                iso3166Alpha2: null,
                iso3166Alpha3: 'hqg',
                iso3166Numeric: '848',
                customCode: 'f8fgrjcwbb',
                prefix: 'ulntk',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 149533,
                administrativeAreas: { "foo" : "bar" },
                latitude: 86045625382633360,
                longitude: 32803954233836756,
                zoom: 90,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Plastic Pants',
                slug: 'reiciendis-corrupti-fugit',
                administrativeAreaLevel1: 'uqc9lyae31s0wgwp4q1ij6hmwz84ky4oiq9xjnm3fpphu2o7uz',
                administrativeAreaLevel2: 'tzw5y3tr8wacgsw7ezhczmkpnyho3s6nc1v6f97wjbe7jy0xow',
                administrativeAreaLevel3: 'nydyudwko5ft9atini6gvsoopw19zoxxbv2b6i45wqmko23xgr',
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
                id: '662a2f54-080a-4d7f-98ae-56d7b997e751',
                iso3166Alpha2: 'f5',
                iso3166Alpha3: null,
                iso3166Numeric: 'bmp',
                customCode: 'kt9bxz3910',
                prefix: '47951',
                image: 'http://placeimg.com/640/480/city',
                sort: 605234,
                administrativeAreas: { "foo" : "bar" },
                latitude: 29753582413743824,
                longitude: 37867765123262910,
                zoom: 58,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Wooden Computer',
                slug: 'asperiores-repellat-unde',
                administrativeAreaLevel1: 'end3hyd9ro3if2aicc80blkf4yere3k20145fqmpwfg0vc6k8s',
                administrativeAreaLevel2: 'brkrwtxfr7ayq1a29abhjht0d34s6rx11w7wg73a85r4xmu0m8',
                administrativeAreaLevel3: 'v0wl6xkn80ems0drz0cp09zp6k6xtjlex53hz3ycl8uh7yjlpe',
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
                id: '17ef78f1-753a-49ab-bbb9-30cb6f46324d',
                iso3166Alpha2: '99',
                iso3166Alpha3: 'w6c',
                iso3166Numeric: null,
                customCode: 'xa4wqu4k6q',
                prefix: '6mla0',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 194890,
                administrativeAreas: { "foo" : "bar" },
                latitude: 10391898272582740,
                longitude: 86906096684670190,
                zoom: 34,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Wooden Car',
                slug: 'perferendis-et-architecto',
                administrativeAreaLevel1: 'aj4hfcfwdo6c1j8nkzpposwmuaftx4s6a0zth8a0usmgv8drte',
                administrativeAreaLevel2: '7zivexy4qone9pm65t6dcwmviw4q238ql5cd6qpfk2e5tye4h9',
                administrativeAreaLevel3: 'y74ipe6fz6y4gbx1mpxqgsa521pvhjltfbwirg3stw6j7iyzu0',
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
                id: '6a6dbf0f-5f04-40bf-a47c-7c65615e390b',
                iso3166Alpha2: 'a2',
                iso3166Alpha3: '0ki',
                iso3166Numeric: 'utl',
                customCode: '8m2vo79cnx',
                prefix: 'i04kr',
                image: 'http://placeimg.com/640/480/cats',
                sort: 132061,
                administrativeAreas: { "foo" : "bar" },
                latitude: 70696790203984740,
                longitude: 87230244198637180,
                zoom: 89,
                langId: null,
                name: 'Gorgeous Soft Chair',
                slug: 'itaque-a-et',
                administrativeAreaLevel1: 'sf2f6zv5e6btmy1juzx0rfq4kxdzr2g024bumm81l83fuhj9p2',
                administrativeAreaLevel2: '30pugo3esc2x3n4brw5eyo4rtzhxnub8ydgj0ei4pe8qgbsi5p',
                administrativeAreaLevel3: 'b97o4bz738xtcddvx8s9uvf5wufge24m4mqdw9sh295ryijl8s',
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
                id: '3c48c6aa-9802-4dd2-9af6-a4dead0c15da',
                iso3166Alpha2: 'j5',
                iso3166Alpha3: '84g',
                iso3166Numeric: 'xcj',
                customCode: 'd4pxlt96gq',
                prefix: '0jwkh',
                image: 'http://placeimg.com/640/480/cats',
                sort: 784241,
                administrativeAreas: { "foo" : "bar" },
                latitude: 43160391368966610,
                longitude: 36314517890736440,
                zoom: 41,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: null,
                slug: 'eum-corporis-totam',
                administrativeAreaLevel1: 'az1vb6zmakprss5ym7kr40lroi580hn2p96qmf824fgpbn6jrl',
                administrativeAreaLevel2: '9tmnxbsw558uctndiuhld77kq91kqalbfigp9m4yhmrqfrhkak',
                administrativeAreaLevel3: 'ra0eyfojnt544qwcgxd4avvwd6hp1dy57ebs7ma9t1bcx8h4tt',
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
                id: 'f7a3381c-fb1e-4580-9e51-12b123407c71',
                iso3166Alpha2: 'dm',
                iso3166Alpha3: '3wi',
                iso3166Numeric: 'nsw',
                customCode: 'dred2f6bdc',
                prefix: 'dy412',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 849131,
                administrativeAreas: { "foo" : "bar" },
                latitude: 37016805112806210,
                longitude: 64693321088691730,
                zoom: 40,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Frozen Soap',
                slug: null,
                administrativeAreaLevel1: '7ca4ck1v1gt4wnxblvwnu7k0aany3cyh0r5u7hq2uymc4hyrhk',
                administrativeAreaLevel2: 'f848jq8edirdwqf9motk61aw709nierft2ijv2ym6lro19o4qg',
                administrativeAreaLevel3: '8cu0k1bzwq1kkzv8k2owo7nnfr90dxin7fzsscxdfz3uy5r48h',
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
                iso3166Alpha2: 'lm',
                iso3166Alpha3: 'aca',
                iso3166Numeric: '3a1',
                customCode: 'e0x6tpru2j',
                prefix: 'mjd3d',
                image: 'http://placeimg.com/640/480/business',
                sort: 951491,
                administrativeAreas: { "foo" : "bar" },
                latitude: 94035274548917470,
                longitude: 14046317099205180,
                zoom: 87,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Concrete Pants',
                slug: 'recusandae-tempore-placeat',
                administrativeAreaLevel1: '76jzyya86o0v0o7yhc4aae12c14o2z2mgpwqdkpvg10ow4yfvn',
                administrativeAreaLevel2: 'e9s7e2wy9mcwi9fspxpmgy2ctbar46b34qaezo99x950x2efto',
                administrativeAreaLevel3: 'y043mr9iv9teaexlnjzxzanhpmcf90dggbssdl44w1tgu6c7em',
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
                id: '0fcb8a33-3b4a-4c81-bea8-24b218796a21',
                iso3166Alpha3: 'py8',
                iso3166Numeric: 'f13',
                customCode: 'f7xq2ws6bn',
                prefix: '43juk',
                image: 'http://placeimg.com/640/480/city',
                sort: 666669,
                administrativeAreas: { "foo" : "bar" },
                latitude: 20437295012270120,
                longitude: 58429710717518776,
                zoom: 61,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Granite Pants',
                slug: 'iste-sapiente-voluptatem',
                administrativeAreaLevel1: 'jskmbdgrznd6lwydiffipli7b8cl0ruow80tgvbjflfiayo10e',
                administrativeAreaLevel2: 'ypqktm1lphpkrkwe5nefz4bb5invutyc47llllovkm0edg6hsr',
                administrativeAreaLevel3: 'oa05wlgb8zuzwt7ydym5gp5ruk3u2ytdjlh5u9vwwjd7w5ajye',
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
                id: '0337102b-fe7e-44cb-8cd8-b1cefa19a5a0',
                iso3166Alpha2: 't7',
                iso3166Numeric: 'gpr',
                customCode: 'ovy2aj4iuu',
                prefix: 'w7bne',
                image: 'http://placeimg.com/640/480/food',
                sort: 494479,
                administrativeAreas: { "foo" : "bar" },
                latitude: 86085860809781340,
                longitude: 21683493649948736,
                zoom: 27,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Fantastic Metal Towels',
                slug: 'ut-optio-natus',
                administrativeAreaLevel1: '099zy36rk6jx1bkl6bbkl2tfhox4kptm18o5wleactpx23j2l0',
                administrativeAreaLevel2: 'om55zicbrxi94dlmfkjb2ipt1n2qdkpnj92zo2qkz6r2073zbw',
                administrativeAreaLevel3: '7mje71o91apg3eycu24qh1zknfnbjgwawug7icst1a6mystipb',
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
                id: '027ed08b-61df-4e5c-bfb8-e04e75778943',
                iso3166Alpha2: '4e',
                iso3166Alpha3: '808',
                customCode: 'tbub3n1iog',
                prefix: 's5lli',
                image: 'http://placeimg.com/640/480/animals',
                sort: 419462,
                administrativeAreas: { "foo" : "bar" },
                latitude: 54191400736684296,
                longitude: 95703882546989300,
                zoom: 52,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Cotton Pizza',
                slug: 'veritatis-voluptatibus-non',
                administrativeAreaLevel1: 'bx9c9rbvtg1z0op5746imnvd90jqpa6494qthwjy5eix1iz6vo',
                administrativeAreaLevel2: 'vmuolbxcj5hpchmtfkxnb528nqk00x9c7zvjephxwcad2rzn05',
                administrativeAreaLevel3: 'e73h489dqmszqzoninpuft43lq183vzsl2sxtggfh5wl6v6aal',
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
                id: '9143d7a8-5833-47d6-b5a9-8ca560bb5416',
                iso3166Alpha2: 'dj',
                iso3166Alpha3: 'dv4',
                iso3166Numeric: 'kdn',
                customCode: 'x6hit0jl6h',
                prefix: 'un6vx',
                image: 'http://placeimg.com/640/480/nature',
                sort: 214719,
                administrativeAreas: { "foo" : "bar" },
                latitude: 41589921135649500,
                longitude: 68312638708768856,
                zoom: 55,
                name: 'Sleek Plastic Gloves',
                slug: 'rerum-omnis-perspiciatis',
                administrativeAreaLevel1: '2x7lb8uhiffm28aoq6avpdfa6vnd8sn8vumky6o7c9b57yltkh',
                administrativeAreaLevel2: 'l51hb5dqtr4vb039s93lons3n4fu344yhwjb6wwrrstboi39bp',
                administrativeAreaLevel3: 'fgzu05ykhtzd0u0uysjcblqfy0uez1osz5xa643jr9l8eu8c5x',
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
                id: '259343ff-37d7-4d6e-a659-f0a58ed6170a',
                iso3166Alpha2: 've',
                iso3166Alpha3: '1cd',
                iso3166Numeric: 'jhj',
                customCode: 'dzbfn7ac05',
                prefix: '4gzfs',
                image: 'http://placeimg.com/640/480/people',
                sort: 470386,
                administrativeAreas: { "foo" : "bar" },
                latitude: 67752973792030480,
                longitude: 40305277652368540,
                zoom: 24,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                slug: 'quis-enim-et',
                administrativeAreaLevel1: 'gahs22vl95bavrjh2vc60otf2p75qpqugsxiu2nfbgs2a2kfga',
                administrativeAreaLevel2: 'mwyhe2n8o2y1qy62oc9ivlzlapspxtxv66r637s97xwowuv0lg',
                administrativeAreaLevel3: 'hzyvyint7ltuictbp1jm5539d42bg44shyl7me89bxx9ngxipy',
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
                id: '6584a183-9d8a-40af-b989-886591a1be66',
                iso3166Alpha2: 'a5',
                iso3166Alpha3: '5sf',
                iso3166Numeric: 'jxh',
                customCode: 'ezxlj27svp',
                prefix: '0cje9',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 631933,
                administrativeAreas: { "foo" : "bar" },
                latitude: 43174557561407580,
                longitude: 89654560720085470,
                zoom: 61,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Rubber Chicken',
                administrativeAreaLevel1: 'eso8dvw0snsoc22x742r6bl0t9vxqghqq0iolr6r144wrwx1ty',
                administrativeAreaLevel2: 'kyyoqb40641556ir72qwlprxrr1id3e4q3jskiemearrnxypwf',
                administrativeAreaLevel3: 'l9wadwsifii1jnybswqx3hnn4mlup3491t6uh3djjfm37eyetn',
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
                id: 'foi4tpmo0kku33rpw68h2rm0kesily0f9g3k1',
                iso3166Alpha2: 'ea',
                iso3166Alpha3: 'g5h',
                iso3166Numeric: '5q4',
                customCode: 'y8pnc57r7c',
                prefix: 'qd2zh',
                image: 'http://placeimg.com/640/480/cats',
                sort: 835244,
                administrativeAreas: { "foo" : "bar" },
                latitude: 98728716032164800,
                longitude: 25987993488362636,
                zoom: 12,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Granite Shirt',
                slug: 'illo-omnis-nostrum',
                administrativeAreaLevel1: 'v7ntvz72rg2oa7jzl47jhgdr1vkxpjfix6sz9ii2u9rw97c2m5',
                administrativeAreaLevel2: 'vftb63ok9jf5w4jr8182qqgl2i7d8smiz37b67fgm0ss2gzt4e',
                administrativeAreaLevel3: 'fqoh2w7m2leuc7ynko53721b3m7go6ztrab8e71knw6y5k86g6',
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
                id: 'f62ea31f-8cbd-4851-aa92-efc36254c7f0',
                iso3166Alpha2: 'd6n',
                iso3166Alpha3: 'tut',
                iso3166Numeric: 'idp',
                customCode: 'oizz6nnxde',
                prefix: 'ku2e5',
                image: 'http://placeimg.com/640/480/people',
                sort: 747518,
                administrativeAreas: { "foo" : "bar" },
                latitude: 56245298166260610,
                longitude: 30679584802890350,
                zoom: 70,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Plastic Car',
                slug: 'consequatur-in-perspiciatis',
                administrativeAreaLevel1: '320x0kdtwy44dmu7ljxdp1z1hfxntm9xy8ru0dvnrbddutpgqy',
                administrativeAreaLevel2: '91jjq7h2iwgonkresh488gq8e8bf41yv1d1ox9r0vz4rpdpgk2',
                administrativeAreaLevel3: 't0pmwlltacpsts3s2fcuso5r0pyymd5txz8382q9hclp4idcez',
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
                id: 'bd2b6e07-e2eb-48e8-88f3-4228afc247dc',
                iso3166Alpha2: 'y3',
                iso3166Alpha3: 'dtgq',
                iso3166Numeric: 'kho',
                customCode: 'hdxqhq8b0v',
                prefix: 'ou9e6',
                image: 'http://placeimg.com/640/480/business',
                sort: 841911,
                administrativeAreas: { "foo" : "bar" },
                latitude: 60312254045237976,
                longitude: 12209671946570028,
                zoom: 60,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Cotton Ball',
                slug: 'voluptatem-itaque-iste',
                administrativeAreaLevel1: 'ks96retlh93o4kmwneq5cw0mjarpapfb17gk5ez2tx0md6r2ml',
                administrativeAreaLevel2: 'dni2sgjmtk6sv274mostrec7afn2j6i5h61cll089970n99klb',
                administrativeAreaLevel3: 'c0a6fpmuj2t28ci8j1i81aa7zup9shs7y7fih0kfz0swmmcrzo',
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
                id: '32978681-0d30-4bc6-91d9-d8b403959473',
                iso3166Alpha2: 'ty',
                iso3166Alpha3: 'srd',
                iso3166Numeric: '653i',
                customCode: '9whr5wxv1g',
                prefix: 'g0jri',
                image: 'http://placeimg.com/640/480/people',
                sort: 477926,
                administrativeAreas: { "foo" : "bar" },
                latitude: 82866790884363180,
                longitude: 10693454537126600,
                zoom: 19,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Metal Ball',
                slug: 'dolorum-accusantium-reprehenderit',
                administrativeAreaLevel1: '6hd5vzd5ojctt3cflosn6hwfktnycbiqz1o395yq724t7w75jp',
                administrativeAreaLevel2: '89xg2enpxixoue112z4fj4f1y0xo105gclumr2h27esw1asoq0',
                administrativeAreaLevel3: 'zbojj1k7o7ft1ccwik4j2c4n3e46hj4rbwtfn1abqaqp4leq68',
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
                id: '931bd81b-f374-480d-b21a-d9ce52ff23c5',
                iso3166Alpha2: 'lq',
                iso3166Alpha3: 'whw',
                iso3166Numeric: 'dug',
                customCode: 'y6isc8rd17',
                prefix: '63qim',
                image: 'http://placeimg.com/640/480/people',
                sort: 332606,
                administrativeAreas: { "foo" : "bar" },
                latitude: 14527894213204564,
                longitude: 64585344204185400,
                zoom: 68,
                langId: 'mswj01eitf7jdmbtb2t1t5qjapfysho8zaezq',
                name: 'Handmade Soft Mouse',
                slug: 'nobis-culpa-tenetur',
                administrativeAreaLevel1: '0ylochwrdh7rgwmd9hcttkinbinf1onv4m8m5022b9wwweqgf4',
                administrativeAreaLevel2: 'jbac7cypwlycu7ewoxwojxwuv1ilnd2vmym7vwdcknm528x5vu',
                administrativeAreaLevel3: 'vcdzrnn81c56hj91r00sw24o70xcj4frz21pjbw6jw6mszc92h',
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
                id: 'f8bdcb0b-7b12-4d5a-94ca-608b7d468a85',
                iso3166Alpha2: '3z',
                iso3166Alpha3: 'x10',
                iso3166Numeric: 'a30',
                customCode: 'omd7fsdqpam',
                prefix: '61w0s',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 888366,
                administrativeAreas: { "foo" : "bar" },
                latitude: 94547173246761360,
                longitude: 42612789499382930,
                zoom: 67,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Steel Ball',
                slug: 'laudantium-cum-voluptatibus',
                administrativeAreaLevel1: 'kjqoe7dx2il85gn3x459i92c3b7ruxm57lun8g27s1i2gzxnd9',
                administrativeAreaLevel2: '4ukjuvhasz557g7l7vfj734bxc028fb3vabonrwaou96nsj6dy',
                administrativeAreaLevel3: 'hdjz1wzz2dzkg4z9zicxu2hwh7shc90t3b4ix4dukdtrfjmbnn',
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
                id: 'b61553e1-8d59-4460-a3f0-abc6525faeb6',
                iso3166Alpha2: 'nb',
                iso3166Alpha3: '0p8',
                iso3166Numeric: 'qzt',
                customCode: '3b9y3ntc8n',
                prefix: 'rgie2y',
                image: 'http://placeimg.com/640/480/technics',
                sort: 862697,
                administrativeAreas: { "foo" : "bar" },
                latitude: 14621118509324292,
                longitude: 43991889211176990,
                zoom: 54,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Soft Salad',
                slug: 'consequuntur-culpa-sint',
                administrativeAreaLevel1: '9gjexncjju65wot8s1phf45ertq7f67j8zng0wne11r2hf4ql5',
                administrativeAreaLevel2: '6y7ikmozptl0uynow8kaq3w56026xwm879b4xszvymv7iwlusx',
                administrativeAreaLevel3: '9o6eaz7b0glou8d5uakg4zcgtc0a1p31qouxxq26zd1gjdsfea',
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
                id: 'e5ec218d-d67f-4368-a0e6-c01996065215',
                iso3166Alpha2: 'bh',
                iso3166Alpha3: '4vz',
                iso3166Numeric: 'jie',
                customCode: 'poifoaqi92',
                prefix: 'b01xf',
                image: 'd7ulobw7gxya64ytndzus1hk54zdu846fcf650v9h50hg3rhqxrfzl7wtmhlooej93pe5j2u78y1dk69njtjnfbkp8sak6r21s1y468nz493ptkp0eh5wa9rotj0slmk7jclw7sqssxz9k1v3r6mrszx7wz37bl3g3w3lgw5xez0w98qkegvkdzzznggrkwn6823l2dk4bil2n2sr8vi96aah38rjmrejmysanm7jjbs50ne61hk8b1kkpqtmkbpz6si8v7eaq2n7vrhbuev7ne0iu5kzr4lniqf4lypli7jsnvv29ljxn32adlb2gmu35lbkd5xwwmuifyrbiid4e55xs4apn0800y1279pearri6tjzokpvhgjo7tk3nfohxmdlycxfqtj168zqe8wmngi2ghqegvgdztstn5ls7gkoljgu7tfau8d3t73exc7ptax4x1t4me032abh9yz6zcpelcudrnpr7jxe9cfk5sc5numyf1issy8nwkl4mwbpkd7isbosoz9wkb0i3cgv1fsfah5vfixnyn5ewpaqaoz725k475q6ygi9qgyj8tzredyk12g317r259aezhjypscsy57ud9jdukd80nz2l8qd01siy1onekdipyi11cha38si3232yfnn39y1v7yfck14mizv901l7bzduksygdlomli9vfbucmtxq8lgzz2p5b3ppibccluqi1184tsnhv6bnu0hzq59949mirhrotphk7fnolszl3xitmqfkkj7b4gu9sf1vsc5ub86xq11ij5ozau959uco3jsw0l13uh518fim8mmg8dmjuttmlq82hnrzknp75icafesy7lmkw1lhhwvty4dczb1wig9ksdyhxmoztexi1rbwbf3buabn4rc7bq85ge1u1xax3m8wd6ivx712i9mejminfhe868kymxtyi2kxaiolmwtjbo0fo1kbcqe7evf1mjsulrdfem4bp8lb06wu6bpvsam83a4lv85r8yuguhkgyix6auj',
                sort: 659268,
                administrativeAreas: { "foo" : "bar" },
                latitude: 88295539848637330,
                longitude: 75302058127970050,
                zoom: 25,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Rubber Pants',
                slug: 'cumque-nobis-commodi',
                administrativeAreaLevel1: 'v5uqrgakxe6silind5hvp7vfts7cm2neflfvlpho42k3qwb1xv',
                administrativeAreaLevel2: 'wyuiy3ib2mzkx26lhoeuvzii4b15y45aqtsltcvbs1hfsnaqe0',
                administrativeAreaLevel3: '58imv0tm3mqitko2zryzx51qal61nla2ffajwehiphou9whzgk',
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
                id: 'c1228c32-af4d-4276-a9fe-41569a542e05',
                iso3166Alpha2: '5r',
                iso3166Alpha3: 'xyt',
                iso3166Numeric: '2aj',
                customCode: 'at9gfzczm7',
                prefix: 'zido4',
                image: 'http://placeimg.com/640/480/food',
                sort: 6828307,
                administrativeAreas: { "foo" : "bar" },
                latitude: 56300281735417780,
                longitude: 29724472842119936,
                zoom: 53,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Metal Soap',
                slug: 'delectus-esse-similique',
                administrativeAreaLevel1: 'dqdzw3qtkkqjtbw9eov87wwqkw4nu88sblzfk9xc9zl1tq7iw6',
                administrativeAreaLevel2: 'fpj4omxmjs3nf1rhcusjpmabm5nlmkibop64bvs8t054zve6m1',
                administrativeAreaLevel3: 'pwdmflblnuqoddbw5puc2al7nc5v367p2dvrl1pakaziz8u9jc',
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
                id: '7d194fc5-73e4-42a0-81c6-e7dbe0d2112d',
                iso3166Alpha2: 'qd',
                iso3166Alpha3: 'tso',
                iso3166Numeric: 'ezt',
                customCode: '450b9gzb3a',
                prefix: 'k2040',
                image: 'http://placeimg.com/640/480/city',
                sort: 622708,
                administrativeAreas: { "foo" : "bar" },
                latitude: 498059837960890750,
                longitude: 66231229666476150,
                zoom: 71,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Rubber Chair',
                slug: 'quos-et-et',
                administrativeAreaLevel1: 'sdxmenyim9jg1ss0o7hs5jmmpnc3zs1qutkkea5wpk69m9pfm0',
                administrativeAreaLevel2: '6m36ma3hymro318w08yw7gndu62utas9bvdrrjmwr2ofzo8hhp',
                administrativeAreaLevel3: 'jnex6lbe7jtcaq774dqde408ixjkj3a9g428zd974omgphwde8',
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
                id: '512aed0e-2bd8-4716-8b5f-72a7a95eb183',
                iso3166Alpha2: 'q2',
                iso3166Alpha3: '3rg',
                iso3166Numeric: 'xog',
                customCode: 'ea9zhfnym6',
                prefix: 'fzl4f',
                image: 'http://placeimg.com/640/480/business',
                sort: 285686,
                administrativeAreas: { "foo" : "bar" },
                latitude: 23927205495310960,
                longitude: 248503315681767780,
                zoom: 37,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Frozen Tuna',
                slug: 'recusandae-cumque-omnis',
                administrativeAreaLevel1: 'th9wd9tfiwkpvl6y5lpsv7hfkvufvt9zkqjlmwy2la0cjhi73j',
                administrativeAreaLevel2: 'zkt0yy5fu9kzi1mf2vcjjy9wv4bymjvwm51i0wizhiofdxl3iy',
                administrativeAreaLevel3: '8b849swlwe37blt6c0ye14f8vaful03mottodoavrbqym04ph9',
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
                id: 'd8ecf6e3-cdb5-4e7f-a38d-2385bde138c2',
                iso3166Alpha2: 'kl',
                iso3166Alpha3: 'xgt',
                iso3166Numeric: 'n1v',
                customCode: '2tzna0i242',
                prefix: '1iojz',
                image: 'http://placeimg.com/640/480/animals',
                sort: 129287,
                administrativeAreas: { "foo" : "bar" },
                latitude: 54305203034986410,
                longitude: 97792826961897280,
                zoom: 410,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Concrete Salad',
                slug: 'eos-voluptatem-vel',
                administrativeAreaLevel1: 'tkeduxyktca4t6hvb4pq204kpu41z9ujqls60e0njwvz1yznad',
                administrativeAreaLevel2: 'nk50ut5erv79ua9aqha0oqenpdi8cu4eu3igzrzz1922ngk7f7',
                administrativeAreaLevel3: 'll5rm8j5w9r69x6by29xna7iig1t6utazn0rviw7b4cmkw87fj',
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
                id: '9d15c737-8e5e-437c-9cd9-e8a5c7974c24',
                iso3166Alpha2: 'x0',
                iso3166Alpha3: 'fle',
                iso3166Numeric: 'zox',
                customCode: 'qg2gpvib5l',
                prefix: 'nhnsz',
                image: 'http://placeimg.com/640/480/cats',
                sort: 568811,
                administrativeAreas: { "foo" : "bar" },
                latitude: 34306345407559236,
                longitude: 59862687266997770,
                zoom: 64,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Cotton Shoes',
                slug: 'tjyapse2hkf86sp6si7xlkf5f258vamph21pr5magfrcrpgy86bbtz5o08ye7urw301qmsgaqzqouoo4cg68lvccw31ideu30h76adsq1i2mchkq0uu99frvssn8g8uzeb6ofb4rth9rd1bx8c4caznn0zvxehywio4mpqn8ik5l6pa7d1zm8h66rylq7lwdpcc3nym32rmv77d20hddv39lchg20immquaxtrnhascqoocjkh09a5jzzflmk85l5cr9v4s1owlcq4hq64md9388qd1ewoh4ugqgeol37ng17u8f5eh6530976dw1teungo3pi7sjbh1ukp4xwffqnfk4iu82dbknr4wd8bfkw4sl6mjc1hyrokrw7mnomlkg47zd49cm78p1nk4tj0epis47ffljcks04h4e2mus8w360tkhprtf9gs122zanyt8693qi81k4615u509s2kaen4dfi5r3xd0qhfi060ao34e6gtsz6f0u2nk2zz0wgd2zn6yiuspg0yk0f4es5lmsewzxxl9ozgn1vmyuzdbwz5mnf1q4ltvxklczlz5snbrwjx6q1fbtonxrnu7foevwliyp0sy2n220gd2bk2dp20fdo2bdraro6pjt8k9kp5fhukht3f78ed32y52931eo5q5njlt3m8buckjcedrlvvtzug9wi0fswkiu03o8n4h0rrfvwawilenudydezfygqeeow8mj8970jbx4r59198l3qw9suc5d8eaj4db4qd5qm80jpbut09wrb0499zeemysqodk9opppgkwls1vbhxi6f7td5gkhg9h0ljzgnkoad1a4guc2nnx0b7r4ovvf55wqek4j1uom2sensvz3r18fb01hp7oc3339obj1ohvm997rjt83w3x1vnnu1a8w2h3d8o207c0tikqx9r9id5jpmjr1udiiuamev4e0kah118391zxvapl9kxx41b837evi7x2idc1mk3t5xrf4nf59jasaktzar75e36detik',
                administrativeAreaLevel1: 'qtx0gqls9yuzwve9apcnbkcmfdxvm4rnceoln3v32595sa2bag',
                administrativeAreaLevel2: 'nzoak3d12r8obwta2eufzdgsq0c2rsedpb0qdpqhs1bqdaztvd',
                administrativeAreaLevel3: 'jpkh8nzadlwp8la5bdchvtm3crirf6dn20s4fn312t9nndwzkh',
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
                id: '97567ccf-a660-4c4b-bbce-57c317efc8fd',
                iso3166Alpha2: 'k1',
                iso3166Alpha3: 'gv1',
                iso3166Numeric: 'ko7',
                customCode: 'yd43di9umb',
                prefix: 'bnwjg',
                image: 'http://placeimg.com/640/480/cats',
                sort: 779936,
                administrativeAreas: { "foo" : "bar" },
                latitude: 68663354981162450,
                longitude: 21645532229065970,
                zoom: 18,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Gorgeous Granite Tuna',
                slug: 'ipsum-ipsum-quia',
                administrativeAreaLevel1: 'i81mn8b6bzf1r64s4wh6bd2huec0iqfbynss0vgqljoclen9e33',
                administrativeAreaLevel2: 'owd5w4y1w9sovr87wfhv8xj9ds5aq71dw2np44xk4l868pwf5h',
                administrativeAreaLevel3: 'pp25izzzrj5ng9gvd9uunhq3kcf3z2e1bcb6ha86djqgjpj6r8',
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
                id: '4acf46e6-b4bd-4c40-8f0c-34a8fcd70c0a',
                iso3166Alpha2: '44',
                iso3166Alpha3: 'thc',
                iso3166Numeric: 'v4x',
                customCode: '5c4it4u4zx',
                prefix: 'zf5tg',
                image: 'http://placeimg.com/640/480/people',
                sort: 970786,
                administrativeAreas: { "foo" : "bar" },
                latitude: 10884505928596492,
                longitude: 11692408924151534,
                zoom: 96,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Plastic Towels',
                slug: 'odit-inventore-suscipit',
                administrativeAreaLevel1: 'a0x5te6m7b84cz5fjvtyil3c4b7bt8fdhuo2j79ir2dlpm9dkl',
                administrativeAreaLevel2: '1xxs4v6xj59hynkucjijeppdyy7o5qjz8in68cex63kv3s3zmir',
                administrativeAreaLevel3: '45ra69wtnff9snlotsdmryjmsn938c52xm5c30fapqn8b13fhx',
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
                id: '12c70e49-0475-4cfe-bf2b-08094e574a53',
                iso3166Alpha2: 'jw',
                iso3166Alpha3: '8m2',
                iso3166Numeric: '7wi',
                customCode: 'ak0n6iqvez',
                prefix: '07cpq',
                image: 'http://placeimg.com/640/480/sports',
                sort: 616552,
                administrativeAreas: { "foo" : "bar" },
                latitude: 22917843194253428,
                longitude: 78630416545224460,
                zoom: 65,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Plastic Salad',
                slug: 'voluptatibus-animi-amet',
                administrativeAreaLevel1: 'cx6j6xui8otj60tj518fj66bhivtz94w9l9jowdhlpqy08kx2n',
                administrativeAreaLevel2: 'wr202rhvf7g160ylspqb9sxo2ool5es6i45ahhd5tcfraeqzex',
                administrativeAreaLevel3: 'hnkqobbu6vkjcs28joy24kym00x1dgdzfj3umqpknzpdj36imz6',
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
                id: '0ed455c4-ec57-48e5-88cb-786e50102e00',
                iso3166Alpha2: 'v5',
                iso3166Alpha3: 'i6r',
                iso3166Numeric: '2ve',
                customCode: 'cjfkf8tr94',
                prefix: 'ovdch',
                image: 'http://placeimg.com/640/480/nature',
                sort: 600712,
                administrativeAreas: { "foo" : "bar" },
                latitude: 79873002126482560,
                longitude: 58138364265639544,
                zoom: -9,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Concrete Gloves',
                slug: 'explicabo-minima-tempore',
                administrativeAreaLevel1: 'mjpvg42ed0eivg7zukiuhyehazaekautv8osxc4wvm3evz3l4o',
                administrativeAreaLevel2: 'e31z8xs2e37wb6xjzxpci5qi645obokzxbaq5srnnexjltblgq',
                administrativeAreaLevel3: 'znnrj04iylxvisujgbwprnpq0dbjciqj7rzrsp4znnlaihrv5g',
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
                        id: 'a03c5459-065c-4fb5-80e3-a84696d51979'
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
                iso3166Alpha2: 'i4',
                iso3166Alpha3: '59k',
                iso3166Numeric: 'xai',
                customCode: '2q8q1m4890',
                prefix: 'flc99',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 156155,
                administrativeAreas: { "foo" : "bar" },
                latitude: 24084544364106812,
                longitude: 67269073340718280,
                zoom: 63,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Soft Keyboard',
                slug: 'aut-adipisci-necessitatibus',
                administrativeAreaLevel1: '55aynopsu3z3yvo0q3zwml7m2d7vsn04mcap0bltbwe380ltad',
                administrativeAreaLevel2: 'ztiezgaen7b2r4u39hps13dlmh2glgrfkj7usrd1vdx84ybfp2',
                administrativeAreaLevel3: '1ix3n3oocditcp20qef05nfh486vf61rdejddlvoqvjldqbq0l',
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
            .get('/common/country/3c5e62e2-03d3-472d-a77f-270849202f74')
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
                id: '762c62e3-75c9-4944-9398-5f42f30f2ec5',
                iso3166Alpha2: 'p5',
                iso3166Alpha3: '776',
                iso3166Numeric: '5j9',
                customCode: 'mj1kxncu03',
                prefix: 'v66dp',
                image: 'http://placeimg.com/640/480/food',
                sort: 842792,
                administrativeAreas: { "foo" : "bar" },
                latitude: 32472217505976348,
                longitude: 11069793016507850,
                zoom: 72,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Soft Mouse',
                slug: 'expedita-debitis-quo',
                administrativeAreaLevel1: 'fzcr92u314qij3o05bdu1x1dh0osmqpues80xj21jej564u4qw',
                administrativeAreaLevel2: 'nomthdwp5ezg6t4jazpqoaa7k35v8t4lhe00d15zlgvdarfhuj',
                administrativeAreaLevel3: 'pndv7m9zs3tadbsve1drv2z5axejzalhwycnz5em7mwfuef7la',
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
                iso3166Alpha2: 'mv',
                iso3166Alpha3: 'xpq',
                iso3166Numeric: 'jb5',
                customCode: 'cpk9vqvli6',
                prefix: '56te4',
                image: 'http://placeimg.com/640/480/food',
                sort: 804583,
                administrativeAreas: { "foo" : "bar" },
                latitude: 94748540931220020,
                longitude: 57751943711042690,
                zoom: 15,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Fresh Ball',
                slug: 'minus-quaerat-officiis',
                administrativeAreaLevel1: 'yqmcmo9bh3oa05rix9gy2nfkvbmrd89fn4ye9setb6kmfvwlfc',
                administrativeAreaLevel2: 'fnth9dwbv2tolq9giyc0m0qpw1g6tzayhivun805eqiwj40eqv',
                administrativeAreaLevel3: 'wyur3lmb2c2yg4tyrycey7exayrkd6m4da08pja24e0h3fcj6j',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/d4dcd9a2-3b6d-4b57-a5a1-34bda583368f')
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
                        iso3166Alpha2: 'ib',
                        iso3166Alpha3: 'oqv',
                        iso3166Numeric: '5lv',
                        customCode: 'zdzxknydea',
                        prefix: 'beagu',
                        image: 'http://placeimg.com/640/480/transport',
                        sort: 856640,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 23293520186808324,
                        longitude: 13005286220198544,
                        zoom: 25,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Refined Granite Computer',
                        slug: 'sed-omnis-pariatur',
                        administrativeAreaLevel1: 'u6t1l12it5y5der61us2zym15jxmlyncbov5urpmutgiuuaxc7',
                        administrativeAreaLevel2: 'cye3uyfmfpc64281s99khmsl7sv232iz9tis2bkhxzjd0vh5n0',
                        administrativeAreaLevel3: 'ezcfwkjutna9qknygbsitroyuuv8r88hnkpr4az2oqz3zm3egk',
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
                            id: '5d4e6bef-a3fc-4ed5-890d-e6ff9b97c132'
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
                    id: '0cc5e631-b414-42c2-8acf-c594f2b8ad6a'
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
                        id: '0fe09b09-4548-4412-8b05-a5aa485732fb',
                        iso3166Alpha2: 'om',
                        iso3166Alpha3: 'hxg',
                        iso3166Numeric: 'eun',
                        customCode: 'xww58j6fht',
                        prefix: 'h2ljv',
                        image: 'http://placeimg.com/640/480/business',
                        sort: 818220,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 94523176917588110,
                        longitude: 80046671424427090,
                        zoom: 57,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Unbranded Fresh Bike',
                        slug: 'libero-dolores-voluptas',
                        administrativeAreaLevel1: 'ya34vnewyp8h9y5ad3ywlo72z1ryuhtujfgs8n4yrqjli6qhct',
                        administrativeAreaLevel2: 'sr0uazah8i7xbcbmp7tr1opmj0tapx3yp7l9nd2ywps4aq5fov',
                        administrativeAreaLevel3: 'd2u4x1n31j8bzm2ae8ovkcufkwivhr323o0n48ym90nzw5pnyd',
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
                        iso3166Alpha2: 'cu',
                        iso3166Alpha3: '0f9',
                        iso3166Numeric: '1z6',
                        customCode: 'it24ex9tnb',
                        prefix: 'cff4r',
                        image: 'http://placeimg.com/640/480/sports',
                        sort: 590178,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 23991723648533930,
                        longitude: 86942131716255140,
                        zoom: 12,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Small Metal Car',
                        slug: 'qui-natus-qui',
                        administrativeAreaLevel1: '648netcb32ai8f3504axijur9tn0r4qe5vtualgp254l1fhn59',
                        administrativeAreaLevel2: '1bcs9358rd6nr1g6sn0bps57ukiy91mesxb898x0o8pektsvgy',
                        administrativeAreaLevel3: 'v0ui90guibuia52sc6rk33rvpgq4jpds36r60wdwzvsqml8hh4',
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
                    id: 'd4408e50-2aff-423a-9708-6065f5d4efd1'
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