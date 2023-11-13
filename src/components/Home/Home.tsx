import CharacterList from '../CharacterList/CharacterList';
import Filter from '../Filter/Filter';
import PaginationComponent from '../PaginationComponent/PaginationComponent';

function Home() {
  return (
    <>
      <Filter />

      <CharacterList />

      <PaginationComponent />

      {/* <div className="fab">...</div> */}
    </>
  )
}

export default Home;
