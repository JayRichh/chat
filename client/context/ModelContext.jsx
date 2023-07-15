import { createContext, useContext, useState } from "react";
import React from "react";

const ModelContext = createContext({
  model: "gpt-4-0314",
  subModel: "generate",
  isDalleMode: false,
  setModel: () => {},
  setSubModel: () => {},
  setIsDalleMode: () => {},
});

export const useModelContext = () => useContext(ModelContext);

export const ModelProvider = ({ children }) => {
  const [model, setModel] = useState("gpt-4-0314");
  const [subModel, setSubModel] = useState("generate");
  const [isDalleMode, setIsDalleMode] = useState(false);

  return (
    <ModelContext.Provider
      value={{ model, setModel, subModel, setSubModel, isDalleMode, setIsDalleMode }}
    >
      {children}
    </ModelContext.Provider>
  );
};
