import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Balance {
  balance: number;
}

const initialState: Balance = {
  balance: 0,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
});

export const { setBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
