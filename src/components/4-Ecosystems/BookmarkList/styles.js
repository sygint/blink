import styled from "styled-components";

export const StyledUl = styled.ul`
  list-style: none;
  padding-left: 0;

  @media ${({ theme }) => theme.breakpoint.mobileLandscape} {
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 20px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }

  @media ${({ theme }) => theme.breakpoint.tabletPortrait} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const StyledLi = styled.li`
  height: 460px;
  margin: 0 auto 32px;
  padding-bottom: 16px;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.third};
  }
`;
