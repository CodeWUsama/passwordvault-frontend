import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import SignIn from './components/Login/index';
import Signup from './components/Signup/index';
import URLS from './constants/urls';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './helpers/ProtectedRoute';
import AddNewPassword from './components/AddNewPassword';
import baseService from './apis/service';
import CATEGORIES_APIS from './apis/categories';
import AddNewCategory from './components/AddNewCategory';
import ViewCategory from './components/ViewCategory';

export const CategoriesContext = createContext();
function App() {
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
      element: <ProtectedRoute element={Dashboard} />,
    },
    {
      path: URLS.addNewPassword,
      element: <ProtectedRoute element={AddNewPassword} />,
    },
    {
      path: URLS.addNewCategory,
      element: <ProtectedRoute element={AddNewCategory} />,
    },
    {
      path: `${URLS.expandCategory}/:id`,
      element: <ProtectedRoute element={ViewCategory} />,
    },
  ]);

  const [categories, setCategories] = useState([]);
  const categoriesContextObj = useMemo(() => ({ categories, setCategories }), [categories]);

  const fetchCategories = useCallback(async () => {
    const response = await baseService.get(CATEGORIES_APIS.get);
    setCategories(response.data.payload);
  }, []);

  useEffect(() => {
    if (authToken) fetchCategories();
  }, [authToken]);

  return (
    <div>
      <CategoriesContext.Provider value={categoriesContextObj}>
        <RouterProvider router={router} />
        <ToastContainer />
      </CategoriesContext.Provider>
    </div>
  );
}

export default App;
