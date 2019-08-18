import React from "react";
import styled from "styled-components";

const Container = styled.section`
  margin-top: 65px;
  padding: 30px;
`;

export default function Content({ children }) {
  return <Container>{children}</Container>;
}
