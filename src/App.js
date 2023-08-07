
import {Route, Routes} from 'react-router-dom'
// import { Header } from './Components/Layouts/Header/Header';
// import { Header } from "./components/Layouts/Header/Header";

import { LogIn } from './Components/Page/LogIn/LogIn';
import { CreateAccount } from './Components/Page/CreateAccount/CreateAccount';
import { CreateListener } from './Components/Page/CreateListener/CreateListener';
import { CreateArtist } from './Components/Page/CreateArtist/CreateArtist';
import { HomeUser } from './Components/Page/Artist/HomeUser/HomeUser';
import { DetailArtist } from './Components/Page/Artist/DetailArtist/DetailArtist';
// import { CreateAccount } from './Components/Page/CreateAccount/CreateAccount';
// import { MainLogIn} from './Components/Layouts/MainLogIn/MainLogIn';
import { RecoverPassword } from './Components/Page/RecoverPassword/RecoverPassword';
import { ProfileArtist } from './Components/Page/Artist/ProfileArtist/ProfileArtist';
import { ConfigArtist } from './Components/Page/Artist/ConfigArtist/ConfigArtist';
// import { HomeParking } from './Components/Page/AdminParking/HomeParking/HomeParking';
// import { ProfileParking } from './Components/Page/AdminParking/ProfileParking/ProfileParking';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeUser/>}></Route>
        <Route path="/DetailArtist" element={<DetailArtist/>}></Route>
        <Route path="/LogIn" element={<LogIn/>}></Route>
        <Route path="/CreateAccount" element={<CreateAccount/>}></Route>
        <Route path="/ProfileArtist" element={<ProfileArtist/>}></Route>
        <Route path="/ConfigArtist" element={<ConfigArtist/>}></Route>
        <Route path="/CreateListener" element={<CreateListener/>}></Route>
        <Route path="/CreateArtist" element={<CreateArtist/>}></Route>
        <Route path="/RecoverPassword" element={<RecoverPassword/>}></Route>

        {/* <Route path="/CreateAccount" element={<CreateAccount/>}></Route> */}
        {/* <Route path="/LogIn" element={<MainLogIn/>}></Route>
        <Route path="/HomeUser" element={<HomeUser/>}></Route>
        <Route path="/HomeParking" element={<HomeParking/>}></Route>
        <Route path="/ProfileUser" element={<ProfileUser/>}></Route>
        <Route path="/ProfileParking" element={<ProfileParking/>}></Route>
        <Route path="/DetailParking" element={<DetailPark/>}></Route> */}

        <Route path="*" element="Not Found"></Route>
      </Routes>
    </div>
  )
}

export default App;
