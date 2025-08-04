// src/components/Sidebar.jsx
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import StorageIcon from '@mui/icons-material/Storage';
import WorkIcon from '@mui/icons-material/Work';

const drawerWidth = 240;

const menuItems = [
  { label: 'Lớp học', icon: <ClassIcon />, path: '/classes' },
  { label: 'Học sinh', icon: <SchoolIcon />, path: '/students' },
  { label: 'Giáo viên', icon: <GroupIcon />, path: '/teachers' },
  { label: 'Dữ liệu', icon: <StorageIcon />, path: '/data' },
  { label: 'Vị trí công tác', icon: <WorkIcon />, path: '/positions' },
];

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5', // Light grey background for sidebar
        },
      }}
    >
      <Toolbar /> {/* This creates space for the AppBar */}
      <List>
        {menuItems.map(({ label, icon, path }) => (
          <ListItem
            key={label}
            disablePadding
            component={NavLink} // Use NavLink
            to={path}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&.active': {
                backgroundColor: '#e0e0e0', // Highlight active item
                fontWeight: 'bold',
              },
              '&:hover': {
                backgroundColor: '#e0e0e0', // Hover effect
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>{icon}</ListItemIcon>
            <ListItemText primary={label} sx={{ '& .MuiListItemText-primary': { fontWeight: 'inherit' } }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;