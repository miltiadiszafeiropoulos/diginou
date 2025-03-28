// SearchStyles.js

import styled from 'styled-components';
import { CiSearch } from "react-icons/ci";

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 100%;
`;

export const InputContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  color: ${props => props.theme.card.color};
  border-radius: 1.25rem;
  height: 2.5rem;
  backdrop-filter: none;
  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

export const SearchInput = styled.input`
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-style: normal;
  font-stretch: normal;
  text-transform: none;
  font-weight: 500;
  position: relative;
  display: block;
  border: solid 1px ${props => props.theme.card.color};
  margin: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-inline: 3.5rem 1rem;
  box-sizing: border-box;
  border-radius: 1.25rem;
  color: inherit;
  height: 2.5rem;
  width: 500px;
  max-width: 100%;
  transition: background-color 70ms linear 0s;
  caret-color: rgb(0, 157, 224);
  background-color: ${props => props.theme.card.background};
  @media (max-width: 1024px){
    width: 350px;
  }
  @media screen and (max-width: 768px) {
    padding-inline: 3.5rem 2rem;
    width: 100%;
  }
  &[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
    height: 10px;
    width: 10px;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjEyMy4wNXB4IiBoZWlnaHQ9IjEyMy4wNXB4IiB2aWV3Qm94PSIwIDAgMTIzLjA1IDEyMy4wNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIzLjA1IDEyMy4wNTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTEyMS4zMjUsMTAuOTI1bC04LjUtOC4zOTljLTIuMy0yLjMtNi4xLTIuMy04LjUsMGwtNDIuNCw0Mi4zOTlMMTguNzI2LDEuNzI2Yy0yLjMwMS0yLjMwMS02LjEwMS0yLjMwMS04LjUsMGwtOC41LDguNQ0KCQljLTIuMzAxLDIuMy0yLjMwMSw2LjEsMCw4LjVsNDMuMSw0My4xbC00Mi4zLDQyLjVjLTIuMywyLjMtMi4zLDYuMSwwLDguNWw4LjUsOC41YzIuMywyLjMsNi4xLDIuMyw4LjUsMGw0Mi4zOTktNDIuNGw0Mi40LDQyLjQNCgkJYzIuMywyLjMsNi4xLDIuMyw4LjUsMGw4LjUtOC41YzIuMy0yLjMsMi4zLTYuMSwwLTguNWwtNDIuNS00Mi40bDQyLjQtNDIuMzk5QzEyMy42MjUsMTcuMTI1LDEyMy42MjUsMTMuMzI1LDEyMS4zMjUsMTAuOTI1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=);    background-size: 10px 10px;
    cursor: pointer;
  }
`;

export const SearchIcon = styled(CiSearch)`
  width: 1rem;
  position: absolute;
  inset-inline-start: 2rem;
  top: 50%;
  transform: translateY(-50%);
  fill: currentcolor;
`;

