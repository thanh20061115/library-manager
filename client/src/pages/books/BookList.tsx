import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import {
  DataGrid,
  type GridColDef,
} from '@mui/x-data-grid';

import {
  getBooks,
  deleteBook,
  type Book,
} from '../../services/book.service';
import BookForm from './BookForm';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);

  const [rowCount, setRowCount] = useState(0);

  const [keyword, setKeyword] = useState('');

  const [openForm, setOpenForm] = useState(false);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [deleteDialog, setDeleteDialog] = useState(false);

  const [deleteBookId, setDeleteBookId] = useState<number | null>(null);

  useEffect(() => {
    loadBooks();
  }, [page, pageSize, keyword]);

  async function loadBooks() {
    setLoading(true);

    try {
      const result = await getBooks(
        page + 1,
        pageSize,
        keyword,
      );

      setBooks(result.data);

      setRowCount(result.total);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
  if (deleteBookId === null) return;

  try {
    await deleteBook(deleteBookId);

    setDeleteDialog(false);

    setDeleteBookId(null);

    loadBooks();
  } catch (error: any) {
    alert(error.response?.data?.message || 'Delete failed');
  }
}

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },

    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
    },

    {
      field: 'author',
      headerName: 'Author',
      flex: 1,
    },

    {
      field: 'publisher',
      headerName: 'Publisher',
      flex: 1,
    },

    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
    },

    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 100,
    },

    {
      field: 'available',
      headerName: 'Available',
      width: 120,

      renderCell: (params) =>
        params.value > 0 ? (
          <Chip
            label={params.value}
            color="success"
          />
        ) : (
          <Chip
            label="Out"
            color="error"
          />
        ),
    },

   {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    sortable: false,

    renderCell: (params) => (
    <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            setSelectedBook(params.row);
            setOpenForm(true);
        }}
        >
          Edit
        </Button>

        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => {
            setDeleteBookId(params.row.id);
            setDeleteDialog(true);
        }}
        >
          Delete
        </Button>
    </Stack>
    ),
    }
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        mb={3}
      >
        Books
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        mb={2}
      >
        <TextField
          fullWidth
          label="Search..."
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
        />

      <Button
        variant="contained"
        size="large"
        onClick={() => {
          setSelectedBook(null);
          setOpenForm(true);
        }}
      >
        Add Book
      </Button>
      </Stack>

      <Paper sx={{ height: 600 }}>
        <DataGrid
          rows={books}
          columns={columns}
          loading={loading}
          rowCount={rowCount}
          paginationMode="server"
          pageSizeOptions={[5, 10, 20]}

          paginationModel={{
            page,
            pageSize,
          }}

          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
        />
      </Paper>
      <BookForm
        open={openForm}
        book={selectedBook}
        onClose={() => setOpenForm(false)}
        onSuccess={loadBooks}
      />
      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
      >
        <DialogTitle>
          Delete Book
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this book?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setDeleteDialog(false)}
       >
        Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={handleDelete}
        >
        Delete
        </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BookList;