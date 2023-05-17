import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import SignIn from './components/Login/index';
import Signup from './components/Signup/index';
import URLS from './constants/urls';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';

const authToken = Cookies.get('token');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={authToken ? URLS.dashboard : URLS.login} replace />,
  },
  {
    path: URLS.login,
    element: <SignIn />,
  },
  {
    path: URLS.signup,
    element: <Signup />,
  },
  {
    path: URLS.dashboard,
    element: <Dashboard />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
