import FileDropZone from "./FileDropZone";
import { useState } from "react";

const VariationUpload = () => {
  const [imageFile, setImageFile] = useState();

  const handleVariationUpload = (acceptedFiles) => {
    setImageFile(acceptedFiles[0]);
  };

  return (
    <FileDropZone
      onFileDrop={handleVariationUpload}
      label="Drop Image for Variation Here"
    />
  );
};

export default VariationUpload;
