import styled from "styled-components";
import React from "react";

function Footer() {
  return <FooterContainer>{new Date().getFullYear()}</FooterContainer>;
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
