import { useMemo, useContext, useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import {
  DivCards,
  CardButton,
  DivInfo,
  Titlos,
  Description,
  Price,
  DivImg,
  CardImg,
  FastAddOverlay,
  AddButton,
  Counter,
  MinusButton,
  PlusButton,
  AnimatedQuantity,
  QuantityBadge,
  PopupContainer,
} from "./styles/Card.styled";
import { FaPlus, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { CartContext } from "../context/CartContext";
import { MenuContext } from "../context/MenuContext";
import { ModalProduct } from "./ModalProduct";
import { CardSkeleton } from "../skeleton/CardSkeleton";
import EMPTY_CART from "./styles/lotties/EMPTY_PRODUCT.json";
import { DefaultImages } from "../constants/AppConstants";

export function Card({ menu }) {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { loading, searchTerm } = useContext(MenuContext);
  const popupRef = useRef(null);
  const DEFAULT_IMAGE_URL_PRODUCT = DefaultImages.DEFAULT_IMAGE_PRODUCTS;
  const [openProductId, setOpenProductId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        openProductId !== null &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        setOpenProductId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openProductId]);

  const togglePopup = (productId) => {
    setOpenProductId((prev) => (prev === productId ? null : productId));
  };

  const handleMinusClick = (productId, quantity) => {
    if (quantity === 1) {
      setOpenProductId(null);
    }
    removeFromCart(productId);
  };

  // Group, filter, and sort products.
  const groupedProducts = useMemo(() => {
    if (!menu?.products) return [];

    let filteredProducts = menu.products;
    // Exclude inactive products so they are not shown at all
    filteredProducts = filteredProducts.filter((product) => product.isActive);

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter((product) => {
        const title = product?.translations?.[0]?.title?.toLowerCase() || "";
        const desc =
          product?.translations?.[0]?.description?.toLowerCase() || "";
        return title.includes(lowerSearch) || desc.includes(lowerSearch);
      });
    }

    const groups = {};
    filteredProducts.forEach((product) => {
      if (product.categories && product.categories.length > 0) {
        const category = product.categories[0];
        if (!groups[category.id]) {
          groups[category.id] = { category, products: [] };
        }
        groups[category.id].products.push(product);
      }
    });

    let groupArray = Object.values(groups);
    // Remove categories that have no products after filtering
    groupArray = groupArray.filter((group) => group.products.length > 0);
    groupArray.sort(
      (a, b) => a.category.sortingOrder - b.category.sortingOrder
    );
    groupArray = groupArray.map((group) => {
      group.products.sort((a, b) => a.sortingOrder - b.sortingOrder);
      return group;
    });
    return groupArray;
  }, [menu, searchTerm]);

  if (loading) {
    return (
      <DivCards>
        {[...Array(9)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </DivCards>
    );
  }

  function handleOpenModal(product) {
    setModal(true);
    setSelectedProductId(product);
  }

  return (
    <div style={{ paddingBottom: "20px" }}>
      {groupedProducts.length === 0 ? (
        <div style={{ textAlign: "center", fontSize: "18px" }}>
          <Lottie
            animationData={EMPTY_CART}
            loop={true}
            style={{ width: "100%", height: "250px" }}
          />
          No results found
        </div>
      ) : (
        groupedProducts.map(({ category, products }) => (
          // Add an id attribute so that react-scroll can link to this section.
          <div key={category.id} id={category.id}>
            <h2 style={{ marginTop: "40px", marginBottom: "15px" }}>
              {category.translations[0]?.name}
            </h2>
            <DivCards>
              {products.map((product) => {
                const quantity = cartItems[product.id] || 0;
                return (
                  <CardButton
                    key={product.id}
                    // Only allow clicking if product is visible.
                    onClick={() =>
                      product.isVisible && handleOpenModal(product.id)
                    }
                    // Apply reduced opacity and disable pointer events if not visible.
                    style={{
                      opacity: product.isVisible ? 1 : 0.5,
                      pointerEvents: product.isVisible ? "auto" : "none",
                    }}
                  >
                    <DivInfo>
                      <Titlos>{product?.translations[0]?.title}</Titlos>
                      <Description>
                        {product?.translations[0]?.description}
                      </Description>
                      <Price>€{product?.price}</Price>
                    </DivInfo>
                    <DivImg>
                      <CardImg
                        src={product?.imageUrl}
                        alt={product?.translations[0]?.title}
                        onError={(e) => {
                          e.target.src = DEFAULT_IMAGE_URL_PRODUCT; // Fallback image in case of an error
                        }}
                      />
                      <FastAddOverlay onClick={(e) => e.stopPropagation()}>
                        {quantity === 0 && openProductId !== product.id && (
                          <AddButton
                            onClick={(e) => {
                              e.stopPropagation();
                              // Only add if product is visible.
                              if (product.isVisible) {
                                addToCart(product.id);
                                togglePopup(product.id);
                              }
                            }}
                          >
                            <FaPlus />
                          </AddButton>
                        )}
                        {quantity > 0 && openProductId !== product.id && (
                          <QuantityBadge
                            onClick={(e) => {
                              e.stopPropagation();
                              // Only allow quantity changes if product is visible.
                              if (product.isVisible) togglePopup(product.id);
                            }}
                          >
                            <AnimatedQuantity key={quantity}>
                              {quantity}
                            </AnimatedQuantity>
                          </QuantityBadge>
                        )}
                        {openProductId === product.id && (
                          <PopupContainer
                            ref={popupRef}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Counter>
                              <MinusButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMinusClick(product.id, quantity);
                                }}
                              >
                                <FaCircleMinus />
                              </MinusButton>
                              <AnimatedQuantity key={quantity}>
                                {quantity}
                              </AnimatedQuantity>
                              <PlusButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product.id);
                                }}
                              >
                                <FaCirclePlus />
                              </PlusButton>
                            </Counter>
                          </PopupContainer>
                        )}
                      </FastAddOverlay>
                    </DivImg>
                  </CardButton>
                );
              })}
            </DivCards>
          </div>
        ))
      )}
      <ModalProduct
        modal={modal}
        setModal={setModal}
        productId={selectedProductId}
      />
    </div>
  );
}
