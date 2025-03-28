import styled, { keyframes } from "styled-components";
import { Menu, Overlay } from "styled-off-canvas";
import { FaX } from "react-icons/fa6";

// Keyframes for the "rotate" effect for X (cancel)
const rotateIn = keyframes`
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0deg);
  }
`;
const rotateOut = keyframes`
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Off-canvas menu container set to full viewport height,
// arranged as a column with header, content and footer.
export const MenuCanva = styled(Menu)`
  width: 500px;
  max-width: 500px;
  height: 100vh; /* Full height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top-left-radius: ${(props) => (props.$isLeft ? "0px" : "23px")};
  border-bottom-left-radius: ${(props) => (props.$isLeft ? "0px" : "23px")};
  color: black;
  background: white;
  z-index: 9999;
  
  @media (max-width: 768px) {
    border-radius: 0px;
    width: 100%;
  }
`;

// Sticky header containing the title and cancel button
export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  border-bottom: 1px solid rgba(32, 33, 37, 0.15);
`;

// Cancel button styled component (no extra gap, part of header)
export const Cancel = styled.div`
  font-size: 25px;
  width: 30px;
  height: 30px;
  background: #ededee;
  border-radius: 9999px;
  padding: 2px;
  cursor: pointer;
  animation: ${(props) => (props.$show ? rotateIn : rotateOut)} 1s;
  transition: background 0.3s;
  
  &:hover {
    background: rgb(220, 220, 220);
  }
`;

// Icon inside the cancel button
export const IconX = styled(FaX)`
  margin: 2.3px;
`;

// Main content area where product cards are rendered.
// It expands to fill available space and scrolls if needed.
export const DivContainer = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
`;

// Footer always remains at the bottom.
export const DivFooter = styled.div`
  background: white;
  border-top: 1px solid rgba(32, 33, 37, 0.15);
  color: black;
  padding: 20px 30px 25px;
`;

// Button displaying the order summary and triggering order actions.
export const ButtonOrder = styled.button`
  -webkit-appearance: button;
  background-color: #d4d845;
  color: ${(props) => props.theme.button.color};
  transition: all 0.3s ease-in-out;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 0.75rem 0px,
    rgba(0, 0, 0, 0.12) 0px 0.75rem 0.75rem 0px;
  padding: 0.8rem;
  cursor: pointer;
  border: 0px;
  font-size: 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  
  &:hover {
    transform: scale(1.01);
  }
`;



// Badge or span element for item counter
export const Span = styled.span`
  background-color: ${(props) => props.theme.button.counter.background};
  color: ${(props) => props.theme.button.counter.color};
  padding: 5px;
  border-radius: 9999px;
  padding-left: 10px;
  padding-right: 10px;
`;


// Custom overlay to control off-canvas behavior
export const CustomOverlay = styled(Overlay)`
  z-index: ${(props) => (props.$isActive ? 1000 : -999)};
`;
