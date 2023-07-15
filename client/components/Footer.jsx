import styled from "styled-components";
import React from "react";

function Footer() {
  const date = new Date();

  const dayName = date.toLocaleString("default", { weekday: "long" });
  const monthName = date.toLocaleString("default", { month: "long" });

  const formattedDate = `${dayName}, ${date.getDate()} ${monthName} ${date.getFullYear()}`;
  const formattedTime = date.toLocaleTimeString();

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
      <p style={{ margin: "0", color: "#6c757d" }}>{formattedDate}</p>
      <p style={{ margin: "0", color: "#6c757d" }}>{formattedTime}</p>
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
