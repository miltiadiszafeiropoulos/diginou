import styled from "styled-components";

export const ShadowContainer = styled.div`
  position: sticky;
  top: 70px;
  z-index: 10;
  width: 100%;
  background: white;
  box-shadow: ${(props) => (props.$isStuck ? "0 2px 5px rgba(0, 0, 0, 0.2)" : "none")};
  @media (max-width: 768px) {
    top: 0px; //px 55 for two sticky
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: calc(100% - 20rem) 17.5rem;
  column-gap: 1.5rem;
  align-items: center;
  max-width: 1540px;
  margin: 0 auto;
  gap: 15px;
  padding: 15px 30px 15px 30px;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding-top: 10px;
    grid-template-columns: 100%;
    padding: 15px;
  }
`;

export const ScrollContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const LinkGroup = styled.div`
  display: inline-flex;
`;

export const CategoryLink = styled.a`
  color: #333;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
      border-radius: 12px;

  &:hover {
    color: #d4d845;
  }
  
  &.active {
    font-weight: bold;
    color: #d4d845;
    background-color: rgba(16, 24, 32, 1);
    border-radius: 12px;
  }
`;

export const OrderButton = styled.button`
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


export const SearchWrapper = styled.div`
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: ${(props) =>
    props.show ? "translateY(0)" : "translateY(-20px)"};
  height: auto;
  overflow: hidden;
  width:100%;
  min-width:100%;
  padding:0px;
  margin:0px;
`;
