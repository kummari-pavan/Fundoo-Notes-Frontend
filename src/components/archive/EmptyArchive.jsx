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

const EmptyArchive = () => {
    return (
        <Container style={{marginLeft:"350px",marginTop:"250px"}}>
             <img
                src={`${process.env.PUBLIC_URL}/images/archive1.png`}
                alt="Logo"
                style={{ height: "130px", width: "auto"}}
              />
            <Text>Notes you Archived appear here</Text>
        </Container>
    )
}

export default EmptyArchive;