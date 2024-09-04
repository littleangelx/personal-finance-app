"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: {
    current: 4836.0,
    income: 3814.25,
    expenses: 1700.5,
  },
  budgets: [
    {
      category: "Entertainment",
      maximum: 50.0,
      theme: "#277C78",
    },
    {
      category: "Bills",
      maximum: 750.0,
      theme: "#82C9D7",
    },
    {
      category: "Dining Out",
      maximum: 75.0,
      theme: "#F2CDAC",
    },
    {
      category: "Personal Care",
      maximum: 100.0,
      theme: "#626070",
    },
  ],
  pots: [
    {
      name: "Savings",
      target: 2000.0,
      total: 159.0,
      theme: "#277C78",
    },
    {
      name: "Concert Ticket",
      target: 150.0,
      total: 110.0,
      theme: "#626070",
    },
    {
      name: "Gift",
      target: 150.0,
      total: 110.0,
      theme: "#82C9D7",
    },
    {
      name: "New Laptop",
      target: 1000.0,
      total: 10.0,
      theme: "#F2CDAC",
    },
    {
      name: "Holiday",
      target: 1440.0,
      total: 531.0,
      theme: "#826CB0",
    },
  ],
};

const fundsSlice = createSlice({
  name: "funds",
  initialState,
});

export const fundsSliceActions = fundsSlice.actions;
export default fundsSlice.reducer;
