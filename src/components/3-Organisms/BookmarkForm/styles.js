import styled from "styled-components";

import IconButton from "../../2-Molecules/IconButton";

export const Form = styled.form`
  background: #eee;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  height: ${({ theme }) =>
    `calc(${theme.dimension.mastheadHeight} - ${theme.dimension.mastheadPadding})`};
  left: 20px;
  padding: 5px 5px 5px 15px;
  position: fixed;
  right: 59px;
  top: ${({ theme }) => `calc(${theme.dimension.mastheadPadding} / 2)`};
  z-index: 510;
`;

export const Label = styled.label`
  display: none;
  font-size: 1rem;
  font-weight: 600;
  line-height: normal;
  margin-right: 10px;

  ::after {
    content: ":";
  }
`;

export const Input = styled.input`
  background: none;
  border: 0;
  box-sizing: border-box;
  color: darken($header-icon-color, 25);
  flex-grow: 1;
  font-size: 18px;
  height: 100%;
  width: 100%;

  ::placeholder {
    color: lighten($header-icon-color, 15);
  }
`;

export const Close = styled(IconButton).attrs(() => ({ icon: "Close" }))`
  background: transparent;
  border: 0;
  padding: 0;
`;
