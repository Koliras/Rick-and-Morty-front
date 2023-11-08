function Home() {
  return (
    <>
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
    </>
  )
}

export default Home;
