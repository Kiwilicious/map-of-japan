import React from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  background: white;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  display: none;
  flex-direction: column;
  justify-content: center;
  min-width: 150px;
  padding: 10px;
  position: absolute;
`;

const JapaneseDiv = styled.div`
  margin-bottom: 5px;
`;

const EnglishDiv = styled.div`
  text-transform: capitalize;
`;

const Tooltip = () => {
  return (
    <TooltipContainer id="prefTooltip">
      <JapaneseDiv id="prefJapaneseText"></JapaneseDiv>
      <EnglishDiv id="prefEnglishText"></EnglishDiv>
    </TooltipContainer>
  );
};

export default Tooltip;
