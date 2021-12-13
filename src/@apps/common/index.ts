import { CommonLangHandlers, CommonLangServices, CommonLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { CommonCountryHandlers, CommonCountryServices, CommonCountryModel, ICountryRepository, SequelizeCountryRepository, CountrySagas, CommonCountryI18NModel, ICountryI18NRepository, SequelizeCountryI18NRepository } from './country';

export const CommonHandlers = [
    ...CommonLangHandlers,
    ...CommonCountryHandlers
];
export const CommonServices = [
    ...CommonLangServices,
    ...CommonCountryServices
];
export const CommonModels = [
    CommonLangModel,
    CommonCountryModel,
    CommonCountryI18NModel
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
    }
];
export const CommonSagas = [
    LangSagas,
    CountrySagas
];
