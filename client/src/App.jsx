import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import React from "react";
import { ClipLoader } from "react-spinners";

function App() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    try {
      const messages = [
        ...chatHistory,
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ];
      const response = await axios.post("/api/chat", { messages });
      setChatHistory([
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

  return (
    <Wrapper>
      <Header>
        <Logo>
          <Title>ayo</Title>
        </Logo>
        <MenuButton>Menu</MenuButton>
      </Header>

      <ChatContainer>
        <MessagesContainer>
          {chatHistory.map(
            (chat, index) =>
              (chat.role === "user" || chat.role === "assistant") && (
                <MessageContainer
                  align={chat.role === "assistant" ? "left" : "right"}
                  key={index}
                >
                  <Message align={chat.role === "assistant" ? "left" : "right"}>
                    {chat.content}
                  </Message>
                </MessageContainer>
              )
          )}
          {loading && (
            <ClipLoader color="#123abc" loading={loading} size={50} />
          )}
        </MessagesContainer>
        <InputContainer>
          <MessageInput
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendButton onClick={sendMessage}>Send</SendButton>
        </InputContainer>
      </ChatContainer>

      <Footer>{new Date().getFullYear()}</Footer>
    </Wrapper>
  );
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 95vh;
  margin: 0 auto 3em auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
`;

const MessagesContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
  padding: 0 0 10px 0;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ align }) =>
    align === "right" ? "flex-end" : "flex-start"};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
`;

const Logo = styled.div`
  margin-left: 2rem;
`;

const MenuButton = styled.button`
  margin-right: 2rem;
`;

const Message = styled.div`
  position: relative;
  max-width: 70%;
  background: ${({ align }) => (align === "right" ? "#0084ff" : "#eee")};
  color: ${({ align }) => (align === "right" ? "#fff" : "#000")};
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    ${({ align }) => (align === "right" ? "right" : "left")}: -10px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border- ${({ align }) => (align === "right" ? "right" : "left")}-color: ${({
  align,
}) => (align === "right" ? "#0084ff" : "#eee")};
    border- ${({ align }) =>
      align === "right" ? "left" : "right"}-color: transparent;
  }
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: auto;
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px;
  background: #0084ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Title = styled.h1`
  color: #333;
`;

const Footer = styled.footer`
  width: 100%;
  padding: 1rem;
  text-align: center;
  background-color: #f5f5f5;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 1rem;
`;

export default App;
