import React from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { Flipper, Flipped } from "react-flip-toolkit";

const MessagesContainer = ({ chatHistory, loading }) => {
  return (
    <Container>
      <Flipper flipKey={chatHistory}>
        {chatHistory.map(
          (chat, index) =>
            chat.role !== "system" && (
              <Flipped key={index} flipId={index}>
                <MessageContainer
                  align={chat.role === "assistant" ? "left" : "right"}
                >
                  {chat.role === "assistant" ? (
                    <AIMessage>
                      <p className="message">{chat.content}</p>
                      <div className="bubble-arrow"></div>
                    </AIMessage>
                  ) : (
                    <UserMessage>
                      <p className="message">{chat.content}</p>
                      <div className="bubble-arrow"></div>
                    </UserMessage>
                  )}
                </MessageContainer>
              </Flipped>
            )
        )}
      </Flipper>
      {loading && (
        <LoadingSpinner>
          <ThreeDots
            type="ThreeDots"
            color="#0084ff"
            height={80}
            width={80}
            loading={loading}
          />
        </LoadingSpinner>
      )}
    </Container>
  );
};

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.align === "right" ? "flex-end" : "flex-start"};
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  gap: 1rem;
  width: 100%;
  max-height: 100%;
  background: ##f1f0f17a;
  border-radius: 4px;
  shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .alt {
    background-color: #0084ff;
    box-shadow: -2px 2px 2px 0 rgba(0, 0, 0, 0.1);
  }
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
`;

const UserMessage = styled(MessageBubble)`
  align-self: flex-end;
  background: #0084ff;
  color: white;
  margin: 0;

  .message {
    margin: 0;
  }

  &::after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-left: 15px solid #0084ff;
    border-right: 15px solid transparent;
    border-top: 15px solid #0084ff;
    border-bottom: 15px solid transparent;
    transform: scaleX(-1) translateX(27px);
  }
`;

const AIMessage = styled(MessageBubble)`
  align-self: flex-start;
  background: #e5e5ea;
  color: black;

  .message {
    margin: 0;
  }

  &::after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    border-left: 15px solid transparent;
    border-right: 15px solid #e5e5ea;
    border-top: 15px solid #e5e5ea;
    border-bottom: 15px solid transparent;
    transform: scaleX(-1);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

export default MessagesContainer;
