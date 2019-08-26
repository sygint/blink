import styled from "styled-components";

import { ReactComponent as Agenda } from "../../../assets/images/agenda.svg";

export const A = styled.a`
  display: flex;
  text-decoration: none;
`;

export const Div = styled.div`
  display: flex;
`;

export const Logo = styled(Agenda)`
  height: ${({ size }) => `${size}px`};
  margin-right: 10px;
  width: ${({ size }) => `${size}px`};
`;

export const Text = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
