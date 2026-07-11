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
  createBook,
  updateBook,
  type Book,
} from '../../services/book.service';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  book?: Book | null;
}

type BookFormData = {
  title: string;
  author: string;
  publisher: string;
  category: string;
  quantity: number;
};

function BookForm({
  open,
  onClose,
  onSuccess,
  book,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>({
    defaultValues: {
      title: '',
      author: '',
      publisher: '',
      category: '',
      quantity: 1,
    },
  });

useEffect(() => {
  if (!open) return;

  if (book) {
    reset({
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      category: book.category,
      quantity: book.quantity,
    });
  } else {
    reset({
      title: '',
      author: '',
      publisher: '',
      category: '',
      quantity: 1,
    });
  }
}, [open, book, reset]);

const onSubmit = async (data: BookFormData) => {
  if (book) {
    await updateBook(book.id, data);
  } else {
    await createBook(data);
  }

  onSuccess();

  onClose();

  reset();
};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {book ? 'Edit Book' : 'Add Book'}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Title"
            {...register('title', {
              required: 'Title is required',
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Author"
            {...register('author', {
              required: 'Author is required',
            })}
            error={!!errors.author}
            helperText={errors.author?.message}
          />

          <TextField
            label="Publisher"
            {...register('publisher')}
          />

          <TextField
            label="Category"
            {...register('category')}
          />

          <TextField
            label="Quantity"
            type="number"
            {...register('quantity', {
              valueAsNumber: true,
              min: 1,
            })}
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

export default BookForm;