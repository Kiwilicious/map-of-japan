import React, { useContext } from "react";
import * as d3 from "d3";
import { Feature } from "geojson";
import styles from "./style.module.css";
import { DateContext } from "../context/DateContext";

import mapData from "../../data/jp_pref_geodata.json";
import tempData from "../../data/jp_pref_temps.json";

interface Prefecture {
  type: string;
  geometry: {
    type: string;
    coordinates: Array<any>;
  };
  properties: {
    NAME_JP: string;
    NAME_JP_SHORT: string;
    NAME: string;
  };
  id: number;
}

const JapaneseMap = () => {
  const [currentDate] = useContext(DateContext);
  const { minTemperature, maxTemperature } = tempData;
  const colorBand = d3
    .scaleSequential(
      d3.interpolateRgbBasis([
        "#00eaea",
        "#d3f3ee",
        "#fcd581",
        "#d52941",
        "#990d35"
      ])
    )
    .domain([minTemperature, maxTemperature]);

  const projection = d3
    .geoMercator()
    .center([136, 40])
    .scale(1600);

  const path = d3.geoPath(projection);

  const paths = mapData.features.map((feature: Prefecture) => {
    const { id } = feature;
    const prefPath = path(feature as Feature) || "";
    const pref = (tempData as any)[feature.properties.NAME_JP];

    const year = currentDate.year;
    const month = currentDate.month - 1;
    let temp = null;

    if (pref[year] && pref[year][month]) {
      temp = pref[year][month];
    }

    const fill = temp === null ? "grey" : colorBand(temp);

    return (
      <path
        d={prefPath}
        key={id}
        fill={fill}
        className={styles.prefecture}
      ></path>
    );
  });

  return (
    <svg viewBox="0 0 800 800" width="800px" height="800px">
      <g>{paths}</g>
    </svg>
  );
};

export default JapaneseMap;
