import { 
    DataProvider,
    GetListParams, GetListResult,
    GetOneParams, GetOneResult,
    GetManyParams, GetManyResult,
    GetManyReferenceParams, GetManyReferenceResult,
    CreateParams, CreateResult,
    UpdateParams, UpdateResult,
    UpdateManyParams, UpdateManyResult,
    DeleteParams, DeleteResult,
    DeleteManyParams, DeleteManyResult,
    RaRecord
} from 'react-admin';

import { Hotel } from './types';

let hotelsData: Hotel[] = [
    {
        id: 1,
        name_hotel: 'Эльбрус Плаза Премиум',
        adress_hotel: 'Кабардино-Балкария, г. Терскол, ул. Гора Эльбрус, д. 1',
        phone_hotel: '+7 (86638) 7-11-11',
        rating_hotel: 5,
        description_hotel: 'Роскошный отель у подножия Эльбруса с собственным спа-комплексом и видом на горы.',
        email_hotel: 'premium@elbrus-plaza.ru'
    },
    {
        id: 2,
        name_hotel: 'Эльбрус Плаза Горный',
        adress_hotel: 'Кабардино-Балкария, пос. Эльбрус, ул. Алибек, д. 15',
        phone_hotel: '+7 (86638) 6-22-33',
        rating_hotel: 4,
        description_hotel: 'Уютный горный отель с камином в лобби и традиционной балкарской кухней.',
        email_hotel: 'mountain@elbrus-plaza.ru'
    },
    {
        id: 3,
        name_hotel: 'Эльбрус Плаза Альпийский',
        adress_hotel: 'Кабардино-Балкария, г. Тырныауз, ул. Гагарина, д. 42',
        phone_hotel: '+7 (86638) 4-33-44',
        rating_hotel: 3,
        description_hotel: 'Экономичный вариант для альпинистов и туристов.',
        email_hotel: 'alpine@elbrus-plaza.ru'
    }
];

export const hotelDataProvider: DataProvider = {
    getList: async <RecordType extends RaRecord = Hotel>(
        resource: string,
        params: GetListParams
    ): Promise<GetListResult<RecordType>> => {
        if (resource !== 'hotels') {
            throw new Error('Resource not found');
        }

        const filter = params.filter || {};
        let filteredData = hotelsData.filter(item => {
            return Object.keys(filter).every(key => {
                if (key === 'q') {
                    return (
                        item.name_hotel.toLowerCase().includes(filter.q.toLowerCase()) ||
                        item.adress_hotel.toLowerCase().includes(filter.q.toLowerCase()) ||
                        item.phone_hotel.includes(filter.q)
                    );
                }
                if (filter[key] === undefined) return true;
                return item[key as keyof Hotel] === filter[key];
            });
        });

        const { field = 'id', order = 'ASC' } = params.sort || {};
        filteredData.sort((a, b) => {
            if (order === 'ASC') {
                return a[field as keyof Hotel] > b[field as keyof Hotel] ? 1 : -1;
            } else {
                return a[field as keyof Hotel] < b[field as keyof Hotel] ? 1 : -1;
            }
        });

        const { page = 1, perPage = 10 } = params.pagination || {};
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const paginatedData = filteredData.slice(start, end) as unknown as RecordType[];

        return {
            data: paginatedData,
            total: filteredData.length,
        };
    },
    getOne: async <RecordType extends RaRecord = Hotel>(
    resource: string,
    params: GetOneParams
): Promise<GetOneResult<RecordType>> => {
    console.log('getOne params:', params);
    if (resource !== 'hotels') throw new Error('Resource not found');
    
    const id = typeof params.id === 'string' ? parseInt(params.id, 10) : params.id;
    
    const hotel = hotelsData.find(h => h.id === id);
    if (!hotel) throw new Error(`Hotel not found for id: ${id}`);
    
    return { 
        data: hotel as unknown as RecordType 
    };
},
    getMany: async <RecordType extends RaRecord = Hotel>(
    resource: string,
    params: GetManyParams
): Promise<GetManyResult<RecordType>> => {
    if (resource !== 'hotels') throw new Error('Resource not found');
    
    const hotels = hotelsData
        .filter(hotel => params.ids.includes(hotel.id))
        .map(hotel => hotel as unknown as RecordType);
        
    return { data: hotels };
},
    getManyReference: async <RecordType extends RaRecord = Hotel>(
    resource: string,
    params: GetManyReferenceParams
): Promise<GetManyReferenceResult<RecordType>> => {
    if (resource !== 'hotels') {
        throw new Error('Resource not found');
    }

    const { page = 1, perPage = 10 } = params.pagination || {};
    const { field = 'id', order = 'ASC' } = params.sort || {};
    const filter = params.filter || {};

    let filteredData = hotelsData.filter(hotel => 
        hotel[params.target as keyof Hotel] === params.id
    );

    filteredData = filteredData.filter(hotel => {
        return Object.keys(filter).every(key => {
            if (key === 'q') {
                const searchTerm = filter.q.toString().toLowerCase();
                return (
                    hotel.name_hotel.toLowerCase().includes(searchTerm) ||
                    hotel.adress_hotel.toLowerCase().includes(searchTerm) ||
                    hotel.phone_hotel.includes(filter.q) ||
                    hotel.rating_hotel.toString().includes(filter.q)
                );
            }
            
            if (key === 'rating_hotel_gte') {
                return hotel.rating_hotel >= filter.rating_hotel_gte;
            }
            
            if (filter[key] === undefined) return true;
            
            return hotel[key as keyof Hotel] === filter[key];
        });
    });

    filteredData.sort((a, b) => {
        const aValue = a[field as keyof Hotel];
        const bValue = b[field as keyof Hotel];

        if (order === 'ASC') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const start = (page - 1) * perPage;
    const paginatedData = filteredData.slice(start, start + perPage);

    return {
        data: paginatedData as unknown as RecordType[],
        total: filteredData.length,
    };
},
    create: async <RecordType extends RaRecord = Hotel>(
    resource: string,
    params: CreateParams<RecordType>
): Promise<CreateResult<RecordType>> => {
    if (resource !== 'hotels') throw new Error('Resource not found');

    const maxId = hotelsData.length > 0 
        ? Math.max(...hotelsData.map(h => h.id))
        : 0;
    const newId = maxId + 1;

    const newHotel: Hotel = {
        id: newId,
        name_hotel: params.data.name_hotel || 'Новый отель',
        adress_hotel: params.data.adress_hotel || 'Адрес не указан',
        phone_hotel: params.data.phone_hotel || '+7 (000) 000-00-00',
        rating_hotel: params.data.rating_hotel !== undefined 
            ? Math.min(Math.max(params.data.rating_hotel, 1), 5) 
            : 3, 
        description_hotel: params.data.description_hotel || '',
        email_hotel: params.data.email_hotel || 'info@hotel.ru'
    };

    hotelsData.push(newHotel);
    
    return { 
        data: newHotel as unknown as RecordType 
    };
},
    update: async <RecordType extends RaRecord = Hotel>(
    resource: string,
    params: UpdateParams<RecordType>
): Promise<UpdateResult<RecordType>> => {
    if (resource !== 'hotels') throw new Error('Resource not found');
    
    const index = hotelsData.findIndex(h => h.id === params.id);
    if (index === -1) throw new Error('Hotel not found');
    
    const updatedHotel = {
        ...hotelsData[index],  
        ...params.data,     
        id: params.id      
    };
    
    if (updatedHotel.rating_hotel !== undefined) {
        updatedHotel.rating_hotel = Math.min(Math.max(updatedHotel.rating_hotel, 1), 5);
    }
  
    hotelsData[index] = updatedHotel;
    
    return { 
        data: updatedHotel as unknown as RecordType 
    };
},
    updateMany: async <RecordType extends RaRecord = Hotel>(
    resource: string,
    params: UpdateManyParams<Omit<RecordType, 'id'>>
): Promise<UpdateManyResult<RecordType>> => {
    if (resource !== 'hotels') throw new Error('Resource not found');

    const updatedIds: (string | number)[] = [];
    
    params.ids.forEach(id => {
        const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
        const index = hotelsData.findIndex(h => h.id === numericId);
        
        if (index !== -1) {
            const updatedHotel = {
                ...hotelsData[index],
                ...params.data,
                id: numericId,
                rating_hotel: params.data.rating_hotel !== undefined 
                    ? Math.min(Math.max(params.data.rating_hotel, 1), 5)
                    : hotelsData[index].rating_hotel
            };
            
            hotelsData[index] = updatedHotel;
            updatedIds.push(id); 
        }
    });

    return { 
        data: updatedIds 
    };
},

    delete: async <RecordType extends RaRecord = Hotel>(
    resource: string,
    params: DeleteParams
): Promise<DeleteResult<RecordType>> => {
    if (resource !== 'hotels') throw new Error('Resource not found');
    
    const hotelToDelete = hotelsData.find(h => h.id === params.id);
    if (!hotelToDelete) throw new Error('Hotel not found');
    
    hotelsData = hotelsData.filter(h => h.id !== params.id);
    
    return { 
        data: hotelToDelete as unknown as RecordType 
    };
},
    deleteMany: async <RecordType extends RaRecord = Hotel>(
    resource: string,
    params: DeleteManyParams
): Promise<DeleteManyResult<RecordType>> => {
    if (resource !== 'hotels') throw new Error('Resource not found');
    
    const deletedIds = hotelsData
        .filter(hotel => params.ids.includes(hotel.id))
        .map(hotel => hotel.id);

    hotelsData = hotelsData.filter(hotel => !params.ids.includes(hotel.id));

    return { 
        data: deletedIds as unknown as RecordType['id'][] 
    };
},
}