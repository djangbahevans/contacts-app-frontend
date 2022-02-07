import { Add, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { createContactsFromFile } from '../services/api';

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

  const queryClient = useQueryClient()
  const mutation = useMutation(createContactsFromFile, {
    onSuccess: () => {
      setTimeout(() => queryClient.invalidateQueries("contacts"), 2000)
    }
  })

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
          <ListItem button onClick={() => { navigate("/new") }}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Create contact" />
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={() => {
            const input = document.createElement("input")
            input.type = "file"
            input.multiple = false
            input.accept = ".csv"

            input.onchange = _ => {
              if (input.files) {
                const formData = new FormData()
                formData.append("file", input.files[0])

                mutation.mutateAsync(formData)
              }
            };

            input.click()
          }}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Create from CSV" />
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

