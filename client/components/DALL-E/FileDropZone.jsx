import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import React from "react";

const DnDText = styled.div`
  font-size: 1.2rem;
  padding: 10px;
  margin: 0 0 0 10px;
  border-radius: 2px;
  box-sizing: border-box;
  background-color: #fff;
  transition: all 0.2s ease-in-out;
  animation: 0.2s ease-in-out;
  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`;

const FileDropZone = ({ onFileDrop, label }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop: onFileDrop });
  return (
    <DnDText {...getRootProps()}>
      <input {...getInputProps()} />
      <p>
        {label || "Drag 'n' drop some files here, or click to select files"}
      </p>
    </DnDText>
  );
};

export default FileDropZone;
