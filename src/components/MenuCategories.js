import { useContext, useState, useRef, useEffect } from "react";
import { MenuContext } from "../context/MenuContext";
import {
  ShadowContainer,
  Container,
  ScrollContainer,
  LinkGroup,
  CategoryLink,
  OrderButton,
  Badge,
  Price,
  SearchWrapper,
} from "./styles/MenuCategories.styled";
import { useTranslation } from "react-i18next";
import { CartContext } from "../context/CartContext";
import { Search } from "./Search";
import { scroller } from "react-scroll";
import { CompleteOrder } from "./CompleteOrder";

export function MenuCategories() {
  const { menuInfo, searchTerm, setSearchTerm } = useContext(MenuContext);
  const { cartItems, getTotalCartAmount } = useContext(CartContext);
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  const stickyRef = useRef(null);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isStuck, setIsStuck] = useState(false);

  const products = menuInfo?.products || [];
  // Filter out inactive products so that only active products are used to build the categories list
  const activeProducts = products.filter((product) => product.isActive);

  // Build unique categories from active products only.
  const uniqueCategories = activeProducts.reduce((acc, product) => {
    product.categories.forEach((cat) => {
      if (!acc.find((c) => c.id === cat.id)) {
        acc.push(cat);
      }
    });
    return acc;
  }, []);

  useEffect(() => {
    const headerHeight = 70;
    const extraOffset = 68;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let newActive = 0;
      for (let i = uniqueCategories.length - 1; i >= 0; i--) {
        const section = document.getElementById(uniqueCategories[i].id);
        if (section && scrollY >= section.offsetTop - headerHeight - extraOffset) {
          newActive = i;
          break;
        }
      }
      setActiveCategoryIndex(newActive);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [uniqueCategories]);

  useEffect(() => {
    if (containerRef.current) {
      if (activeCategoryIndex === 0) {
        containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const activeLink = containerRef.current.querySelector("a.active");
        if (activeLink) {
          const container = containerRef.current;
          const containerWidth = container.offsetWidth;
          const contentWidth = container.scrollWidth;
          const maxScroll = contentWidth - containerWidth;
          const paddingLeft = 15; // Adjust if necessary
          const linkLeft = activeLink.offsetLeft - paddingLeft;
          const scrollX = Math.min(Math.max(linkLeft, 0), maxScroll);
          container.scrollTo({ left: scrollX, behavior: "smooth" });
        }
      }
    }
  }, [activeCategoryIndex]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const top = stickyRef.current.getBoundingClientRect().top;
        const stickyTop = windowWidth <= 768 ? 0 : 70; //0 -->55 for two sticky
        setIsStuck(top <= stickyTop);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [windowWidth]);

  const sumItems = Object.values(cartItems).reduce((acc, num) => acc + num, 0);
  // Use activeProducts to calculate the total amount
  const totalAmount = getTotalCartAmount(activeProducts);

  if (products.length === 0) return null;

  const scrollToSection = (id, index) => {
    scroller.scrollTo(id, { smooth: true, offset: -135, duration: 500 });
    setActiveCategoryIndex(index);
  };

  return (
    <>
      <ShadowContainer ref={stickyRef} $isStuck={isStuck}>
        <Container>
          {windowWidth < 768 && (
            <SearchWrapper show={isStuck}>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </SearchWrapper>
          )}
          <ScrollContainer ref={containerRef}>
            <LinkGroup>
              {uniqueCategories.map((cat, idx) => (
                <CategoryLink
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id, idx)}
                  className={idx === activeCategoryIndex ? "active" : ""}
                >
                  {cat.translations[0]?.name || "Unnamed Category"}
                </CategoryLink>
              ))}
            </LinkGroup>
          </ScrollContainer>
          {windowWidth >= 768 && (
            <OrderButton onClick={() => setIsOpen(!isOpen)}>
              <Badge>{sumItems}</Badge>
              {t("header.view-order")}
              <Price>{totalAmount.toFixed(2)} €</Price>
            </OrderButton>
          )}
        </Container>
      </ShadowContainer>
      
      {/* Pass a proper close callback that sets isOpen to false */}
      <CompleteOrder isOpen={isOpen} close={() => setIsOpen(false)} />
    </>
  );
}
