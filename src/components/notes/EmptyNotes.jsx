
import { Typography, Box, styled } from '@mui/material';

const Text = styled(Typography)`
    color: #80868b;
    font-size: 22px
`

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20vh
   
`

const EmptyNotes = () => {
    return (
        <Container style={{marginLeft:"350px",marginTop:"130px" }}>
             <img
                src={`${process.env.PUBLIC_URL}/images/waiting1.png`}
                alt="Logo"
                style={{ height: "140px", width: "auto" ,marginLeft:"50px"}}
              />
            <Text>Notes that you add appear here</Text>
        </Container>
    )
}

export default EmptyNotes;