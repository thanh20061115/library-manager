import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Chip,
  MenuItem,
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
  getBorrowRecords,
  returnBook,
  deleteBorrowRecord,
} from '../../services/borrow-record.service';

import BorrowRecordForm from './BorrowRecordForm';

function BorrowRecordList() {
  const [records, setRecords] = useState<BorrowRecord[]>([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);

  const [rowCount, setRowCount] = useState(0);

  const [status, setStatus] = useState('');

  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    loadRecords();
  }, [page, pageSize, status]);

  async function loadRecords() {
    setLoading(true);

    try {
      const result = await getBorrowRecords(
        page + 1,
        pageSize,
        status,
      );

      setRecords(result.data);

      setRowCount(result.total);
    } finally {
      setLoading(false);
    }
  }

  async function handleReturn(id: number) {
    if (!confirm('Return this book?')) return;

try {
  await returnBook(id);

  alert('Return successfully');

  loadRecords();
} catch (e) {
  alert('Cannot return');
}
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this record?')) return;

try {
  await deleteBorrowRecord(id);

  alert('Deleted');

  loadRecords();
} catch {
  alert('Delete failed');
}
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },

    {
      field: 'reader',
      headerName: 'Reader',
      flex: 1,
      valueGetter: (_, row) => row.reader?.fullName,
    },

    {
      field: 'book',
      headerName: 'Book',
      flex: 1,
      valueGetter: (_, row) => row.book?.title,
    },

    {
      field: 'borrowDate',
      headerName: 'Borrow Date',
      width: 150,
    },

    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 150,
    },

    {
      field: 'status',
      headerName: 'Status',
      width: 130,

      renderCell: (params) =>
        params.value === 'BORROWED' ? (
          <Chip
            color="warning"
            label="Borrowing"
          />
        ) : (
          <Chip
            color="success"
            label="Returned"
          />
        ),
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,

      sortable: false,

      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {params.row.status === 'BORROWED' && (
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() =>
                handleReturn(params.row.id)
              }
            >
              Return
            </Button>
          )}

          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() =>
              handleDelete(params.row.id)
            }
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
        Borrow Records
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        mb={2}
      >
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          sx={{ width: 200 }}
        >
          <MenuItem value="">
            All
          </MenuItem>

          <MenuItem value="BORROWED">
            Borrowing
          </MenuItem>

          <MenuItem value="RETURNED">
            Returned
          </MenuItem>
        </TextField>

        <Button
          variant="contained"
          onClick={() => setOpenForm(true)}
        >
          Borrow Book
        </Button>
      </Stack>

      <Paper sx={{ height: 600 }}>
        <DataGrid
          rows={records}
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

      <BorrowRecordForm
  open={openForm}
  onClose={() => setOpenForm(false)}
  onSuccess={loadRecords}
/>
    </Box>
  );
}

export default BorrowRecordList;