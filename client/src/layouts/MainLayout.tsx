import { Box, Toolbar } from '@mui/material';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

interface Props {
  children: React.ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <Navbar />

        <Toolbar />

        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;