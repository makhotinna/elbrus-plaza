import { DataProvider, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:8787/api';
const httpClient = fetchUtils.fetchJson;

// Функция преобразования записей
const transformRecord = (record: any) => {
    
    if (record.ID_Room !== undefined) {
        return {
            ...record,
            id: record.ID_Room
        };
    }
    if (record.ID_Client !== undefined) {
        return {
            ...record,
            id: record.ID_Client
        };
    }
    // Преобразование отелей
    if (record.ID_Hotel !== undefined) {
        return { 
            ...record,
            id: record.ID_Hotel
        };
    }
    // Преобразование клиентов


    return record;
};

export const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        const { page = 1, perPage = 10 } = params.pagination || {};
        const { field = 'id', order = 'ASC' } = params.sort || {};
        
        const query = {
            page,
            perPage,
            sort: field,
            order,
            ...params.filter
        };
        if (resource === 'hotel-rooms') {
            // 1. Достаём ID отеля из фильтров
            const { ID_Hotel, Room_Availability } = params.filter;
            let endpoint = 'rooms'
            if (Room_Availability === 'all') endpoint = 'rooms'
            if (Room_Availability === 'false') endpoint = 'rooms/unavailable'
            if (Room_Availability === 'true') endpoint = 'rooms/available'
            
            // 2. Формируем кастомный URL
            const url = `${apiUrl}/hotel/${ID_Hotel}/${endpoint}`;
            console.log(url)
            
            // 3. Делаем запрос
            const { json } = await httpClient(url);
            
            return { data: json.map(transformRecord), total: json.length };
        }

        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        console.log(url)
        const { json, headers } = await httpClient(url);

        return {
            data: json.map(transformRecord),
            total: parseInt(headers.get('x-total-count') || json.length, 10)
        };
    },

    getOne: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url);
        return { data: transformRecord(json) };
    },

    getMany: async (resource, params) => {
        const query = {
            ids: params.ids.join(',')
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json } = await httpClient(url);
        return { data: json.map(transformRecord) };
    },

    getManyReference: async (resource, params) => {
        const { page = 1, perPage = 10 } = params.pagination || {};
        const { field = 'id', order = 'ASC' } = params.sort || {};
        
        const query = {
            page,
            perPage,
            sort: field,
            order,
            [params.target]: params.id,
            ...params.filter
        };

        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const { json, headers } = await httpClient(url);

        return {
            data: json.map(transformRecord),
            total: parseInt(headers.get('x-total-count') || json.length, 10)
        };
    },

    create: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const { json } = await httpClient(url, {
            method: 'POST',
            body: JSON.stringify(params.data),
        });
        return { data: transformRecord(json) };
    },

    update: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });
        return { data: transformRecord(json) };
    },

    updateMany: async (resource, params) => {
        const responses = await Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                })
            )
        );
        return { data: responses.map(({ json }) => json.id) };
    },

    delete: async (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        const { json } = await httpClient(url, {
            method: 'DELETE',
        });
        return { data: transformRecord(json) };
    },

    deleteMany: async (resource, params) => {
        const responses = await Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        );
        return { data: responses.map(({ json }) => json.id) };
    }
};