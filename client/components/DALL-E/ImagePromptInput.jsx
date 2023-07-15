import styled from "styled-components";
import { useState } from "react";
import React from "react";

const ImagePromptInput = () => {
  const [imagePrompt, setImagePrompt] = useState("");

  return (
    <ImagePrompt
      type="text"
      placeholder="Image prompt"
      value={imagePrompt}
      onChange={(e) => setImagePrompt(e.target.value)}
    />
  );
};

const ImagePrompt = styled.input`
  font-size: 1.2rem;
  padding: 10px;
  margin: 0 0 0 10px;
  border-radius: 2px;
  box-sizing: border-box;
  background-color: #fff;
  transition: all 0.2s ease-in-out;
  animation: 0.2s ease-in-out;

  &:focus {
    outline: none;
    border: 2px solid #2f2f2f;
    background-color: #fff;
  }

  &::placeholder {
    color: #999;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default ImagePromptInput;
