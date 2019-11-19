import React from "react";
import "./App.css";
import styled from "styled-components";
import MapProvider from "./components/context/MapContext";
import JapaneseMap from "./components/JapaneseMap/JapaneseMap";
import MapSlider from "./components/MapSlider/MapSlider";
import InfoPanel from "./components/InfoPanel/InfoPanel";
import Tooltip from "./components/Tooltip/Tooltip";

const AppContent = styled.div`
  margin: 50px 0 20px;
  display: flex;
  justify-content: center;
`;

const MapContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 1000px;
`;

const App: React.FC = () => {
  return (
    <MapProvider>
      <AppContent>
        <MapContainer>
          <JapaneseMap />
          <MapSlider />
        </MapContainer>
        <Tooltip />
        <InfoPanel />
      </AppContent>
    </MapProvider>
  );
};

export default App;
