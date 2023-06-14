import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import baseService from '../../apis/service';
import CATEGORIES_APIS from '../../apis/categories';
import RESPONSE_CODES from '../../constants/responseCodes';
import PasswordCard from '../PasswordCard';
import Modal from '../Modal';
import PASSWORD_APIS from '../../apis/password';

function ViewCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [passwords, setPasswords] = useState(null);
  const [editModal, setEditModal] = useState({ show: false, title: '', id: '' });

  const getPassword = async () => {
    const response = await baseService.get(`${CATEGORIES_APIS.get}/${id}`);
    if (response.data.response_code === RESPONSE_CODES.ok) {
      setPasswords(response.data.payload);
    }
  };

  useEffect(() => {
    getPassword();
  }, [id]);

  const onCloseModal = useCallback(() => {
    setEditModal({ show: false });
  });

  const handleUpdatePassword = useCallback(
    async (e) => {
      e.preventDefault();
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;
      if (password !== confirmPassword) return toast('Password & confirm password should match');
      try {
        const response = await baseService.put(`${PASSWORD_APIS.update}/${editModal.id}`, {
          data: password,
        });
        if (response.data.response_code === RESPONSE_CODES.ok) {
          getPassword();
          onCloseModal();
          return toast('Password updated successfully');
        }
      } catch (err) {
        return toast('Something went wrong');
      }
    },
    [passwordRef, confirmPasswordRef, editModal]
  );

  return (
    <div className={styles.root}>
      <Button variant="contained" onClick={() => navigate(-1)}>
        Back
      </Button>
      <Modal isOpen={editModal.show} onClose={onCloseModal} title={`Edit password for ${editModal.title}`}>
        <form onSubmit={handleUpdatePassword} className={styles.modalContent}>
          <TextField margin="normal" required fullWidth label="Password" type="password" inputRef={passwordRef} />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            inputRef={confirmPasswordRef}
          />
          <Button variant="contained" type="submit">
            Update Password
          </Button>
        </form>
      </Modal>
      <div className={styles.cardsCont}>
        {passwords?.map(({ id: passId, title, data, updatedAt }) => (
          <PasswordCard
            key={passId}
            title={title}
            data={data}
            updatedAt={updatedAt}
            onEdit={() => {
              setEditModal({ show: true, title, id: passId });
            }}
          />
        ))}
        {!passwords && <h3>Loading...</h3>}
        {passwords?.length === 0 && <h3>No passwords found in this category</h3>}
      </div>
    </div>
  );
}

export default ViewCategory;
