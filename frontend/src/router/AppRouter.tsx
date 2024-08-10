import * as React from 'react'

import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Watch from "../pages/watch/Watch";
import Login from "../pages/login/Login";
import Verify from "../pages/verify/Verify";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import ChangePassword from "../pages/change-password/ChangePassword";
import SearchPage from "../pages/search/SearchPage";
import AccSettings from "../pages/user-settings/AccSettings";
import EditProfile from "../pages/EditProfile";
import CookieConsent from "react-cookie-consent";
import {
    BrowserRouter as Router,
    Route,
    Navigate,
    Routes,
} from "react-router-dom";
import MyLists from "../pages/my-lists/MyLists";

import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/reducers/auth";
import Welcome from "../pages/welcome/Welcome";
import ProtectedRoutes from "./ProtectedRoutes";
import GuestRoutes from "./GuestRoutes";

//
import SocketContext from "../context/SocketContext";

import { logout } from '../store/reducers/auth'

import { useDispatch } from 'react-redux'

import Swal from 'sweetalert2'
import GenrePage from '../pages/genres/GenrePage';
import Movie from '../pages/movie/index';
import WatchTrailer from '../pages/watch-trailer/Watch-trailer';
import HomeNew from '../pages/home/HomeNew';
import Settings from '../pages/settings';
import ThankYouPage from '../pages/thank-you';
import PrivacyPage from '../pages/privacy-policy/Privacy';
import TermsPage from '../pages/privacy-policy/Terms';


const AppRouter = (props) => {
    const user = useAppSelector(selectUser);

    const dispatch = useDispatch()

    const { socket, handleUserLogin } = React.useContext(SocketContext);

    React.useEffect(() => {
        socket?.on("forceLogout", (message) => {

            if (!user?.isAdmin) {
                showSwal("You were logged out", 'Your account was logged into, in another device', 'success')

                onLogout()
            }
        });
    }, [socket])

    const onLogout = () => {
        dispatch(logout())
    }

    const showSwal = (title, message, type) => {
        Swal.fire({
            title: title ?? "",
            text: message,
            icon: type,
        });
    };


    return (

        <Router>
            <Routes>

                <Route element={<GuestRoutes />}>

                    <Route path="/" element={user ? <HomeNew /> : <Welcome />} />
                    <Route path="genre/:id" element={user ? <GenrePage /> : <Navigate to="/" />} />

                    <Route
                        path="/settings"
                        element={user ? <Settings /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/register"
                        element={user ? <Navigate to="/" /> : <Register />}
                    />
                    <Route
                        path="/thank-you"
                        element={user ? <Navigate to="/" /> : <ThankYouPage />}
                    />

                    <Route path="/privacy-policy" element={<PrivacyPage />} />
                    <Route path="/terms-service" element={<TermsPage />} />



                    <Route
                        path="/forgot-pass"
                        element={user ? <Navigate to="/" /> : <ForgotPassword />}
                    />
                    <Route
                        path="/change-password/:id/:email"
                        element={user ? <Navigate to="/" /> : <ChangePassword />}
                    />
                    <Route
                        path="/login"
                        element={user ? <Navigate to="/" /> : <Login />}
                    />
                    <Route path="/verify" element={<Verify />} />
                </Route>

                <Route element={<ProtectedRoutes />}>
                    {/* <Route index element={<Home />} /> */}
                    <Route path="movies" element={<Home type="movies" />} />
                    <Route path="tv-shows" element={<Home type="TV series" />} />
                    <Route path="movie/:movieId" element={<Movie />} />

                    <Route path="series" element={<Home type="series" />} />
                    <Route path="new-and-popular" element={<Home />} />
                    <Route path="watch/:id" element={<Watch />} />
                    <Route path="watch-trailer/:id" element={<WatchTrailer />} />
                    <Route path="my-list" element={<Home type={"my list"} />} />
                    {/* <Route path="my-list" element={<MyLists />} /> */}
                    <Route path="search" element={<SearchPage />} />
                    <Route path="settings" element={<AccSettings />} />
                    <Route path="edit-profile" element={<EditProfile />} />
                </Route>

            </Routes>
        </Router>
    )
}

export default AppRouter