import React from "react";
import KeyContext from "./keyContext";

function KeyContextProvider({ children }) {
  const key = "aeca48859d3be5727ae92901850d78c6";
  return (
    <React.Fragment>
      <KeyContext.Provider value={key}>{children}</KeyContext.Provider>
    </React.Fragment>
  );
}

export default KeyContextProvider;
