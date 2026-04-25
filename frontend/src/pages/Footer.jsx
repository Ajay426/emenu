import React from "react"
import { Box, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function Footer() {
    return (
        <>
            <Box sx={{ textAlign: 'center', bgcolor: "#000000", color: "white", p: 3 }}      >
                <Box sx={{
                    my: 3,
                    "& svg": {
                        fontSize: "40px",
                        cursor: "pointer",
                        mr: 2,
                    },
                    "& svg:hover": {
                        color: "#ff8d8d",
                        transform: "translateX(6px)",
                        transition: "all 400ms",
                    }
                }}  >

                    <a href="https://github.com/Ajay426">  <GitHubIcon /></a>
                    <a href="https://www.instagram.com/ajay.env/?hl=en">    <InstagramIcon /> </a>
                    <a href="##"> <XIcon /></a>
                    <a href="https://www.linkedin.com/in/ajay-mahato26/">  <LinkedInIcon /></a>

                </Box>
                <Typography variant="5" sx={{
                    "@media (max-width:600px)": {
                        fontSize: "1rem",
                    },
                }}>
                    All rights Reserved &copy; Ajay Mahato
                </Typography>
            </Box>
        </>
    )
}