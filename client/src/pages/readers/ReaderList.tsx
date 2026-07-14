import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  DataGrid,
  type GridColDef,
} from '@mui/x-data-grid';

import {
  getReaders,
  deleteReader,
  type Reader,
} from '../../services/reader.service';

import ReaderForm from './ReaderForm';

function ReaderList() {
  const [readers, setReaders] = useState<Reader[]>([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);

  const [rowCount, setRowCount] = useState(0);

  const [keyword, setKeyword] = useState('');

  const [openForm, setOpenForm] = useState(false);

  const [selectedReader, setSelectedReader] =
    useState<Reader | null>(null);

  const [deleteDialog, setDeleteDialog] =
    useState(false);

  const [deleteReaderId, setDeleteReaderId] =
    useState<number | null>(null);

  useEffect(() => {
    loadReaders();
  }, [page, pageSize, keyword]);

  async function loadReaders() {
    setLoading(true);

    try {
      const result = await getReaders(
        page + 1,
        pageSize,
        keyword,
      );

      setReaders(result.data);

      setRowCount(result.total);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (deleteReaderId === null) return;

    try {
      await deleteReader(deleteReaderId);

      setDeleteDialog(false);

      setDeleteReaderId(null);

      loadReaders();
    } catch (error: any) {
      alert(
        error.response?.data?.message ??
          'Delete failed',
      );
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },

    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
    },

    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },

    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
    },

    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
    },

    {
      field: 'status',
      headerName: 'Status',
      width: 120,

      renderCell: () => (
        <Chip
          label="Active"
          color="success"
        />
      ),
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,

      sortable: false,

      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setSelectedReader(params.row);

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
              setDeleteReaderId(
                params.row.id,
              );

              setDeleteDialog(true);
            }}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];
    return (
    <Box>
      <Typography
        variant="h4"
        mb={3}
      >
        Readers
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
            setSelectedReader(null);
            setOpenForm(true);
          }}
        >
          Add Reader
        </Button>
      </Stack>

      <Paper sx={{ height: 600 }}>
        <DataGrid
          rows={readers}
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

      <ReaderForm
        open={openForm}
        reader={selectedReader}
        onClose={() => setOpenForm(false)}
        onSuccess={loadReaders}
      />

      <Dialog
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
      >
        <DialogTitle>
          Delete Reader
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this reader?
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

export default ReaderList;