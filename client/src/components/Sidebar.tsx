import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function Sidebar() {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
    >
      <Toolbar />

      <List>
        <ListItemButton onClick={() => navigate('/dashboard')}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/books')}>
          <ListItemText primary="Books" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/readers')}>
          <ListItemText primary="Readers" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate('/borrow-records')}>
          <ListItemText primary="Borrow Records" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}

export default Sidebar;