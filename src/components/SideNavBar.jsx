import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LightbulbOutlined as Lightbulb, ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link } from 'react-router-dom';

const SideNavBar = () => {

    const navList = [
        { id: 1, name: 'Notes', icon: <Lightbulb />, route: '/dashboard/notes' },
        { id: 2, name: 'Important', icon: <StarBorderIcon />, route: '/dashboard/important'},
        { id: 3, name: 'Archives', icon: <Archive />, route: '/dashboard/archive' },
        { id: 4, name: 'Trash', icon: <Delete />, route: '/dashboard/trash' },
        
    ]
    
    return (
        <div>
            <List sx={{
            cursor: "pointer",
          }}>
        {
            navList.map(list => (
                <ListItem button key={list.id}>
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