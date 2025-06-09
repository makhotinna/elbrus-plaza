import { 
  DataProvider,
  GetListParams,
  GetListResult,
  GetOneParams,
  GetManyParams,
  GetManyReferenceParams,
  CreateParams,
  UpdateParams,
  UpdateManyParams,
  DeleteParams,
  DeleteManyParams,
  RaRecord,
  fetchUtils,
  GetOneResult,
  CreateResult,
  UpdateResult,
  DeleteResult,
  GetManyResult,
  GetManyReferenceResult
} from 'react-admin';

interface Room {
  ID_Room: number;
  Number_room: string;
  Type_room: string;
  Room_Availability: boolean;
  Price: number;
  ID_Hotel: number;
}

interface RoomRecord extends RaRecord {
  Number_room: string;
  Type_room: string;
  Room_Availability: boolean;
  Price: number;
  ID_Hotel: number;
}

const apiUrl = 'http://26.118.5.15:8787/api';
const httpClient = fetchUtils.fetchJson;

function isRoom(data: unknown): data is Room {
  return !!data && 
         typeof (data as Room).ID_Room === 'number' &&
         typeof (data as Room).Number_room === 'string' &&
         typeof (data as Room).Type_room === 'string' &&
         typeof (data as Room).Room_Availability === 'boolean' &&
         typeof (data as Room).Price === 'number' &&
         typeof (data as Room).ID_Hotel === 'number';
}

const transformRoomToRecord = (room: Room): RoomRecord => {
  if (!isRoom(room)) {
    throw new Error('Invalid room data');
  }
  return {
    ...room,
    id: room.ID_Room.toString()
  };
};

const transformRecordToRoom = (record: RoomRecord): Room => {
  return {
    ...record,
    ID_Room: Number(record.id)
  };
};

export const roomsDataProvider: DataProvider = {
  getList: async <RecordType extends RaRecord = RoomRecord>(
    resource: string,
    params: GetListParams
  ): Promise<GetListResult<RecordType>> => {
    if (resource === 'hotel-rooms' && !params.filter?.ID_Hotel) {
      throw new Error('Для получения номеров отеля необходимо указать ID_Hotel');
    }

    const url = resource === 'hotel-rooms'
      ? `${apiUrl}/rooms?ID_Hotel=${params.filter.ID_Hotel}`
      : `${apiUrl}/rooms`;

    try {
      const { json } = await httpClient(url);
      
      const responseData = (Array.isArray(json) ? json : json?.data || [])
        .map((item: unknown) => {
          if (!isRoom(item)) throw new Error('Invalid room data');
          return transformRoomToRecord(item) as unknown as RecordType;
        });

      const total = Array.isArray(json) ? json.length : json?.total || responseData.length;

      let filteredData = responseData;
      if (params.filter?.onlyAvailable === 'true') {
        filteredData = responseData.filter((room: RecordType) => 
          (room as unknown as RoomRecord).Room_Availability
        );
      }

      const { field = 'id', order = 'ASC' } = params.sort || {};
      filteredData.sort((a: RecordType, b: RecordType) => {
        const aRoom = a as unknown as RoomRecord;
        const bRoom = b as unknown as RoomRecord;
        const aValue = aRoom[field as keyof RoomRecord];
        const bValue = bRoom[field as keyof RoomRecord];
        if (aValue === undefined || bValue === undefined) return 0;
        return order === 'ASC' 
          ? (aValue > bValue ? 1 : -1) 
          : (aValue < bValue ? 1 : -1);
      });

      const { page = 1, perPage = 10 } = params.pagination || {};
      const start = (page - 1) * perPage;
      const data = filteredData.slice(start, start + perPage);

      return {
        data,
        total
      };
    } catch (error) {
      console.error('Ошибка при загрузке номеров:', error);
      throw new Error('Не удалось загрузить данные о номерах');
    }
  },

  getOne: async <RecordType extends RaRecord = RoomRecord>(
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult<RecordType>> => {
    try {
      const { json } = await httpClient(`${apiUrl}/rooms/${params.id}`);
      if (!isRoom(json)) throw new Error('Invalid room data');
      return { 
        data: transformRoomToRecord(json) as unknown as RecordType
      };
    } catch (error) {
      console.error('Ошибка при загрузке номера:', error);
      throw new Error(`Не удалось загрузить номер #${params.id}`);
    }
  },

  create: async <
    RecordType extends Omit<RaRecord, 'id'> = Omit<RoomRecord, 'id'>,
    ResultRecordType extends RaRecord = RoomRecord
  >(
    resource: string,
    params: CreateParams<RecordType>
  ): Promise<CreateResult<ResultRecordType>> => {
    try {
      const roomData = transformRecordToRoom(params.data as unknown as RoomRecord);
      const { json } = await httpClient(`${apiUrl}/rooms`, {
        method: 'POST',
        body: JSON.stringify(roomData),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      if (!isRoom(json)) throw new Error('Invalid room data');
      return { 
        data: transformRoomToRecord(json) as unknown as ResultRecordType
      };
    } catch (error) {
      console.error('Ошибка при создании номера:', error);
      throw new Error('Не удалось создать номер');
    }
  },

  update: async <RecordType extends RaRecord = RoomRecord>(
    resource: string,
    params: UpdateParams<RecordType>
  ): Promise<UpdateResult<RecordType>> => {
    try {
      const roomData = transformRecordToRoom(params.data as unknown as RoomRecord);
      const { json } = await httpClient(`${apiUrl}/rooms/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(roomData),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      if (!isRoom(json)) throw new Error('Invalid room data');
      return { 
        data: transformRoomToRecord(json) as unknown as RecordType
      };
    } catch (error) {
      console.error('Ошибка при обновлении номера:', error);
      throw new Error(`Не удалось обновить номер #${params.id}`);
    }
  },

  delete: async <RecordType extends RaRecord = RoomRecord>(
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult<RecordType>> => {
    try {
      const { json } = await httpClient(`${apiUrl}/rooms/${params.id}`, {
        method: 'DELETE',
      });
      if (!isRoom(json)) throw new Error('Invalid room data');
      return { 
        data: transformRoomToRecord(json) as unknown as RecordType
      };
    } catch (error) {
      console.error('Ошибка при удалении номера:', error);
      throw new Error(`Не удалось удалить номер #${params.id}`);
    }
  },

  getMany: async <RecordType extends RaRecord = RoomRecord>(
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<RecordType>> => {
    try {
      const { json } = await httpClient(`${apiUrl}/rooms`);
      const filteredData = json
        .filter((item: unknown) => {
          if (!isRoom(item)) return false;
          return params.ids.includes(item.ID_Room.toString());
        })
        .map((room: Room) => transformRoomToRecord(room) as unknown as RecordType);
      
      return { 
        data: filteredData
      };
    } catch (error) {
      console.error('Ошибка при массовом получении номеров:', error);
      throw new Error('Не удалось загрузить запрошенные номера');
    }
  },

  getManyReference: async <RecordType extends RaRecord = RoomRecord>(
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<RecordType>> => {
    try {
      const { json } = await httpClient(`${apiUrl}/rooms?${params.target}=${params.id}`);
      
      const responseData = (Array.isArray(json) ? json : json?.data || [])
        .map((item: unknown) => {
          if (!isRoom(item)) throw new Error('Invalid room data');
          return transformRoomToRecord(item) as unknown as RecordType;
        });

      let filteredData = responseData;
      if (params.filter?.q) {
        const searchTerm = params.filter.q.toString().toLowerCase();
        filteredData = responseData.filter((room: RecordType) => {
          const roomRecord = room as unknown as RoomRecord;
          return (
            roomRecord.Number_room?.toString().includes(searchTerm) ||
            roomRecord.Type_room?.toLowerCase().includes(searchTerm)
          );
        });
      }

      const { field = 'id', order = 'ASC' } = params.sort || {};
      filteredData.sort((a: RecordType, b: RecordType) => {
        const aRoom = a as unknown as RoomRecord;
        const bRoom = b as unknown as RoomRecord;
        const aValue = aRoom[field as keyof RoomRecord];
        const bValue = bRoom[field as keyof RoomRecord];
        if (aValue === undefined || bValue === undefined) return 0;
        return order === 'ASC' 
          ? (aValue > bValue ? 1 : -1) 
          : (aValue < bValue ? 1 : -1);
      });

      const { page = 1, perPage = 10 } = params.pagination || {};
      const start = (page - 1) * perPage;
      const data = filteredData.slice(start, start + perPage);

      return {
        data,
        total: filteredData.length,
      };
    } catch (error) {
      console.error('Ошибка при получении связанных номеров:', error);
      throw new Error('Не удалось загрузить связанные номера');
    }
  },

  updateMany: async <RecordType extends RaRecord = RoomRecord>(
    resource: string,
    params: UpdateManyParams<RecordType>
  ): Promise<{ data: RecordType['id'][] }> => {
    try {
      const roomData = transformRecordToRoom(params.data as unknown as RoomRecord);
      await Promise.all(
        params.ids.map(id =>
          httpClient(`${apiUrl}/rooms/${id}`, {
            method: 'PUT',
            body: JSON.stringify(roomData),
            headers: new Headers({ 'Content-Type': 'application/json' }),
          })
        )
      );

      return { 
        data: params.ids 
      };
    } catch (error) {
      console.error('Ошибка при массовом обновлении номеров:', error);
      throw new Error('Не удалось обновить номера');
    }
  },

  deleteMany: async <RecordType extends RaRecord = RoomRecord>(
    resource: string,
    params: DeleteManyParams
  ): Promise<{ data: RecordType['id'][] }> => {
    try {
      await Promise.all(
        params.ids.map(id =>
          httpClient(`${apiUrl}/rooms/${id}`, {
            method: 'DELETE',
          })
        )
      );

      return { 
        data: params.ids 
      };
    } catch (error) {
      console.error('Ошибка при массовом удалении номеров:', error);
      throw new Error('Не удалось удалить номера');
    }
  },
};