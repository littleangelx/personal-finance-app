"use client";

import { combineReducers } from "@reduxjs/toolkit";

import fundsReducer from "./fundsSlice";
import categoryReducer from "./categorySlice";

const rootReducer = combineReducers({
  fundsReducer,
  categoryReducer,
});

export default rootReducer;
