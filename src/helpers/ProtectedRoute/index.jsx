import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import URLS from '../../constants/urls';

const authToken = Cookies.get('token');

function ProtectedRoute({ element: Element }) {
  return authToken ? <Element /> : <Navigate to={URLS.login} />;
}

export default ProtectedRoute;
