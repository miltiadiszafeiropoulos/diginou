import styled, { keyframes } from "styled-components";
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

// Keyframes for the "balloon" effect for numbers
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

export const StyledModal = styled.div`
  position: fixed;
  width: 100vw;
  inset: 0;
  color: rgb(32, 33, 37);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  @media (max-width: 800px) {
    align-items: flex-end;
  }
`;

export const InsideModal = styled.div`
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 1rem 0px,
    rgba(0, 0, 0, 0.12) 0px 1rem 1rem 0px;
  border-radius: 23px;
  background-color: white;
  max-width: min(32.5rem, 90vw);
  max-height: min(62.5rem, calc(100vh - 24px));
  height: 650px;
  width: 100%;
  overflow-y: auto; /* The scroll container */
  clip-path: inset(0 round 23px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1024px) {
    height: 70%;
    min-height: 50vh;
    max-height: 96vh;
  }
  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    height: 85%;
    border-radius: 23px 23px 0 0;
    clip-path: inset(0 round 23px 23px 0 0);
  }
`;

export const DivPeriexomeno = styled.div`
  padding: 0px 20px 20px 20px;
`;

export const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`;

export const DivButtons = styled.div`
  display: flex;
  align-items: stretch;
  position: sticky;
  bottom: env(safe-area-inset-bottom, 0);
  left: 0;
  right: 0;
  padding: 0 20px 15px 20px;
  gap: 10px;
  backdrop-filter: blur(5px); /* Adjust the blur radius as needed */
`;


export const DivButtonCounter = styled.button`
  -webkit-appearance: button;
  transition: all 0.3s ease-in-out;
  background: #d4d845;
  color: ${(props) => props.theme.button.color};
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 0.75rem 0px,
    rgba(0, 0, 0, 0.12) 0px 0.75rem 0.75rem 0px;
  padding: 1rem;
  border: 0px;
  font-size:18px;
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonCounter = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 9999px;
  display: flex;
  font-size:18px;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  background: rgba(16, 24, 32, 1);
  color: #d4d845;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$disabled ? "0.5" : "1")};

  &:hover {
    transform: ${(props) => (props.$disabled ? "none" : "scale(1.05)")};
  }
`;

export const ButtonSubmit = styled.button`
  width: 70%;
  -webkit-appearance: button;
  transition: all 0.3s ease-in-out;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 0.75rem 0px,
    rgba(0, 0, 0, 0.12) 0px 0.75rem 0.75rem 0px;
  cursor: pointer;
  border: 0px;
  background: #d4d845;
  color: ${(props) => props.theme.button.color};

  &:hover {
    transform: scale(1.01);
  }
`;

export const DivSubmit = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$center ? "center" : "space-between")};
  opacity: 1;
  color: ${(props) => props.theme.button.color};
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0px 10px;
`;

export const DivCancel = styled.span`
  position: sticky;
  z-index: 99;
  top: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: box-shadow 120ms ease-in 0s, background-color 120ms ease-in 0s;
`;

export const Cancel = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 25px;
  z-index: 99;
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 9999px;
  margin: 20px;
  padding: 2px;
  cursor: pointer;
  animation: ${(props) => (props.$show ? rotateIn : rotateOut)} 1s;
  transition: background 0.3s;

  &:hover {
    background: rgb(220 220 220);
  }
`;

export const IconX = styled(FaX)`
margin:2.3px;
`;

export const StickyHeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fff;
  display: ${(props) => (props.$show ? "block" : "none")};
  opacity: 0;
  transform: translateY(-100%);
  animation: ${(props) => props.$show && "slideDown 0.3s ease-in-out forwards"};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const StickyHeaderContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* Title or empty space is centered */
  height: 75px;
  padding: 0 40px; /* Space for the X icon on the right */



  h2 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
`;


export const AnimatedQuantity = styled.span`
  display: inline-block;
  animation: ${balloon} 0.3s ease-out;
`;