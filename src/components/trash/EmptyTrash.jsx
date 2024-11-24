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

const EmptyTrash = () => {
    return (
        <Container style={{marginLeft:"350px",marginTop:"250px" }}>
             <img
                src={`${process.env.PUBLIC_URL}/images/trash1.png`}
                alt="Logo"
                style={{ height: "160px", width: "auto"}}
              />
            <Text>Notes you Trashed appear here</Text>
        </Container>
    )
}

export default EmptyTrash;