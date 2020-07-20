declare let RG_GLOBAL_IP: string;

export const globalConfig = {
    api: RG_GLOBAL_IP ? RG_GLOBAL_IP : 'https://forms.dev.thewhite.ru/api',
    pageSize: 10,
    maxPageSize: 1000,
    notifyUpdateInterval: 20000,
};
