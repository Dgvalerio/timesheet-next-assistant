import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';

import Protocol from 'devtools-protocol';

export namespace UserStore {
  export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
  }

  export interface State {
    cookies: Protocol.Network.Cookie[];
    themeMode: ThemeMode;
  }

  export interface Reducers extends SliceCaseReducers<State> {
    setCookies: CaseReducer<
      State,
      PayloadAction<{ cookies: Protocol.Network.Cookie[] }>
    >;
    switchThemeMode: CaseReducer<State>;
  }
}

const initialState: UserStore.State = {
  cookies: [],
  themeMode: UserStore.ThemeMode.Light,
};

const userSlice = createSlice<UserStore.State, UserStore.Reducers>({
  name: 'user',
  initialState,
  reducers: {
    setCookies(state, action) {
      state.cookies = action.payload.cookies;
    },
    switchThemeMode(state) {
      state.themeMode =
        state.themeMode === UserStore.ThemeMode.Light
          ? UserStore.ThemeMode.Dark
          : UserStore.ThemeMode.Light;
    },
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;
