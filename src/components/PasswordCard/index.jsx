import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import { DeleteOutline } from '@mui/icons-material';
import { decrypt } from '../../helpers/base64helper';
import styles from './styles.module.scss';

function PasswordCard({ title, data, updatedAt, onEdit, onDelete }) {
  const decryptedPassword = decrypt(data);
  const [showPass, setShowPass] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <p className={styles.title}>{title}</p>
        <div className={styles.actions}>
          <EditIcon onClick={onEdit} />
          <DeleteOutline onClick={onDelete} />
        </div>
      </div>
      <div className={styles.passCont}>
        <p>{showPass ? decryptedPassword : '*'.repeat(decryptedPassword.length)}</p>
        {showPass ? (
          <VisibilityOffIcon onClick={() => setShowPass(false)} />
        ) : (
          <VisibilityIcon onClick={() => setShowPass(true)} />
        )}
      </div>
      <p>Updated at: {moment(updatedAt).format('MMMM Do YYYY, h:mm a')}</p>
    </div>
  );
}

export default PasswordCard;
