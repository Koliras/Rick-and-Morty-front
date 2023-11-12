import { RootState } from "@/app/store";
import { Character } from "@/utils/types/Character";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCharacters } from "rickmortyapi";

export interface CharactersState {
  characters: Character[];
  pageAmount: number;
  loading: boolean;
  error: string;
}

const initialState: CharactersState = {
  characters: [],
  pageAmount: 0,
  loading: false,
  error: '',
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page: number) => {
    const response = await getCharacters({ page });

    return {
      results: response.data.results,
      pages: response.data.info?.pages,
    };
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
        state.characters = action.payload.results || [];
        state.pageAmount = action.payload.pages || 0;
      })
      .addCase(fetchCharacters.rejected, (state) => {
        state.loading = false;
        state.error = 'Something went wrong';
      });
  },
});

export const selectCharacters = (state: RootState) => state.characters.characters;

export default charactersSlice.reducer;
