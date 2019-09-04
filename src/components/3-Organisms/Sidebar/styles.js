/* eslint-disable import/prefer-default-export */

import styled from "styled-components";

import Icon from "../../1-Atoms/Icon";

const innerWidth = "250px";

export const Inner = styled.div`
  width: ${innerWidth};
`;

export const StyledSidebar = styled.aside`
  background: #fff;
  border-right: 1px solid ${({ theme }) => theme.color.third};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: ${props => (props.isVisible ? 0 : `-${innerWidth}`)};
  padding: 20px;
  position: fixed;
  top: ${({ theme }) => theme.dimension.mastheadHeight};
  transition: left 250ms ease-in-out 0s;
  z-index: 700;

  button {
    align-items: center;
    background: none;
    border: 0;
    color: ${({ theme }) => theme.color.sidebarText};
    display: flex;
    font-size: 16px;
    font-weight: bold;
    padding: 20px;
  }
`;

export const Overlay = styled.div`
  background: ${props =>
    props.isVisible ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0)"};
  height: 100%;
  left: 0;
  position: fixed;
  top: ${({ theme }) => theme.dimension.mastheadHeight};
  transition: all 500ms ease-in-out 0s;
  width: 100%;
  z-index: ${props => (props.isVisible ? "600" : "-1")};
`;

export const StyledIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.color.sidebarText
}))`
  margin-right: 15px;
`;

export const Group = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;

export const Close = styled.button``;
