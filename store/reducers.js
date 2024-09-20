import { combineReducers } from "@reduxjs/toolkit";

import fundsReducer from "./fundsSlice";

const rootReducer = combineReducers({
  fundsReducer,
});

export default rootReducer;
