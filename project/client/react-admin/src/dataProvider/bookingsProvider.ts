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

import { Booking } from './types'

let bookingsData: Booking[] = [
    {
        id: 1,
        ID_booking: 1,
        ID_client: 101,
        ID_Hotel: 1,
        ID_room: 101,
        In_date_booking: '2023-06-15',
        Out_day_booking: '2023-06-20',
        Price_of_booking: 25000,
        Status_booking: 'confirmed',
        Status_payment: 'paid'
    },
    {
        id: 2,
        ID_booking: 2,
        ID_client: 102,
        ID_Hotel: 1,
        ID_room: 102,
        In_date_booking: '2023-07-01',
        Out_day_booking: '2023-07-10',
        Price_of_booking: 45000,
        Status_booking: 'completed',
        Status_payment: 'paid'
    },
    {
        id: 3,
        ID_booking: 3,
        ID_client: 103,
        ID_Hotel: 2,
        ID_room: 201,
        In_date_booking: '2023-08-05',
        Out_day_booking: '2023-08-15',
        Price_of_booking: 32000,
        Status_booking: 'pending',
        Status_payment: 'unpaid'
    },
];

export const bookingsDataProvider: DataProvider = {
    getList: async <RecordType extends RaRecord = Booking>(
        resource: string,
        params: GetListParams
    ): Promise<GetListResult<RecordType>> => {
        if (resource !== 'bookings') {
            throw new Error('Resource not found');
        }

        const filter = params.filter || {};
        let filteredData = bookingsData.filter(item => {
            return Object.keys(filter).every(key => {
                if (key === 'q') {
                    return (
                        item.ID_booking.toString().includes(filter.q) ||
                        item.ID_client.toString().includes(filter.q) ||
                        item.ID_Hotel.toString().includes(filter.q) ||
                        item.ID_room.toString().includes(filter.q)
                    );
                }
                if (key === 'date_range') {
                    return (
                        item.In_date_booking >= filter.date_range.start &&
                        item.Out_day_booking <= filter.date_range.end
                    );
                }
                if (filter[key] === undefined) return true;
                return item[key as keyof Booking] === filter[key];
            });
        });

        const { field = 'id', order = 'ASC' } = params.sort || {};
        filteredData.sort((a, b) => {
            if (order === 'ASC') {
                return a[field as keyof Booking] > b[field as keyof Booking] ? 1 : -1;
            } else {
                return a[field as keyof Booking] < b[field as keyof Booking] ? 1 : -1;
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

    getOne: async <RecordType extends RaRecord = Booking>(
    resource: string,
    params: GetOneParams
): Promise<GetOneResult<RecordType>> => {
    console.log('getOne params:', params);
    if (resource !== 'bookings') throw new Error('Resource not found');
    
    // Преобразуем ID в число
    const id = typeof params.id === 'string' ? parseInt(params.id, 10) : params.id;
    
    const booking = bookingsData.find(b => b.id === id);
    if (!booking) throw new Error(`Booking not found for id: ${id}`);
    
    return { 
        data: booking as unknown as RecordType 
    };
},

    getMany: async <RecordType extends RaRecord = Booking>(
        resource: string,
        params: GetManyParams
    ): Promise<GetManyResult<RecordType>> => {
        if (resource !== 'bookings') throw new Error('Resource not found');
        
        const bookings = bookingsData
            .filter(booking => params.ids.includes(booking.id))
            .map(booking => booking as unknown as RecordType);
            
        return { data: bookings };
    },

    getManyReference: async <RecordType extends RaRecord = Booking>(
        resource: string,
        params: GetManyReferenceParams
    ): Promise<GetManyReferenceResult<RecordType>> => {
        if (resource !== 'bookings') {
            throw new Error('Resource not found');
        }

        const { page = 1, perPage = 10 } = params.pagination || {};
        const { field = 'id', order = 'ASC' } = params.sort || {};
        const filter = params.filter || {};

        let filteredData = bookingsData.filter(booking => 
            booking[params.target as keyof Booking] === params.id
        );

        filteredData = filteredData.filter(booking => {
            return Object.keys(filter).every(key => {
                if (key === 'q') {
                    const searchTerm = filter.q.toString().toLowerCase();
                    return (
                        booking.ID_booking.toString().includes(searchTerm) ||
                        booking.ID_client.toString().includes(searchTerm) ||
                        booking.ID_Hotel.toString().includes(searchTerm) ||
                        booking.ID_room.toString().includes(searchTerm)
                    );
                }
                
                if (key === 'date_range') {
                    return (
                        booking.In_date_booking >= filter.date_range.start &&
                        booking.Out_day_booking <= filter.date_range.end
                    );
                }
                
                if (filter[key] === undefined) return true;
                
                return booking[key as keyof Booking] === filter[key];
            });
        });

        filteredData.sort((a, b) => {
            const aValue = a[field as keyof Booking];
            const bValue = b[field as keyof Booking];

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

    create: async <RecordType extends RaRecord = Booking>(
        resource: string,
        params: CreateParams<RecordType>
    ): Promise<CreateResult<RecordType>> => {
        if (resource !== 'bookings') throw new Error('Resource not found');

        const maxId = bookingsData.length > 0 
            ? Math.max(...bookingsData.map(b => b.id))
            : 0;
        const newId = maxId + 1;

        const newBooking: Booking = {
            id: newId,
            ID_booking: newId,
            ID_client: params.data.ID_client || 0,
            ID_Hotel: params.data.ID_Hotel || 0,
            ID_room: params.data.ID_room || 0,
            In_date_booking: params.data.In_date_booking || new Date().toISOString().split('T')[0],
            Out_day_booking: params.data.Out_day_booking || new Date(Date.now() + 86400000).toISOString().split('T')[0],
            Price_of_booking: params.data.Price_of_booking || 0,
            Status_booking: params.data.Status_booking || 'pending',
            Status_payment: params.data.Status_payment || 'unpaid'
        };

        bookingsData.push(newBooking);
        
        return { 
            data: newBooking as unknown as RecordType 
        };
    },

    update: async <RecordType extends RaRecord = Booking>(
        resource: string,
        params: UpdateParams<RecordType>
    ): Promise<UpdateResult<RecordType>> => {
        if (resource !== 'bookings') throw new Error('Resource not found');
        
        const index = bookingsData.findIndex(b => b.id === params.id);
        if (index === -1) throw new Error('Booking not found');
        
        const updatedBooking = {
            ...bookingsData[index],  
            ...params.data,     
            id: params.id      
        };
        
        bookingsData[index] = updatedBooking;
        
        return { 
            data: updatedBooking as unknown as RecordType 
        };
    },

    updateMany: async <RecordType extends RaRecord = Booking>(
        resource: string,
        params: UpdateManyParams<Omit<RecordType, 'id'>>
    ): Promise<UpdateManyResult<RecordType>> => {
        if (resource !== 'bookings') throw new Error('Resource not found');

        const updatedIds: (string | number)[] = [];
        
        params.ids.forEach(id => {
            const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
            const index = bookingsData.findIndex(b => b.id === numericId);
            
            if (index !== -1) {
                const updatedBooking = {
                    ...bookingsData[index],
                    ...params.data,
                    id: numericId
                };
                
                bookingsData[index] = updatedBooking;
                updatedIds.push(id); 
            }
        });

        return { 
            data: updatedIds 
        };
    },

    delete: async <RecordType extends RaRecord = Booking>(
        resource: string,
        params: DeleteParams
    ): Promise<DeleteResult<RecordType>> => {
        if (resource !== 'bookings') throw new Error('Resource not found');
        
        const bookingToDelete = bookingsData.find(b => b.id === params.id);
        if (!bookingToDelete) throw new Error('Booking not found');
        
        bookingsData = bookingsData.filter(b => b.id !== params.id);
        
        return { 
            data: bookingToDelete as unknown as RecordType 
        };
    },

    deleteMany: async <RecordType extends RaRecord = Booking>(
        resource: string,
        params: DeleteManyParams
    ): Promise<DeleteManyResult<RecordType>> => {
        if (resource !== 'bookings') throw new Error('Resource not found');
        
        const deletedIds = bookingsData
            .filter(booking => params.ids.includes(booking.id))
            .map(booking => booking.id);

        bookingsData = bookingsData.filter(booking => !params.ids.includes(booking.id));

        return { 
            data: deletedIds as unknown as RecordType['id'][] 
        };
    },
};