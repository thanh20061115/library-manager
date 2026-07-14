import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  MenuItem,
} from '@mui/material';

import {
  getAllBooks,
  type Book,
} from '../../services/book.service';

import {
  getAllReaders,
  type Reader,
} from '../../services/reader.service';

import {
  createBorrowRecord,
} from '../../services/borrow-record.service';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function BorrowForm({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [readers, setReaders] = useState<Reader[]>([]);

  const [bookId, setBookId] = useState('');
  const [readerId, setReaderId] = useState('');

  const [borrowDate, setBorrowDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open]);

  async function loadData() {
    const bookData = await getAllBooks();
    const readerData = await getAllReaders();

    setBooks(bookData);
    setReaders(readerData);

    const today = new Date()
      .toISOString()
      .split('T')[0];

    setBorrowDate(today);
    setDueDate(today);

    setBookId('');
    setReaderId('');
  }

  async function handleSave() {
    if (!readerId || !bookId) {
      alert('Please select a reader and a book.');
      return;
    }

    await createBorrowRecord({
      bookId: Number(bookId),
      readerId: Number(readerId),
      borrowDate,
      dueDate,
    });

    onSuccess();
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Borrow Book
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={2}>
          <TextField
            select
            label="Reader"
            value={readerId}
            onChange={(e) =>
              setReaderId(e.target.value)
            }
          >
            {readers.map((reader) => (
              <MenuItem
                key={reader.id}
                value={reader.id}
              >
                {reader.fullName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Book"
            value={bookId}
            onChange={(e) =>
              setBookId(e.target.value)
            }
          >
            {books.filter((b) => b.available > 0).length === 0 ? (
              <MenuItem disabled>
                No books available
              </MenuItem>
            ) : (
              books
                .filter((b) => b.available > 0)
                .map((book) => (
                  <MenuItem
                    key={book.id}
                    value={book.id}
                  >
                    {book.title}
                  </MenuItem>
                ))
            )}
          </TextField>

          <TextField
            type="date"
            label="Borrow Date"
            InputLabelProps={{
              shrink: true,
            }}
            value={borrowDate}
            onChange={(e) =>
              setBorrowDate(e.target.value)
            }
          />

          <TextField
            type="date"
            label="Due Date"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: borrowDate,
            }}
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Borrow
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BorrowForm;