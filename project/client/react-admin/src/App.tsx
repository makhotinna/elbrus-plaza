import { Admin, CustomRoutes, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { HotelCreate } from './components/hotels/hotelsCreate';
import { HotelEdit} from './components/hotels/hotelsEdit';
import { HotelList } from './components/hotels/hotelsList';
import { HotelShow } from './components/hotels/hotelsShow';
//import { RoomsList } from './components/hotels/HotelRooms';
import { Route } from 'react-router-dom';
import { HomeWork as HotelIcon } from '@mui/icons-material';
import { ClientsEdit } from './components/clients/clientsEdit';
import { ClientsCreate } from './components/clients/clientsCreate';
import { ClientsShow } from './components/clients/clientsShow';
import { ClientsList } from './components/clients/clientsList';
import { RoomsList } from './components/rooms/RoomsList';
import { RoomsCreate } from './components/rooms/RoomsCreate';
import { RoomsEdit } from './components/rooms/RoomsEdit';
import { RoomsShow } from './components/rooms/RoomsShow';
import HotelRoomsList from "./components/rooms/hotelsRoomsList"

const ClientIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource
            name="hotel"
            list={HotelList}
            edit={HotelEdit}
            create={HotelCreate}
            show={HotelShow}
            icon={HotelIcon}
            options={{ label: 'Отели' }}
        />
        <Resource
            name="client"
            list={ClientsList}
            edit={ClientsEdit}
            create={ClientsCreate}
            show={ClientsShow}
            icon={ClientIcon}
            options={{ label: 'Клиенты' }}
        />
        <Resource
            name="rooms"
            list={RoomsList}
            edit={RoomsEdit}
            create={RoomsCreate}
            show={RoomsShow}
            icon={ClientIcon}
            options={{ label: 'Номера' }}
        />
        <Resource
            name="hotel-rooms"
            list={HotelRoomsList}
            options={{ label: 'Номера отелей' }}
        />
        
        {/* <CustomRoutes>
            <Route path="/hotel-rooms" element={<HotelRoomsList />} />
        </CustomRoutes> */}
    </Admin>
);



export default App;

// const MountainHotelIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//     <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2zm0 4.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
//   </svg>
// );

// const SimpleRoomIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <rect x="5" y="5" width="14" height="14" rx="1" />
//     <text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor">№</text>
//   </svg>
// );

// export default App;