import Container from '@mui/material/Container';
import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';

function App() {
    return (
        <>
            <Header/>
            <Container maxWidth = "lg">
                <Home />

            </Container>
        </>
    );
}

export default App;
