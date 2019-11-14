import React from "react";
import "./App.css";
import styled from "styled-components";
import DateProvider from "./components/context/DateContext";
import JapaneseMap from "./components/JapaneseMap/JapaneseMap";
import MapSlider from "./components/MapSlider/MapSlider";
import InfoPanel from "./components/InfoPanel/InfoPanel";

const AppContent = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const MapContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 1000px;
`;

const App: React.FC = () => {
  return (
    <DateProvider>
      <AppContent>
        <MapContainer>
          <JapaneseMap />
          <MapSlider />
        </MapContainer>
        <InfoPanel />
      </AppContent>
    </DateProvider>
  );
};

export default App;
