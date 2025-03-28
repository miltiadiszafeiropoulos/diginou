import styled, { keyframes } from "styled-components";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

// Define keyframes for the fade-in and fade-out animations.
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

// Create a styled component based on DropdownMenu.Content.
export const AnimatedDropdownContent = styled(DropdownMenu.Content)`
  background-color: white;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  /* Animate when opening */
  &[data-state="open"] {
    animation: ${fadeIn} 0.3s ease-out;
  }

  /* Animate when closing */
  &[data-state="closed"] {
    animation: ${fadeOut} 0.3s ease-out;
  }
`;
