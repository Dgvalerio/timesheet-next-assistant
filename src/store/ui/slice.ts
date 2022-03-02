import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';

export enum Load {
  Page = 'page',
  AzureLogin = 'azure_login',
  SignIn = 'sign_in',
  SignUp = 'sign_up',
  SignOut = 'sign_out',
}

export namespace UIStore {
  export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
  }

  export interface State {
    loading: Load[];
    themeMode: ThemeMode;
  }

  export interface Reducers extends SliceCaseReducers<State> {
    enableLoading: CaseReducer<State, PayloadAction<{ toLoad: Load }>>;
    disableLoading: CaseReducer<State, PayloadAction<{ toLoad: Load }>>;
    switchThemeMode: CaseReducer<State>;
  }
}

const initialState: UIStore.State = {
  loading: [],
  themeMode: UIStore.ThemeMode.Light,
};

const uiSlice = createSlice<UIStore.State, UIStore.Reducers>({
  name: 'user',
  initialState,
  reducers: {
    enableLoading(state, action) {
      const { toLoad } = action.payload;

      if (!state.loading.includes(toLoad)) state.loading.push(toLoad);
    },
    disableLoading(state, action) {
      const { toLoad } = action.payload;

      state.loading = state.loading.filter((loadItem) => loadItem !== toLoad);
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
