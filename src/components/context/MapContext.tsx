import React, { useReducer } from "react";

interface MapState {
  year: string;
  // Typescript does not recognize "month: 1" as type "month: number"
  // Using type of any until problem can be resolved
  month: any;
  selectedPref: string;
}

interface SetDateAction {
  type: "setDate";
  payload: {
    month: string;
    year: string;
  };
}

interface setCurrentPrefAction {
  type: "setCurrentPref";
  payload: string;
}

type MapActions = SetDateAction | setCurrentPrefAction;

const initialState: MapState = {
  year: "1873",
  month: 1,
  selectedPref: ""
};

export const reducer = (state: MapState, action: MapActions) => {
  switch (action.type) {
    case "setDate":
      return { ...state, ...action.payload };
    case "setCurrentPref":
      return { ...state, selectedPref: action.payload };
    default:
      throw new Error("Unexpected action");
  }
};

export const MapContext = React.createContext([] as any);

const DateProvider: React.FC = ({ children }) => {
  const contextValue = useReducer(reducer, initialState);
  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};

export default DateProvider;
