import { HashRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Heading from './components/Heading/Heading';
import Content from './components/Content/Content';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <HashRouter>
      <Header />

      <body>
        <Heading />

        <Content />
      </body>

      <Footer />
      </HashRouter>
    </React.Fragment>
  );
}

export default App;
