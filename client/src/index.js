import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MainUser from "./Pages/main-user";
import MainAdmin from "./Pages/main-admin";
import MainOwner from "./Pages/main-owner";


import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "./Pages/login";
import AddUser from "./Pages/AddUser";
import UserList from "./component/admin/UserList";
import Footer from "./component/footer";
import AddPoint from "./Pages/AddPoint";
import Information from "./component/Information";
import AddAdmin from "./component/owner/AddAdmin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/mainUser",
        element: <MainUser/>,
    },
    {
        path: "/mainAdmin",
        element: <MainAdmin/>,
    },
    {
        path: "/mainOwner",
        element: <MainOwner/>,
    },
    {
        path : "/Login",
        element : <Login/>,
    },
    {
        path : "/addUser",
        element : <AddUser/>,
    },
    {
        path : "/addAdmin",
        element : <AddAdmin/>,
    },
    {
        path : "/userList",
        element : <UserList/>,
    },
    {
        path : "/addPoint",
        element : <AddPoint/>,
    },
    {
        path : "/Information",
        element : <Information/>,
    },


]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
