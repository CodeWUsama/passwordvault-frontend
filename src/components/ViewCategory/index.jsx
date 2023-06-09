import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './styles.module.scss';
import baseService from '../../apis/service';
import CATEGORIES_APIS from '../../apis/categories';
import RESPONSE_CODES from '../../constants/responseCodes';
import PasswordCard from '../PasswordCard';

function ViewCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState(null);

  const getPassword = async () => {
    const response = await baseService.get(`${CATEGORIES_APIS.get}/${id}`);
    if (response.data.response_code === RESPONSE_CODES.ok) {
      setPasswords(response.data.payload);
    }
  };

  useEffect(() => {
    getPassword();
  }, [id]);

  return (
    <div className={styles.root}>
      <Button variant="contained" onClick={() => navigate(-1)}>
        Back
      </Button>
      <div className={styles.cardsCont}>
        {passwords?.map(({ id: passId, title, data, updatedAt }) => (
          <PasswordCard key={passId} title={title} data={data} updatedAt={updatedAt} />
        ))}
        {!passwords && <h3>Loading...</h3>}
        {passwords?.length === 0 && <h3>No passwords found in this category</h3>}
      </div>
    </div>
  );
}

export default ViewCategory;
