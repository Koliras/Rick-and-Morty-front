import { HashRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Heading from './components/Heading/Heading';
import Content from './components/Content/Content';
import React from 'react';
import FAB from './components/FAB/FAB';
import { Box } from '@mui/material';

function App() {
  return (
    <React.Fragment>
      <HashRouter>
        <Header />

        <Box>
          <Heading />

          <Content />

          <FAB />
        </Box>

        <Footer />
      </HashRouter>
    </React.Fragment>
  );
}

export default App;
