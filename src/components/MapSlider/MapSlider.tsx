import React, { useContext } from "react";
import styled from "styled-components";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { MapContext } from "../context/MapContext";

import tempData from "../../data/jp_pref_temps.json";

const Container = styled.div`
  margin-top: 15px;
  padding: 0 20px;
  width: 100%;
`;

const SliderWithTooltip = createSliderWithTooltip(Slider);

const { minYear, maxYear } = tempData;

const mappedMax = (maxYear - minYear + 1) * 12;

function convertToDate(sliderValue: number) {
  const year = Math.floor((sliderValue - 1) / 12) + minYear;
  const month = sliderValue % 12 === 0 ? 12 : sliderValue % 12;

  return [year, month];
}

function tipFormatter(sliderValue: number) {
  const [year, month] = convertToDate(sliderValue);
  return `${year}年 ${month}月`;
}

function onSliderMove(sliderValue: number, dispatch: any) {
  const [year, month] = convertToDate(sliderValue);
  dispatch({ type: "setDate", payload: { year, month } });
}

const MapSlider = () => {
  const dispatch = useContext(MapContext)[1];

  return (
    <Container>
      <SliderWithTooltip
        min={1}
        max={mappedMax}
        tipFormatter={tipFormatter}
        onChange={val => onSliderMove(val, dispatch)}
      />
    </Container>
  );
};

export default MapSlider;
