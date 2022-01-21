import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';

import Protocol from 'devtools-protocol';

export namespace UserStore {
  export interface State {
    cookies: Protocol.Network.Cookie[];
  }

  export interface Reducers extends SliceCaseReducers<State> {
    setCookies: CaseReducer<
      State,
      PayloadAction<{ cookies: Protocol.Network.Cookie[] }>
    >;
  }
}

const initialState: UserStore.State = {
  cookies: [],
};

const userSlice = createSlice<UserStore.State, UserStore.Reducers>({
  name: 'user',
  initialState,
  reducers: {
    setCookies(state, action) {
      state.cookies = action.payload.cookies;
    },
  },
});

export const { actions } = userSlice;
export default userSlice.reducer;
