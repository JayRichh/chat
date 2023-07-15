import React from "react";
import styled from "styled-components";

const InputContainer = ({ message, onMessageChange, onSendMessage }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <Container>
      <MessageInput
        rows={Math.min(message.split("\n").length, 4)}
        placeholder={message.length === 0 ? "...Write Message" : ""}
        value={message}
        onChange={onMessageChange}
        onKeyDown={handleKeyPress}
      />
      <SendButton onClick={onSendMessage}>Send</SendButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const MessageInput = styled.textarea`
  flex-grow: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-right: 10px;
  resize: none;
  height: auto;
  overflow: auto;
`;

const SendButton = styled.button`
  background: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #0056b3;
  }
`;

export default InputContainer;
