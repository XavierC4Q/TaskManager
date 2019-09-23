import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import Routes from './components/Routes';
import AllContext from './context/AllContext';
import Navbar from './components/Navbar';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#bd304e'
        },
        secondary: {
            main: '#39323A'
        }
    },
    spacing: 8,
});

const App: React.FC = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth={false} style={{height: '100%', minHeight: 'inherit', position: 'relative'}}>
                <AllContext>
                    <ThemeProvider theme={theme}>
                        <Navbar />
                        <Routes />
                    </ThemeProvider>
                </AllContext>
            </Container>
        </React.Fragment>
    );
};

export default App;
