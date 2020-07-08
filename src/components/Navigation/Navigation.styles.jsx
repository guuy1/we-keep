import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const OptionContainerStyles = css`
  padding: 10px 15px;
  font-size: 25px;
  cursor: pointer;

  @media screen and (max-width: 800px) {
    font-size: 18px;
    font-weight: bold;
  }
`;

const Option1ContainerStyles = css`
  color: rgb(80, 233, 162);
  font-weight: bold;
  font-size: 40px;
  @media screen and (max-width: 800px) {
    font-size: 20px;
  }
`;

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  background-color: #1c1b1b;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 92px;
  margin-left: 0.5rem;
  padding: 10px;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  ${OptionContainerStyles}
`;
export const OptionDiv = styled.div`
  ${OptionContainerStyles}
`;

export const Option1Link = styled(Link)`
  ${Option1ContainerStyles}
`;
