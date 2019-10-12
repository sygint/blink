/* eslint-disable import/prefer-default-export */

import styled from "styled-components";

export const Button = styled.button`
  align-items: center;
  background: none;
  border: 0;
  cursor: pointer;
  display: flex;
  margin: 0;
  padding: 5px;

  &:focus {
    background: #eee;
    border-radius: 3px;
    outline: 0;
  }
`;
