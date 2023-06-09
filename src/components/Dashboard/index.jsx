import React, { useCallback, useContext } from 'react';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import URLS from '../../constants/urls';
import { CategoriesContext } from '../../App';

function Dashboard() {
  const navigate = useNavigate();
  const { categories } = useContext(CategoriesContext);

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
      </div>
      <div className={styles.cardsCont}>
        {categories.map((category) => (
          <div className={styles.card} key={category.id}>
            <p>{category.title}</p>
            <Link to={`${URLS.expandCategory}/${category.id}`}>View</Link>
          </div>
        ))}
        <div className={styles.card} onClick={() => navigate(URLS.addNewCategory)} role="presentation">
          <p className={styles.action}>+ Add new category</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
