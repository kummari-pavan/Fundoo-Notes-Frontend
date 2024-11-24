import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';

const StyledCard = styled(Card)`
    border: 1px solid red;
    border-radius: 8px;
    margin: 8px;
    box-shadow: none;
    padding:5px
`

const NoteCard = ({ noteDetails }) => {

    console.log(noteDetails)
    const archiveNote = (noteDetails) => {
       
    }
    const deleteNote = (noteDetails) => {
       
    }

    return (
        <StyledCard>
            <div className='card-container'>
                <CardContent >
                    <Typography>{noteDetails.title}</Typography>
                    <Typography>{noteDetails.description}</Typography>
                </CardContent>
                <CardActions>
                    <Archive 
                        fontSize="small" 
                        style={{ marginLeft: 'auto' }} 
                        onClick={() => archiveNote(noteDetails)}
                    />
                    <Delete 
                        fontSize="small"
                        onClick={() => deleteNote(noteDetails)}
                    />
                </CardActions>
            </div>
        </StyledCard>
    )
}

export default NoteCard;