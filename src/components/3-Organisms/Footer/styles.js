import styled from "styled-components";

export const StyledFooter = styled.footer`
  background: #fff;
  border-top: 1px solid ${({ theme }) => theme.color.third};
  bottom: 0;
  font-size: 10px;
  position: fixed;
  text-align: center;
  width: 100%;
  z-index: 800;
`;

export const Attribution = styled.ul`
  list-style: none;
  padding-left: 0;
`;
