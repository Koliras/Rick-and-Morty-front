import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Heading from './components/Heading/Heading';
import Home from './components/Home/Home';

function App() {
  return (
    <>
      <Header />

      <body>
        <Heading />

        <Home />
      </body>

      {/* <footer>
        <div className="info">
          Performed as part of a test case for the company
        </div>

        <div className="company-logo">
          image
        </div>

        <div className="links">
          <a href="#">link1</a>
          <a href="#">link2</a>
          <a href="#">link3</a>
        </div>

        <div className="year">2023</div>
      </footer> */}
      <Footer />
    </>
  );
}

export default App;
