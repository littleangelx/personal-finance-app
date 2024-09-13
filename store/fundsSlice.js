"use client";

import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
  balance: {
    current: 4836.0,
    income: 3814.25,
    expenses: 1700.5,
  },
  budgets: [
    {
      id: 1,
      category: "Entertainment",
      maximum: 50.0,
      theme: {
        value: "#277C78",
        label: (
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-green" />
            <span>Green</span>
          </div>
        ),
      },
    },
    {
      id: 2,
      category: "Bills",
      maximum: 750.0,
      theme: {
        value: "#82C9D7",
        label: (
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-cyan" />
            <span>Cyan</span>
          </div>
        ),
      },
    },
    {
      id: 3,
      category: "Dining Out",
      maximum: 75.0,
      theme: {
        value: "#F2CDAC",
        label: (
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-yellow" />
            <span>Yellow</span>
          </div>
        ),
      },
    },
    {
      id: 4,
      category: "Personal Care",
      maximum: 100.0,
      theme: {
        value: "#626070",
        label: (
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-navy" />
            <span>Navy</span>
          </div>
        ),
      },
    },
  ],
  pots: [
    {
      id: 1,
      name: "Savings",
      target: 2000.0,
      total: 159.0,
      theme: {
        value: "#277C78",
        label: (
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-green" />
            <span>Green</span>
          </div>
        ),
      },
    },
    {
      id: 2,
      name: "Concert Ticket",
      target: 150.0,
      total: 110.0,
      theme: {
        value: "#626070",
        label: (
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-navy" />
            <span>Navy</span>
          </div>
        ),
      },
    },
    {
      id: 3,
      name: "Gift",
      target: 150.0,
      total: 110.0,
      theme: {
        value: "#82C9D7",
        label: (
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-cyan" />
            <span>Cyan</span>
          </div>
        ),
      },
    },
    {
      id: 4,
      name: "New Laptop",
      target: 1000.0,
      total: 10.0,
      theme: {
        value: "#F2CDAC",
        label: (
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-yellow" />
            <span>Yellow</span>
          </div>
        ),
      },
    },
    {
      id: 5,
      name: "Holiday",
      target: 1440.0,
      total: 531.0,
      theme: {
        value: "#826CB0",
        label: (
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded-full bg-purple" />
            <span className="text-sm text-grey-900">Purple</span>
          </div>
        ),
      },
    },
  ],
};

const fundsSlice = createSlice({
  name: "funds",
  initialState,
  reducers: {
    addPot(state, action) {
      state.pots.push({
        id: v4(),
        name: action.payload.name,
        target: +action.payload.target,
        total: 0,
        theme: action.payload.theme,
      });
    },
    addToPot(state, action) {
      const foundPot = state.pots.find(
        (pot) => pot.name === action.payload.name
      );
      foundPot.total += action.payload.amount;
      state.balance -= action.payload.amount;
    },
    withdrawFromPot(state, action) {
      const foundPot = state.pots.find(
        (pot) => pot.name === action.payload.name
      );
      foundPot.total -= action.payload.amount;
      state.balance += action.payload.amount;
    },
    editPot(state, action) {
      const foundPot = state.pots.find((pot) => pot.id === action.payload.id);
      foundPot.name = action.payload.name;
      foundPot.target = +action.payload.target;
      foundPot.theme = action.payload.theme;
    },
    deletePot(state, action) {
      state.pots = state.pots.filter((pot) => pot.id !== action.payload.id);
    },
  },
});

export const { addPot, addToPot, withdrawFromPot, editPot, deletePot } =
  fundsSlice.actions;
export default fundsSlice.reducer;
