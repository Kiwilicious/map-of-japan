import React, { useContext } from "react";
import styled from "styled-components";
import { MapContext } from "../context/MapContext";

import tempData from "../../data/jp_pref_temps.json";
import prefData from "../../data/jp_pref_names.json";

interface PrefData {
  [key: string]: {
    id: number;
    name: string;
    shortName: string;
    kana: string;
    enName: string;
  };
}

const InfoPanelContainer = styled.div`
  width: 400px;
`;

const DateContainer = styled.div`
  display: flex;
  font-size: 18px;
  justify-content: center;
  padding: 10px;
`;

const TempDataContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 800px;
`;

const PrefTemp = styled.div`
  border-bottom: 1px solid #c3c3c3;
  border-bottom: 1px solid grey;
  margin-bottom: 5px;
  width: 100px;
`;

const InfoPanel = () => {
  const [mapContextData] = useContext(MapContext);
  const { year, month } = mapContextData;
  const currentTemps = [] as Array<Array<any>>;

  Object.entries(tempData).forEach(([pref, yearData]) => {
    const isEnglish = pref.match(/^[a-zA-Z]*$/);
    if (!isEnglish) {
      const tempData = (yearData as any)[year];

      if (tempData) {
        const temp = tempData[month - 1];
        const tempToDisplay = temp ? +temp.toFixed(2) : "N/A";
        currentTemps[(prefData as PrefData)[pref].id] = [pref, tempToDisplay];
      } else {
        currentTemps[(prefData as PrefData)[pref].id] = [pref, "N/A"];
      }
    }
  });

  return (
    <InfoPanelContainer>
      <DateContainer>
        {year}年{month}月
      </DateContainer>
      <TempDataContainer>
        {currentTemps.map(data => (
          <PrefTemp>
            <div>{data[0]}</div>
            <div>
              {data[1]}
              {data[1] !== "N/A" && <span> &deg;C</span>}
            </div>
          </PrefTemp>
        ))}
      </TempDataContainer>
    </InfoPanelContainer>
  );
};

export default InfoPanel;
