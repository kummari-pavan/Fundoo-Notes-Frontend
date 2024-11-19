import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import ViewListIcon from "@mui/icons-material/ViewList";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Outlet } from "react-router-dom";
import './Dashboard.scss'

function DashboardNavbar({children}) {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="dashboard-body">
  
        <AppBar
          position="static"
          sx={{
            backgroundColor: "white",
            boxShadow: "none",
            borderBottom: "1px solid #ddd",
            color: "black",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <img
                src={`${process.env.PUBLIC_URL}/images/logo-main.png`}
                alt="Logo"
                style={{ height: "40px", width: "auto" }}
              />
              <Typography variant="h6" color="#5f6368" sx={{ fontWeight: "bold" }}>
                Fundoo-Notes
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                marginLeft: 3,
                marginRight: 3,
                maxWidth: 500,
                backgroundColor: "#f1f3f4",
                borderRadius: "8px",
                paddingLeft: 2,
              }}
            >
              <SearchIcon />
              <InputBase
                placeholder="Search"
                fullWidth
                sx={{ paddingLeft: 1, fontSize: "0.9rem",height:"50px" }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton>
                <RefreshIcon />
              </IconButton>
              <IconButton>
                <ViewListIcon />
              </IconButton>
              <IconButton>
                <SettingsIcon />
              </IconButton>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
              <Avatar
                alt="User Profile"
                src={`${process.env.PUBLIC_URL}/images/pavan.jpeg`}
                sx={{ width: 32, height: 32 }}
              />
            </Box>
          </Toolbar>
        </AppBar>
        
        <div className="dashboard-content">
            <div className={`dashboard-drawer ${drawerOpen ? "open" : ""}`}>
              <Box className="drawer-content">
                <List>
                  {/* List Item: Notes */}
                  <ListItem button>
                    <ListItemIcon>
                      <LightbulbOutlinedIcon/>
                    </ListItemIcon>
                    {drawerOpen && <ListItemText primary="Notes" />}
                  </ListItem>

                  {/* List Item: Archive */}
                  <ListItem button>
                    <ListItemIcon>
                      <ArchiveOutlinedIcon />
                    </ListItemIcon>
                    {drawerOpen && <ListItemText primary="Archive" />}
                  </ListItem>

                  {/* List Item: Trash */}
                  <ListItem button>
                    <ListItemIcon>
                      <DeleteOutlineOutlinedIcon />
                    </ListItemIcon>
                    {drawerOpen && <ListItemText primary="Trash" />}
                  </ListItem>

                  {/* List Item: Notifications */}
                  <ListItem button>
                    <ListItemIcon>
                      <NotificationsNoneOutlinedIcon />
                    </ListItemIcon>
                    {drawerOpen && <ListItemText primary="Notifications" />}
                  </ListItem>
                </List>
              </Box>
            </div>
  
            <Box sx={{
                      flexGrow: 1,
                      marginLeft:   "500px",
                      padding: "16px",
                      overflowY: "auto",
                      transition: "margin-left 0.3s", 
                    }} 
                >
                  <Outlet/>
            </Box>
        </div>
  </div>
  );
}

export default DashboardNavbar;
