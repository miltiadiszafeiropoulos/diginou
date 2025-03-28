import styled, { keyframes } from "styled-components";

export const DivCards = styled.div`
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Mobile: 1 column */
  }
`;

export const CardButton = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  padding: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    box-shadow: none;
    width: 100%;
    margin: auto;
    align-content: center;
    border-top: 1px solid #e4e4e5;
    border-radius: 0px;
    
    &:hover {
      transform: scale(0.98);
    }
    
    /* Remove border from the first product in each category */
    &:first-child {
      border-top: none;
    }
    
    /* For the other products, add a little top padding */
    &:not(:first-child) {
      padding-top: 8px; /* Adjust this value as needed */
    }
  }
`;

export const DivInfo = styled.div`
  display: flex;
  width: 55%;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  padding: 15px;
  @media (max-width:768px){
    width: 50%;
  }
`;

export const DivImg = styled.div`
  display: flex;
  width: 45%;
  position: relative; /* Make sure to have position relative for overlay */
  @media (max-width:768px){
    width: 50%;
  }
`;

export const Titlos = styled.h3`
  font-size: 18px;
  font-weight: 900;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`;

export const Price = styled.p`
  font-size: 14px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`;

export const Description = styled.p`
  font-size: 13px;
  line-height: 1.2;
  height: calc(1.2em * 3); /* Fixed height for 3 lines */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit text to 3 lines */
  -webkit-box-orient: vertical;
  margin: 0;
  text-align: left;
`;

export const CardImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 135px;
  border-radius: 0px 10px 10px 0px;

  @media (max-width: 768px) {
    border-radius: 12px;
  }
`;

/* ============= FAST ADD & COUNTER STYLES ============= */

// Keyframes for the "balloon" effect
const balloon = keyframes`
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

// Keyframe for fade in + slight upward motion
const fadeInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// When quantity changes, the <span> with this style will scale briefly
export const AnimatedQuantity = styled.span`
  display: inline-block;
  min-width: 20px; /* adjust to fit your design */
  text-align: center;
  font-family: monospace; /* ensures each digit has the same width */
    animation: ${balloon} 0.3s ease-out;
`;

// Container for the fast-add overlay in the top-right of the image
export const FastAddOverlay = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`;

// Standalone add button (displayed when product count is 0)
export const AddButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  font-size: 22px;
  border-radius: 0px 9px 0px 23px;
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  color: #d4d845;
  background:rgba(16, 24, 32, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
        background:rgba(16, 24, 32, 0.9);
  }
`;

// Container for the counter (displayed when product is already in the cart)
export const Counter = styled.div`
  display: flex;
  align-items: center;
  background:rgba(16, 24, 32, 1);
  border-radius: 0px 12px 0px 12px;
  padding: 10px 20px;
  color:#d4d845;
  cursor: default;
`;

// Button to decrease the count
export const MinusButton = styled.button`
  background: transparent;
  display:flex;
  border: none;
  color:#d4d845;
  font-size: 23px;
  cursor: pointer;
  outline: none;
  margin-right: 4px;
  font-weight: bold;
  &:hover {
    color: #f44336; /* Example hover color */
  }
`;

// Button to increase the count
export const PlusButton = styled.button`
  background: transparent;
  color:#d4d845;
  font-size: 23px;
  display:flex;
  border: none;
  cursor: pointer;
  outline: none;
  margin-left: 4px;
  font-weight: bold;
  &:hover {
    color: #4caf50; /* Example hover color */
  }
`;

// A small badge to show the current quantity (when not editing)
export const QuantityBadge = styled.button`
  background: #d4d845;
  color:rgba(16, 24, 32, 1);
  border: none;
  border-radius: 0px 9px 0px 23px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  animation: ${balloon} 0.3s ease-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    &:hover {
        background:rgb(199, 204, 67);
  }
`;

// Container that animates in when mounted
export const PopupContainer = styled.div`
  animation: ${fadeInLeft} 0.3s ease forwards;
  /* You can adjust the duration, easing, or initial transform as needed */
`;
