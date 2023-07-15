import styled from "styled-components";
import { useState } from "react";
import React from "react";

const GenerateButtonStyled = styled.button`
  font-size: 1.2rem;
  padding: 10px 20px;
  margin: 0 10px;
  box-sizing: border-box;
  border: 2px solid #2f2f2f;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2f2f2f;
    color: #fff;
  }

  &:disabled {
    background-color: #999;
    color: #fff;
    cursor: not-allowed;
  }
`;

const GenerateButton = ({ isLoading, generateImages }) => (
  <GenerateButtonStyled onClick={generateImages} disabled={isLoading}>
    {isLoading ? "Generating..." : "Generate"}
  </GenerateButtonStyled>
);

export default GenerateButton;
