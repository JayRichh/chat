import React from 'react';
import styled from 'styled-components';

const InputContainer = ({ message, onMessageChange, onSendMessage }) => {
  return (
    <Container>
      <MessageInput type="text"
      placeholder="Pineapple on pizza?" value={message} onChange={onMessageChange} />
      <SendButton onClick={onSendMessage}>Send</SendButton>
    </Container>
  );
};

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

const Container = styled.div`
  display: flex;
`;

export default InputContainer;
