import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Grid, ListItemButton, ListItemIcon, Menu, MenuItem, TextField } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import Footer from "./Footer";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const LayoutSideBar = (socket) => {
 const [openDrawer, setOpenDrawer] = useState(false);
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);

    useEffect(() => {
        themeColor()
    }, []);

    const themeColor = async () => {
        try {
            const response = await fetch(
                `http://localhost:5001/theme/${obj.data[0].ID}`,
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                }
            );
            const result = await response.json();
            setColor(result.result[result.result.length-1].PRIMARY_COLOUR)
        } catch (err) {
            console.error(err.message);
        }
    }

    const obj = JSON.parse(localStorage.getItem("shop-info"));
    const token = obj?.accessToken;



    const [color, setColor] = useState(obj.data[obj.data.length - 1].PRIMARY_COLOUR); // Default color is black

    const rgbToHex = (r, g, b) => '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');

    const handleUserMenuOpen = (event) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };



    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setOpenDrawer(open);
    };

    const navigate = useNavigate();


    const handleDashboard = () => {
        navigate("./Dashboard");
    }

    const handleLogout = () => {
        navigate("/");
    }

    const updateColorInDatabase = () => {
        const colorRef = firebase.database().ref('color');
        const hexColor = rgbToHex(
            parseInt(color.substring(1, 3), 16),
            parseInt(color.substring(3, 5), 16),
            parseInt(color.substring(5, 7), 16)
        );

        colorRef
            .set(hexColor)
            .then(() => {
                console.log('Color saved successfully!');
            })
            .catch((error) => {
                console.error('Error saving color:', error);
            });
    };

    socket.socket.on('insertResult', (result) => {
        if (result.success) {
            console.log(result)
            // resultMessageElement.innerText = 'Data saved successfully';
            // savedDataElement.innerText = JSON.stringify(result.data);
        } else {
            // resultMessageElement.innerText = 'Error saving data to database';
            // savedDataElement.innerText = '';
        }
    })

    const handleColor = (e) => {
        setColor(e.target.value)
        const data = {
            "USER_ID": obj.data[0].ID,
            "PRIMARY_COLOUR": e.target.value,
            "SECONDARY_COLOUR": e.target.value,
            "TEXT_COLOUR": e.target.value,
            "FONT_SIZE": "12",
            "FONT": "Taufiq"
        }
        socket.socket.emit("color", data)

    }


    return (
        <>
            <AppBar style={{ backgroundColor: color }} position="static">
                <Toolbar>
                    <IconButton
                        edge="start"

                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        logo{/* <img
                            src={logo}// Replace with your logo image path
                            alt="Logo"
                            height="40"
                            width="90"
                            style={{ marginRight: "10px" }}
                        /> */}
                    </Typography>


                    <Button onClick={handleUserMenuOpen}
                        startIcon={<Avatar></Avatar>}>
                        User Account
                    </Button>
                    <Menu
                        anchorEl={userMenuAnchor}
                        open={Boolean(userMenuAnchor)}
                        onClose={handleUserMenuClose}
                    >
                        <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleUserMenuClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout} >Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer(false)}>
                <List current={{ color: color }} >
                    {/* Add your drawer items here */}
                    <ListItemButton onClick={handleDashboard}>
                        <ListItemIcon >
                            <HomeIcon className="listItem" />
                        </ListItemIcon>
                        <ListItemText className="listItem" primary="Dashboard/Home" />
                    </ListItemButton>

                    {/* Add more items as needed */}
                </List>
            </Drawer>
            <Grid style={{ padding: "5px" }} >
                <Outlet />
                <input
                    type="color"
                    value={color}
                    onChange={handleColor}
                />
                <button onClick={updateColorInDatabase}>Save Color</button>

            </Grid>
            <Footer color={color} />
        </>
    );
};

export default LayoutSideBar;
