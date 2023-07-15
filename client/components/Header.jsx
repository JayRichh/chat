import { useState, useEffect } from "react";
import React from "react";
import styled from "styled-components";
import ModeSwitcher from "./DALL-E/ModeSwitcher";
import ImageUpload from "./DALL-E/ImageUpload";
import ImagePromptInput from "./DALL-E/ImagePromptInput";
import GenerateButton from "./DALL-E/GenerateButton";
import { ModelProvider, useModelContext } from "../context/ModelContext";
import { FaRegCommentDots, FaRegImage } from "react-icons/fa";
import { IoMdSquare } from "react-icons/io";
import Switch from "react-toggle-switch";
import Slider from "@mui/material/Slider";

const Header = () => {
  const {
    model,
    setModel,
    subModel,
    setSubModel,
    isDalleMode,
    setIsDalleMode,
  } = useModelContext();

  const handleModelChange = (event, value) => {
    event.stopPropagation();

    const selectedValue = Math.round(value / 50) * 50;
    const newModel =
      marks.find((mark) => mark.value === selectedValue)?.display ||
      marks[0].value;
    setModel(newModel);
    setIsDalleMode(
      newModel !== "gpt-4-0314" &&
        newModel !== "GPT-3.5-turbo-0613" &&
        newModel !== "GPT-4-32k-0613"
    );
  };

  const marks = [
    {
      value: 0,
      label: "GPT-4",
      display: "gpt-4-0314",
    },
    {
      value: 50,
      label: "GPT-3.5",
      display: "GPT-3.5-turbo-0613",
    },
    {
      value: 100,
      label: "GPT-4-BigBoi",
      display: "gpt-4-32k-0613",
    },
  ];

  useEffect(() => {
    console.log("Model changed: ", model);
    console.log("SubModel changed: ", subModel);
    console.log("IsDalleMode changed: ", isDalleMode);
  }, [model, subModel, isDalleMode]);

  return (
    <HeaderContainer>
      <Logo>
        <Title>ayo</Title>
      </Logo>

      {isDalleMode ? (
        <ModeSwitcher subModel={subModel} setSubModel={setSubModel} />
      ) : (
        <>
          {/* <ModelLabel gpt4={model === "GPT-4-32k-0613"}>
            {marks.find((mark) => mark.display === model)?.label ||
              marks[0].label}
          </ModelLabel> */}
          <Slider
            value={
              marks.find((mark) => mark.display === model)?.value ||
              marks[0].value
            } 
            label="test"
            min={0}
            max={100}
            style={
              { 
                width: "20rem",
                padding: "0 0 -2em 0",
                margin: "0 0 1.25rem 0"
              }
            }
            step={50}
            onChangeCommitted={handleModelChange}
            marks={marks.map((mark) => ({
              value: mark.value,
              label: mark.label,
            }))}
            sx={{
              "& .MuiSlider-displayLabel": {
                color: "white",
                backgroundColor: "#333",
                width: "fit-content",
                borderRadius: "0.5rem",
                padding: "0 0 0 0.5rem",
                fontSize: "1rem",
                fontWeight: "600",
              },
              "& .MuiSlider-track": {
                color: "#333",
              },
              "& .MuiSlider-rail": {
                color: "#ddd",
              },
              "& .MuiSlider-mark": {
                color: "#ddd",
              },
              "& .MuiSlider-markLabel": {
                color: "#333",
                fontSize: "0.8rem",
              },
            }}
          />
        </>
      )}

      <DallEButton
        onClick={() => {
          setIsDalleMode(!isDalleMode);
          setModel(isDalleMode ? "Chat" : "DALL·E");
        }}
      >
        Switch to {!isDalleMode ? "DALL·E" : "Chat"} Mode
      </DallEButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0.5rem 0rem 0.5rem 0rem;
  border-bottom: 1px solid #ddd;
`;

const Logo = styled.div`
  margin-left: 2rem;
`;

const Title = styled.h1`
  color: #333;
`;

const DallEButton = styled.button`
  padding: 10px;
  background: #0084ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  margin-right: 1rem;
`;

export default Header;
