import React from "react";
import "./App.css";
import DateProvider from "./components/context/DateContext";
import JapaneseMap from "./components/JapaneseMap/JapaneseMap";
import MapSlider from "./components/MapSlider/MapSlider";

const App: React.FC = () => {
  return (
    <DateProvider>
      <JapaneseMap />
      <MapSlider />
    </DateProvider>
  );
};

export default App;
