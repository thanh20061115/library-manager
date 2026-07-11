import { useEffect, useState } from 'react';

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

import { getDashboard, type DashboardData } from '../services/dashboard.service';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
);

function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<DashboardData>({
    totalBooks: 0,
    totalReaders: 0,
    totalBorrowRecords: 0,
    borrowing: 0,
    returned: 0,
    availableBooks: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const result = await getDashboard();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h4" mb={4}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Total Books
              </Typography>

              <Typography variant="h3">
                {data.totalBooks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Total Readers
              </Typography>

              <Typography variant="h3">
                {data.totalReaders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Borrow Records
              </Typography>

              <Typography variant="h3">
                {data.totalBorrowRecords}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Borrowing
              </Typography>

              <Typography variant="h3">
                {data.borrowing}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Returned
              </Typography>

              <Typography variant="h3">
                {data.returned}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Available Books
              </Typography>

              <Typography variant="h3">
                {data.availableBooks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" mb={2}>
                Books Overview
              </Typography>

              <div
                style={{
                  width: 350,
                  margin: 'auto',
                }}
              >
                <Doughnut
                  data={{
                    labels: [
                      'Borrowing',
                      'Returned',
                    ],
                    datasets: [
                      {
                        label: 'Books',
                        data: [
                          data.borrowing,
                          data.returned,
                        ],
                      },
                    ],
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;