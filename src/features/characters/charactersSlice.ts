import { RootState } from "@/app/store";
import { Character } from "@/utils/types/Character";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCharacters } from "rickmortyapi";

export interface CharactersState {
  characters: Character[];
  loading: boolean;
  error: string;
}

const initialState: CharactersState = {
  characters: [],
  loading: false,
  error: '',
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page: number) => {
    const response = await getCharacters({ page });

    return response.data.results;
  }
)

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload || [];
      })
      .addCase(fetchCharacters.rejected, (state) => {
        state.loading = false;
        state.error = 'Something went wrong';
      });
  },
});

export const selectCharacters = (state: RootState) => state.characters.characters;

export default charactersSlice.reducer;
