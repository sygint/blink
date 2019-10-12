import styled from "styled-components";

export const StyledNav = styled.nav`
  align-items: center;
  background: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.color.third};
  box-sizing: border-box;
  display: flex;
  height: ${({ theme }) => theme.dimension.mastheadHeight};
  justify-content: space-between;
  padding: 0 20px;
`;

export const NavbarLeft = styled.div``;
export const NavbarRight = styled.div`
  display: flex;

  > button:last-child {
    position: relative;
    margin-left: 40px;
    &::before {
      border-left: 1px solid ${({ theme }) => theme.color.icon};
      content: "";
      height: calc(
        ${({ theme }) =>
          `${theme.dimension.mastheadHeight} - ${theme.dimension.mastheadPadding}`}
      );
      left: -20px;
      /* margin-left: 20px;
      margin-right: 20px; */
      position: absolute;
    }
  }
`;
