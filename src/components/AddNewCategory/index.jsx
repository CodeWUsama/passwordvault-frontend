import { Button, TextField } from '@mui/material';
import React, { useCallback, useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import baseService from '../../apis/service';
import RESPONSE_CODES from '../../constants/responseCodes';
import CATEGORIES_APIS from '../../apis/categories';
import { CategoriesContext } from '../../App';

function AddNewCategory() {
  const navigate = useNavigate();
  const { categories, setCategories } = useContext(CategoriesContext);

  const titleRef = useRef();

  const handleAddPassword = useCallback(async () => {
    const title = titleRef.current.value;
    if (!title) return toast('Please fill the title field');
    try {
      const response = await baseService.post(CATEGORIES_APIS.create, {
        title,
      });
      if (response.data.response_code === RESPONSE_CODES.ok) {
        toast('Category created successfully');
        setCategories([...categories, response.data.payload.category]);
        navigate(-1);
      }
    } catch (err) {
      return toast('Something went wrong');
    }
  }, [titleRef]);

  return (
    <div className={styles.wrapper}>
      <form className={styles.cont}>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Back
        </Button>
        <h2 className={styles.textCenter}>Add New Category</h2>
        <TextField margin="normal" required fullWidth label="Title" type="text" inputRef={titleRef} />
        <div className={styles.btnCont}>
          <Button variant="contained" onClick={handleAddPassword}>
            Add Category
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddNewCategory;
