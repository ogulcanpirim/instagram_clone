import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CoreState {
  globalLoading: boolean;
  searchText: string;
}

const initialState: CoreState = {
  globalLoading: false,
  searchText: '',
};

export const coreSlicer = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
});

export const { setGlobalLoading, setSearchText } = coreSlicer.actions;
export default coreSlicer.reducer;
