import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';

import Protocol from 'devtools-protocol';

export namespace UserStore {
  export interface State {
    uid?: string;
    name?: string;
    email?: string;
    photoURL?: string;
    cookies: Protocol.Network.Cookie[];
  }

  export interface Reducers extends SliceCaseReducers<State> {
    setUserData: CaseReducer<
      State,
      PayloadAction<{
        uid: string;
        name: string;
        email: string;
        photoURL?: string;
      }>
    >;
    setCookies: CaseReducer<
      State,
      PayloadAction<{ cookies: Protocol.Network.Cookie[] }>
    >;
    clearUserData: CaseReducer<State>;
  }
}

const initialState: UserStore.State = {
  cookies: [],
};

const userSlice = createSlice<UserStore.State, UserStore.Reducers>({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
    },
    clearUserData(state) {
      state = initialState;
    },
    setCookies(state, action) {
      state.cookies = action.payload.cookies;
    },
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;
