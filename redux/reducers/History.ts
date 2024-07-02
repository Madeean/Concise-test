import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  historyQr: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistoryQr: (state, action) => {
      state.historyQr.push(action.payload.message);
    },
  },
});

export const {addHistoryQr} = historySlice.actions;
export default historySlice.reducer;
