import { CommonLangHandlers, CommonLangServices, CommonLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { CommonCountryHandlers, CommonCountryServices, CommonCountryModel, ICountryRepository, SequelizeCountryRepository, CountrySagas, CommonCountryI18NModel, ICountryI18NRepository, SequelizeCountryI18NRepository } from './country';
import { CommonAdministrativeAreaLevel1Handlers, CommonAdministrativeAreaLevel1Services, CommonAdministrativeAreaLevel1Model, IAdministrativeAreaLevel1Repository, SequelizeAdministrativeAreaLevel1Repository, AdministrativeAreaLevel1Sagas } from './administrative-area-level-1';
import { CommonAdministrativeAreaLevel2Handlers, CommonAdministrativeAreaLevel2Services, CommonAdministrativeAreaLevel2Model, IAdministrativeAreaLevel2Repository, SequelizeAdministrativeAreaLevel2Repository, AdministrativeAreaLevel2Sagas } from './administrative-area-level-2';

export const CommonHandlers = [
    ...CommonLangHandlers,
    ...CommonCountryHandlers,
    ...CommonAdministrativeAreaLevel1Handlers,
    ...CommonAdministrativeAreaLevel2Handlers
];
export const CommonServices = [
    ...CommonLangServices,
    ...CommonCountryServices,
    ...CommonAdministrativeAreaLevel1Services,
    ...CommonAdministrativeAreaLevel2Services
];
export const CommonModels = [
    CommonLangModel,
    CommonCountryModel,
    CommonCountryI18NModel,
    CommonAdministrativeAreaLevel1Model,
    CommonAdministrativeAreaLevel2Model
];
export const CommonRepositories = [
    {
        provide : ILangRepository,
        useClass: SequelizeLangRepository
    },
    {
        provide : ICountryRepository,
        useClass: SequelizeCountryRepository
    },
    {
        provide : ICountryI18NRepository,
        useClass: SequelizeCountryI18NRepository
    },
    {
        provide : IAdministrativeAreaLevel1Repository,
        useClass: SequelizeAdministrativeAreaLevel1Repository
    },
    {
        provide : IAdministrativeAreaLevel2Repository,
        useClass: SequelizeAdministrativeAreaLevel2Repository
    }
];
export const CommonSagas = [
    LangSagas,
    CountrySagas,
    AdministrativeAreaLevel1Sagas,
    AdministrativeAreaLevel2Sagas
];
