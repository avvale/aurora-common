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
                iso3166Alpha2: 'wc',
                iso3166Alpha3: 'di3',
                iso3166Numeric: 'zhs',
                customCode: 'itjeq9cku8',
                prefix: '0cfmm',
                image: 'http://placeimg.com/640/480/sports',
                sort: 227438,
                administrativeAreas: { "foo" : "bar" },
                latitude: 97684471706139730,
                longitude: 64293256406753720,
                zoom: 58,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Generic Soft Gloves',
                slug: 'amet-repudiandae-optio',
                administrativeAreaLevel1: 'dgb3vp8cbg6i49fbtpkunt4hj1zr3eumcygqzsbjdod5t01yft',
                administrativeAreaLevel2: 'wmu9aotyzvofd332lpvtyktv1gqo3jeeleq6yadqelvaszy5rh',
                administrativeAreaLevel3: '3vqt3lwh8tmyspn6j55m8x9obyxcu81fbsvax1ya16lt0ls57f',
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
                id: '72161a95-298b-4474-acd5-0ca5743b8980',
                iso3166Alpha2: null,
                iso3166Alpha3: 'oo8',
                iso3166Numeric: 'tx3',
                customCode: 'vqlo6e74ii',
                prefix: 'o0qtx',
                image: 'http://placeimg.com/640/480/technics',
                sort: 493162,
                administrativeAreas: { "foo" : "bar" },
                latitude: 89347735846971540,
                longitude: 99841464763760820,
                zoom: 16,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Metal Towels',
                slug: 'dicta-consectetur-delectus',
                administrativeAreaLevel1: 'a7afi6jvibovhn8a7ykdsxzlyd3ue85vdqig4rksf039hvjz5o',
                administrativeAreaLevel2: '3e0i0qkd5mkeqiau37ouyibt5y9vz6rjvojp34gkbzg4ema780',
                administrativeAreaLevel3: 'g5hygv0xrxdvbur0tdj2mua5bljzyawfy0f4cjivaeutpvk64p',
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
                id: '1b046d56-b0de-4956-9828-ed3c83ccf371',
                iso3166Alpha2: 'k2',
                iso3166Alpha3: null,
                iso3166Numeric: 'aat',
                customCode: 'g2idnkkiv3',
                prefix: 'a1lva',
                image: 'http://placeimg.com/640/480/people',
                sort: 501880,
                administrativeAreas: { "foo" : "bar" },
                latitude: 77370683954248800,
                longitude: 57089551128479510,
                zoom: 78,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handcrafted Steel Fish',
                slug: 'cupiditate-adipisci-iusto',
                administrativeAreaLevel1: '4b71aimtwgeku13qqkg4rwkecistkhb3qh2pdhfi5vfl4bbx6h',
                administrativeAreaLevel2: '9u1jmzbc46008s3pmzyuqgato6o3tz2kj3tjg5gwnhjqlpdk4j',
                administrativeAreaLevel3: '4e0vn5fur3can2le1pab9t1hb0ipijqmjgu8o138fcndddkprk',
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
                id: 'ec70f3ac-c983-431f-aeb2-93a6a31f90aa',
                iso3166Alpha2: 'nz',
                iso3166Alpha3: 'lps',
                iso3166Numeric: null,
                customCode: 'tskbhhesz8',
                prefix: 'm501g',
                image: 'http://placeimg.com/640/480/city',
                sort: 250938,
                administrativeAreas: { "foo" : "bar" },
                latitude: 70502366351037260,
                longitude: 15138088221597354,
                zoom: 32,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Concrete Sausages',
                slug: 'quod-fugit-et',
                administrativeAreaLevel1: 'y2dxklyztkkcnybqxyt8zj3tkui54ykqvv5ofdxrno1h6olnw4',
                administrativeAreaLevel2: 'kcr5aqhue7kbihzhxiry2rpsg150bmcodbeiylc96xzecfoimw',
                administrativeAreaLevel3: 'vqkk52f4unz9qghc69d5tow2d5srmtppfqsr0wxgzg5l28dva6',
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
                id: '83db3324-3d19-4d72-b393-e9e10bfd5b20',
                iso3166Alpha2: 'u9',
                iso3166Alpha3: 'chh',
                iso3166Numeric: 'prq',
                customCode: 'm6xzfcdf4a',
                prefix: 'oc598',
                image: 'http://placeimg.com/640/480/sports',
                sort: 442883,
                administrativeAreas: { "foo" : "bar" },
                latitude: 49782150603716650,
                longitude: 91087233602058430,
                zoom: 48,
                langId: null,
                name: 'Licensed Soft Chicken',
                slug: 'mollitia-animi-earum',
                administrativeAreaLevel1: '6aap56lke6wqsjqmybar2p3go8b6t7jz28a40cac2h9plw1mso',
                administrativeAreaLevel2: 'docokhory9x4nk8ygl341mxgf7kmultuqkitdo7qs3tu13qn47',
                administrativeAreaLevel3: 'vbmeaq3u461t1jzn1qkpo62ktjk9gz8hfxj01fja4xmfeu4ppa',
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
                id: 'd458193c-f745-4e6d-9a7a-5398a930815a',
                iso3166Alpha2: 'yz',
                iso3166Alpha3: 'sbi',
                iso3166Numeric: '6oq',
                customCode: '3i5pc6jnvs',
                prefix: 'n6zwf',
                image: 'http://placeimg.com/640/480/city',
                sort: 116117,
                administrativeAreas: { "foo" : "bar" },
                latitude: 19814025185796256,
                longitude: 91099550464895820,
                zoom: 25,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: null,
                slug: 'et-voluptatem-corporis',
                administrativeAreaLevel1: 'tsyt8c1dd5u34o6ac2j275d1yse2ebvsuw1ebs45y2tsmsjcwp',
                administrativeAreaLevel2: '5w3i017qzr7fd3m06b4pee1r1ut8el0glty8aywkt4ezmbk2cy',
                administrativeAreaLevel3: 'wmj0tnsxf5gqb800yrh4uhfcjl9op7vrmy4rzpq3h865pbv8s3',
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
                id: 'edc896bf-8773-43e9-979c-60aebb3aedc9',
                iso3166Alpha2: 'do',
                iso3166Alpha3: 'ws2',
                iso3166Numeric: 'jha',
                customCode: 'it2fi8as5i',
                prefix: '4nqpb',
                image: 'http://placeimg.com/640/480/business',
                sort: 414650,
                administrativeAreas: { "foo" : "bar" },
                latitude: 72189449015229150,
                longitude: 82076182697920370,
                zoom: 47,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Metal Fish',
                slug: null,
                administrativeAreaLevel1: '7j5gucex3651etu08kkurmv21t8gm5eauhpd1h4euhim1o8bm9',
                administrativeAreaLevel2: 'zaizjyrxd3myqg4fzlfgycyk2ma3j2siajbrrjvvp8tissdi2v',
                administrativeAreaLevel3: 's7hluatjq9toedgliztuqmbgktfuankx07z26640da1b8fe5di',
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
                iso3166Alpha2: 'g9',
                iso3166Alpha3: '9nz',
                iso3166Numeric: 'k8h',
                customCode: '0b5ay31x0w',
                prefix: 'brybl',
                image: 'http://placeimg.com/640/480/food',
                sort: 823080,
                administrativeAreas: { "foo" : "bar" },
                latitude: 32494652835008132,
                longitude: 95988863990531070,
                zoom: 73,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Plastic Keyboard',
                slug: 'animi-itaque-est',
                administrativeAreaLevel1: 'y7yx9rge5wx3okhzwqtrgbb1u2i964qd7bgrnrhfxq8af7ffpj',
                administrativeAreaLevel2: 'mg1ez7coeefz2a29etc236x6ty4lpg9crxslnmen43vjy8trot',
                administrativeAreaLevel3: 'dwgi4fqff3kh3kvilqdpqvtxxr8e6zefr2tg3sirk7sq39jx3n',
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
                id: '3f9f663b-3c3f-4f45-9354-94a343f31473',
                iso3166Alpha3: '55h',
                iso3166Numeric: 'yyn',
                customCode: 'uek0dyzmy1',
                prefix: 'yswy2',
                image: 'http://placeimg.com/640/480/food',
                sort: 257582,
                administrativeAreas: { "foo" : "bar" },
                latitude: 70159976224489736,
                longitude: 93981127378377820,
                zoom: 65,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Fresh Sausages',
                slug: 'adipisci-voluptatem-animi',
                administrativeAreaLevel1: 'kq6lpej3m7t2cg8to154jdmndy7gi4mi3ky7o58vwukih091g8',
                administrativeAreaLevel2: 'eq8nx721osrpm0fbvjit2x9u676j9u9otaq6whooevu1dzhhyo',
                administrativeAreaLevel3: 'r55bb1dt4xs9kp5g8wpjy43nkkrz17ierk2ssd7xxw97xxqhp6',
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
                id: 'd302cb89-2130-4e24-9205-03ef72e53a40',
                iso3166Alpha2: 'uc',
                iso3166Numeric: '731',
                customCode: 'z9f0lmitfl',
                prefix: '0tns3',
                image: 'http://placeimg.com/640/480/nature',
                sort: 347230,
                administrativeAreas: { "foo" : "bar" },
                latitude: 23925707180483390,
                longitude: 80520946924297440,
                zoom: 72,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Cotton Cheese',
                slug: 'voluptatem-provident-quibusdam',
                administrativeAreaLevel1: 'nd9p3imldvt26jlsbe3lbur2t4rndi8v4a32zg0x0w1byxqorq',
                administrativeAreaLevel2: 'nda8ktn671iiuslvveeh93i6rlc7cfbawqbitfpd9rdyf394ci',
                administrativeAreaLevel3: '5juvva3rzc3lfv8ibjjbk4imcgpypwal57bycd1p49gay18vif',
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
                id: 'f358d9b9-0a5c-4edb-acdf-9f7c1e731267',
                iso3166Alpha2: 'nk',
                iso3166Alpha3: 'r63',
                customCode: '7ffnl01b0m',
                prefix: '6izho',
                image: 'http://placeimg.com/640/480/sports',
                sort: 882305,
                administrativeAreas: { "foo" : "bar" },
                latitude: 28418690105593468,
                longitude: 18819499703670344,
                zoom: 16,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Plastic Pizza',
                slug: 'dicta-consequuntur-ut',
                administrativeAreaLevel1: '8kc5lb83sk0kucdt6ul6bszcmen42eepm7jphh8n6akjo7cexn',
                administrativeAreaLevel2: 'nlh3btd7l5c48vo9gtk9rzryb7jjbxbtkjqht7fin367ghx4pt',
                administrativeAreaLevel3: 'tegsfzqioovu09wtgitq5p0eoabhgf708ulay6fhvgn53c9dxi',
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
                id: '0bd063e5-898d-4609-aa07-86e778a4bfd5',
                iso3166Alpha2: 'gi',
                iso3166Alpha3: 'v70',
                iso3166Numeric: 'jqa',
                customCode: 'y9a084e6p6',
                prefix: 'gxq1w',
                image: 'http://placeimg.com/640/480/technics',
                sort: 340094,
                administrativeAreas: { "foo" : "bar" },
                latitude: 27567143019162190,
                longitude: 34587168336202660,
                zoom: 28,
                name: 'Licensed Rubber Table',
                slug: 'officiis-maxime-ex',
                administrativeAreaLevel1: 'np8g7z5zg2jf1z1c4y5isxkkyutzpgt99axqgt6k1gbiv4xov5',
                administrativeAreaLevel2: 'rvp8mqgzos9o9zr9ebe0mk38aqks13w3z7h9s683xqjnoyap3v',
                administrativeAreaLevel3: 'pnt7pqh7jgvxohyjts42msmtjvogfavpp4r25kk54p1wwucfuq',
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
                id: '2cf20758-1cb0-4491-ae18-db949a4a9b21',
                iso3166Alpha2: 'dk',
                iso3166Alpha3: 'fwk',
                iso3166Numeric: 'vil',
                customCode: 'yfd57qy2xx',
                prefix: '4rjok',
                image: 'http://placeimg.com/640/480/cats',
                sort: 543001,
                administrativeAreas: { "foo" : "bar" },
                latitude: 76670767863825150,
                longitude: 84068183420750220,
                zoom: 10,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                slug: 'sit-sit-reprehenderit',
                administrativeAreaLevel1: 'cc98l4e27lkvhzse3pwl5mgl79534hddo0xexb6mm75g13fo6w',
                administrativeAreaLevel2: '3b25u7mh8n9vi131oc9t2ysfa7w8452fttylxno9nd48c2bmyq',
                administrativeAreaLevel3: 'hqju4st5qa3toq10fr2uw2wz0xrv0mfrqqbr0ytfs9km09k4pz',
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
                id: 'ae025522-a1dc-4c77-b415-3166b4ddb30e',
                iso3166Alpha2: 'iw',
                iso3166Alpha3: '4og',
                iso3166Numeric: 'zzg',
                customCode: 'o09757h9r6',
                prefix: 'h3x1y',
                image: 'http://placeimg.com/640/480/abstract',
                sort: 948852,
                administrativeAreas: { "foo" : "bar" },
                latitude: 93358744387659040,
                longitude: 10661873863237086,
                zoom: 40,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Granite Pizza',
                administrativeAreaLevel1: '2ibs8zzoixsof6piovuue4wrph01zv9cgj7i7y4my8cq52aosl',
                administrativeAreaLevel2: 'vgbfy7xw6x9yxb7sqa2subypd3ij2vp8qfngfhc7yb6gs1j2nz',
                administrativeAreaLevel3: '8zyih0asutdilr628f41vdauffm7i0q2rnkrcn74ppcnwcbsan',
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
                id: 'kuh8n5n98plywfjnqjqmh2w46cw3kmx8bzg9o',
                iso3166Alpha2: 'is',
                iso3166Alpha3: '1az',
                iso3166Numeric: '18i',
                customCode: 'e1fvszjisd',
                prefix: 'ej3zr',
                image: 'http://placeimg.com/640/480/animals',
                sort: 535484,
                administrativeAreas: { "foo" : "bar" },
                latitude: 83432702869267280,
                longitude: 13450861845262916,
                zoom: 75,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Gorgeous Frozen Ball',
                slug: 'omnis-vitae-iste',
                administrativeAreaLevel1: '68m7k0tci5n7rnp44v6iur9gmbm792bhgi8jgm2gnvrfykz8ey',
                administrativeAreaLevel2: 'eb6xu5jc7jy9wm8qmt41mpzbordqw6bo0mumu3yiqbnl1fn4lg',
                administrativeAreaLevel3: 'q7bixhwnctr9okdlrnbpgva97esa4shs2rrwxrizmp0cxswg1i',
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
                id: '23779e8f-7fcb-4439-abf7-4b48ef33f434',
                iso3166Alpha2: 'fsr',
                iso3166Alpha3: '4jd',
                iso3166Numeric: 'kka',
                customCode: 'bdcpabhn0l',
                prefix: 'sbxr9',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 154661,
                administrativeAreas: { "foo" : "bar" },
                latitude: 84757707566477650,
                longitude: 59851046865986616,
                zoom: 54,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Handmade Rubber Shirt',
                slug: 'facere-odio-iste',
                administrativeAreaLevel1: 'y0cxpji19feqkrozn4qeccpa97ot0npvwstrcauame2skpky68',
                administrativeAreaLevel2: 'ej5klcwin7puwh1lvcg8v64d3zfmwjcvc8ezaycfck6fnzrojt',
                administrativeAreaLevel3: 'xibn3mh6esy8xk7v12eb1poyc3xsz5hy43frvt375iri0er5zx',
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
                id: 'a2e6ebe6-afe1-46ca-9a26-6f6338b6c7d1',
                iso3166Alpha2: 'nx',
                iso3166Alpha3: 'su82',
                iso3166Numeric: 'mmr',
                customCode: 'qbvksobyce',
                prefix: 'linoe',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 945354,
                administrativeAreas: { "foo" : "bar" },
                latitude: 26950410273262036,
                longitude: 71901343999726430,
                zoom: 21,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Frozen Gloves',
                slug: 'eos-unde-possimus',
                administrativeAreaLevel1: 'sgfkws96wutefjtjvratkzije6mw2i60hoknk3neziiqlnv3cz',
                administrativeAreaLevel2: '9zmayih29kak97j6etuw6jamsrarf11k5b4mg8ptdnc6pnewwp',
                administrativeAreaLevel3: 'o0bucmd7qau6g2e8wpp2gi6jz2674bohzu1t814wkjs9qvrff0',
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
                id: '55c60062-62a3-4363-b84c-301756f74b2c',
                iso3166Alpha2: 'ca',
                iso3166Alpha3: 'g60',
                iso3166Numeric: 'igiv',
                customCode: 'rh3823olm4',
                prefix: '5pnz5',
                image: 'http://placeimg.com/640/480/nature',
                sort: 639535,
                administrativeAreas: { "foo" : "bar" },
                latitude: 97096093636602420,
                longitude: 11307828244923234,
                zoom: 16,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Ergonomic Wooden Shoes',
                slug: 'quia-voluptatem-recusandae',
                administrativeAreaLevel1: 'idr6jl00j9c465t3phgwgsvmmox31mf3x2o7r7wd773h0g0xz8',
                administrativeAreaLevel2: '2g8j5gkcddxjfzvqovrw24d75k5fcptz391y7hese96thde9l0',
                administrativeAreaLevel3: 'c52skzwf9f882ax5abeg5cxq0nifse4rtwcxmg32ka7ejxqk6i',
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
                id: '2a28a071-1a78-4c11-be1e-ce756cf40676',
                iso3166Alpha2: 'eg',
                iso3166Alpha3: '4xq',
                iso3166Numeric: 'og5',
                customCode: 'eus6ogt5g8',
                prefix: 'uq032',
                image: 'http://placeimg.com/640/480/nightlife',
                sort: 451263,
                administrativeAreas: { "foo" : "bar" },
                latitude: 44844277665425360,
                longitude: 24601711581642180,
                zoom: 97,
                langId: 'fyazv02holppsv9b1e0ln57fuz6gziz5nbs9c',
                name: 'Intelligent Steel Towels',
                slug: 'animi-qui-cumque',
                administrativeAreaLevel1: '5ipk4o9m7aqae0nuqyhcvxreu3tjoecs9zrw9c0edinthmkxoj',
                administrativeAreaLevel2: 'fal45y9ei53gwekqmr73tr3u71uuhjx4nvqhe1cdfrdwlrzub3',
                administrativeAreaLevel3: 'wwpg55vbewmr2weckawgivm02yifnh7sw2ptyur2uvash03fdi',
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
                id: 'edb868d1-77de-45c2-a97f-e492acb900d9',
                iso3166Alpha2: 'r0',
                iso3166Alpha3: 'a9x',
                iso3166Numeric: 'crg',
                customCode: 'y1cb0dbcy54',
                prefix: '19q8x',
                image: 'http://placeimg.com/640/480/animals',
                sort: 210163,
                administrativeAreas: { "foo" : "bar" },
                latitude: 70106504380225210,
                longitude: 38606691418962080,
                zoom: 90,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Tasty Soft Towels',
                slug: 'maiores-enim-culpa',
                administrativeAreaLevel1: '6os439d8ohx0841d9rc1864uw8kc7znde79f4a995vs8qvneh5',
                administrativeAreaLevel2: '7e3162xoeheq307up21w9akwphukvjlwwewnid99eb9t0omcds',
                administrativeAreaLevel3: 'id2y7557pxqpo5g0ers0on5uqk30vdzol39tz5qiswk1ty36ru',
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
                id: '0710ae05-247c-4efc-ab98-ee830aa81473',
                iso3166Alpha2: 'x4',
                iso3166Alpha3: 'g3a',
                iso3166Numeric: 'j0d',
                customCode: '6q0aw3c68k',
                prefix: 'ztx3ln',
                image: 'http://placeimg.com/640/480/nature',
                sort: 558183,
                administrativeAreas: { "foo" : "bar" },
                latitude: 19963928731481400,
                longitude: 82886898350200720,
                zoom: 53,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Incredible Fresh Sausages',
                slug: 'deserunt-cupiditate-dicta',
                administrativeAreaLevel1: 'd0xet5suoktyiwjqjvzqqvhsecsnrmoi5cu9ps1elrj8mzse03',
                administrativeAreaLevel2: 'h5434joknppsh5wlu0xqjefexk3fou0bdkq1kur9s5zx2vpxhp',
                administrativeAreaLevel3: 'yk56vm30jxrqyftgkceyjaxr814qoct4hkdg4olfxbyf8s39ro',
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
                id: '2fc6afc9-d00d-49fe-b871-2a5415749545',
                iso3166Alpha2: 'jv',
                iso3166Alpha3: 'cve',
                iso3166Numeric: 'zer',
                customCode: 'zts0jzvghe',
                prefix: '9r4nz',
                image: 'zrzhs1zo5iu5pvi00dcod2hs9uvhg0xagsgy6ex97bzy7hgwodvd9wb536axstsumgko90fx7ox34hoxykztqdhsqejyrjlefemzft1ypf6nk1paej58ycyhlwxhrbcpfdz9m9xv7sgf5jtp1pa5wqhq9qn10au8ll28k2hljfih8vrcq7kvbbxf0w5afo3dch1pnkjwppkf0blg6a4cl0gj840rpyaxeoo7yr5sxcmhkvvs2n7r7mn1zoz7sdjta1cqkxexr3hfbpyfaf3s2rs4wi71t5c6hih3j8zw6zz7ndsf1xbxbgp7a4qtjtdva8c1lvnqh4iz68ww9ndqsolpektd3ym9j6cegwhbzzt5ouggiimifmu7fd12ec12p2eg3qa290qc113vur0xlke22r5qt1xtt9vljgjdsuhtbr9zjzhwwh6m6garu6sukqwcloafkwxp5fy5p4nz9qcv6w1id7tsyte7v7keuyhccigqpi655dtd263cdis35yaocwe1x8vc4jey9e9txg7o3jkb0lrtdh6nol0nq75dtt4z4z6euqxb6klpfz2nk45i8fxgdu5i6hs32lingctjb49gxtf2lqja0roimickg2jsny50vcjhqdd7nrgqee0kphd15dyxm1yva28sbixm3qzqsk2is4st22mdxqu6jh49uq3ipmoscmxhxfwx0fueo31k5h5kt9rk2mwd5w4jt0bg48xkgsb7zy4lg7b53mj9sprp3cux9ai0l0awjtm9eusg7fxrmatmijtacgr0vszv4eo2c9j3lhybltbq3i24gl77ucpo9n91iikc4t89g6npkh88ltvtn6eco57mvcyn7du2tugj3mpvmzvptpo1dl6x908wt4xwgedohhnliyss38m6avgu9jzzpcl352sua7mzvrelu47d7u1tx7xii0t97vtm2lb88j1eweyzwpd4xkzcwei0478wia8osoowa7rmhhmqqln83epliymj44dfj3nlr1l7imdtj',
                sort: 733912,
                administrativeAreas: { "foo" : "bar" },
                latitude: 58241398889076616,
                longitude: 66315431033871740,
                zoom: 97,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Soft Bike',
                slug: 'aut-dolores-sapiente',
                administrativeAreaLevel1: 'w8xk94o8er41rc128162hylqm9le11lnb9t882um5mgg91affa',
                administrativeAreaLevel2: '8vjc8ig3l43i3mj5s25q85cc9w8ue9jib655j99ku41gz0smh5',
                administrativeAreaLevel3: '0dznlfqdz5lalk8ns3qvnt8977no5z559r5a28r48d4tt19wga',
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
                id: '053f655d-496e-45d5-bb8f-841e1f3ec1bf',
                iso3166Alpha2: 'ol',
                iso3166Alpha3: 'wvi',
                iso3166Numeric: 'x3c',
                customCode: 'jk82qjnidb',
                prefix: '2d119',
                image: 'http://placeimg.com/640/480/nature',
                sort: 8952079,
                administrativeAreas: { "foo" : "bar" },
                latitude: 85650490771431250,
                longitude: 37750676104237016,
                zoom: 27,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Licensed Granite Chair',
                slug: 'qui-commodi-necessitatibus',
                administrativeAreaLevel1: 'j8zhc7frvr3kelf47sxfv1ckmh3fkw7t4dv5au9s2q2s333stx',
                administrativeAreaLevel2: 'eebqa0mmuqty3kjywn0jovwhr9eb6l63rwqo4fl0kdn09vfr0e',
                administrativeAreaLevel3: '5ild09jf43998fk3ytdb9rli0i2lvc6vcwp6ydy4j0ro9t41d7',
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
                id: '12f8975f-b952-412b-abc3-88cc2c191a78',
                iso3166Alpha2: '8u',
                iso3166Alpha3: '3nf',
                iso3166Numeric: 'scy',
                customCode: '899yt709r6',
                prefix: 'twkyr',
                image: 'http://placeimg.com/640/480/cats',
                sort: 484708,
                administrativeAreas: { "foo" : "bar" },
                latitude: 467367921910284540,
                longitude: 75658006362535460,
                zoom: 53,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Rustic Metal Ball',
                slug: 'sit-corporis-dolores',
                administrativeAreaLevel1: 'movwq18du2mz4tbiowhrhy6qarad3i282w5pxu7lm7ycls12ya',
                administrativeAreaLevel2: '4c9m4lw5t8h037nxmftj7ts1yma86wh01mwal11o8eslqx503v',
                administrativeAreaLevel3: 'zvyuatif2v68zmd1l1hl9918lzk5bu2oexcao3t2pua8iwazrm',
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
                id: 'c9e1b1d2-cea0-4858-bec6-20b1f7bb8cc4',
                iso3166Alpha2: 'pz',
                iso3166Alpha3: 'hjj',
                iso3166Numeric: '068',
                customCode: 'r3lw9c5k8p',
                prefix: '869xu',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 857387,
                administrativeAreas: { "foo" : "bar" },
                latitude: 94946990362122500,
                longitude: 859942125813908600,
                zoom: 21,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Practical Metal Pants',
                slug: 'explicabo-molestias-iusto',
                administrativeAreaLevel1: 's016ptmaihnkiqn35iyc3ku02br716n6vdd0txis0pvt30c3kf',
                administrativeAreaLevel2: 'yb4y7n7n3ejugnd44kf0mhxwqojflu6bpr549sb50wi8onmehm',
                administrativeAreaLevel3: 'z8fzhihf0us8iu5kqk01h4d6su4jaj54ds7d2rni81nn0zw40o',
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
                id: '4b3f1095-4b81-4ab7-96a2-a9d3c535ad83',
                iso3166Alpha2: 'bw',
                iso3166Alpha3: '4nl',
                iso3166Numeric: 'yft',
                customCode: 'lnnqdsiu69',
                prefix: 'vobnt',
                image: 'http://placeimg.com/640/480/people',
                sort: 241299,
                administrativeAreas: { "foo" : "bar" },
                latitude: 25921057782995550,
                longitude: 11613702855137126,
                zoom: 789,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Cotton Soap',
                slug: 'quia-voluptatem-aut',
                administrativeAreaLevel1: '6hc5sgqjbba3c8gpsbd9cs407dufzd731btyuff105sbt2jkal',
                administrativeAreaLevel2: '5s7cafwhxeq9cy9thfa6a538isq95ykelz123ernau0uqnhtsg',
                administrativeAreaLevel3: 't1dq5b14hsesa23q7v611axaklw48dtqlmoqusj408p2znllyk',
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
                id: 'a3009c10-c8c1-4c72-a5fd-bd490950e1a0',
                iso3166Alpha2: 'y8',
                iso3166Alpha3: 'hhg',
                iso3166Numeric: 'pyx',
                customCode: '1ewam4l6vf',
                prefix: 'sdiw9',
                image: 'http://placeimg.com/640/480/food',
                sort: 799009,
                administrativeAreas: { "foo" : "bar" },
                latitude: 18995840503800296,
                longitude: 20767253418335290,
                zoom: 58,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Rubber Chicken',
                slug: 'o8xs47matnhuvqztyf75y5jptlyhboif10tha4j7nlfbfgsf8df8il102bfv577ucai5j1cw14llk5k8k5fw1g8wmp91bj1p6oams6898fx4opehbgo1tv2jmwhf4jduus9l3d1tgu8penuyf7lj0mxwyxwepnu18pdz4uoqa6yexm89b767mlkm753k2ra5nrzdpnpf65ytvj8ebxlcydl3ddzhepn0d81xqtnp2ihgzdqq6ntiq8ryophsw64dtm6ccbiv88kt7oyurm7sqt45oj4wx1jeozduf4ddvn781hkt3ww10ngxxuvegbjh91d39av8t53yvk3ichvo0cu6dh4bevy2m5eyxttjnu7ujxbn777msptqu1tzhf469w5gs5s1kiwxgggf2x3f1tt5cfvipk0o9v1pbihfzcdnj9uxzgxqmpv1oja4pcrkdxv7zpbb9nc1i2lwpvtvlsuw3s39gx8u09rzvpnkgbpm1sly0kz40z9zsc2v9jlyus8dyp9qls5lgb5ftokkl3un8m35bgr73ka8f90aegjo5pt7t5gjzb2n3ppfggj082i99zsv0d28af4ra7dmhk13519eeltfmkz53hw9mkiu6i5jif87cmj0ueqfipthy0jgdue0fz11c97us5wv31895ocd2yap4yb0hkpvxa7q6w5mkxdd75yms2586f26cbz3618jdoouh463vbt3yyumn5uoiln0k699wdt5yeu785px72opkqfekxf015vwxtdn9wgz4f7tvlz45wusz4ta3w8u0y1on6r5v99zg0hquy3212yqes98c1p0tjxdvc5ob34rffhy8zczspzztho4ys579m0wh6107ve23d45azvsjymbvmevlg48gtm3ufg0t57hfonuy66ogm1z9o9jfh0r49hr26sw36praw5f0z7di9l17ftde58bq5c9fqshfz9y2kyojnv9g75guvej9jxb40igvtu5613l0k8k5ioqp27tccg6jbdig25ff',
                administrativeAreaLevel1: '56x0qaw41ct9gddrqk6zui7avbagf9zs6naiwihde4z8ntha5t',
                administrativeAreaLevel2: 'i82g9t0ozqncb3v9yn2tz9k1qblc5adj245355tkslkqe9ut75',
                administrativeAreaLevel3: 'pl4g7zf5ovzyek50u6w1c08qjcaf5muesa2tgjx1ycedowxmnx',
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
                id: 'c04e3c9c-0c90-4eb9-bec5-0f3386002e82',
                iso3166Alpha2: '1a',
                iso3166Alpha3: 'iqu',
                iso3166Numeric: 'zhy',
                customCode: 'm46kc62h9r',
                prefix: 'i9soo',
                image: 'http://placeimg.com/640/480/transport',
                sort: 460829,
                administrativeAreas: { "foo" : "bar" },
                latitude: 80996325484755940,
                longitude: 58228995028731830,
                zoom: 71,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Refined Wooden Chair',
                slug: 'itaque-quas-magnam',
                administrativeAreaLevel1: '85hsw42513ccehzs2rfzjrlri7ervdebb55xpie1dotr1ke53i1',
                administrativeAreaLevel2: '67ozzqa0tpo7e6a0a3ncv57ure16cy16z6vj6fgf1uju1ocvpi',
                administrativeAreaLevel3: '0z3ognw7v1m8lqhg8wzmkwhwelh9k2qbne2xmfp98eknn0suet',
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
                id: '875563d2-b2bc-40eb-badc-bd940968a3ae',
                iso3166Alpha2: 'tc',
                iso3166Alpha3: 'nmi',
                iso3166Numeric: 'ffl',
                customCode: 'aro3h45yjo',
                prefix: 'zh5ho',
                image: 'http://placeimg.com/640/480/animals',
                sort: 200895,
                administrativeAreas: { "foo" : "bar" },
                latitude: 14816987089537004,
                longitude: 59173223310221096,
                zoom: 86,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Sleek Cotton Keyboard',
                slug: 'dicta-dicta-et',
                administrativeAreaLevel1: 'vietgktqg3kpcxrcs1e3neeeds3gcv49amobzypvw4re16k38v',
                administrativeAreaLevel2: 'vwl6c8k7ky317oo0k21ozgwg6ef2l4vsfvle06ocjreaa76m40a',
                administrativeAreaLevel3: '8d8c0ytw9ifnefh9n9lhpv5recrjvnuon4yt6sd59adxopqw53',
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
                id: '2a545c7b-048f-4d81-bc21-681c28e02bd7',
                iso3166Alpha2: 'zu',
                iso3166Alpha3: 'v5s',
                iso3166Numeric: 'm1q',
                customCode: 'cjdgjqdwdv',
                prefix: 'ddt1t',
                image: 'http://placeimg.com/640/480/sports',
                sort: 638385,
                administrativeAreas: { "foo" : "bar" },
                latitude: 23986908976461360,
                longitude: 41721358352989680,
                zoom: 28,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Small Plastic Bacon',
                slug: 'hic-nulla-fugiat',
                administrativeAreaLevel1: 'vrfkdtlbd2noo04uopu6tng6jt1zbcqrwp420lqoq0j9pza869',
                administrativeAreaLevel2: 'xatmxjifsjs27v27dje4t5yz6gf4rrexix3x20rhlef3ssj3r3',
                administrativeAreaLevel3: 'qtjgw6l11ign3ustdtxgm0i4716b2svg6uwahzrqh5hfxppqsuw',
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
                id: '3d34b012-bb81-43e4-92a1-abbe4611602f',
                iso3166Alpha2: '8b',
                iso3166Alpha3: '49d',
                iso3166Numeric: 'b3e',
                customCode: 'bz12wnalxa',
                prefix: '3t2am',
                image: 'http://placeimg.com/640/480/food',
                sort: 219233,
                administrativeAreas: { "foo" : "bar" },
                latitude: 41881812579727090,
                longitude: 41638609434407780,
                zoom: -9,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Granite Table',
                slug: 'necessitatibus-mollitia-eum',
                administrativeAreaLevel1: '11vt4ip3fj63qsdo99gtct08gtsjyyu4kono1s0pn12qyur3hn',
                administrativeAreaLevel2: 'x7taikq7mctfgr1ecrjv8bd5s491nash8wo28u7l6gd9dw0crc',
                administrativeAreaLevel3: '2eyy21nezu8yqijui7br3vtchf4lqd6jh9l1wwmxqi5y393hty',
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
                        id: 'f511abad-d063-4a56-9dcf-908f2f376981'
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
                iso3166Alpha2: 'vz',
                iso3166Alpha3: '5je',
                iso3166Numeric: 'olp',
                customCode: 'w2r7tnm67l',
                prefix: 'mbjc4',
                image: 'http://placeimg.com/640/480/city',
                sort: 411197,
                administrativeAreas: { "foo" : "bar" },
                latitude: 81331050585066140,
                longitude: 23349383419436944,
                zoom: 54,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Unbranded Concrete Fish',
                slug: 'non-doloremque-vel',
                administrativeAreaLevel1: '988i54v6swb0l8zia9amkkza1qi94bm29f0z7xpw8q03ym2ijc',
                administrativeAreaLevel2: 'mldngkywjzbjltzmajs4ago4koyri0a6axappydg4a1rfpg3fq',
                administrativeAreaLevel3: 'fcnfboljgrsmh4dwtfxx74w22wqy1b8tnkzfg0twhk7zdzgmbv',
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
            .get('/common/country/01465503-74ac-4d78-bfde-cd93d7505cb3')
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
                id: '5d63bb0f-bb75-45bc-8716-8d620b41264b',
                iso3166Alpha2: 't1',
                iso3166Alpha3: 'dt6',
                iso3166Numeric: 'ruy',
                customCode: 'dpmbw2o50s',
                prefix: '27vna',
                image: 'http://placeimg.com/640/480/transport',
                sort: 682469,
                administrativeAreas: { "foo" : "bar" },
                latitude: 71208593949402450,
                longitude: 75158943282499950,
                zoom: 34,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Awesome Steel Sausages',
                slug: 'ut-laborum-nisi',
                administrativeAreaLevel1: 'irca71po0ba4rmaasgxc7vlnafg5c8ehvn7sdksdjvhiiaooqk',
                administrativeAreaLevel2: 'g0d3czarl3qv7kytzch0gswux3qrrdt2bro6yc9fbddmo9vsut',
                administrativeAreaLevel3: '6dif4idrpncw163fm3o29cni97r5t0pf0g8n8jyq1kir4sy52h',
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
                iso3166Alpha2: '2w',
                iso3166Alpha3: '7wt',
                iso3166Numeric: 'w52',
                customCode: 'hknpzqyhmy',
                prefix: '0mpcl',
                image: 'http://placeimg.com/640/480/fashion',
                sort: 435103,
                administrativeAreas: { "foo" : "bar" },
                latitude: 76016552086709540,
                longitude: 79185115263322900,
                zoom: 45,
                langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                name: 'Intelligent Steel Pants',
                slug: 'voluptatibus-soluta-beatae',
                administrativeAreaLevel1: 'ski5s295vdb9p78ru8vratrl8uxlpgpm3pa2teyi41x4bwppmj',
                administrativeAreaLevel2: 'xjfywy2k3pokt2qa1ihbhipj2eyxo8dvunk95uojcc4ncoe6e0',
                administrativeAreaLevel3: 'rte74of8uwrrn12opcnlnxidqmcbabyfkbj2vvcfyk9rcvcot5',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE common/country/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/common/country/a341e0b6-7548-4a51-81e5-e8139920a08a')
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
                        iso3166Alpha2: 'y3',
                        iso3166Alpha3: '9mc',
                        iso3166Numeric: 'od8',
                        customCode: '0tk8ogj49j',
                        prefix: '3cujo',
                        image: 'http://placeimg.com/640/480/animals',
                        sort: 148056,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 96449931272541280,
                        longitude: 68562786978013910,
                        zoom: 25,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Unbranded Wooden Hat',
                        slug: 'adipisci-temporibus-cupiditate',
                        administrativeAreaLevel1: 'xmooarzyfctjqn1ri6ux1gj7ra4gzcesc30497uac1pihl31pa',
                        administrativeAreaLevel2: 'p4wncs6bkqq8ehman12yicuv5sdk8asrsk69llkh7zusk9akzj',
                        administrativeAreaLevel3: 'yzhwqf5smzx6iyktdtfee4b2u9vq8sblpg8d2b0a8bli6ogsjq',
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
                            id: 'a21c2d4f-bf7e-4d99-8b46-bfc0eb57b3d7'
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
                    id: '0cf97f82-3846-4fb0-aa60-74aebb19b2d3'
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
                        id: '61dd37b5-ebbb-42c3-a65c-2a5963214646',
                        iso3166Alpha2: 'jh',
                        iso3166Alpha3: 'u0p',
                        iso3166Numeric: 'arr',
                        customCode: 'sbj5osqv65',
                        prefix: 'udd5z',
                        image: 'http://placeimg.com/640/480/city',
                        sort: 160520,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 54886813619449930,
                        longitude: 67028686041289176,
                        zoom: 20,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Gorgeous Metal Tuna',
                        slug: 'voluptatum-soluta-quo',
                        administrativeAreaLevel1: 'ydax30pwvku8rjmns1mhy4c3n4iacoo01nkhugmnh6mik2bx4m',
                        administrativeAreaLevel2: '3h4aiksmjpmifsogs0a81d2zijrrrhachbu05hzadwl9tpy1va',
                        administrativeAreaLevel3: 'tf9q7nyii5zzf5gfzfow9vnohaowva1obk658xqypapw4jdff7',
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
                        iso3166Alpha2: 'ge',
                        iso3166Alpha3: 'iy4',
                        iso3166Numeric: 'ral',
                        customCode: 'rbm46u0bnc',
                        prefix: 't3g37',
                        image: 'http://placeimg.com/640/480/people',
                        sort: 636178,
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 45721036181511410,
                        longitude: 66023915355852170,
                        zoom: 79,
                        langId: '4470b5ab-9d57-4c9d-a68f-5bf8e32f543a',
                        name: 'Gorgeous Plastic Chips',
                        slug: 'et-voluptatem-quia',
                        administrativeAreaLevel1: 'w3lwrwms64vif7hpq90zyexm6oz65jbdf0j0rsip6qo6qq7u77',
                        administrativeAreaLevel2: 'jyih76t9fjmmgo6eawva8u9bvffpqt6rsx3q5d3q5juj1qb8m5',
                        administrativeAreaLevel3: '03m5keblmaq0hidjjg0qblq7ohmkrmknfowgg3e0hl9n9c9nha',
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
                    id: '68fddade-78f7-4598-8ec6-54be9b660209'
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