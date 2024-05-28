import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import EmployeeOutlet from './EmployeeOutlet';
import ManagerOutlet from './ManagerOutlet';
import Login from '../pages/Login';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ isAuthenticated, adminOnly, admin, employee }) => {


    if (!adminOnly && !admin && employee &&isAuthenticated) {

        return <EmployeeOutlet />;
    }

    if (isAuthenticated && adminOnly && admin) {
        return <ManagerOutlet />;
    }
    if (!isAuthenticated) {
        return <Login replace />;
    }


    return <Outlet />;
};

export default PrivateRoute;
