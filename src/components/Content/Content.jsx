import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Character from "../Character/Character";
import { Box } from "@mui/material";

function Content() {
  return (
    <Box
      sx={{
        bgcolor: '#272B33',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Routes path='/'>
        <Route index element={<Home />} />
        <Route path=':characterId' element={<Character />} />
      </Routes>
    </Box>
  )
}

export default Content;