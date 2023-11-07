import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Navbar from './Navbar';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

const drawerList = [
    {
        "title": "Home",
        "href": '/',
        "icon": <HomeIcon />
    },
    {
        "title": "Courses",
        "href": '/courses',
        "icon": <MenuBookIcon />
    },
    {
        "title": "Student Dashboard",
        "href": '/enroll',
        "icon": <SaveAsIcon />
    },

]

function DashboardLayout(props) {
    const { window } = props;
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px'
                }}>
                    <h3 style={{ color: '#fff' }}>ONLINE LEARNING</h3>
                </div>
            </Toolbar>
            <Divider />

            <List>
                {drawerList.map((text, index) => (
                    <ListItem key={index} disablePadding >
                        <ListItemButton onClick={() => {
                            navigate(text.href);
                        }}>
                            <ListItemIcon sx={{ color: '#F0F0F0' }}>
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText sx={{ color: '#F0F0F0' }} primary={text.title} />
                        </ListItemButton>

                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}
            />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
          
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, 
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', backgroundColor: '#0174BE' },

                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', backgroundColor: '#0174BE' },

                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

        </Box>
    );
}

DashboardLayout.propTypes = {

    window: PropTypes.func,
};

export default DashboardLayout;