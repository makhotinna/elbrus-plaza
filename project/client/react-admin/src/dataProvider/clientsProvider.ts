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

import { Client } from './types'

let clientsData: Client[] = [
    {
        id: 1,
        ID_client: 101,
        ID_Hotel: 1,
        Name_client: 'Иванов Иван',
        Email_client: 'ivanov@example.com',
        Phone_client: '+7 (900) 123-45-67',
        Password_client: 'hashed_password_1',
        Points_balance: 1500
    },
    {
        id: 2,
        ID_client: 102,
        ID_Hotel: 2,
        Name_client: 'Петрова Мария',
        Email_client: 'petrova@example.com',
        Phone_client: '+7 (901) 234-56-78',
        Password_client: 'hashed_password_2',
        Points_balance: 3000
    },
    {
        id: 3,
        ID_client: 103,
        ID_Hotel: 1,
        Name_client: 'Сидоров Алексей',
        Email_client: 'sidorov@example.com',
        Phone_client: '+7 (902) 345-67-89',
        Password_client: 'hashed_password_3',
        Points_balance: 500
    }
];

export const clientsDataProvider: DataProvider = {
    getList: async <RecordType extends RaRecord = Client>(
        resource: string,
        params: GetListParams
    ): Promise<GetListResult<RecordType>> => {
        if (resource !== 'clients') {
            throw new Error('Resource not found');
        }

        const filter = params.filter || {};
        let filteredData = clientsData.filter(item => {
            return Object.keys(filter).every(key => {
                if (key === 'q') {
                    return (
                        item.ID_client.toString().includes(filter.q) ||
                        item.Name_client.toLowerCase().includes(filter.q.toLowerCase()) ||
                        item.Email_client.toLowerCase().includes(filter.q.toLowerCase()) ||
                        item.Phone_client.includes(filter.q)
                    );
                }
                if (key === 'hotel') {
                    return item.ID_Hotel === filter.hotel;
                }
                if (filter[key] === undefined) return true;
                return item[key as keyof Client] === filter[key];
            });
        });

        const { field = 'id', order = 'ASC' } = params.sort || {};
        filteredData.sort((a, b) => {
            if (order === 'ASC') {
                return a[field as keyof Client] > b[field as keyof Client] ? 1 : -1;
            } else {
                return a[field as keyof Client] < b[field as keyof Client] ? 1 : -1;
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

    getOne: async <RecordType extends RaRecord = Client>(
        resource: string,
        params: GetOneParams
    ): Promise<GetOneResult<RecordType>> => {
        if (resource !== 'clients') throw new Error('Resource not found');
        
        const client = clientsData.find(c => c.id === params.id);
        if (!client) throw new Error('Client not found');
        
        return { 
            data: client as unknown as RecordType 
        };
    },

    getMany: async <RecordType extends RaRecord = Client>(
        resource: string,
        params: GetManyParams
    ): Promise<GetManyResult<RecordType>> => {
        if (resource !== 'clients') throw new Error('Resource not found');
        
        const clients = clientsData
            .filter(client => params.ids.includes(client.id))
            .map(client => client as unknown as RecordType);
            
        return { data: clients };
    },

    getManyReference: async <RecordType extends RaRecord = Client>(
        resource: string,
        params: GetManyReferenceParams
    ): Promise<GetManyReferenceResult<RecordType>> => {
        if (resource !== 'clients') {
            throw new Error('Resource not found');
        }

        const { page = 1, perPage = 10 } = params.pagination || {};
        const { field = 'id', order = 'ASC' } = params.sort || {};
        const filter = params.filter || {};

        let filteredData = clientsData.filter(client => 
            client[params.target as keyof Client] === params.id
        );

        filteredData = filteredData.filter(client => {
            return Object.keys(filter).every(key => {
                if (key === 'q') {
                    const searchTerm = filter.q.toString().toLowerCase();
                    return (
                        client.Name_client.toLowerCase().includes(searchTerm) ||
                        client.Email_client.toLowerCase().includes(searchTerm) ||
                        client.Phone_client.includes(filter.q)
                    );
                }
                
                if (key === 'points_min') {
                    return client.Points_balance >= filter.points_min;
                }
                
                if (filter[key] === undefined) return true;
                
                return client[key as keyof Client] === filter[key];
            });
        });

        filteredData.sort((a, b) => {
            const aValue = a[field as keyof Client];
            const bValue = b[field as keyof Client];

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

    create: async <RecordType extends RaRecord = Client>(
        resource: string,
        params: CreateParams<RecordType>
    ): Promise<CreateResult<RecordType>> => {
        if (resource !== 'clients') throw new Error('Resource not found');

        const maxId = clientsData.length > 0 
            ? Math.max(...clientsData.map(c => c.id))
            : 0;
        const newId = maxId + 1;

        const newClient: Client = {
            id: newId,
            ID_client: newId,
            ID_Hotel: params.data.ID_Hotel || 0,
            Name_client: params.data.Name_client || 'Новый клиент',
            Email_client: params.data.Email_client || '',
            Phone_client: params.data.Phone_client || '',
            Password_client: params.data.Password_client || '',
            Points_balance: params.data.Points_balance || 0
        };

        clientsData.push(newClient);
        
        return { 
            data: newClient as unknown as RecordType 
        };
    },

    update: async <RecordType extends RaRecord = Client>(
        resource: string,
        params: UpdateParams<RecordType>
    ): Promise<UpdateResult<RecordType>> => {
        if (resource !== 'clients') throw new Error('Resource not found');
        
        const index = clientsData.findIndex(c => c.id === params.id);
        if (index === -1) throw new Error('Client not found');
        
        const updatedClient = {
            ...clientsData[index],  
            ...params.data,     
            id: params.id      
        };
        
        clientsData[index] = updatedClient;
        
        return { 
            data: updatedClient as unknown as RecordType 
        };
    },

    updateMany: async <RecordType extends RaRecord = Client>(
        resource: string,
        params: UpdateManyParams<Omit<RecordType, 'id'>>
    ): Promise<UpdateManyResult<RecordType>> => {
        if (resource !== 'clients') throw new Error('Resource not found');

        const updatedIds: (string | number)[] = [];
        
        params.ids.forEach(id => {
            const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
            const index = clientsData.findIndex(c => c.id === numericId);
            
            if (index !== -1) {
                const updatedClient = {
                    ...clientsData[index],
                    ...params.data,
                    id: numericId
                };
                
                clientsData[index] = updatedClient;
                updatedIds.push(id); 
            }
        });

        return { 
            data: updatedIds 
        };
    },

    delete: async <RecordType extends RaRecord = Client>(
        resource: string,
        params: DeleteParams
    ): Promise<DeleteResult<RecordType>> => {
        if (resource !== 'clients') throw new Error('Resource not found');
        
        const clientToDelete = clientsData.find(c => c.id === params.id);
        if (!clientToDelete) throw new Error('Client not found');
        
        clientsData = clientsData.filter(c => c.id !== params.id);
        
        return { 
            data: clientToDelete as unknown as RecordType 
        };
    },

    deleteMany: async <RecordType extends RaRecord = Client>(
        resource: string,
        params: DeleteManyParams
    ): Promise<DeleteManyResult<RecordType>> => {
        if (resource !== 'clients') throw new Error('Resource not found');
        
        const deletedIds = clientsData
            .filter(client => params.ids.includes(client.id))
            .map(client => client.id);

        clientsData = clientsData.filter(client => !params.ids.includes(client.id));

        return { 
            data: deletedIds as unknown as RecordType['id'][] 
        };
    },
};