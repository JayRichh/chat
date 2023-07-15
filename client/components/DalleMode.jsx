import { useState, useCallback } from "react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useModelContext } from "../context/ModelContext";
import FileDropZone from "./DALL-E/FileDropZone";

const DalleMode = ({
  imagePrompt,
  setImagePrompt,
  generatedImages,
  setGeneratedImages,
  generateImages,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [maskFile, setMaskFile] = useState(null);

  const { subModel, setSubModel } = useModelContext();

  const onDrop = useCallback((acceptedFiles) => {
    setImageFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleImageUpload = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleMaskUpload = (event) => {
    setMaskFile(event.target.files[0]);
  };

  return (
    <div>
      <h1>{subModel}</h1>
      {subModel === "generate" && (
        <textarea
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
        />
      )}
      {(subModel === "edit" || subModel === "variation") && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n drop some files here, or click to select files</p>
          )}
        </div>
      )}
      {subModel === "edit" && (
        <FileDropZone onFileDrop={handleMaskUpload} label="Drop Mask Here" />
      )}
      <button disabled={isLoading} onClick={generateImages}>
        Generate Images
      </button>
      {imageFile && (
        <img
          src={URL.createObjectURL(imageFile)}
          alt="User uploaded"
          style={{ maxWidth: "100%" }}
        />
      )}
      {generatedImages &&
        generatedImages.map((imgUrl) => (
          <img
            key={imgUrl}
            s
            src={imgUrl}
            alt="AI generated"
            style={{ maxWidth: "100%" }}
          />
        ))}
    </div>
  );
};

// const DallEHeader = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
// `;

// const DallEWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   margin: 0 auto;
//   box-sizing: border-box;
//   border: 2px solid #2f2f2f;
//   border-radius: 4px;
// `;

export default DalleMode;
