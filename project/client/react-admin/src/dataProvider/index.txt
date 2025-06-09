import { 
  DataProvider,
  GetListParams,
  GetListResult,
  GetOneParams,
  GetOneResult,
  GetManyParams,
  GetManyResult,
  GetManyReferenceParams,
  GetManyReferenceResult,
  CreateParams,
  CreateResult,
  UpdateParams,
  UpdateResult,
  UpdateManyParams,
  UpdateManyResult,
  DeleteParams,
  DeleteResult,
  DeleteManyParams,
  DeleteManyResult,
  RaRecord
} from 'react-admin';
import { hotelDataProvider } from './hotelsProvider';
import { roomsDataProvider } from './roomsProvider';
import { bookingsDataProvider } from './bookingsProvider';
import { clientsDataProvider } from './clientsProvider';

interface CustomUpdateManyParams<RecordType extends RaRecord = any> extends UpdateManyParams<RecordType> {
  filter?: {
    ID_Hotel?: number;
  };
}

interface CustomDeleteManyParams<RecordType extends RaRecord = any> extends DeleteManyParams<RecordType> {
  filter?: {
    ID_Hotel?: number;
  };
}

export const dataProvider: DataProvider = {
  getList: async <RecordType extends RaRecord = any>(
    resource: string,
    params: GetListParams
  ): Promise<GetListResult<RecordType>> => {
    if (resource === 'hotel-rooms' && !params.filter?.ID_Hotel) {
      throw new Error('Для получения номеров отеля необходимо указать ID_Hotel');
    }

    try {
      switch (resource) {
        case 'hotels':
          return await hotelDataProvider.getList<RecordType>(resource, params);
        case 'rooms':
        case 'hotel-rooms':
          return await roomsDataProvider.getList<RecordType>(resource, params);
        case 'bookings':
          return await bookingsDataProvider.getList<RecordType>(resource, params);
        case 'clients':
          return await clientsDataProvider.getList<RecordType>(resource, params);
        default:
          throw new Error(`Неизвестный ресурс: ${resource}`);
      }
    } catch (error) {
      console.error(`Ошибка при получении списка ${resource}:`, error);
      throw new Error(`Не удалось получить список ${resource}`);
    }
  },

  getOne: async <RecordType extends RaRecord = any>(
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult<RecordType>> => {
    try {
      switch (resource) {
        case 'hotels':
          return await hotelDataProvider.getOne<RecordType>(resource, params);
        case 'rooms':
        case 'hotel-rooms':
          return await roomsDataProvider.getOne<RecordType>(resource, params);
        case 'bookings':
          return await bookingsDataProvider.getOne<RecordType>(resource, params);
        case 'clients':
          return await clientsDataProvider.getOne<RecordType>(resource, params);
        default:
          throw new Error(`Неизвестный ресурс: ${resource}`);
      }
    } catch (error) {
      console.error(`Ошибка при получении ${resource}:`, error);
      throw new Error(`Не удалось получить ${resource} #${params.id}`);
    }
  },

  getMany: async <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<RecordType>> => {
    try {
      switch (resource) {
        case 'hotels':
          return await hotelDataProvider.getMany<RecordType>(resource, params);
        case 'rooms':
        case 'hotel-rooms':
          return await roomsDataProvider.getMany<RecordType>(resource, params);
        case 'bookings':
          return await bookingsDataProvider.getMany<RecordType>(resource, params);
        case 'clients':
          return await clientsDataProvider.getMany<RecordType>(resource, params);
        default:
          throw new Error(`Неизвестный ресурс: ${resource}`);
      }
    } catch (error) {
      console.error(`Ошибка при массовом получении ${resource}:`, error);
      throw new Error(`Не удалось получить ${resource}`);
    }
  },

  getManyReference: async <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<RecordType>> => {
    try {
      switch (resource) {
        case 'hotels':
          return await hotelDataProvider.getManyReference<RecordType>(resource, params);
        case 'rooms':
        case 'hotel-rooms':
          return await roomsDataProvider.getManyReference<RecordType>(resource, params);
        case 'bookings':
          return await bookingsDataProvider.getManyReference<RecordType>(resource, params);
        case 'clients':
          return await clientsDataProvider.getManyReference<RecordType>(resource, params);
        default:
          throw new Error(`Неизвестный ресурс: ${resource}`);
      }
    } catch (error) {
      console.error(`Ошибка при получении связанных ${resource}:`, error);
      throw new Error(`Не удалось получить связанные ${resource}`);
    }
  },

  create: async <RecordType extends Omit<RaRecord, 'id'> = any, ResultRecordType extends RaRecord = RecordType & { id: string }>(
    resource: string,
    params: CreateParams<RecordType>
  ): Promise<CreateResult<ResultRecordType>> => {
    try {
      switch (resource) {
        case 'hotels':
          return await hotelDataProvider.create<RecordType, ResultRecordType>(resource, params);
        case 'rooms':
          return await roomsDataProvider.create<RecordType, ResultRecordType>(resource, params);
        case 'bookings':
          return await bookingsDataProvider.create<RecordType, ResultRecordType>(resource, params);
        case 'clients':
          return await clientsDataProvider.create<RecordType, ResultRecordType>(resource, params);
        default:
          throw new Error(`Неизвестный ресурс: ${resource}`);
      }
    } catch (error) {
      console.error(`Ошибка при создании ${resource}:`, error);
      throw new Error(`Не удалось создать ${resource}`);
    }
  },

  update: async <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateParams<RecordType>
  ): Promise<UpdateResult<RecordType>> => {
    try {
      switch (resource) {
        case 'hotels':
          return await hotelDataProvider.update<RecordType>(resource, params);
        case 'rooms':
        case 'hotel-rooms':
          return await roomsDataProvider.update<RecordType>(resource, params);
        case 'bookings':
          return await bookingsDataProvider.update<RecordType>(resource, params);
        case 'clients':
          return await clientsDataProvider.update<RecordType>(resource, params);
        default:
          throw new Error(`Неизвестный ресурс: ${resource}`);
      }
    } catch (error) {
      console.error(`Ошибка при обновлении ${resource}:`, error);
      throw new Error(`Не удалось обновить ${resource} #${params.id}`);
    }
  },

  updateMany: async <RecordType extends RaRecord = any>(
    resource: string,
    params: CustomUpdateManyParams<RecordType>
  ): Promise<UpdateManyResult<RecordType>> => {
    if (resource === 'hotel-rooms' && !params.filter?.ID_Hotel) {
      throw new Error('Для массового обновления номеров отеля необходимо указать ID_Hotel');
    }

    try {
      switch (resource) {
        case 'hotels':
          return await hotelDataProvider.updateMany<RecordType>(resource, params);
        case 'rooms':
        case 'hotel-rooms':
          return await roomsDataProvider.updateMany<RecordType>(resource, params);
        case 'bookings':
          return await bookingsDataProvider.updateMany<RecordType>(resource, params);
        case 'clients':
          return await clientsDataProvider.updateMany<RecordType>(resource, params);
        default:
          throw new Error(`Неизвестный ресурс: ${resource}`);
      }
    } catch (error) {
      console.error(`Ошибка при массовом обновлении ${resource}:`, error);
      throw new Error(`Не удалось обновить ${resource}`);
    }
  },

  delete: async <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteParams<RecordType>
  ): Promise<DeleteResult<RecordType>> => {
    try {
      switch (resource) {
        case 'hotels':
          return await hotelDataProvider.delete<RecordType>(resource, params);
        case 'rooms':
        case 'hotel-rooms':
          return await roomsDataProvider.delete<RecordType>(resource, params);
        case 'bookings':
          return await bookingsDataProvider.delete<RecordType>(resource, params);
        case 'clients':
          return await clientsDataProvider.delete<RecordType>(resource, params);
        default:
          throw new Error(`Неизвестный ресурс: ${resource}`);
      }
    } catch (error) {
      console.error(`Ошибка при удалении ${resource}:`, error);
      throw new Error(`Не удалось удалить ${resource} #${params.id}`);
    }
  },

  deleteMany: async <RecordType extends RaRecord = any>(
    resource: string,
    params: CustomDeleteManyParams<RecordType>
  ): Promise<DeleteManyResult<RecordType>> => {
    if (resource === 'hotel-rooms' && !params.filter?.ID_Hotel) {
      throw new Error('Для массового удаления номеров отеля необходимо указать ID_Hotel');
    }

    try {
      switch (resource) {
        case 'hotels':
          return await hotelDataProvider.deleteMany<RecordType>(resource, params);
        case 'rooms':
        case 'hotel-rooms':
          return await roomsDataProvider.deleteMany<RecordType>(resource, params);
        case 'bookings':
          return await bookingsDataProvider.deleteMany<RecordType>(resource, params);
        case 'clients':
          return await clientsDataProvider.deleteMany<RecordType>(resource, params);
        default:
          throw new Error(`Неизвестный ресурс: ${resource}`);
      }
    } catch (error) {
      console.error(`Ошибка при массовом удалении ${resource}:`, error);
      throw new Error(`Не удалось удалить ${resource}`);
    }
  }
};