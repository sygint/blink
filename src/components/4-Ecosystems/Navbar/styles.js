import styled from "styled-components";

export const StyledNav = styled.nav`
  align-items: center;
  background: #fff;
  border-bottom: 1px solid ${({ theme: { color } }) => color.third};
  box-sizing: border-box;
  display: flex;
  height: ${({ theme: { dimension } }) => dimension.mastheadHeight};
  justify-content: space-between;
  padding: 0 20px;
`;

export const NavbarLeft = styled.div``;
export const NavbarRight = styled.div`
  display: flex;

  > button:last-child::before {
    border-left: 1px solid ${({ theme: { color } }) => color.icon};
    content: "";
    height: calc(
      ${({ theme: { dimension } }) =>
        `${dimension.mastheadHeight} - ${dimension.mastheadPadding}`}
    );
    margin-left: 5px;
    margin-right: 10px;
  }
`;
