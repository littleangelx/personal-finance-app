"use client";

// components/Providers.js
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";

// persistor.purge();

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Providers;
