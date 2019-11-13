import React from "react";
import "./App.css";
import styled from "styled-components";
import DateProvider from "./components/context/DateContext";
import JapaneseMap from "./components/JapaneseMap/JapaneseMap";
import MapSlider from "./components/MapSlider/MapSlider";

const MapContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 1000px;
`;

const App: React.FC = () => {
  return (
    <DateProvider>
      <MapContainer>
        <JapaneseMap />
        <MapSlider />
      </MapContainer>
    </DateProvider>
  );
};

export default App;
