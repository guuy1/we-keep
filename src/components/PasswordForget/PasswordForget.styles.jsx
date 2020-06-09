import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const ForgetPassLinkStyles = css`
  text-align: right;
  color: #006666;
  font-weight: bold;
  font-size: 30px;
  direction: rtl;
`;

export const P = styled.p`
  margin-top: 10px;
`;

export const ForgetPassLink = styled(Link)`
  ${ForgetPassLinkStyles}
`;
