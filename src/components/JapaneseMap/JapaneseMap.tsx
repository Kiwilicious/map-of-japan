import React, { useContext, MouseEvent } from "react";
import * as d3 from "d3";
import d3L from "d3-svg-legend";
import { Feature } from "geojson";
import styles from "./style.module.css";
import { MapContext } from "../context/MapContext";

import mapData from "../../data/jp_pref_geodata.json";
import tempData from "../../data/jp_pref_temps.json";
import prefData from "../../data/jp_pref_names.json";

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

interface PrefData {
  [key: string]: {
    id: number;
    name: string;
    shortName: string;
    kana: string;
    enName: string;
  };
}

function createRange(start: number, stop: number, step = 1) {
  const range = [];
  for (let i = start; i <= stop; i += step) {
    range.push(i);
  }
  return range;
}

const JapaneseMap = () => {
  const [mapContextData, dispatch] = useContext(MapContext);
  const { minTemperature, maxTemperature } = tempData;
  const scale = d3
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
    const {
      id,
      properties: { NAME_JP: prefName }
    } = feature;
    const prefPath = path(feature as Feature) || "";
    const pref = (tempData as any)[prefName];

    const year = mapContextData.year;
    const month = mapContextData.month - 1;
    let temp: null | number = null;

    if (pref[year] && pref[year][month]) {
      temp = pref[year][month];
    }

    const fill = temp === null ? "grey" : scale(temp);

    return (
      <path
        d={prefPath}
        key={id}
        fill={fill}
        className={styles.prefecture}
        onClick={() =>
          dispatch({
            type: "setCurrentPref",
            payload: prefName
          })
        }
        onMouseMove={(e: MouseEvent) => {
          const cTemp = temp === null ? "N/A" : +temp.toFixed(2) + " &deg;C";
          const fTemp =
            temp === null
              ? "N/A"
              : +((temp * 9) / 5 + 32).toFixed(2) + " &deg;F";
          const japaneseText = `<b>${prefName}:</b> ${cTemp}`;
          const englishText = `<b>${
            (prefData as PrefData)[prefName].enName
          }:</b> ${fTemp}`;

          d3.select("#prefTooltip")
            .style("top", e.pageY + 20 + "px")
            .style("left", e.pageX + 20 + "px");

          d3.select("#prefJapaneseText").html(japaneseText);
          d3.select("#prefEnglishText").html(englishText);
        }}
        onMouseEnter={() => d3.select("#prefTooltip").style("display", "flex")}
        onMouseLeave={() => d3.select("#prefTooltip").style("display", "none")}
      ></path>
    );
  });

  const createLegend = () => {
    // setTimeout to run the function after view is rendered
    setTimeout(() => {
      const scale = d3
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
      const cells = createRange(minTemperature, maxTemperature, 5);
      const legendSequential = d3L
        .legendColor()
        .shapeWidth(50)
        .cells(cells)
        .orient("vertical")
        .ascending(true)
        .scale(scale);

      d3.select("#legend").call(legendSequential as any);
    }, 0);

    return null;
  };

  createLegend();

  return (
    <>
      <svg viewBox="0 0 800 800" width="800px" height="800px">
        <g>{paths}</g>
        <g id="legend" transform={"translate(100, 100)"}></g>
      </svg>
    </>
  );
};

export default JapaneseMap;
