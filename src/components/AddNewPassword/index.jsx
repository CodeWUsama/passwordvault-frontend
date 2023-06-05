import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { CategoriesContext } from '../../App';
import baseService from '../../apis/service';
import RESPONSE_CODES from '../../constants/responseCodes';
import URLS from '../../constants/urls';
import PASSWORD_APIS from '../../apis/password';

function AddNewPassword() {
  const navigate = useNavigate();
  const titleRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [category, setCategory] = useState(null);

  const { categories } = useContext(CategoriesContext);

  const handleAddPassword = useCallback(async () => {
    const title = titleRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) return toast('Password & confirm password should match');
    if (!title || !password || !category) return toast('Please fill all the required fields');
    try {
      const response = await baseService.post(PASSWORD_APIS.create, {
        title,
        data: password,
        categoryId: category,
      });
      if (response.data.response_code === RESPONSE_CODES.ok) {
        return toast('Password added successfully');
      }
    } catch (err) {
      return toast('Something went wrong');
    }
  }, [titleRef, passwordRef, confirmPasswordRef, category]);

  return (
    <div className={styles.wrapper}>
      <form className={styles.cont}>
        <Button variant="contained" onClick={() => navigate(URLS.dashboard)}>
          Back
        </Button>
        <h2 className={styles.textCenter}>Add New Password</h2>
        <TextField margin="normal" required fullWidth label="Title" type="text" inputRef={titleRef} />
        <TextField margin="normal" required fullWidth label="Password" type="password" inputRef={passwordRef} />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
          type="password"
          inputRef={confirmPasswordRef}
        />
        <div className={styles.catCont}>
          <FormControl fullWidth className={styles.select}>
            <InputLabel id="category-label" className={styles.selectLabel}>
              Category
            </InputLabel>
            <Select
              labelId="category-label"
              value={category}
              label="Age"
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map(({ id, title }) => (
                <MenuItem value={id}>{title}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={() => navigate(URLS.addNewCategory)} variant="contained">
            Add New Category
          </Button>
        </div>
        <div className={styles.btnCont}>
          <Button variant="contained" onClick={handleAddPassword}>
            Add Password
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddNewPassword;
