import React from "react";
import * as d3 from "d3";
import { Feature } from "geojson";
import styles from "./style.module.css";

import mapData from "../data/jp_prefs.json";
import tempData from "../data/formatted.json";

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
  const { minTemperature, maxTemperature } = tempData;
  const colorBand = d3
    .scaleSequential(
      d3.interpolateRgbBasis([
        "#93e1d8",
        "#ddfff7",
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
    const temp = (tempData as any)[feature.properties.NAME_JP]["2000"][0];

    return (
      <path
        d={prefPath}
        key={id}
        fill={colorBand(temp)}
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
