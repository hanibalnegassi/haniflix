import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField
} from '@mui/material';
import useApiClient from 'src/hooks/useApiClient';
import { User } from '@api/client/dist/users/types';
import toast from 'react-hot-toast';
import { useCreateUserMutation, useUpdateUserMutation } from 'src/store/rtk-query/usersApi';

interface AddTagGroupProps {
  callback?: Function | null;
  item?: User | null;
}

const AddUserForm: React.FC<AddTagGroupProps> = ({ callback, item }) => {
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const client = useApiClient();

  const [createUser, createUserState] = useCreateUserMutation();
  const [updateUser, updateUserState] = useUpdateUserMutation()

  const reset = () => {
    setFullname('');
    setEmail('');
    setPassword('');
    setIsAdmin(false);
  };

  const populate = (user: User) => {
    setFullname(user?.fullname);
    setEmail(user?.email);
    setIsAdmin(user?.isAdmin);
  };

  const save = useCallback(async () => {
    toast.loading('saving...', { position: 'top-right' });
    const data = {
      fullname,
      email,
      username: email,
      isAdmin,
      password
    };

    const res = await createUser(data)

    console.error("res ", res);
    // callback(data);
    if (res?.data) {
      reset();
      toast.dismiss();
      toast.success('saved', { position: 'top-right' });
      callback?.()
    }
    else {

      toast.dismiss();
      toast.error('failed', { position: 'top-right' });
    }


  }, [fullname, email, password, isAdmin]);

  const update = useCallback(async () => {
    toast.loading('saving...', { position: 'top-right' });
    const data = {
      fullname,
      email,
      username: email,
      isAdmin,
      password: undefined
    };
    if (password.length > 0) data.password = password;


    const res = await updateUser({ itemId: item._id, data })

    if (res?.data) {
      toast.dismiss();
      toast.success('saved', { position: 'top-right' });
      // callback(data);
      callback?.()
      reset();
    }

    else {
      console.error(err);
      toast.dismiss();
      toast.error('failed', { position: 'top-right' });
    }
  }, [item, fullname, email, password, isAdmin]);

  useEffect(() => {
    if (item != null) {
      populate(item);
    }
  }, [item]);

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 }
        }}
      >
        <TextField
          label="Fullname"
          fullWidth
          required
          value={fullname}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFullname(event.target.value);
          }}
        />

        <TextField
          label="email"
          fullWidth
          required
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />

        <TextField
          label="password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />

        <Box marginLeft={1} marginTop={1}>
          <FormControlLabel
            label="Is Admin"
            control={
              <Checkbox
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            }
          />
        </Box>
      </Box>

      <Box marginLeft={1} marginTop={3}>
        {item ? (
          <Button variant="contained" onClick={update}>
            Update
          </Button>
        ) : (
          <Button variant="contained" onClick={save}>
            Save
          </Button>
        )}
      </Box>
    </>
  );
};

export default AddUserForm;
