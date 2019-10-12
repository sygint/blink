import styled from "styled-components";

import { ReactComponent as Logo } from "../../../assets/images/agenda.svg";

export const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const LogoSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

export const StyledLogo = styled(Logo)`
  height: auto;
  width: 26vw;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.color.main};
  font-size: 26vw;
  margin: 0;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.color.button};
  border: 0.1rem solid ${({ theme }) => theme.color.buttonBorder};
  border-radius: 0.4rem;
  color: #fff;
  cursor: pointer;
  font-family: fira-sans-2, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  margin: 0 2rem 2rem;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
`;
