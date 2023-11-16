import { RootState } from "../../app/store";
import { DEFAULT_FORM_VALUES } from "../../utils/constants";
import { Character } from "../../utils/types/Character";
import { Episode } from "../../utils/types/Episode";
import { FormInput } from "../../utils/types/FormInput";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCharacters, getEpisode } from "rickmortyapi";

export interface CharactersState {
  characters: Character[];
  pageAmount: number;
  loading: boolean;
  error: string;
  currentFilters: FormInput
}

const initialState: CharactersState = {
  characters: [],
  pageAmount: 0,
  loading: false,
  error: '',
  currentFilters: DEFAULT_FORM_VALUES,
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async ({ page = 1, filters = DEFAULT_FORM_VALUES }: { page?: number, filters?: FormInput }) => {
    const response = await getCharacters({
      page,
      name: filters.char_name,
      status: filters.char_status,
      species: filters.char_species,
      gender: filters.char_gender,
      type: filters.char_type,
    });
    let readyChars = response.data.results;
    const episodeIds = readyChars?.map(char => {
      const id = char.episode[0].split('episode/')[1];

      return +id;
    })
    const episodeNames = {};
    if (episodeIds) {
      ((await getEpisode(episodeIds)).data as Episode[]).map(ep => {
        episodeNames[ep.url] = ep.name;
      });
    }
    readyChars = readyChars?.map((char) => {
      return {
        ...char,
        firstSeen: episodeNames[char.episode[0]]
      }
    });

    return {
      results: readyChars,
      pages: response.data.info?.pages,
    };
  }
)

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.currentFilters = DEFAULT_FORM_VALUES;
    },
    setFilters: (state, action) => {
      state.currentFilters = action.payload;
    }
  },
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

export const { resetFilters, setFilters } = charactersSlice.actions;

export default charactersSlice.reducer;
