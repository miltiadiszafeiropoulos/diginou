import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { MenuContext } from "../context/MenuContext";
import { CartContext } from "../context/CartContext";
import {
  StyledModal,
  InsideModal,
  Img,
  DivPeriexomeno,
  DivButtons,
  DivButtonCounter,
  ButtonSubmit,
  ButtonCounter,
  DivSubmit,
  DivCancel,
  Cancel,
  IconX,
  StickyHeaderWrapper,
  StickyHeaderContent,
  AnimatedQuantity
} from "./styles/ModalProduct.styled";
import { CSSTransition } from "react-transition-group";
import "./styles/ModalTransition.css";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { AnalyticsHttpService } from "../httpServices/AnalyticsHttpService";
import { DefaultImages } from "../constants/AppConstants";

export function ModalProduct({ modal, setModal, productId }) {
  const { menuInfo } = useContext(MenuContext);
  const { addToCartModal, removeFromCart, removeAllFromCart, cartItems } = useContext(CartContext);
  const DEFAULT_IMAGE_URL_PRODUCT = DefaultImages.DEFAULT_IMAGE_PRODUCTS;

  // Refs for the scroll container and key elements
  const nodeRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const buttonsRef = useRef(null);
  const submitsRef = useRef(null);

  // State for sticky header visibility and order quantity
  const [showStickyBox, setShowStickyBox] = useState(false);
  const [showStickyTitle, setShowStickyTitle] = useState(false);
  const [quantity, setQuantity] = useState(() =>
    Math.max(1, cartItems[productId] || 0)
  );

  // Get current product and cart state
  const product = menuInfo?.products?.find((prod) => prod.id === productId);
  const isInCart = (cartItems[productId] ?? 0) > 0;

  //canvas - to fix scrollbar when close modal after styled of canvas


  // Reset scroll, sticky states and quantity when product changes
  useEffect(() => {
    if (modal && nodeRef.current) {
      nodeRef.current.scrollTop = 0;
    }
    setShowStickyBox(false);
    setShowStickyTitle(false);
    setQuantity(Math.max(1, cartItems[productId] || 0));
  }, [modal, productId, cartItems]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscapeCapture = (e) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation(); // Stops all later listeners (including off-canvas)
        setModal(false);
      }
    };
  
    if (modal) {
      window.addEventListener("keydown", handleEscapeCapture, true); // capture phase
    }
    return () => {
      window.removeEventListener("keydown", handleEscapeCapture, true);
    };
  }, [modal, setModal]);
  

  // Disable background scroll when modal is open
  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modal]);
  

  // Reset scroll position when modal opens
  useEffect(() => {
    if (modal && nodeRef.current) {
      nodeRef.current.scrollTop = 0;
    }
  }, [modal]);

  // IntersectionObserver to toggle sticky header based on product image
  useEffect(() => {
    const scrollContainer = nodeRef.current;
    const imageEl = imageRef.current;
    if (!scrollContainer || !imageEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBox(!entry.isIntersecting);
      },
      {
        root: scrollContainer,
        threshold: 0
      }
    );

    observer.observe(imageEl);
    return () => {
      if (imageEl) observer.unobserve(imageEl);
    };
  }, [modal, productId]);

  // IntersectionObserver to toggle sticky title based on heading position
  useEffect(() => {
    const scrollContainer = nodeRef.current;
    const headingEl = headingRef.current;
    if (!scrollContainer || !headingEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyTitle(!entry.isIntersecting);
      },
      {
        root: scrollContainer,
        rootMargin: "-60px 0px 0px 0px",
        threshold: 0
      }
    );

    observer.observe(headingEl);
    return () => {
      if (headingEl) observer.unobserve(headingEl);
    };
  }, [modal, productId]);

  // Handlers for updating order quantity
  const handleDecrement = (e) => {
    e.stopPropagation();
    if ((isInCart && quantity > 0) || (!isInCart && quantity > 1)) {
      setQuantity((q) => q - 1);
    }
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    setQuantity((q) => q + 1);
  };

  const handleUpdateOrder = (e) => {
    e.stopPropagation();
    const currentQty = cartItems[productId] ?? 0;

    if (quantity === 0) {
      removeAllFromCart(product.id);
    } else {
      const diff = quantity - currentQty;
      if (diff > 0) {
        addToCartModal(product.id, diff);
      } else if (diff < 0) {
        Array.from({ length: Math.abs(diff) }).forEach(() =>
          removeFromCart(product.id)
        );
      }
    }
    setModal(false);
  };

 // Memoize analytics form data so it doesn't change when the counter changes
  const formData = useMemo(
    () => ({
      menuId: menuInfo?.id,
      eventType: "PRODUCT_EVENT_COUNT",
      productId: product?.id
    }),
    [menuInfo?.id, product?.id]
  );

  // Trigger analytics only when the modal opens
  useEffect(() => {
    if (modal) {
      ProductModalCount(formData);
    }
  }, [modal, formData]);

  // ANALYTICS PRODUCT_EVENT_COUNT - ADD
  const ProductModalCount = async (data) => {
    try {
      await AnalyticsHttpService.TrackAnalytics(data);
    } catch (error) {
      console.error("Error count product:", error);
    }
  };



  const actionLabel = isInCart
    ? quantity === 0
      ? "Remove from Order"
      : "Update Order"
    : "Add to Order";

  return (
    <CSSTransition
      in={modal}
      timeout={500}
      classNames="modal"
      nodeRef={nodeRef}
      unmountOnExit
    >
      <StyledModal onClick={() => setModal(false)}>
        <InsideModal onClick={(e) => e.stopPropagation()} ref={nodeRef}>
          {/* Sticky header appears when image or title scroll out of view */}
          <StickyHeaderWrapper $show={showStickyBox}>
            <StickyHeaderContent>
              {showStickyTitle && <h2>{product?.translations[0].title}</h2>}
            </StickyHeaderContent>
          </StickyHeaderWrapper>
          <div>
            <DivCancel>
              <Cancel onClick={() => setModal(false)}>
                <IconX />
              </Cancel>
            </DivCancel>

            <Img
              ref={imageRef}
              src={product?.imageUrl}
              alt={product?.translations[0].title}
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE_URL_PRODUCT; // Fallback image in case of an error
              }}
            />

            <DivPeriexomeno>
              <h1 ref={headingRef}>{product?.translations[0].title}</h1>
              <p>€{product?.price}</p>
              <p>{product?.translations[0].description}</p>
            </DivPeriexomeno>
          </div>

          <DivButtons>
            <CSSTransition
              in={modal}
              timeout={250}
              appear={true}
              classNames="modal-button-transition"
              unmountOnExit
              nodeRef={buttonsRef}
            >
              <DivButtonCounter ref={buttonsRef}>
                <ButtonCounter
                  onClick={handleDecrement}
                  $disabled={
                    (!isInCart && quantity <= 1) || (isInCart && quantity === 0)
                  }
                >
                  <FaMinus />
                </ButtonCounter>
                <AnimatedQuantity key={quantity}>
                  {quantity}
                </AnimatedQuantity>
                <ButtonCounter onClick={handleIncrement}>
                  <FaPlus />
                </ButtonCounter>
              </DivButtonCounter>
            </CSSTransition>

            <CSSTransition
              in={modal}
              timeout={250}
              appear={true}
              classNames="modal-button-transition"
              unmountOnExit
              nodeRef={submitsRef}
            >
              <ButtonSubmit ref={submitsRef} onClick={handleUpdateOrder}>
                <DivSubmit $center={quantity === 0}>
                  <span>{actionLabel}</span>
                  <span>
                    {quantity !== 0 &&
                      ` €${(quantity * product?.price).toFixed(2)}`}
                  </span>
                </DivSubmit>
              </ButtonSubmit>
            </CSSTransition>
          </DivButtons>
        </InsideModal>
      </StyledModal>
    </CSSTransition>
  );
}
