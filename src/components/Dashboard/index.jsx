import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import URLS from '../../constants/urls';

function Dashboard() {
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    Cookies.remove('token');
    window.open(URLS.login, '_self');
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.logoutCont}>
        <h2>Dashboard</h2>
        <Button variant="contained" onClick={onLogout}>
          Logout
        </Button>
      </div>
      <div className={styles.rowCont}>
        <Button onClick={() => navigate(URLS.addNewPassword)} variant="contained">
          Store New Password
        </Button>
        <Button onClick={() => navigate(URLS.addNewCategory)} variant="contained">
          Add New Category
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
