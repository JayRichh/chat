import styled from "styled-components";
import React from "react";
import { useState, useEffect } from "react";

function Footer() {
  const [time, setTime] = useState(formattedTime);
  const [date, setDate] = useState(formattedDate);

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const tick = () => {
    setTime(formattedTime);
    setDate(formattedDate);
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <FooterContainer
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        padding: "10px 0",
        borderTop: "1px solid #dee2e6",
      }}
    >
      <p style={{ margin: "0", color: "#6c757d" }}>{time}</p>
      <p style={{ margin: "0", color: "#6c757d" }}>{date}</p>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  padding: 1rem;
  text-align: center;
  background-color: #f5f5f5;
  position: fixed;
  bottom: 0;
`;

export default Footer;
