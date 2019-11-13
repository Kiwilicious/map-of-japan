import React, { useReducer } from "react";

interface DateState {
  year: string;
  month: number;
}

interface SetDateAction {
  type: string;
  payload: DateState;
}

type DateAction = SetDateAction;

export const initialState: DateState = {
  year: "2019",
  month: 10
};

export const reducer = (state: DateState, action: DateAction) => {
  switch (action.type) {
    case "setDate":
      return { ...initialState, ...action.payload };
    default:
      throw new Error("Unexpected action");
  }
};

export const DateContext = React.createContext([] as any);

const DateProvider: React.FC = ({ children }) => {
  const contextValue = useReducer(reducer, initialState);
  return (
    <DateContext.Provider value={contextValue}>{children}</DateContext.Provider>
  );
};

export default DateProvider;
