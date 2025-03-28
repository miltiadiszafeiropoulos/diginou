import styled, { keyframes } from "styled-components";

export const Div = styled.div`
  background: rgb(251, 251, 251);
  @media (max-width:768px){
    background:white;
  }
`;

export const OrderButton = styled.button`
  @media (min-width: 768px) {
    display: none;
  }
  position: sticky;
  z-index: 999;
  bottom: 8px;
  width: 100%;
  -webkit-appearance: button;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 12px 0px;
  transition: all 0.3s ease-in-out;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 0.75rem 0px,
    rgba(0, 0, 0, 0.12) 0px 0.75rem 0.75rem 0px;
  cursor: pointer;
  border: 0px;
  background: #d4d845;
  font-size: 15px;

  color: ${(props) => props.theme.button.color};
  &:hover {
    transform: scale(1.01);
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(16, 24, 32, 1);
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  margin-right: 0.5rem;
  box-sizing: border-box;
`;

export const Price = styled.span`
  display: inline-block;
  width: 80px;
  text-align: right;
  font-family: monospace;
  font-size: 15px;
`;
