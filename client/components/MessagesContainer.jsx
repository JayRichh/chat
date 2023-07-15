import React from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";

const MessagesContainer = ({ chatHistory, loading }) => {
  return (
    <Container>
      {chatHistory.map(
        (chat, index) =>
          chat.role !== "system" && (
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
      {loading && <ClipLoader color="#123abc" loading={loading} size={50} />}
    </Container>
  );
};

const Container = styled.div`
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
    ${({ align }) => (align === "right" ? "right" : "left")}: 10px;
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

export default MessagesContainer;
