import { Box, Typography } from '@mui/material';
import CharacterCard from '../CharacterCard/CharacterCard';
import {
  fetchCharacters,
  selectCharacters,
} from '../../features/characters/charactersSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function CharacterList() {
  const { currentFilters } = useAppSelector((state) => state.characters);
  const characters = useAppSelector(selectCharacters);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(fetchCharacters({ page, filters: currentFilters }));

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [searchParams]);
  return characters.length !== 0 ? (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '28px',
        mb: 1,
      }}
    >
      {characters.map((char) => (
        <CharacterCard character={char} key={char.id} />
      ))}
    </Box>
  ) : (
    <Typography
      variant='h4'
      sx={{
        color: '#F5F5F5',
        fontWeight: 600,
        p: 3,
      }}
    >
      It seems, no character matches the parameters
    </Typography>
  );
}
