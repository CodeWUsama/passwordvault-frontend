import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import styles from './styles.module.scss';

function Dashboard() {
  const onLogout = useCallback(() => {
    Cookies.remove('token');
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.logoutCont}>
        <h2>Dashboard</h2>
        <Button variant="contained" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
