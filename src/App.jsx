import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SignIn from './components/Login/index';
import Signup from './components/Signup/index';
import URLS from './constants/urls';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: URLS.login,
    element: <SignIn />,
  },
  {
    path: URLS.signup,
    element: <Signup />,
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
