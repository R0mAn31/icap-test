import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: [],
  reducers: {
    setTableData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTableData } = tableSlice.actions;
export default tableSlice.reducer;
