import { useContext, useState } from "react";
import Lottie from "lottie-react";
import { StyledOffCanvas } from "styled-off-canvas";
import { MenuContext } from "../context/MenuContext";
import { CartContext } from "../context/CartContext";
import {
  MenuCanva,
  DivContainer,
  CustomOverlay,
  ButtonOrder,
  Span,
  DivFooter,
  Header,
  Cancel,
  IconX,
} from "./styles/CompleteOrder.styled";
import { ModalProduct } from "./ModalProduct";
import { CardOrder } from "./CardOrder";
import EMPTY_CART from "./styles/lotties/EMPTY_CART.json";


export function CompleteOrder(props) {
  const { getTotalCartAmount, cartItems, clearCart } = useContext(CartContext);
  const { menuInfo } = useContext(MenuContext);
  
  const products = menuInfo?.products || [];
  const sumItems = Object.values(cartItems).reduce((acc, num) => acc + num, 0);
  const totalAmount = getTotalCartAmount(products);

  // Modal for displaying detailed product info
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [modal, setModal] = useState(false);

  // Filter products that are in the cart based on cartItems
  const cartProducts = products.filter((product) => cartItems[product.id]);

  function handleOpenModal(productId) {
    setModal(true);
    setSelectedProductId(productId);
  }

  return (
    <StyledOffCanvas isOpen={props.isOpen} onClose={props.close}>
      <MenuCanva closeOnEsc>
        {/* Sticky header */}
        <Header>
          <h2>Η παραγγελία σας</h2>
          <Cancel onClick={props.close}>
            <IconX />
          </Cancel>
        </Header>

        {/* Main Content Area with product cards */}
        <DivContainer>
          {cartProducts.length === 0 ? (
            <>
              <Lottie
                animationData={EMPTY_CART}
                loop={true}
                style={{ width: "100%", height: "250px" }}
              />
              <h1 style={{ textAlign: "center" }}>No items in your order</h1>
              <p style={{ textAlign: "center" }}>
                Your order is lonely without items. Let's add some!
              </p>
            </>
          ) : (
            cartProducts.map((product) => (
              <CardOrder
                key={product.id}
                product={product}
                onOpenModal={handleOpenModal}
              />
            ))
          )}
        </DivContainer>

        {/* Footer always fixed at the bottom */}
        <DivFooter>
          {cartProducts.length === 0 ? (
            <ButtonOrder>προσθέστε προϊοντα</ButtonOrder>
          ) : (
            <ButtonOrder onClick={clearCart}>
              <Span>{sumItems}</Span>Ολοκλήρωση παραγγελίας
              <span>{totalAmount.toFixed(2)} €</span>
            </ButtonOrder>
          )}
        </DivFooter>
      </MenuCanva>

      {/* Overlay to close the off-canvas menu */}
      <CustomOverlay $isActive={props.isOpen} />

      {/* Modal for detailed product view */}
      <ModalProduct modal={modal} setModal={setModal} productId={selectedProductId} />
    </StyledOffCanvas>
  );
}
