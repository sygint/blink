import styled from "styled-components";

export const StyledUl = styled.ul`
  list-style: none;
  padding-left: 0;

  @media ${({ theme: { breakpoint } }) => breakpoint.mobileLandscape} {
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 20px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }

  @media ${({ theme: { breakpoint } }) => breakpoint.tabletPortrait} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const StyledLi = styled.li`
  border-bottom: 1px solid ${({ theme: { color } }) => color.third};
  height: 460px;
  margin: 0 auto 32px;
  padding-bottom: 16px;
  position: relative;
`;
