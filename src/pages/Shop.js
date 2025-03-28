import { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MenuContext } from "../context/MenuContext";
import { Pdf } from "../components/Pdf";
import { Card } from "../components/Card";
import { Container } from "../components/styles/Main.styled";
import { Header } from "../layouts/Header";
import { MenuCategories } from "../components/MenuCategories";
import { Footer } from "../layouts/Footer";
import {
  Div,
  OrderButton,
  Badge,
  Price,
} from "../components/styles/pages/Shop.styled";
import { CartContext } from "../context/CartContext";
import { CompleteOrder } from "../components/CompleteOrder";
import INACTIVE_ORDER from "../components/styles/lotties/INACTIVE_ORDER.json";

export function Shop() {
  const { menuInfo, fetchMenu, loading, error } = useContext(MenuContext);
  const { cartItems, getTotalCartAmount } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const language = searchParams.get("language");
  const menuId = searchParams.get("id");
  const [isOpen, setIsOpen] = useState(false)
  
  const sumItems = Object.values(cartItems).reduce((acc, num) => acc + num, 0);
  const products = menuInfo?.products || [];
  const totalAmount = getTotalCartAmount(products);

  // Local flag to know when fetchMenu has completed.
  const [hasFetched, setHasFetched] = useState(false);

  // Check for missing parameters and trigger fetch if available.
  useEffect(() => {
    if (!language || !menuId) {
      navigate("/404");
      return;
    }
    // Call fetchMenu and then mark as fetched when complete.
    fetchMenu(language, menuId).then(() => {
      setHasFetched(true);
    });
  }, [language, menuId, fetchMenu, navigate]);

  // When loading finishes and after fetch has been attempted, check if the fetched menu is empty or if there was an error.
  useEffect(() => {
    if (hasFetched && !loading) {
      if (
        error ||
        !menuInfo ||
        (typeof menuInfo === "object" && Object.keys(menuInfo).length === 0)
      ) {
        navigate("/404");
      }
    }
  }, [hasFetched, loading, menuInfo, error, navigate]);
  return (
    <>
      <Header />
      <Div>
        {menuInfo?.type === "CUSTOM_MENU_TYPE" && (
          <>
            <MenuCategories />
            <Container>
              {!loading && menuInfo && !menuInfo.isActive ? (
                <>
                  <Lottie
                    animationData={INACTIVE_ORDER}
                    loop={true}
                    style={{ width: "100%", height: "250px" }}
                  />
                  <p>Menu is currently inactive.</p>
                </>
              ) : (
                <>
                  <Card menu={menuInfo} />
                  <OrderButton onClick={() => setIsOpen(!isOpen)}>
                    <Badge>{sumItems}</Badge>
                    complete order
                    <Price>{totalAmount.toFixed(2)} €</Price>
                  </OrderButton>
                </>
              )}
            </Container>
          </>
        )}
  
        {menuInfo?.type === "UPLOADED_MENU_TYPE" && (
          <Container>
            <Pdf />
          </Container>
        )}
      </Div>
      <Footer />
      <CompleteOrder isOpen={isOpen} close={() => setIsOpen(!isOpen)} />
    </>
  );
}  