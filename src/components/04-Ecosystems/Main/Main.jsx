import React from "react";
import styled from "styled-components";

const Container = styled.main`
  flex-grow: 1;
`;

export default function Main({ children }) {
  return <Container>{children}</Container>;
}
