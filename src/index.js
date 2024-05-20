// React
import React from 'react';
import ReactDOM from 'react-dom/client';
// React Router
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
// Pages
import DeviceReportList from './pages/deviceReportList/DeviceReportList';
import DeviceReport from './pages/deviceReport/DeviceReport';
import ErrorPage from './pages/errorPage/ErrorPage';
// Scss
import './App.scss';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DeviceReportList />,
        errorElement: <ErrorPage />
    },
    {
        path: '/:deviceId',
        element: <DeviceReport />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

