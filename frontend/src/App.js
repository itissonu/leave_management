import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import './index.css';
import Login from './pages/Login';
import Landingpage from './components/Landingpage';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import LeaveRequest from './components/LeaveRequest';
import EmployeeOutlet from './components/EmployeeOutlet';
import LeaveRequestAdmin from './components/LeaveRequestAdmin';
import AdminHome from './components/AdminHome';
import EmployeHome from './components/EmployeHome';
import ManagerOutlet from './components/ManagerOutlet';
import Loader from './components/Loader';
import { setUserAuthenticated } from './redux/slice/authSlice';
import { useEffect } from 'react';
import LeaveDetails from './components/LeaveDetails';
import AbsentDaysUser from './components/AbsentDaysUser';
import { Toaster } from "react-hot-toast"
import SingleUser from './components/SingleUser';
import Register from './pages/Register';
import Otp from './components/Otp';

const AppContent = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state?.auth);
  const state = useSelector((state) => state?.auth);
  console.log(state)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      dispatch(setUserAuthenticated({ user, token }));
    }
  }, [dispatch, navigate]);



  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <Toaster />
    <Routes>
     
      <Route path="/" element={<Landingpage />} />
      <Route path="/loader" element={<Loader />} />
      <Route
        path="/login"
        element={

          <Login />

        }
      />
        <Route
        path="/register"
        element={
          <Register />
        }
      />
       <Route
        path="/otp/:email"
        element={
          <Otp />
        }
      />
      <Route
        path="/employee"
        element={<PrivateRoute
          isAuthenticated={state?.isAuthenticated}
          adminOnly={false}
          admin={false}
          employee={true}>
          <EmployeeOutlet />
        </PrivateRoute>
        }
      >
     

        <Route index element={<EmployeHome />} />
        <Route path="home" element={<EmployeHome />} />
        <Route path="leaverequest" element={<LeaveRequest />} />
        <Route path="leaves" element={<LeaveDetails />} />
        <Route path="Calander" element={<AbsentDaysUser />} />
      </Route>
      <Route
        path="/manager"
        element={
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            adminOnly={true}
            admin={true}
          >
            <ManagerOutlet />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="leaverequests/:tabIndex" element={<LeaveRequestAdmin />} />
        <Route path="user/:id" element={<SingleUser />} />
      </Route>
    </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
