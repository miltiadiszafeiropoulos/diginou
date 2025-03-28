import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: relative;
  height: 360px;
  background-size: cover;
  background-position: center right;
`;

// Full-width sticky bar with background and shadow changes on scroll
export const StickyBar = styled.div`
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${props => (props.$isSticky ? "#fff" : "transparent")};
  transition: background-color 0.3s, box-shadow 0.3s;
  position: ${props => (props.$isSticky ? "fixed" : "relative")};
  border-bottom: ${props => (props.$isSticky ? "1px solid #ccc" : "none")};
  @media (max-width:768px){
    position: relative;
    background-color: transparent;
    border-bottom: none;
  }
`;

// Inner top navigation container with max-width
export const TopNav = styled.div`
  max-width: 1540px;
  margin: 0 auto;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width:768px){
    padding: 10px 15px;
  }
`;

// Icon wrapper that changes its background on sticky state
export const IconWrapper = styled.div`
  background: ${props => (props.$isSticky ? "#d4d845" : "rgba(255, 255, 255, 0.7)")};
  border-radius: 50%;
  padding: 8px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, transform 0.3s;
  &:hover{
    transform: scale(1.05);
  }
`;

// Store section placed at the bottom and above the overlay
export const StoreSection = styled.div`
  max-width: 1540px;
  padding: 20px 30px;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  z-index: 2;
  @media (max-width:768px){
    padding: 10px 15px;
  }
`;

// Store logo styled as a 100px square with border-radius and box-shadow
export const StoreLogo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  object-fit: cover;
    @media (max-width: 768px) {
    /* Center at the bottom; half below the header container */
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

// Container for the store info (title and description)
export const StoreInfo = styled.div`
  margin-left: 20px;
  color: #fff;
  font-size:23px;
  width: 100%;
      @media (max-width: 768px) {
        display:none;
      }
`;

// Description text limited to two lines with ellipsis
export const StoreDescription = styled.p`
  margin: 5px 0 0 0;
  overflow: hidden;
    font-size:15px;
  display: -webkit-box;
  width: 60%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight:700;
  line-height: 1.3em;
`;

// Overlay to darken the background image
export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const DivMobile = styled.div`
    padding-left: 15px;
    padding-right: 15px;
  @media (min-width:768px){
    display: none;
  }
`;