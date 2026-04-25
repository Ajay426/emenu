
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./HeaderStyle.css";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react"

export default function Header() {


    const [mobileOpen, setMobileOpen] = useState(false);
// for menu on click
    const handleToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsLoggedIn(!!token)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        alert("Logged out successfully")
        window.location.href = "/"
    }
// for handling the click   
    const drawer = (
        <Box onClick={handleToggle} sx={{ textAlign: "center", bgcolor: "#ff3434", height: "100%" }}>

            <Typography color="white" variant="h6" sx={{ my: 2 }}>
                <FastfoodIcon /> One Restro
            </Typography>

            <Divider />
            <ul className="mobile-navigation">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </Box>
    );

    return (
        <>
            <AppBar component="nav" sx={{ bgcolor: "#ff3434" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2, display: { sm: "none" } }}
                        onClick={handleToggle}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography color="white" variant="h6" sx={{ flexGrow: 1 }}>
                        <FastfoodIcon /> One Restro
                    </Typography>

                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <ul className="nevigationMenu">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/menu">Menu</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/about">About</Link></li>
                            {isLoggedIn ? (
                                <li style={{ cursor: "pointer" }} onClick={handleLogout}>
                                    Logout
                                </li>
                            ) : (
                                <li>
                                    <a href="/login">ACCOUNT</a>
                                </li>
                            )}
                        </ul>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleToggle}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: 240,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Toolbar />
        </>
    );
}