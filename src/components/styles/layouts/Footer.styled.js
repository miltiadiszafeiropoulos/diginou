import styled, { keyframes } from "styled-components";
import { FaHeart } from "react-icons/fa";

const beatAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

export const StyleFooter = styled.footer`
  display: flex;
  flex-direction: column; /* Allows stacking the main content and bottom section */
  align-items: center;
  padding: 50px 30px 20px 30px;
  background-color: #101820;
`;

export const AllDivs = styled.div`
  max-width: 1540px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

export const FooterColumn = styled.div`
  flex: 0 0 calc((100% - 3 * 40px) / 4); /* Adjust width to account for gaps */
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const IconsDiv = styled.div`
  display: flex;
  gap: 15px;
  color: #cdde00;

  & > * {
    cursor: pointer; /* Show pointer on hover */
    transition: transform 0.3s ease, color 0.3s ease;

    &:hover {
      transform: scale(1.1);
      color: #82a900; /* Changed to a noticeably different green */
    }
  }
`;

export const FooterLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
  color: #cdde00;
  cursor: pointer; /* Pointer for clickable email link */

  &:hover {
    color: #82a900; /* Changed to a noticeably different green */
  }
`;

export const FooterUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: 700;
`;

export const FooterLi = styled.li`
  margin-bottom: 10px;
  color: #cdde00;
  
  a {
    color: #cdde00;
    text-decoration: none;
    transition: color 0.3s ease;
    cursor: pointer; /* Pointer for clickable links */

    &:hover {
      color: #82a900; /* Changed to a noticeably different green */
    }
  }
`;

export const FooterBottom = styled.div`
  width: 100%;
  border-top: 1px solid rgba(211, 216, 69, 0.3);
  margin-top: 40px;
  padding-top: 20px;
  text-align: center;
  color: #cdde00;
  font-weight: 700;
`;


export const BeatingHeart = styled(FaHeart)`
  animation: ${beatAnimation} 2s infinite;
`;