import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./dispatchers/tableSlice"; 
import countReducer from "./dispatchers/countSlice";  

const rootReducer = () => {};

const store = configureStore({
  reducer: {
    table: tableReducer,
    count: countReducer,
  },
});

export default store;
