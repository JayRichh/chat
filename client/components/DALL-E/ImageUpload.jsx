import FileDropZone from "./FileDropZone";
import { useState } from "react";
import React from "react";

const ImageUpload = () => {
  const [imageFile, setImageFile] = useState();

  const handleImageUpload = (acceptedFiles) => {
    setImageFile(acceptedFiles[0]);
  };

  return (
    <FileDropZone onFileDrop={handleImageUpload} label="Drop Image Here" />
  );
};

export default ImageUpload;
