import { useState, useEffect, useContext } from "react";
import { MenuContext } from "../context/MenuContext";
import {
  HeaderContainer,
  StickyBar,
  TopNav,
  IconWrapper,
  StoreSection,
  StoreLogo,
  StoreInfo,
  StoreDescription,
  Overlay as StyledOverlay, // if you use a custom overlay in your header styles
  DivMobile,
} from "../components/styles/layouts/Header.styled";
import { MdOutlineLogin } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { Search } from "../components/Search";
import { DropdownLanguages } from "../components/DropdownLanguages";
import { OffCanvasProvider } from "styled-off-canvas";
import { StoreInformation } from "../components/StoreInformation";
import { DefaultImages } from "../constants/AppConstants";

export function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { menuInfo, searchTerm, setSearchTerm } = useContext(MenuContext);
  const [isOpen, setIsOpen] = useState(false);
  const DEFAULT_IMAGE_URL_STORE = DefaultImages.DEFAULT_IMAGE_STORE;
  const DEFAULT_IMAGE_URL_MENU = DefaultImages.DEFAULT_IMAGE_MENU;

  // Update sticky header on scroll
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const storeLogo = menuInfo?.stores?.[0]?.imageUrl || DEFAULT_IMAGE_URL_STORE;
  const storeImage = menuInfo?.imageUrl || DEFAULT_IMAGE_URL_MENU;
  const storeTitle = menuInfo?.stores?.[0]?.name || "";
  const storeDescription = menuInfo?.stores?.[0]?.description || "";

  return (
    <div style={{ background: "rgb(251, 251, 251)" }}>
      <HeaderContainer>
        <img
          src={storeImage}
          alt="Header Background"
          onError={(e) => (e.target.src = DEFAULT_IMAGE_URL_STORE)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center", // Adjust the image position here
            zIndex: 0,
          }}
        />
        <StyledOverlay />
        <StickyBar $isSticky={isSticky}>
          <TopNav>
            <img
              src="/DIGINOU-LOGO-CROPPED.png"
              alt="Diginou Logo"
              style={{ width: "150px" }}
            />
            {windowWidth >= 768 && (
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <IconWrapper $isSticky={isSticky}>
                <MdOutlineLogin />
              </IconWrapper>
              <DropdownLanguages isSticky={isSticky} />
            </div>
          </TopNav>
        </StickyBar>

        <StoreSection>
          <div style={{ display: "flex" }}>
            <StoreLogo
              src={storeLogo}
              alt="Store Logo"
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE_URL_STORE; // Fallback image in case of an error
              }}
            />
          </div>
          <StoreInfo>
            <h1
              style={{
                fontWeight: "900",
                width: "60%",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {storeTitle}{" "}
              <BsInfoCircleFill
                onClick={() => setIsOpen(!isOpen)}
                style={{ fontSize: "25px", cursor: "pointer" }}
              />
            </h1>
            <StoreDescription>{storeDescription}</StoreDescription>
          </StoreInfo>
        </StoreSection>
      </HeaderContainer>

      <DivMobile>
        <BsInfoCircleFill
          onClick={() => setIsOpen(!isOpen)}
          style={{
            fontSize: "25px",
            position: "absolute",
            right: "20%",
            marginTop: "-20px",
            background: "#d4d845",
            padding: "6px",
            zIndex: "9999",
            borderRadius: "999px",
            cursor: "pointer",
          }}
        />
        <h1
          style={{
            fontWeight: "900",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "center",
            paddingTop: "60px",
            margin: "0px",
          }}
        >
          {storeTitle}
        </h1>
        {windowWidth <= 768 && (
          <div style={{ marginBottom: "15px", marginTop: "15px" }}>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        )}
      </DivMobile>

      <StoreInformation isOpen={isOpen} close={() => setIsOpen(false)} />
    </div>
  );
}
