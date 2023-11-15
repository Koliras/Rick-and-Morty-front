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

// export const fetchCharactersWithFilters = createAsyncThunk(
//   'characters/fetchCharactersWithFilters',
//   async ({ filters, page }: { filters: FormInput, page: number }) => {
//     // const episodes = filters.episodes
//     //   ? (await getEpisodes({
//     //     episode: filters.ep_code,
//     //     name: filters.ep_name
//     //   })).data.results
//     //   : [];

//     // const charsFromEpisodeUrls = new Set(episodes?.map((ep) => {
//     //   return ep.characters
//     // }).flat());

//     // const locations = filters.location
//     //   ? (await getLocations({
//     //     name: filters.loc_name,
//     //     type: filters.loc_type,
//     //     dimension: filters.loc_dimension,
//     //   })).data.results
//     //   : [];

//     // const charsFromLocationUrls = new Set(locations?.map((loc) => {
//     //   return loc.residents;
//     // }).flat());

//     // const uniqueUrls; = new Set([...charsFromEpisodeUrls, ...charsFromLocationUrls])
//     // let uniqueUrls;

//     // if (filters.episodes && filters.location) {
//     //   uniqueUrls = charsFromEpisodeUrls.intersection(charsFromLocationUrls);
//     // } else if (filters.character) {
//     //   uniqueUrls = charsFromEpisodeUrls
//     // }

//     // const charFromEpAndLocIds = [...uniqueUrls].map(url => +url.split('character/')[1]);

//     const characterResponse = (await getCharacters({
//         page,
//         name: filters.char_name,
//         gender: filters.char_gender,
//         status: filters.char_status,
//         species: filters.char_species,
//         type: filters.char_type,
//       })).data

      
//     // const filteredIds = charIds
//     //   ? [...charIds, ...charFromEpAndLocIds]
//     //   : charFromEpAndLocIds;

//     // const resultChars = (await getCharacter(filteredIds)).data;
//     const resultChars = characterResponse.results || [];
//     const pages = characterResponse.info?.pages || 0;

//     return {
//       resultChars,
//       pages,
//     };
//   }
// )

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
