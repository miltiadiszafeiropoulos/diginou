import styled, { keyframes } from "styled-components";

// Keyframes for the balloon effect when the number changes
const balloonEffect = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
`;

// Smaller circle button style for minus and plus with larger icons
export const QuantityButton = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  padding: 4px;
  background: #d4d845;
  color: rgb(16, 24, 32);
  cursor: pointer;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.2);
  }
`;

// Trash button styled without a background
export const TrashButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  color: #d4d845;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.2);
  }
`;


// Container wrapping the quantity controls.
export const QuantityControl = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  background-color: rgb(16, 24, 32);
  border-radius: 12px;
  padding: 5px 10px;
  gap: 5px;
  cursor: pointer;
  transition: 
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out,
    backdrop-filter 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
  
  &.expanded {
    transform: scale(1.05);
    backdrop-filter: blur(5px);
    z-index: 1;
  }
`;

// Circle display for the quantity number.
// The animation is applied on mount so that each new mount triggers the balloon effect.
export const QuantityDisplay = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  color: #d4d845;
  cursor: pointer;
  animation: ${balloonEffect} 0.5s ease-out;
`;
// Each product card container.
export const DivCard = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position: relative;      /* For absolute positioning inside */
  padding-right: 70px;     /* Reserve space so text doesn't go behind the control */
  padding-top:10px;
 &:not(:first-child) {
    border-top: 1px solid rgba(211, 216, 69, 0.50);
  }
  &:hover{
    background-color:#f6f6f6;
    }
`;
