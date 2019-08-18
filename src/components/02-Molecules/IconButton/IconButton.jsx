import React from "react";
import styled from "styled-components";

import Icon from "../../01-Atoms/Icon";

const Button = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  display: flex;
  margin: 0;
  padding: 0;
`;

export default function IconButton({ icon, onClick }) {
  return (
    <Button onClick={onClick}>
      <Icon name={icon} color="#888" size="24" />
    </Button>
  );
}
