import { RootState } from "@/app/store";
import { Character } from "@/utils/types/Character";
import { Episode } from "@/utils/types/Episode";
import { FormInput } from "@/utils/types/FormInput";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCharacter, getCharacters, getEpisode, getEpisodes, getLocations } from "rickmortyapi";

export interface CharactersState {
  characters: Character[];
  pageAmount: number;
  loading: boolean;
  error: string;
  filteredCharIds: number[];
}

const initialState: CharactersState = {
  characters: [],
  pageAmount: 0,
  loading: false,
  error: '',
  filteredCharIds: [],
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (page: number) => {
    const response = await getCharacters({ page });
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

export const fetchCharactersWithFilters = createAsyncThunk(
  'characters/fetchCharactersWithFilters',
  async ( filters: FormInput) => {
    const episodes = filters.episodes
      ? (await getEpisodes({
        episode: filters.ep_code,
        name: filters.ep_name
      })).data.results
      : [];

    const charsFromEpisodeUrls = new Set(episodes?.map((ep) => {
      return ep.characters
    }).flat());

    const locations = filters.location
      ? (await getLocations({
        name: filters.loc_name,
        type: filters.loc_type,
        dimension: filters.loc_dimension,
      })).data.results
      : [];

    const charsFromLocationUrls = new Set(locations?.map((loc) => {
      return loc.residents;
    }).flat());

    const uniqueUrls = new Set([...charsFromEpisodeUrls, ...charsFromLocationUrls])

    const charFromEpAndLocIds = [...uniqueUrls].map(url => +url.split('character/')[1]);

    const charIds = filters.character
      ? (await getCharacters({
        name: filters.char_name,
        gender: filters.char_gender,
        status: filters.char_status,
        species: filters.char_species,
        type: filters.char_type,
      })).data.results?.map(char => char.id)
      : [];
    
    const filteredIds = charIds
      ? [...charIds, ...charFromEpAndLocIds]
      : charFromEpAndLocIds;

    const resultChars = await getCharacter(filteredIds);
    const pages = Math.ceil(filteredIds.length / 20);

    return {
      resultChars,
      filteredIds,
      pages,
    };
  }
)

export const fetchFilteredCharacters = createAsyncThunk(
  'characters/fetchFilteredCharacters',
  async ({ page, ids }: { page: number, ids: number[]}) => {
    const charsDiapason = ids.slice((page - 1) * 20, page * 20)
    const resultChars = await getCharacter(charsDiapason);

    return {
      resultChars,
    }
  }
)

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.filteredCharIds = [];
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

    builder
      .addCase(fetchCharactersWithFilters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharactersWithFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload.resultChars;
        state.filteredCharIds = action.payload.filteredIds;
        state.pageAmount = action.payload.pages;
      })
      .addCase(fetchCharactersWithFilters.rejected, (state) => {
        state.loading = false;
        state.error = 'Something went wrong'
      });

    builder
      .addCase(fetchFilteredCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload.resultChars;
      })
      .addCase(fetchFilteredCharacters.rejected, (state) => {
        state.loading = false;
        state.error = 'Something went wrong'
      })
  },
});

export const selectCharacters = (state: RootState) => state.characters.characters;

export const { resetFilters } = charactersSlice.actions;

export default charactersSlice.reducer;
