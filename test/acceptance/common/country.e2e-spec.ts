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
                iso3166Alpha2: 'a8',
                iso3166Alpha3: '8st',
                iso3166Numeric: '7j7',
                customCode: 'na1tsnh978',
                prefix: 'zzypb',
                image: 'http://placeimg.com/640/480/city',
                sort: 488454,
                administrativeAreas: { "foo" : "bar" },
                latitude: 41457639214782110,
                longitude: 62347714616795150,
                zoom: 96,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Wooden Salad',
                slug: 'alias-iste-velit',
                administrativeAreaLevel1: 'awgebwo62g1hwdin071zjm79svdg84juau6a4tgl7dnxa6y7z3',
                administrativeAreaLevel2: '55jouhjgtvh75hj6hyqtogscgy37igsqorwb1u1zr9hkfl2lrj',
                administrativeAreaLevel3: '7a0z8mamy691bxqvngr3va7vta7uf90hlz4c9u6nqx8no26ezb',
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
                id: '0bf13bd9-b219-4503-acc0-3de6ce1b745d',
                iso3166Alpha2: null,
                iso3166Alpha3: 'd2v',
                iso3166Numeric: '43x',
                customCode: 'gxtpzvynb2',
                prefix: 'p1jef',
                image: 'http://placeimg.com/640/480/city',
                sort: 383041,
                administrativeAreas: { "foo" : "bar" },
                latitude: 33077961265090348,
                longitude: 34000281097717496,
                zoom: 49,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Frozen Towels',
                slug: 'odio-numquam-dolore',
                administrativeAreaLevel1: 'b7yfcmdo1kg3t99ouqduvlm0bi1uryuofotp8fe9zrq2i6vyte',
                administrativeAreaLevel2: '3yhe89gcgljekbrql5f5uejv57x3ro626n9koj78knmq1f2lc8',
                administrativeAreaLevel3: '6istavw3qsc55u3515xnwl6khlkng8yg6eyd23gisb9sa05ub6',
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
                id: '299ba0c5-2049-4bad-a381-67fe1c727b1c',
                iso3166Alpha2: 'g7',
                iso3166Alpha3: null,
                iso3166Numeric: 'a60',
                customCode: 'erwo8my308',
                prefix: 'r3oln',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 893512,
                administrativeAreas: { "foo" : "bar" },
                latitude: 47194406696869880,
                longitude: 98853167420891660,
                zoom: 62,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Plastic Chips',
                slug: 'est-magni-accusamus',
                administrativeAreaLevel1: 'kuytv4hzo1o9k5tivltt63tbq67kkfvna7yu4d91db9il0r4ap',
                administrativeAreaLevel2: 'niuh62d6uimxq7m4ma7sarbf5wc8yzwa6vnhb0q88yjzs8btvo',
                administrativeAreaLevel3: 'fmpfknu81dfquxe9gqot6c87dhgq1jkp17q7pn4orql6l5d98j',
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
                id: '4cd3845f-b2b3-44c9-8834-b4e5c76fc64b',
                iso3166Alpha2: 'uf',
                iso3166Alpha3: 'q2j',
                iso3166Numeric: null,
                customCode: 'eu8duk9rym',
                prefix: '20uac',
                image: 'http://placeimg.com/640/480/food',
                sort: 520246,
                administrativeAreas: { "foo" : "bar" },
                latitude: 58789665317276110,
                longitude: 91824584926696830,
                zoom: 41,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Concrete Bacon',
                slug: 'sed-quod-doloribus',
                administrativeAreaLevel1: '3k98jp685b1khevorv6bpkndzr4mlf536yp3bgw0kh36cgpy9c',
                administrativeAreaLevel2: 'hi90moo4fr7oy57h3a7egd6heqv2jzwvb80hx5ra4qtn6shvw3',
                administrativeAreaLevel3: 'r7fswkikijbz130zjp7zxvce05wte8n8gt24pu9i9iyqwwl1eg',
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
                id: '0c1444c1-441d-4f87-bf24-aa531172d298',
                iso3166Alpha2: 'u9',
                iso3166Alpha3: 'vky',
                iso3166Numeric: 'syk',
                customCode: 'gogn3iziro',
                prefix: 'ki7wf',
                image: 'http://placeimg.com/640/480/business',
                sort: 425471,
                administrativeAreas: { "foo" : "bar" },
                latitude: 50284778135327110,
                longitude: 79584719293351170,
                zoom: 96,
                langId: null,
                name: 'Unbranded Cotton Shoes',
                slug: 'ipsam-aperiam-non',
                administrativeAreaLevel1: 'ws2xs548uupzv05a78lyo6kiavxc9qzyuk2zv14pnivifztbxl',
                administrativeAreaLevel2: 'r20lz7wshzluaoyz228gqzbi4tri1usm8y6trxawhbk2ejc97d',
                administrativeAreaLevel3: 'jlgc93s4yzj50huimcq4qab9s51u8oxcrkvf2osshplpjdgtx3',
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
                id: 'a59f0ea0-bb6e-47a4-b461-773ad860dcd6',
                iso3166Alpha2: '6u',
                iso3166Alpha3: '3yb',
                iso3166Numeric: '4ir',
                customCode: 'xcbf9158eg',
                prefix: 'wmfl1',
                image: 'http://placeimg.com/640/480/city',
                sort: 937541,
                administrativeAreas: { "foo" : "bar" },
                latitude: 26139004072301870,
                longitude: 67435250752324150,
                zoom: 73,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: null,
                slug: 'cum-illum-illum',
                administrativeAreaLevel1: 'gatcxkzti321brqp2gs2e3mvm59join3vjx890h6dgicwwai4a',
                administrativeAreaLevel2: '4enhs6ojybxq0xt5z86g6p6w2kexo7vckoerkwdwzqj35ybhqm',
                administrativeAreaLevel3: 'edijeej2zhb3u86qcrdmqiq9e3ieimt6n6go7hwvta7yrz34kg',
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
                id: '1650b661-2476-44b7-9ba6-150983d50f3a',
                iso3166Alpha2: 'zb',
                iso3166Alpha3: '2hk',
                iso3166Numeric: 'uel',
                customCode: 'k4fxkmckqn',
                prefix: '99q7q',
                image: 'http://placeimg.com/640/480/people',
                sort: 972634,
                administrativeAreas: { "foo" : "bar" },
                latitude: 95192523846319520,
                longitude: 63318631109886290,
                zoom: 98,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Steel Chips',
                slug: null,
                administrativeAreaLevel1: 'vuos5bdihyyutbz3ck0wsjk1gjwjkt3fdxk7yrrbxtza98gld3',
                administrativeAreaLevel2: 'ycm7xthtw1mkxmy81rrc57uwpmi7p1l0c2nvhhwz4x3sdkw34b',
                administrativeAreaLevel3: 'l59jw9uwohzff11r9vhfau7n5wpws9qw7doyk5bo8a1q35bz6a',
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
                iso3166Alpha2: 'y9',
                iso3166Alpha3: 'zis',
                iso3166Numeric: 'ros',
                customCode: 'h7b2f93i3g',
                prefix: 'zo3yn',
                image: 'http://placeimg.com/640/480/transport',
                sort: 840164,
                administrativeAreas: { "foo" : "bar" },
                latitude: 28639122188811916,
                longitude: 29412442848812676,
                zoom: 36,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Fresh Chair',
                slug: 'omnis-reprehenderit-doloribus',
                administrativeAreaLevel1: 'uth92tsxlthwbyxuepjhoop2h12ketoau5dlybvatd04olphgr',
                administrativeAreaLevel2: 'cdpdf17sv08e4n2idiyo77jup1juhlld3li9l1d72ztwliz8bs',
                administrativeAreaLevel3: '7iqe4vv8okf858x7ffzz6oc2rw5z0edojvb6m49yz5i53315zl',
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
                id: '436c3c2a-aa21-4101-87f3-4ea4df78f8ec',
                iso3166Alpha3: 'yev',
                iso3166Numeric: 'g3x',
                customCode: 'olxrxrzqgk',
                prefix: 'oleed',
                image: 'http://placeimg.com/640/480/technics',
                sort: 329566,
                administrativeAreas: { "foo" : "bar" },
                latitude: 44029522838170540,
                longitude: 17174138899120580,
                zoom: 15,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Granite Pants',
                slug: 'debitis-deleniti-eveniet',
                administrativeAreaLevel1: 'zwiarl8y6bkvrx2umxuvvm7l1iusfqs8o3zgw5m7t4tcja9yft',
                administrativeAreaLevel2: '6ortyxwptrxttfjbtwa40yowmj9bp4ut3si1dmwygdux94sero',
                administrativeAreaLevel3: '3j3f0be7whlegzys735xog93z2u7jwioxiuzq9faryz6mc77fq',
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
                id: '83715b35-bf88-4f24-9fd0-f71c348ec6c5',
                iso3166Alpha2: 'ej',
                iso3166Numeric: 'r44',
                customCode: 'zspbyiahsh',
                prefix: '2y7fv',
                image: 'http://placeimg.com/640/480/transport',
                sort: 210624,
                administrativeAreas: { "foo" : "bar" },
                latitude: 31120799279648660,
                longitude: 65684855752741320,
                zoom: 99,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Fresh Chips',
                slug: 'quisquam-totam-blanditiis',
                administrativeAreaLevel1: '0uc4fghc3mgg98xwjgpzfhtg0kx1q2pmfmmzjf3hjtd0f9kp9i',
                administrativeAreaLevel2: 'bp6zyi5r3t4no4745ufh15sby67cshr1hhtfcv933c851h1bv6',
                administrativeAreaLevel3: 'b30bkghrgdxobxmc82qzq9zossamm4e46psyguezo1w3nmnf3r',
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
                id: '887fa6a0-0515-48c1-b11f-1a3559e7d953',
                iso3166Alpha2: '5j',
                iso3166Alpha3: 'a9a',
                customCode: 'l3rfxm7e1q',
                prefix: 'nnkyu',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 150377,
                administrativeAreas: { "foo" : "bar" },
                latitude: 74864153384413500,
                longitude: 80669346445092000,
                zoom: 34,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Wooden Chicken',
                slug: 'voluptatem-vel-enim',
                administrativeAreaLevel1: 'p2olkxmi2j8cuf78xkega6ece891abgsrfn51wippql3chin7e',
                administrativeAreaLevel2: '4q04vfeejo42wnd96vulvwlnavjxg3iu9oah5mwb2905jy0zn1',
                administrativeAreaLevel3: '7vzes8y1p8mm9o3jij5myclqnyhbbusrgzjqtw447br6f3rmvl',
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
                id: '01915afd-2daa-4eb3-8fe2-05ec76de4a09',
                iso3166Alpha2: '9h',
                iso3166Alpha3: '5t5',
                iso3166Numeric: 'kph',
                customCode: 'eas843mskq',
                prefix: 'fmqzh',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 521517,
                administrativeAreas: { "foo" : "bar" },
                latitude: 22781928564886580,
                longitude: 98727964381087090,
                zoom: 39,
                name: 'Small Soft Towels',
                slug: 'quis-porro-et',
                administrativeAreaLevel1: 'bjdeupd4fpim7s6r9l3rh65zmfjffiope272sp3mkds2pwi5wb',
                administrativeAreaLevel2: 'lv1y3xsibo5pr1aiprz1lbworf6xliom3lmscbin6txdzrryi9',
                administrativeAreaLevel3: '04130grcznn8cbynaz1dmybgucis1xl53mjea62ybmlsmsf4ui',
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
                id: 'd9af5599-56ce-457c-881c-a261f2683b3e',
                iso3166Alpha2: 'ym',
                iso3166Alpha3: '8fl',
                iso3166Numeric: '99s',
                customCode: 'mndtjt7cmn',
                prefix: 'd8tj5',
                image: 'http://placeimg.com/640/480/animals',
                sort: 978219,
                administrativeAreas: { "foo" : "bar" },
                latitude: 78412867399130220,
                longitude: 22560742946381844,
                zoom: 50,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                slug: 'et-cupiditate-aperiam',
                administrativeAreaLevel1: '2d0bbrzuypvu7jmughh7lhy44aa383jeactd9j6k5aychi6n5y',
                administrativeAreaLevel2: '5jhaqcdcjqrem6p1mh5bcrp5f9a9m9rx4yr71t8kq2dgiih74v',
                administrativeAreaLevel3: 'nz6lz2q0vhwqkgmbr5n84lm78i3ckj017ru3tpu0mhhcro8zga',
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
                id: 'adbc9c71-badb-4c30-8b72-45fd539005fc',
                iso3166Alpha2: 'jc',
                iso3166Alpha3: 'vlx',
                iso3166Numeric: 'd6j',
                customCode: 'bfkov46siu',
                prefix: 'hpdo4',
                image: 'http://placeimg.com/640/480/technics',
                sort: 558213,
                administrativeAreas: { "foo" : "bar" },
                latitude: 90141015965516540,
                longitude: 20626005513871068,
                zoom: 76,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Soft Pants',
                administrativeAreaLevel1: 'yi7nlz0hxznbfvv95dvnpo2z5eut8q7bl3rlxm70ityoled3gv',
                administrativeAreaLevel2: 'jtthnypvjv57mh1r112jj03v1ux1vy2l7gqw0kpqilke85eap9',
                administrativeAreaLevel3: 'xpky4r3jdt7ndx1dduymt77pfharnpp3esbsd46e8v0ddev6cc',
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
                id: 'xzvbb8l3eo7o9bzfc8qettp276jpxxbbf9maq',
                iso3166Alpha2: 'xh',
                iso3166Alpha3: 'ofl',
                iso3166Numeric: 'j9z',
                customCode: '0uonla9dt6',
                prefix: 'ajmhf',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 352681,
                administrativeAreas: { "foo" : "bar" },
                latitude: 20805900178121490,
                longitude: 79707711452085570,
                zoom: 41,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Cotton Bacon',
                slug: 'voluptas-eius-repellendus',
                administrativeAreaLevel1: 'amawuiga512ah9ou3o2yxp7j07v7z2wkz2zv54qsy0xksexuk1',
                administrativeAreaLevel2: 'vlx9rb75g5e5xx6hesgojqv5tjmnwxlas90d9o3rbptvxfyiro',
                administrativeAreaLevel3: 'hqo0dnqdifwk3kx2ug5xccy04zu5k3mueavzx34h1hmzv8x54t',
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
                id: '6a4ba936-69c6-4e92-b054-3fefd8e0a820',
                iso3166Alpha2: '619',
                iso3166Alpha3: 'yhg',
                iso3166Numeric: 'bv4',
                customCode: 'ho099v0mw8',
                prefix: 'rh7b0',
                image: 'http://placeimg.com/640/480/food',
                sort: 929452,
                administrativeAreas: { "foo" : "bar" },
                latitude: 17492232146827362,
                longitude: 48793267126979480,
                zoom: 15,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Cotton Tuna',
                slug: 'itaque-aut-blanditiis',
                administrativeAreaLevel1: 'nwwhqti2rz5g4uuc2hgwlwcjy0jrjh1ga5zhfow3zfnpqcea0r',
                administrativeAreaLevel2: 'zk15hqqirukvc95ogowzo30yh4zzk2feq846mq9huavw2gahvx',
                administrativeAreaLevel3: '5hwsds9kih05ib66znk32an652xn309cvabf654m2p3h3p8fca',
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
                id: '092587eb-5a0b-46bf-b311-bba6aee54fe9',
                iso3166Alpha2: 'mj',
                iso3166Alpha3: '06wb',
                iso3166Numeric: '2nz',
                customCode: 'e1a5oaa1bd',
                prefix: 'mfu4l',
                image: 'http://placeimg.com/640/480/technics',
                sort: 185194,
                administrativeAreas: { "foo" : "bar" },
                latitude: 99316808796802960,
                longitude: 62637337520363010,
                zoom: 34,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Steel Tuna',
                slug: 'praesentium-nobis-ut',
                administrativeAreaLevel1: 'ac8469tuc121cl3x7sf8i2khnesoeuemcelpvgmp13s1gn58df',
                administrativeAreaLevel2: 'fulkw7xrbcdzwiolu4bxh1lv053nf9919b04c7xjvaknmb7voc',
                administrativeAreaLevel3: 'du3vyeevsm8173gsoh2ppk2oxp2lsgre1hhbtnv9pgcwl8w2g9',
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
                id: '2a4be4b7-b917-43c8-a55d-8bc241079300',
                iso3166Alpha2: 'xp',
                iso3166Alpha3: 'e7h',
                iso3166Numeric: '3hmt',
                customCode: 'yqfesv34v9',
                prefix: '698y0',
                image: 'http://placeimg.com/640/480/sports',
                sort: 682911,
                administrativeAreas: { "foo" : "bar" },
                latitude: 37269446948056660,
                longitude: 49490609580597220,
                zoom: 60,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Frozen Table',
                slug: 'omnis-aut-adipisci',
                administrativeAreaLevel1: '6503d4oo0l4siq8mb8gsxjqyidbw1k8c9d0vdivxi24nhowx90',
                administrativeAreaLevel2: 'w5lypqcbqoyusbv0ew1fhdjx8ui1nuhbr9t0d5pfnhr23b9lxw',
                administrativeAreaLevel3: '1kypn6bz1im7l8wk4l90yb0r5g3d0ejzxzy5npga5gw2pz5zjz',
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
                id: 'ad1d8de2-c2e2-4f3e-9c4f-62dfc1363c74',
                iso3166Alpha2: '4p',
                iso3166Alpha3: 'h7d',
                iso3166Numeric: 'ufi',
                customCode: 'bbwx6gk4bw',
                prefix: 'agama',
                image: 'http://placeimg.com/640/480/nature',
                sort: 709116,
                administrativeAreas: { "foo" : "bar" },
                latitude: 29816461724799016,
                longitude: 94106462352171420,
                zoom: 41,
                langId: 'o6dgv0ilnvfqk1veo3nxyodfjns1q7xrvq942',
                name: 'Refined Rubber Keyboard',
                slug: 'sequi-facere-recusandae',
                administrativeAreaLevel1: '2b9skmhwfyhx6y19b0ieth6rwo6c4thjnr807sl2jmkdd2bagj',
                administrativeAreaLevel2: 'iv2wwel42b5untn3fpsunlvf1hw7bvvjqpwlximr10dcj4zhc9',
                administrativeAreaLevel3: 'y89sfvab8ae860mzx95nd0cu0wwymq667pazfdd2tt89bszsyl',
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
                id: 'ae263613-fff2-4f5d-a239-e418a1f214cc',
                iso3166Alpha2: 'e2',
                iso3166Alpha3: 'ghs',
                iso3166Numeric: '5vh',
                customCode: '7ujzhywgdbt',
                prefix: 'x6wue',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 167122,
                administrativeAreas: { "foo" : "bar" },
                latitude: 97643375763330270,
                longitude: 53796595694948230,
                zoom: 64,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Metal Hat',
                slug: 'exercitationem-vel-aspernatur',
                administrativeAreaLevel1: 'j4b2z0p1xetumfk022u4hba0yrhnflarirktzsphwaem0c9sfd',
                administrativeAreaLevel2: 'keqtzqxlkpiqgqfqvb26zb2aggplqag3qmir9tq28a73i72jnc',
                administrativeAreaLevel3: 'r0t6ipgaz64o66t5vkws2oldrjftg0hg8qfx2f12wwyc836zu6',
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
                id: '452e56cf-ee1a-408c-a5d8-67fa9960935d',
                iso3166Alpha2: 'xf',
                iso3166Alpha3: 'apt',
                iso3166Numeric: 'fkw',
                customCode: '5epuf4885p',
                prefix: 'p311gm',
                image: 'http://placeimg.com/640/480/food',
                sort: 312080,
                administrativeAreas: { "foo" : "bar" },
                latitude: 15477045977716224,
                longitude: 39354410648727320,
                zoom: 45,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Steel Car',
                slug: 'dolorem-eum-asperiores',
                administrativeAreaLevel1: '5ni89vp3el61nwt35tudeg8sp6a3jdny1sbxapvg5p04jhmpx3',
                administrativeAreaLevel2: 'iwvir6b0kndrexl6yxni42qx1fxf0apjx7irb421wv29y29vfb',
                administrativeAreaLevel3: 'nhuvao3zp513prpjwnbturywiqqfz3vde20lbz8emuz39sqaom',
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
                id: 'de625322-d3d8-4126-879f-eb48324dc7e0',
                iso3166Alpha2: '1d',
                iso3166Alpha3: 'mmp',
                iso3166Numeric: 'svr',
                customCode: '3b8ltyhv00',
                prefix: 'cdker',
                image: 'inq4cp5eiowqmvzkks198tu6mxaizp2mgqyyxvsfpxgqzwk2vt10dglblw691e6tgxqzpzg1dd666c689jov0hpg47qztt8phvumjl899w92sb9v0kixy4gafysymnaccvvq5x6i3uhgsprektfm3bn89ghpbbht5kl96lrp8tzigzbxxoi6dg5175nghabp11yjn3sgwm39banfjutlb6sm862pu6klqvv7pq1tp0z2fudm3ldf1wcxbjhdgss3n3q8wrct8zr401sgs3ajhn0xywvpkdir8mzndmwgz4utvmvu36x52edqy72lq7hved603cfv6n9cc8y8vmz7349rfd91jf3orifmd34fvdrcnpbv4aeq2c5pekkw9w1x4ez0aed4wriwez7zzkgy6c59igptr8dn5v7wfv8yer56wsvpblgf9rd2xn5f9xk76ye5b6ng9vomivre1xd58ky7axtczle1oeu2gl4v1vllwu6qmz1y04en7dlbbg5ncekufjxjhms5wnylq8rb0erlcsqg1kq41qw6tabiv9xn011ieodd4t080s10yzs9het2soogpl5jizq3sqaqte03o79dv2avna8f59gz8vbnu84hoqd3hdrpejaw6x3dppks8qyudv4cmrjnykw9oyzzrrpglt46futx8t08bqtbmg7esn9qilqwbr0ehv9pg7fihy7zotc4tq6xkbvleumz50bqfysx31kzije9ktmrzy03hp42pcvozujg1ylriagujw49dd75f3xfbj0hmvwugrnttvxroxk5g7kp50wo6nbq9f1wxxrd0quxen6e99vm4nbizi8f3zr9bnd7vxddll02dtavrfy0wta5vymgly1gsoqb958hu7rqixvh79rnzo8iompvk43vny7w6suf54npkqr0fphs609isaa4j89nx7cckdysoe9glnswru1xv6hxj1s6yi3u8sooc5ntmlq6z7zfzc9slip3bq33atavb1x8cv5q39vytnnwh',
                sort: 114589,
                administrativeAreas: { "foo" : "bar" },
                latitude: 82537828825504130,
                longitude: 26198889051775020,
                zoom: 87,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Rubber Bike',
                slug: 'dolor-occaecati-id',
                administrativeAreaLevel1: '8uke2ru1h33uqjyjv45w6c0e9hc762rc05avliyd8wy635waqr',
                administrativeAreaLevel2: 'taeho5ns3wwj9sdy4u6ghqamydumiljm8l4vyx14fyx4om3odi',
                administrativeAreaLevel3: 'swpicwnrr0hrtpbeulfonps9svt267nkei5sm7ybpqbs0wkz9q',
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
                id: 'd575befd-c401-48ba-9902-023cb3c37f3c',
                iso3166Alpha2: 'y8',
                iso3166Alpha3: 'iek',
                iso3166Numeric: 'zq6',
                customCode: 'fjr5796ec8',
                prefix: 'vmxc5',
                image: 'http://placeimg.com/640/480/animals',
                sort: 5152157,
                administrativeAreas: { "foo" : "bar" },
                latitude: 19651957994041550,
                longitude: 32786472568974468,
                zoom: 31,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Concrete Cheese',
                slug: 'iure-incidunt-dolorum',
                administrativeAreaLevel1: 'tdctgxc78mx6yq42qn7tao0udypqxe7nd77w4lk1vhg3tn13d3',
                administrativeAreaLevel2: 'l2wtaa5pqrkf6nbk1ra6xjsix3palyku8gchu6curxg2e9c9rf',
                administrativeAreaLevel3: 'dltsup69vzd4ozgjyhuxr9xwl7ak0k8cimiu3s04awnhllexe4',
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
                id: '904b50a6-4bb3-4e5b-a196-51779d3f2d17',
                iso3166Alpha2: 'vd',
                iso3166Alpha3: 'vv5',
                iso3166Numeric: 'e5c',
                customCode: 'ckwi5jjdj5',
                prefix: 'pfoe7',
                image: 'http://placeimg.com/640/480/nature',
                sort: 468441,
                administrativeAreas: { "foo" : "bar" },
                latitude: 165167944437602600,
                longitude: 72432747084628820,
                zoom: 88,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Rubber Pants',
                slug: 'dolores-asperiores-eum',
                administrativeAreaLevel1: 'isgn3mn28k2bx9uwub9t3zujfomw3b77qhvd06c3qkzdxuetlb',
                administrativeAreaLevel2: 'xdve6ug4qwpmef0tdkwgzypt4vj4ox7fat9q8v05vzxsod4fvw',
                administrativeAreaLevel3: 'dwwbxe912i7ddauy59imq8dmmn77dugezbv4b125ko2fqsg9oi',
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
                id: '99344266-c7f1-42ed-92bf-0840e3ae5bc6',
                iso3166Alpha2: 'j4',
                iso3166Alpha3: '7tv',
                iso3166Numeric: 'u9s',
                customCode: '3grijho2wd',
                prefix: 'jgjh6',
                image: 'http://placeimg.com/640/480/food',
                sort: 411610,
                administrativeAreas: { "foo" : "bar" },
                latitude: 89459341269381920,
                longitude: 403197113487432960,
                zoom: 61,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Soft Cheese',
                slug: 'veritatis-officiis-rerum',
                administrativeAreaLevel1: 'lapvmqcbbcq4pmtulbssrjovreumy46y5hgzg4uf32kn11cnmx',
                administrativeAreaLevel2: 'afj3454r51blaaclxz5pfwg3eymsi0c9wisrlh98skxxv2rvdk',
                administrativeAreaLevel3: 'bytr65pghmr01t7ch0e1xfi73ow40rprch2qciphefm5hkwupj',
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
                id: '2874d6e5-82d0-4c54-a632-fe93e00efbe4',
                iso3166Alpha2: '47',
                iso3166Alpha3: '364',
                iso3166Numeric: '1kt',
                customCode: 'vjgene2syj',
                prefix: '3qcwp',
                image: 'http://placeimg.com/640/480/city',
                sort: 421991,
                administrativeAreas: { "foo" : "bar" },
                latitude: 68360838732098540,
                longitude: 78584666487637600,
                zoom: 309,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Soft Mouse',
                slug: 'iste-natus-non',
                administrativeAreaLevel1: 'igss75tyq31j03hopgqnrlntmzessku9ivhbovayovks6qmdmj',
                administrativeAreaLevel2: 'jmgqscp5ahxl2eqz258gpwnbgfhbm65ym0sllzac2dxuhsicpg',
                administrativeAreaLevel3: '0a9xhmd6il6d3vl02kaabr4doj93jrpgb2xdsyivwcx1zteiwh',
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
                id: 'a3bdc443-929e-41c4-a16e-4942a599ec4f',
                iso3166Alpha2: 'sy',
                iso3166Alpha3: 'lno',
                iso3166Numeric: 'o0m',
                customCode: 'vw1kl1oww7',
                prefix: 'wy8dr',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 429404,
                administrativeAreas: { "foo" : "bar" },
                latitude: 87282989798010220,
                longitude: 87480836110547340,
                zoom: 80,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Concrete Shoes',
                slug: 'sknajklo6ioytwz5j4d50uv11anve2du7wxjv90in25uafdx5c1zuns3a34vl8kf4e820w9ofsotjao3v8z839gkkj2ouh3cj4981jqsf3dpp9rgw0urb2ly180ieim586lmm5ge4gtnyyhpw1i2mhtalkc8n5if0xlxka5b3e5tshe7r4gdn7wmipxrf5t9isher0wbb6qgv4kpn3ykgbo96aba19gxy6ijc3l127d9bmo9m689mka586cjminnmulnh6djhok8yew7ndpzwtcx7inh4tus9qb1pdz5uqv3svphrbz95lf10bbnxmvsffxx2mr7ts6tq9b6selhy0lbdm6xqv9ck0mz1qp9aeztinxipg9xt0n6kg24lxojxjipce8fqhjpc07wfjgkcctarisr8fic1oyj23zwcc2n59pd5riyje7lsstedkl2mekb0v5c372egjvwjmrqytcrlzlzis2ovdzinrqkxilw02t1unpms7oyh33duoe9ynnoitrgf9xj13w8patkzuu3xvt5mq0ob1ccq1i2wvnc0rq9n30mlm3bvdsb0yoylrnv8jkkxw17n04fcawnnj6gpztn7l6a1pd0tjk47xbhybyxyhkxm5oh3w1gw5r4wb1o3h9toigv8awhdhgbvtcyrnr5rwlav3mhdi724k8k20v02xk4mvotp7x5chmqwt1mvftxufdny2ihfgajeps591ci1r2gtbv3aoi70gow77rzkzrfy6txriwonv8khysw7dl9qmw6411r2twugo3nuulgjcian8ejnikgalpw0tgmjguuha2cye0ukm46ovme5nv31lcujshkh6p86u2kr4lncdqk44gtjudhig3lxq4vx6hep3xssq01rvinxsry1i03ei55zzf4knzgsucbwx3hqu8nv42w9atol8mi7xx953nilts8ilvqtrvlykfbk5jjk0c9gzwzrqthhlae4rgqfw8v6zeta427n6sg8j4y6vnja4sv2wq0zp4ge',
                administrativeAreaLevel1: '8wdb4nu9uu6z90dn3fvotthib2d992w6mzqif1vv14q6kqb50g',
                administrativeAreaLevel2: '5kdxf4ust6i5d6fly60k572urnmtmccczdrtrmhcrcm5hzzptv',
                administrativeAreaLevel3: 'k905vyhyngnglbfywb06idwxcqv7dk7kh3jlutmlboz24j72sf',
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
                id: 'aa10f039-f609-43b0-8920-fb916e6d6546',
                iso3166Alpha2: 'mj',
                iso3166Alpha3: 'lnj',
                iso3166Numeric: 'gjp',
                customCode: 'jr4ai6drch',
                prefix: 'ngy3t',
                image: 'http://placeimg.com/640/480/city',
                sort: 165191,
                administrativeAreas: { "foo" : "bar" },
                latitude: 76539269279622660,
                longitude: 83636953181615730,
                zoom: 95,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Soft Cheese',
                slug: 'similique-autem-eaque',
                administrativeAreaLevel1: 'qs03tnhlr0fmouo80qrhjjx62b4dluu1cxtwpsajg24jt0i7vbc',
                administrativeAreaLevel2: 'v62nrbomvwntp55q55psq8nyskdqmuf95gchs2r65n3gh8h3qp',
                administrativeAreaLevel3: '8xjsurso6udequpr71phklst3akn8vtro17mlme5hncpkr0t4z',
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
                id: '8bde3822-8451-4bc0-ba09-b72b20ff29bc',
                iso3166Alpha2: 'gs',
                iso3166Alpha3: '719',
                iso3166Numeric: 'ao1',
                customCode: '9l5nrvj4zl',
                prefix: 'y0360',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 596108,
                administrativeAreas: { "foo" : "bar" },
                latitude: 56873597945855250,
                longitude: 57813932311529960,
                zoom: 87,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Cotton Car',
                slug: 'ut-perspiciatis-ut',
                administrativeAreaLevel1: '1am6ejgdihgwwlijvaq26lojyw6ss6tuhgvyadbawb1lcc88z9',
                administrativeAreaLevel2: 'mxddc6hayxnot3l2h43x9n47479qe1l8fixmmw02h2r9d3evc14',
                administrativeAreaLevel3: 'tewnd69yb0ufa34fdj2n8rrk1luc2ee0qc7b2jsfxdtruo3ry5',
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
                id: '56fcdf54-4ece-47ec-a98b-476723b5de79',
                iso3166Alpha2: 'xo',
                iso3166Alpha3: 'g2b',
                iso3166Numeric: 'l5n',
                customCode: 'zccyznlgsp',
                prefix: '9ur3x',
                image: 'http://placeimg.com/640/480/business',
                sort: 691255,
                administrativeAreas: { "foo" : "bar" },
                latitude: 92943940855794030,
                longitude: 55769308588651496,
                zoom: 91,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Plastic Pants',
                slug: 'vel-consequuntur-aut',
                administrativeAreaLevel1: 'cuj2g2msf56k4fxyiin47fwat2qekasmmz60q9ogeb053smqs5',
                administrativeAreaLevel2: '4vugzcefv86l5e5qg925oe1woc51n62c9oorxtp1bt2jw6e19l',
                administrativeAreaLevel3: 's45eec63c983d27n1milq3rc144laycgaec8i8crzo6jwufyiyf',
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
                id: '93dec8cb-284b-4f82-b5a4-910e2e3ea993',
                iso3166Alpha2: 'q3',
                iso3166Alpha3: '6kd',
                iso3166Numeric: 'y0j',
                customCode: '8tydirfvw7',
                prefix: 'cio9j',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 575929,
                administrativeAreas: { "foo" : "bar" },
                latitude: 52413278617350430,
                longitude: 85007966158877300,
                zoom: -9,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Wooden Pants',
                slug: 'maxime-explicabo-est',
                administrativeAreaLevel1: 'scyclvlr9714hhvve8tp7bfac7sxs6qi9lqej68hwu6rfedy5s',
                administrativeAreaLevel2: 'j6vfuiairqvn3cjahk54o5csl1pql7c7gk4ux665at2jg6wlan',
                administrativeAreaLevel3: 'fxeqier09nwlzklk28uj1iylebbw3jixeik51mi1axygepccai',
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
                        id: '67ea6085-4da1-4d28-9ecf-4a7954ea2369'
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
                iso3166Alpha2: 'hc',
                iso3166Alpha3: 'te1',
                iso3166Numeric: 'jff',
                customCode: 'fjrx6o7lku',
                prefix: 'p6m4o',
                image: 'http://placeimg.com/640/480/city',
                sort: 328091,
                administrativeAreas: { "foo" : "bar" },
                latitude: 72875197392198110,
                longitude: 26071601938709664,
                zoom: 72,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Plastic Ball',
                slug: 'distinctio-temporibus-vel',
                administrativeAreaLevel1: 'n8q4sjb04h4wrpsegvowyffjym775wpgj291oyr0leekd9q2r6',
                administrativeAreaLevel2: 'm3dll0k7cv6dd1gvb74m7ksa962usacsulzuaobc7fgeizu4zr',
                administrativeAreaLevel3: 'cdor6i26wop85r8u18le4lhpqbbp7yxp2pscca5ojr7i2dcd3l',
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
            .get('/common/country/82246d6b-cff0-4fef-8ceb-b3324943258b')
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
                id: 'f8659f0e-8ecf-4e03-b3bf-47f51f1901f9',
                iso3166Alpha2: 'f4',
                iso3166Alpha3: '1sn',
                iso3166Numeric: 'esa',
                customCode: 'dm9pt7dd02',
                prefix: 'ckgwj',
                image: 'http://placeimg.com/640/480/cats',
                sort: 548737,
                administrativeAreas: { "foo" : "bar" },
                latitude: 82243733554258740,
                longitude: 79424994237512580,
                zoom: 72,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Steel Towels',
                slug: 'et-dolores-exercitationem',
                administrativeAreaLevel1: 'ospaf4to7xltad2xm49pi38t8jpxckixi570ex9lh0yqxw1e1w',
                administrativeAreaLevel2: '5gfvcu9xwq0k59046pin87ts2adfv13btxv5wbw39o592fovxe',
                administrativeAreaLevel3: '3v17rz7dt7oauxc9cbkb6bbzej691lyo5nkbf4a7urau2xin37',
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
                iso3166Alpha2: '08',
                iso3166Alpha3: '7ky',
                iso3166Numeric: '7qx',
                customCode: 'owb7rmr13z',
                prefix: 'ee2sm',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 958466,
                administrativeAreas: { "foo" : "bar" },
                latitude: 55652203451608580,
                longitude: 53481773739681020,
                zoom: 51,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Metal Bacon',
                slug: 'qui-eveniet-voluptatem',
                administrativeAreaLevel1: 'd3sxyvyjr74zm5t1dwsylogs0mf0z07bffyxa1xc40z9ru3sd1',
                administrativeAreaLevel2: 'duvkxkry3k0tqig60hyllc4z1dsxqv3aowg5e6fhpb09msilbm',
                administrativeAreaLevel3: 'fo3pwiyhipsj0ifda5d86hewgkhclmgs4em6wpmkvy7yiy1abe',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/5f6fe953-b66f-473a-89b2-2f646cf29190')
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
                        iso3166Alpha2: 'j6',
                        iso3166Alpha3: 'v82',
                        iso3166Numeric: '7dl',
                        customCode: 'oowz3al7m5',
                        prefix: '51o6r',
                        image: 'http://placeimg.com/640/480/animals',
                        sort: 299814,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 19726251459430984,
                        longitude: 10481833458042116,
                        zoom: 33,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Unbranded Steel Pizza',
                        slug: 'nisi-sequi-possimus',
                        administrativeAreaLevel1: 'yxsnqzkjq23ond13xqlas0c0wpdfmld228zqslgfd1a2tj4e71',
                        administrativeAreaLevel2: 'ug40ssh2eo0ca21pollo1hicd57ol0w8xqhvwe6rwiz99p23o3',
                        administrativeAreaLevel3: '9m97tvo5ha3fj826m4uw8q8vj0ncpbgjmw54y9czdw3q5zn922',
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
                            id: 'f16606c8-59bb-4d42-ae26-62ed7aa35e71'
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
                    id: 'c3456bb5-a4aa-422f-b276-4d4070cd354a'
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
                        id: '4f6b5719-e586-421e-a8f4-967fd39bb1de',
                        iso3166Alpha2: 'la',
                        iso3166Alpha3: 'mvb',
                        iso3166Numeric: 'ayf',
                        customCode: 'mcoadzjg2d',
                        prefix: '5cl99',
                        image: 'http://placeimg.com/640/480/transport',
                        sort: 135211,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 77256551576647550,
                        longitude: 14084379325997728,
                        zoom: 25,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Intelligent Wooden Shirt',
                        slug: 'sed-totam-laudantium',
                        administrativeAreaLevel1: 'rhtu5egypq98bvd150zcjk0anrtei3gt8zg081xuv3eqw1ekvw',
                        administrativeAreaLevel2: 'c102ukw7b2wss7l8ln1piea3qbr30walsqxs6ewhzensd5smd9',
                        administrativeAreaLevel3: 'z6unjqnt4pi80v30v1xftw5t3pq5qmiokuseqkua3332tbxm3f',
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
                        iso3166Alpha2: 'wy',
                        iso3166Alpha3: 'yqa',
                        iso3166Numeric: 'd5l',
                        customCode: '91op6k2mgt',
                        prefix: '2thnu',
                        image: 'http://placeimg.com/640/480/sports',
                        sort: 800742,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 50602921989086920,
                        longitude: 96652391352860300,
                        zoom: 96,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Refined Wooden Chicken',
                        slug: 'natus-velit-cupiditate',
                        administrativeAreaLevel1: 'lrlys7y8hh9on4ddnw4mfzjbnjfeh9rpdoz88qnsdwic7dz1x2',
                        administrativeAreaLevel2: 'qjz9j9u9zm20h6nedcy5ugapdxniwdz77nh2kksmftfxyo1rou',
                        administrativeAreaLevel3: 'kega9n76gu6c7590z2gq5j9qxl9mt4s83vvinw7dgn2xoh76zo',
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
                    id: 'd699442f-d364-4e46-a6ff-495def12bb78'
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