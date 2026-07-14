import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
} from '@mui/material';

import {
  createReader,
  updateReader,
  type Reader,
} from '../../services/reader.service';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  reader?: Reader | null;
}

type ReaderFormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

function ReaderForm({
  open,
  onClose,
  onSuccess,
  reader,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReaderFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  useEffect(() => {
    if (!open) return;

    if (reader) {
      reset({
        fullName: reader.fullName,
        email: reader.email,
        phone: reader.phone,
        address: reader.address,
      });
    } else {
      reset({
        fullName: '',
        email: '',
        phone: '',
        address: '',
      });
    }
  }, [open, reader, reset]);

const onSubmit = async (data: ReaderFormData) => {
  try {
    if (reader) {
      await updateReader(reader.id, data);
    } else {
      await createReader(data);
    }

    onSuccess();
    onClose();
    reset();
  } catch (error: any) {
    console.log(error.response?.data);
    alert(JSON.stringify(error.response?.data));
  }
};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {reader ? 'Edit Reader' : 'Add Reader'}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Full Name"
            {...register('fullName', {
              required: 'Full name is required',
            })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />

          <TextField
  label="Email"
  type="email"
  {...register('email', {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email format',
    },
  })}
  error={!!errors.email}
  helperText={errors.email?.message}
/>

          <TextField
            label="Phone"
            {...register('phone', {
              required: 'Phone is required',
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <TextField
            label="Address"
            {...register('address')}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReaderForm;