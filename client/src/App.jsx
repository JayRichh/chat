import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import Header from "../components/Header";
import MessagesContainer from "../components/MessagesContainer";
import InputContainer from "../components/InputContainer";
import Footer from "../components/Footer";
import DalleMode from "../components/DalleMode";
import React from "react";
import Gallery from "react-grid-gallery";
import { ModelProvider, useModelContext } from "../context/ModelContext";

function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [imagePrompt, setImagePrompt] = useState("");
  // const [dalleSubMode, setDalleSubMode] = useState("generate");
  const [imageFile, setImageFile] = useState();
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    model,
    setModel,
    subModel,
    setSubModel,
    setIsDalleMode,
    isDalleMode,
  } = useModelContext();

  const switchToDalleMode = (newValue) => {
    setModel(newValue ? "DALL·E" : "Chat");
    if (newValue) {
      setChatHistory([]);
      setSubModel("generate");
    } else {
      setGeneratedImages([]);
    }
    switchToDalleMode(model === "DALL·E");
  };

  const generateImages = async () => {
    setIsLoading(true);

    try {
      let endpoint, data;

      switch (subModel) {
        case "generate":
          endpoint = "https://api.openai.com/v1/images/generations";
          data = { prompt: imagePrompt, n: 1, size: "1024x1024" };
          break;
        case "edit":
        case "variation":
          endpoint = `https://api.openai.com/v1/images/${subModel}s`;
          data = new FormData();
          data.append("image", imageFile);
          if (subModel === "edit") {
            data.append("mask", maskFile);
          }
          data.append("prompt", imagePrompt);
          data.append("n", 1);
          data.append("size", "1024x1024");
          break;
        default:
          return;
      }

      const response = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setGeneratedImages(response.data.data.map((imgData) => imgData.url));
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const sendMessage = async () => {
    setLoading(true);
    try {
      const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ];
      console.log("System Message: ", systemPrompt);
      console.log("User Message: ", message);

      const response = await axios.post("/api/chat", { model, messages });

      console.log("AI Response: ", response.data);

      setChatHistory([
        ...chatHistory,
        ...messages,
        { role: "assistant", content: response.data },
      ]);
      setMessage("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Model: ", model);
    setIsDalleMode(model === "DALL·E");
    if (model === "DALL·E") {
      setChatHistory([]);
      setSubModel("generate");
    } else {
      setGeneratedImages([]);
    }
  }, [model]);

  return (
    <Wrapper>
      <Header />
      <ChatContainer>
        {!isDalleMode && (
          <>
            <Label>System Prompt:</Label>
            <SystemInput
              type="text"
              placeholder="You are a helpful assistant."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
            />
            <MessagesContainer chatHistory={chatHistory} loading={loading} />
          </>
        )}
        {isDalleMode && (
          <DalleMode
            imageFile={imageFile}
            setImageFile={setImageFile}
            imagePrompt={imagePrompt}
            setImagePrompt={setImagePrompt}
            isGenerating={isGenerating}
            generateImages={generateImages}
            generatedImages={generatedImages}
          />
        )}
        {generatedImages.length > 0 && (
          <Gallery
            images={generatedImages.map((url, index) => ({
              src: url,
              thumbnail: url,
              thumbnailWidth: 320,
              thumbnailHeight: 212,
              caption: `Generated ${index}`,
            }))}
            showLightboxThumbnails={true}
            style={{ marginTop: "2rem" }}
          />
        )}

        {!isDalleMode && (
          <InputContainer
            message={message}
            onMessageChange={(e) => setMessage(e.target.value)}
            onSendMessage={sendMessage}
          />
        )}
      </ChatContainer>

      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  overflow-y: hidden;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  padding: 10px 20px;
  height: calc(100vh - 142px);
  border: 1px solid #ddd;
  border-radius: 7px;
  background: #fff;
  position: fixed;
  right: 25%;
  top: 90px;
  overflow-y: auto;
  @media (max-width: 768px) {
    width: 100%;
    right: 0;
    top: 60px;
    height: calc(100vh - 100px);
  }
`;

const SystemInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

export default App;
