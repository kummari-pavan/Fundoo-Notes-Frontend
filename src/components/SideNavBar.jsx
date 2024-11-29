import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LightbulbOutlined as Lightbulb, ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link } from 'react-router-dom';

const SideNavBar = () => {

    const navList = [
        { id: 1, name: 'Notes', icon: <Lightbulb />, route: '/dashboard/notes' },
        { id: 2, name: 'Notifactions', icon: <NotificationsNoneOutlinedIcon />, route: '/dashboard/important'},
        { id: 3, name: 'Archives', icon: <Archive />, route: '/dashboard/archive' },
        { id: 4, name: 'Bin', icon: <Delete />, route: '/dashboard/trash' },
        
    ]
    
    return (
        <div>
            <List sx={{
            cursor: "pointer",
          }}>
        {
            navList.map(list => (
                <ListItem button key={list.id}
                sx={{
                    '&:hover': {
                        backgroundColor: "rgb(254, 239, 195);",
                        borderRadius: '6px',    
                        transition: 'background-color 0.3s', 
                    },
                }}
                
                >
                    <Link to={`${list.route}`} style={{ textDecoration: 'none', display: 'flex', color: 'inherit'}}>
                        <ListItemIcon style={{ alignItems: 'center'}}>
                            {list.icon}
                        </ListItemIcon>
                        <ListItemText primary={list.name} />
                    </Link>
                </ListItem>
            ))
        }
        </List>
        </div>
        
    )
}

export default SideNavBar;