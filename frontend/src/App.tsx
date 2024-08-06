import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Verify from "./pages/verify/Verify";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ChangePassword from "./pages/change-password/ChangePassword";
import SearchPage from "./pages/search/SearchPage";
import AccSettings from "./pages/user-settings/AccSettings";
import CookieConsent from "react-cookie-consent";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import MyLists from "./pages/my-lists/MyLists";
import { useAppSelector } from "./store/hooks";
import { selectUser } from "./store/reducers/auth";
import Welcome from "./pages/welcome/Welcome";

import AppRouter from "./router/AppRouter";

import './index.css'
import { SocketProvider } from "./context/SocketContext";

import * as React from 'react'

const App = () => {
  const user = useAppSelector(selectUser);


  return (
    <>
      <SocketProvider>
        <AppRouter />
        <CookieConsent
          containerClasses="cookiebanner bg-slate-950/[.9]"
          style={{
            borderRadius: '15px 15px 0px 0px',
            boxShadow: '0px -10px 15px -5px rgb(255 255 255 / 15%)',
            padding: "10px",
            // background: 'url("/images/home0.jpeg") center',
            // backgroundSize: 'cover',
            // backgroundAttachment: 'fixed',
            // backgroundColor: '#0E061E',
          }}
          disableButtonStyles
          buttonClasses="theme_button_danger"
          buttonStyle={{
            borderColor: '#14f59e',
            background: '#14f59e1f',
            color: '#14f59e',
          }}
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </SocketProvider >
    </>
  );
};

export default App;
