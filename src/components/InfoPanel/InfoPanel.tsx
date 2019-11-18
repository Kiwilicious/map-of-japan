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

const GridContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-row-gap: 4px;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(16, 45px);
  justify-content: space-between;
`;

const GridItem = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
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
      <GridContainer>
        {currentTemps.map(data => (
          <GridItem>
            <div>{data[0]}</div>
            <div>
              {data[1]}
              {data[1] !== "N/A" && <span> &deg;C</span>}
            </div>
          </GridItem>
        ))}
      </GridContainer>
    </InfoPanelContainer>
  );
};

export default InfoPanel;
