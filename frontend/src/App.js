import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import axios from 'axios'
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Home from './pages/home/Home';
import Header from './global/header/Header';
import CardWeek from './pages/admin/cards/Card';
import AddCard from './pages/admin/add_card/AddCard';
import Update_Card from './pages/admin/update_card/Update_Card';
import UserAddCard from './pages/user/user_add_card/UserAddCard';
import useDeviceDetect from './hooks/useDeviceDetect';
import Profile from './pages/user/profile/Profile';
import AddBalance from './pages/user/add_balance/AddBalance';
import Success from './pages/user/success_pass/Success';
import UserProtected from './pages/auth/protected/UserProtected'
import AdminProtected from './pages/auth/protected/AdminProtected'
import UserCard from './pages/user/user_cards/UserCard';
import Archived from './pages/Archived/Archived';
import ChangePassword from './pages/auth/ChangePassword/ChangePassword';
import Team from './pages/admin/team/Team';
import TeamList from './pages/admin/TeamList/TeamList';
import Transaction from './pages/user/transaction/Transaction';

axios.defaults.baseURL="http://localhost:5000/api"

function App(props) {
 
  const {isMobile} = useDeviceDetect()
  if(isMobile){
    require('./mobile.css')
  }else{
    require('./style.css')
  }
  return (
    <Router>
    <Header/>
    <div className='content-section'>
    <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/" element={<Home/>}/>
        
        <Route exact path="/admin/card" element={<AdminProtected/>}>
        <Route exact path="/admin/card" element={<CardWeek/>}/>
        </Route>

        {/* <Route exact path="/admin/add-balance" element={<AdminProtected/>}>
        <Route exact path="/admin/add-balance" element={<AddBalance/>}/>
        </Route> */}

        <Route exact path="/admin/add-card" element={<AdminProtected/>}>
        <Route exact path="/admin/add-card" element={<AddCard/>}/>
        </Route>
        <Route exact path="/admin/update-card/:id" element={<AdminProtected/>}>
        <Route exact path="/admin/update-card/:id" element={<Update_Card/>}/>
        </Route>
        <Route exact path="/admin/team" element={<AdminProtected/>}>
        <Route exact path="/admin/team" element={<Team/>}/>
        </Route>

        <Route exact path="/admin/team-list" element={<AdminProtected/>}>
        <Route exact path="/admin/team-list" element={<TeamList/>}/>
        </Route>

        <Route exact path="/transaction" element={<UserProtected/>}>
        <Route exact path="/transaction" element={<Transaction/>}/>
        </Route>

        <Route exact path="/card" element={<UserProtected/>}>
        <Route exact path="/card" element={<UserCard/>}/>
        </Route>
        <Route exact path="/user-add-card/:id" element={<UserProtected/>}>
        <Route exact path="/user-add-card/:id" element={<UserAddCard/>}/>
        </Route>
        <Route exact path="/profile" element={<UserProtected/>}>
        <Route exact path="/profile" element={<Profile/>}/>
        </Route>
        <Route exact path="/success" element={<UserProtected/>}>
        <Route exact path="/success" element={<Success/>}/>
        </Route>
        <Route exact path="/add-balance" element={<UserProtected/>}>
        <Route exact path="/add-balance" element={<AddBalance/>}/>
        </Route>
        <Route exact path="/archived-card" element={<UserProtected/>}>
        <Route exact path="/archived-card" element={<Archived/>}/>
        </Route>

        <Route exact path="/change-password" element={<UserProtected/>}>
        <Route exact path="/change-password" element={<ChangePassword/>}/>
        </Route>
      </Routes>
    </div>
      
    </Router>
  );
}

export default App;
