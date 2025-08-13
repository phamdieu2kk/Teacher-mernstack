import React, { useState } from 'react';
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Collapse,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import {
  ExpandLess, ExpandMore, School as SchoolIcon, Person as PersonIcon, Group as GroupIcon,
  Insights as InsightsIcon, Storage as StorageIcon, Class as ClassIcon,
  Schedule as ScheduleIcon, FolderShared as FolderSharedIcon, Work as WorkIcon,
} from '@mui/icons-material';

const drawerWidth = 180;

const Sidebar = () => {
  const location = useLocation();
  const [openClasses, setOpenClasses] = useState(location.pathname.startsWith('/classes') || location.pathname.startsWith('/schedule'));
  const [openStudents, setOpenStudents] = useState(location.pathname.startsWith('/students') || location.pathname.startsWith('/student-profile'));
  const [openData, setOpenData] = useState(location.pathname.startsWith('/positions'));

  // Style cho item active hoặc hover (giống video màu tím nhạt)
  const activeHoverStyle = {
    backgroundColor: '#4a148c', // tím đậm
    color: '#fff',
    borderRadius: 8,
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '& .MuiListItemIcon-root': {
      color: '#fff',
    },
  };

  // Style item bình thường
  const listItemStyle = {
    borderRadius: 8,
    transition: 'background-color 0.3s ease, color 0.3s ease',
    color: '#000',
    '&:hover': {
      backgroundColor: '#e1bee7', // tím nhạt nền hover
      color: '#4a148c',
      '& .MuiListItemIcon-root': {
        color: '#4a148c',
      },
    },
    '&.active': activeHoverStyle,
  };

  const toggle = (stateSetter) => () => stateSetter((prev) => !prev);
  const textProps = { primaryTypographyProps: { fontSize: '0.85rem', fontWeight: 600 } };
  const iconStyle = { minWidth: 28 };

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
          backgroundColor: '#f3e5f5', // nền tím nhạt
          top: 64,
          borderRight: 'none',
          boxShadow: '2px 0 8px rgb(0 0 0 / 0.1)',
        },
      }}
    >
      <List sx={{ mt: 1, padding: '0 8px' }}>
        {/* THỐNG KÊ */}
        <ListItemButton
          component={NavLink}
          to="/dashboard"
          className={({ isActive }) => (isActive ? 'active' : '')}
          sx={listItemStyle}
        >
          <ListItemIcon sx={iconStyle}><InsightsIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Thống kê" {...textProps} />
        </ListItemButton>

        {/* LỚP HỌC */}
        <ListItemButton
          onClick={toggle(setOpenClasses)}
          sx={{
            ...listItemStyle,
            justifyContent: 'space-between',
            '&:hover': {
              backgroundColor: '#e1bee7',
              color: '#4a148c',
              '& .MuiListItemIcon-root': { color: '#4a148c' },
            },
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={iconStyle}><ClassIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Lớp học" {...textProps} />
          </div>
          {openClasses ? <ExpandLess fontSize="small" sx={{ color: 'inherit' }} /> : <ExpandMore fontSize="small" sx={{ color: 'inherit' }} />}
        </ListItemButton>
        <Collapse in={openClasses} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={NavLink}
              to="/classes"
              className={({ isActive }) => (isActive ? 'active' : '')}
              sx={{ ...listItemStyle, pl: 4 }}
            >
              <ListItemIcon sx={iconStyle}><ClassIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Danh sách lớp" {...textProps} />
            </ListItemButton>
            <ListItemButton
              component={NavLink}
              to="/schedule"
              className={({ isActive }) => (isActive ? 'active' : '')}
              sx={{ ...listItemStyle, pl: 4 }}
            >
              <ListItemIcon sx={iconStyle}><ScheduleIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Thời khóa biểu" {...textProps} />
            </ListItemButton>
          </List>
        </Collapse>

        {/* HỌC SINH */}
        <ListItemButton
          onClick={toggle(setOpenStudents)}
          sx={{
            ...listItemStyle,
            justifyContent: 'space-between',
            '&:hover': {
              backgroundColor: '#e1bee7',
              color: '#4a148c',
              '& .MuiListItemIcon-root': { color: '#4a148c' },
            },
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={iconStyle}><SchoolIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Học sinh" {...textProps} />
          </div>
          {openStudents ? <ExpandLess fontSize="small" sx={{ color: 'inherit' }} /> : <ExpandMore fontSize="small" sx={{ color: 'inherit' }} />}
        </ListItemButton>
        <Collapse in={openStudents} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={NavLink}
              to="/students"
              className={({ isActive }) => (isActive ? 'active' : '')}
              sx={{ ...listItemStyle, pl: 4 }}
            >
              <ListItemIcon sx={iconStyle}><PersonIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Danh sách học sinh" {...textProps} />
            </ListItemButton>
            <ListItemButton
              component={NavLink}
              to="/student-profile"
              className={({ isActive }) => (isActive ? 'active' : '')}
              sx={{ ...listItemStyle, pl: 4 }}
            >
              <ListItemIcon sx={iconStyle}><FolderSharedIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Hồ sơ học sinh" {...textProps} />
            </ListItemButton>
          </List>
        </Collapse>

        {/* GIÁO VIÊN */}
        <ListItemButton
          component={NavLink}
          to="/teachers"
          className={({ isActive }) => (isActive ? 'active' : '')}
          sx={listItemStyle}
        >
          <ListItemIcon sx={iconStyle}><GroupIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Giáo viên" {...textProps} />
        </ListItemButton>

        {/* DỮ LIỆU */}
        <ListItemButton
          onClick={toggle(setOpenData)}
          sx={{
            ...listItemStyle,
            justifyContent: 'space-between',
            '&:hover': {
              backgroundColor: '#e1bee7',
              color: '#4a148c',
              '& .MuiListItemIcon-root': { color: '#4a148c' },
            },
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ListItemIcon sx={iconStyle}><StorageIcon fontSize="small" /></ListItemIcon>
            <ListItemText primary="Dữ liệu" {...textProps} />
          </div>
          {openData ? <ExpandLess fontSize="small" sx={{ color: 'inherit' }} /> : <ExpandMore fontSize="small" sx={{ color: 'inherit' }} />}
        </ListItemButton>
        <Collapse in={openData} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={NavLink}
              to="/positions"
              className={({ isActive }) => (isActive ? 'active' : '')}
              sx={{ ...listItemStyle, pl: 4 }}
            >
              <ListItemIcon sx={iconStyle}><WorkIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Vị trí công tác" {...textProps} />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
