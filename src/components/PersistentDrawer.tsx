import { Add, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

interface IDrawerProps {
  open?: boolean;
  handleDrawerClose: () => void;
  children?: ReactNode
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const PersistentDrawer = ({ open, handleDrawerClose, children }: IDrawerProps) => {
  const theme = useTheme();
  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button onClick={() => { navigate("/contact/create") }}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Create contact" />
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        {/* <DrawerHeader /> */}
        {children}
      </Main>
    </Box>
  );
}

export { PersistentDrawer };

