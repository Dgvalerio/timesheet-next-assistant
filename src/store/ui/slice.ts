import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';

export namespace UIStore {
  export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
  }

  export interface State {
    loading: boolean;
    themeMode: ThemeMode;
  }

  export interface Reducers extends SliceCaseReducers<State> {
    enableLoading: CaseReducer<State>;
    disableLoading: CaseReducer<State>;
    switchThemeMode: CaseReducer<State>;
  }
}

const initialState: UIStore.State = {
  loading: false,
  themeMode: UIStore.ThemeMode.Light,
};

const uiSlice = createSlice<UIStore.State, UIStore.Reducers>({
  name: 'user',
  initialState,
  reducers: {
    enableLoading(state) {
      state.loading = true;
    },
    disableLoading(state) {
      state.loading = false;
    },
    switchThemeMode(state) {
      state.themeMode =
        state.themeMode === UIStore.ThemeMode.Light
          ? UIStore.ThemeMode.Dark
          : UIStore.ThemeMode.Light;
    },
  },
});

export const { actions } = uiSlice;
export default uiSlice.reducer;
