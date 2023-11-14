import { Box } from "@mui/material";
import CharacterCard from "../CharacterCard/CharacterCard";
import { fetchCharacters, fetchFilteredCharacters } from "../../features/characters/charactersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function CharacterList() {
  const { characters, filteredCharIds } = useAppSelector(state => state.characters);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (filteredCharIds.length) {
      dispatch(fetchFilteredCharacters({ page, ids: filteredCharIds }))
    } else {
      dispatch(fetchCharacters(page));
    }
  }, [searchParams])
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '28px',
        mb: 1,
      }}
    >
      {characters.map(char => (
        <CharacterCard character={char} key={char.id}/>
      ))}
    </Box>
  )
}