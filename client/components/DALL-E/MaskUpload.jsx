import FileDropZone from "./FileDropZone";
import { useState } from "react";
import React from "react";

const MaskUpload = () => {
  const [maskFile, setMaskFile] = useState();

  const handleMaskUpload = (acceptedFiles) => {
    setMaskFile(acceptedFiles[0]);
  };

  return (
    <FileDropZone onFileDrop={handleMaskUpload} label="Drop Mask Here" />
  );
};

export default MaskUpload;
