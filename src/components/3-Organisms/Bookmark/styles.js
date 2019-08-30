import styled from "styled-components";

import IconButton from "../../2-Molecules/IconButton";

export const Thumbnail = styled.a`
  background: ${({ image }) => `url(${image})`};
  background-position: center center;
  background-size: cover;
  border-radius: 4px;
  display: block;
  height: 250px;
  margin-bottom: 16px;
  text-indent: -999999px;
  width: 100%;
`;

export const Title = styled.a`
  -webkit-box-orient: vertical; /* stylelint-disable-line property-no-vendor-prefix */
  color: #000;
  display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix */
  font-weight: 600;
  -webkit-line-clamp: 3;
  max-height: 4.4em;
  overflow: hidden;
  text-align: justify;
  text-decoration: none;
`;

export const Extras = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

export const Excerpt = styled.p`
  margin-top: 0;
  max-height: 3em;
  overflow: hidden;
  text-align: justify;
`;

export const Actions = styled.div`
  bottom: 10px;
  display: flex;
  position: absolute;
  right: 0;
`;

export const StyledIconButton = styled(IconButton)``;
