import { CommonLangHandlers, CommonLangServices, CommonLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { CommonCountryHandlers, CommonCountryServices, CommonCountryModel, ICountryRepository, SequelizeCountryRepository, CountrySagas, CommonCountryI18NModel, ICountryI18NRepository, SequelizeCountryI18NRepository } from './country';
import { CommonAdministrativeAreaLevel1Handlers, CommonAdministrativeAreaLevel1Services, CommonAdministrativeAreaLevel1Model, IAdministrativeAreaLevel1Repository, SequelizeAdministrativeAreaLevel1Repository, AdministrativeAreaLevel1Sagas } from './administrative-area-level-1';

export const CommonHandlers = [
    ...CommonLangHandlers,
    ...CommonCountryHandlers,
    ...CommonAdministrativeAreaLevel1Handlers
];
export const CommonServices = [
    ...CommonLangServices,
    ...CommonCountryServices,
    ...CommonAdministrativeAreaLevel1Services
];
export const CommonModels = [
    CommonLangModel,
    CommonCountryModel,
    CommonCountryI18NModel,
    CommonAdministrativeAreaLevel1Model
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
    }
];
export const CommonSagas = [
    LangSagas,
    CountrySagas,
    AdministrativeAreaLevel1Sagas
];
