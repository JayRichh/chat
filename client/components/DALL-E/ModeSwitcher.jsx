import Switch from "react-switch";
import styled from "styled-components";
import React from "react";

const ModeSwitcher = ({ subModel, setSubModel }) => {

  return (
    <ModeContainer>
      <AlignButton onMouseUp={(event) => event.target.blur()}>
        <Switch
          onChange={() => setSubModel("generate")}
          checked={subModel === "generate"}
        />
        <label>Generate</label>
      </AlignButton>

      <AlignButton onMouseUp={(event) => event.target.blur()}>
        <Switch
          onChange={() => setSubModel("edit")}
          checked={subModel === "edit"}
        />
        <label>Edit</label>
      </AlignButton>

      <AlignButton onMouseUp={(event) => event.target.blur()}>
        <Switch
          onChange={() => setSubModel("variation")}
          checked={subModel === "variation"}
        />
        <label>Variation</label>
      </AlignButton>
    </ModeContainer>
  );
};

const AlignButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  label {
    font-size: 0.9rem;
  }
`;


const ModeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template: auto;
  margin: 10px 0;
  align-items: center;
  justify-items: center;
`;

export default ModeSwitcher;
