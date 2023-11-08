// import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Header />

      <body>
        <h1 className='heading'>The Rick and Morty API</h1>

        <div className='content'>
          <div className="filtering">
            <button className='filtering__filter'>
              Filter
            </button>

            <div className="filtering__params">
              <div className="filtering__params__item">
                Select Item
              </div>

              <div className="filtering__params__keywords">
                Add key words to find
              </div>

              <button className="filtering__params__find">
                Find
              </button>
            </div>
          </div>

          <div className="cards">
            <h2>TemporaryContent</h2>
            <h2>TemporaryContent</h2>
            <h2>TemporaryContent</h2>
            <h2>TemporaryContent</h2>
            <h2>TemporaryContent</h2>
            <h2>TemporaryContent</h2>
          </div>

          <div className="pagination">
            1234
          </div>

          <div className="fab">...</div>
        </div>
      </body>

      <footer>
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
      </footer>
    </>
  );
}

export default App;
