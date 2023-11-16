import { HistoryElement, HistoryElementType } from "../../utils/types/History"
import { createSlice } from "@reduxjs/toolkit"
import { setFilters } from "../characters/charactersSlice"

export interface HistoryState {
  history: HistoryElement[]
}

const initialState: HistoryState = {
  history: [],
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    update: (state, action) => {
      state.history.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setFilters, (state, action) => {
      state.history.unshift({
        type: HistoryElementType.FILTER,
        content: action.payload,
        id: Date.now(),
      });
    });
  }
})


export const { update } = historySlice.actions;

export default historySlice.reducer;
