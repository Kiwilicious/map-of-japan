import React, { useContext } from "react";
import styled from "styled-components";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { MapContext } from "../context/MapContext";
import useInterval from "../hooks/UseContext";

import tempData from "../../data/jp_pref_temps.json";

const Container = styled.div`
  margin-top: 15px;
  padding: 0 20px;
  width: 100%;
`;

const StartButton = styled.button`
  position: absolute;
  bottom: 50px;
  left: 20px;
`;

const StopButton = styled.button`
  position: absolute;
  bottom: 50px;
  left: 70px;
`;

const SliderWithTooltip = createSliderWithTooltip(Slider);

const { minYear, maxYear } = tempData;

const mappedMax = (maxYear - minYear + 1) * 12;

function convertToDate(sliderValue: number) {
  const year = Math.floor((sliderValue - 1) / 12) + minYear;
  const month = sliderValue % 12 === 0 ? 12 : sliderValue % 12;

  return [year, month];
}

function generateMarks() {
  const range = (maxYear - minYear + 1) * 12;
  const start = 7 * 12 + 1;
  const step = 20 * 12;
  const marks = [];
  for (let i = start; i <= range; i += step) {
    marks.push(i);
  }
  return marks;
}

function tipFormatter(sliderValue: number) {
  const [year, month] = convertToDate(sliderValue);
  return `${year}年 ${month}月`;
}

function onSliderMove(sliderValue: number, dispatch: any) {
  const [year, month] = convertToDate(sliderValue);
  dispatch({ type: "setDate", payload: { year, month } });
}

function mappedValue(date: any) {
  return (date.year - minYear + 1) * 12 + date.month;
}

const MapSlider = () => {
  const [mapContextData, dispatch] = useContext(MapContext);
  const [start, stop] = useInterval(tick, 500);

  let markNumbers = generateMarks();
  const marks = markNumbers.reduce((acc, markNum) => {
    const [year] = convertToDate(markNum);
    return { ...acc, [markNum]: { style: { color: "grey" }, label: year } };
  }, {});

  function tick() {
    let newMonth = mapContextData.month + 1;
    let newYear = mapContextData.year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }
    if (newYear > tempData.maxYear) {
      newYear = tempData.minYear;
    }

    dispatch({
      type: "setDate",
      payload: { year: newYear, month: newMonth }
    });
  }

  return (
    <Container>
      <StartButton onClick={start}>start</StartButton>
      <StopButton onClick={stop}>stop</StopButton>
      <SliderWithTooltip
        min={1}
        max={mappedMax}
        tipFormatter={tipFormatter}
        onChange={val => onSliderMove(val, dispatch)}
        marks={marks}
      />
    </Container>
  );
};

export default MapSlider;
