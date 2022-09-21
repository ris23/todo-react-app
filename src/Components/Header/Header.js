import { Container, Navbar, Nav } from "react-bootstrap";

function Header()
{
    return(
        <Navbar bg='dark' expand ='sm' variant='dark'>
            <Container>
                <Navbar.Brand>Todo App</Navbar.Brand>
                
            </Container>
        </Navbar>
    );
}

export default Header;