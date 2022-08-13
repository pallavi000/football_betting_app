import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Home from "./pages/home/Home";
import Header from "./global/header/Header";
import CardWeek from "./pages/admin/cards/Card";
import AddCard from "./pages/admin/add_card/AddCard";
import Update_Card from "./pages/admin/update_card/Update_Card";
import UserAddCard from "./pages/user/user_add_card/UserAddCard";
import useDeviceDetect from "./hooks/useDeviceDetect";
import Profile from "./pages/user/profile/Profile";
import AddBalance from "./pages/user/add_balance/AddBalance";
import Success from "./pages/user/success_pass/Success";
import EditProfile from "./pages/user/EditProfile/EditProfile";
import UserProtected from "./pages/auth/protected/UserProtected";
import AdminProtected from "./pages/auth/protected/AdminProtected";
import UserCard from "./pages/user/user_cards/UserCard";
import Archived from "./pages/admin/Archived/Archived";
import ChangePassword from "./pages/auth/ChangePassword/ChangePassword";
import Team from "./pages/admin/team/Team";
import TeamList from "./pages/admin/TeamList/TeamList";
import Transaction from "./pages/user/transaction/Transaction";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { useState } from "react";
import GlobalContext from "./global/GlobalContext";
import ManageUsers from "./pages/admin/ManageUsers/ManageUsers";
import EditUser from "./pages/admin/ManageUsers/EditUser/EditUser";
import ViewCard from "./pages/admin/Archived/ViewCard/ViewCard";
import UserArchivedCard from "./pages/user/UserArchivedCard/UserArchivedCard";
import ViewUserArchivedCard from "./pages/user/UserArchivedCard/ViewUserArchivedCard/ViewUserArchivedCard";
import UserWinnerCard from "./pages/user/UserWinnerCard/UserWinnerCard";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import "./App.css";

axios.defaults.baseURL = "http://localhost:5000/api";

function App(props) {
  return (
    <Router>
      <GlobalContext>
        <Header />
        <div className="content-section">
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/" element={<Home />} />

            <Route exact path="/admin/card" element={<AdminProtected />}>
              <Route exact path="/admin/card" element={<CardWeek />} />
            </Route>

            <Route exact path="/dashboard" element={<AdminProtected />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* <Route exact path="/admin/add-balance" element={<AdminProtected/>}>
        <Route exact path="/admin/add-balance" element={<AddBalance/>}/>
        </Route> */}

            <Route
              exact
              path="/admin/users/:id/edit"
              element={<AdminProtected />}
            >
              <Route
                exact
                path="/admin/users/:id/edit"
                element={<EditUser />}
              />
            </Route>

            <Route exact path="/admin/users" element={<AdminProtected />}>
              <Route exact path="/admin/users" element={<ManageUsers />} />
            </Route>

            <Route exact path="/admin/add-card" element={<AdminProtected />}>
              <Route exact path="/admin/add-card" element={<AddCard />} />
            </Route>
            <Route
              exact
              path="/admin/update-card/:id"
              element={<AdminProtected />}
            >
              <Route
                exact
                path="/admin/update-card/:id"
                element={<Update_Card />}
              />
            </Route>
            <Route
              exact
              path="/admin/teams/create"
              element={<AdminProtected />}
            >
              <Route exact path="/admin/teams/create" element={<Team />} />
            </Route>

            <Route exact path="/admin/teams" element={<AdminProtected />}>
              <Route exact path="/admin/teams" element={<TeamList />} />
            </Route>

            <Route
              exact
              path="/admin/archived-card"
              element={<AdminProtected />}
            >
              <Route exact path="/admin/archived-card" element={<Archived />} />
            </Route>

            <Route
              exact
              path="/admin/archived-card/:id"
              element={<AdminProtected />}
            >
              <Route
                exact
                path="/admin/archived-card/:id"
                element={<ViewCard />}
              />
            </Route>

            <Route exact path="/transaction" element={<UserProtected />}>
              <Route exact path="/transaction" element={<Transaction />} />
            </Route>

            <Route exact path="/card" element={<UserProtected />}>
              <Route exact path="/card" element={<UserCard />} />
            </Route>

            <Route exact path="/user-add-card/:id" element={<UserProtected />}>
              <Route
                exact
                path="/user-add-card/:id"
                element={<UserAddCard />}
              />
            </Route>
            <Route exact path="/profile" element={<UserProtected />}>
              <Route exact path="/profile" element={<Profile />} />
            </Route>
            <Route exact path="/success" element={<UserProtected />}>
              <Route exact path="/success" element={<Success />} />
            </Route>
            <Route exact path="/add-balance" element={<UserProtected />}>
              <Route exact path="/add-balance" element={<AddBalance />} />
            </Route>

            <Route exact path="/change-password" element={<UserProtected />}>
              <Route
                exact
                path="/change-password"
                element={<ChangePassword />}
              />
            </Route>

            <Route exact path="/edit-profile/:id" element={<UserProtected />}>
              <Route exact path="/edit-profile/:id" element={<EditProfile />} />
            </Route>

            <Route exact path="/archived-card" element={<AdminProtected />}>
              <Route
                exact
                path="/archived-card"
                element={<UserArchivedCard />}
              />
            </Route>

            <Route exact path="/archived-card/:id" element={<AdminProtected />}>
              <Route
                exact
                path="/archived-card/:id"
                element={<ViewUserArchivedCard />}
              />
            </Route>

            <Route exact path="/winner-card" element={<AdminProtected />}>
              <Route exact path="/winner-card" element={<UserWinnerCard />} />
            </Route>

            <Route exact path="/winner-card/:id" element={<AdminProtected />}>
              <Route
                exact
                path="/winner-card/:id"
                element={<ViewUserArchivedCard />}
              />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </GlobalContext>
    </Router>
  );
}

export default App;
