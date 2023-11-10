import { useEffect, useState } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard'
import { getCharacter, getEpisode } from 'rickmortyapi';
import { getFirstSeenEpisodeId } from '../../utils/getFirstSeenEpisodeId';
import { Box } from '@mui/material';

function Home() {
  const [character, setCharacter] = useState({});
  const [firstSeen, setFirstSeen] = useState('');
  const [noSuchCharater, setNoSuchCharacter] = useState(false);

  useEffect(() => {
    getCharacter(1)
      .then(({ data }) => {
        setNoSuchCharacter(false)
        setCharacter(data);
        let episodeId = getFirstSeenEpisodeId(data);
        getEpisode(episodeId).then(({ data }) => setFirstSeen(data.name));
      })
      .catch(() => setNoSuchCharacter(true));
  }, []);
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

      <Box
       sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '28px'
       }}
      >
        <CharacterCard character={character}/>
        <h2>TemporaryContent</h2>
        <h2>TemporaryContent</h2>
        <h2>TemporaryContent</h2>
        <h2>TemporaryContent</h2>
        <h2>TemporaryContent</h2>
        <h2>TemporaryContent</h2>
      </Box>

      <div className="pagination">
        1234
      </div>

      <div className="fab">...</div>
    </>
  )
}

export default Home;
