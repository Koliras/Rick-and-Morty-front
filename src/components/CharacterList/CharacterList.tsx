import { Box } from "@mui/material";
import CharacterCard from "../CharacterCard/CharacterCard";
import { fetchCharacters, selectCharacters } from "../../features/characters/charactersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function CharacterList() {
  const characters = useAppSelector(selectCharacters);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(fetchCharacters(page));
  }, [searchParams])
  return (
    <Box
      sx={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '28px'
      }}
    >
      {characters.map(char => (
        <CharacterCard character={char} key={char.id}/>
      ))}
    </Box>
  )
}