import React, { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import {
  DivCard,
  QuantityControl,
  QuantityDisplay,
  QuantityButton,
  TrashButton,
} from "./styles/CardOrder.styled";
import { FaCirclePlus, FaCircleMinus, FaTrash } from "react-icons/fa6";
import { DefaultImages } from "../constants/AppConstants";

export function CardOrder({ product, onOpenModal }) {
  const { cartItems, addToCart, removeFromCart, removeAllFromCart } =
    useContext(CartContext);
  const [expanded, setExpanded] = useState(false);
  const controlRef = useRef(null);
  const DEFAULT_IMAGE_URL_PRODUCT = DefaultImages.DEFAULT_IMAGE_PRODUCTS;

  // Toggle the expanded view and dispatch a custom event if expanding.
  const toggleExpanded = (e) => {
    e.stopPropagation();
    if (!expanded) {
      document.dispatchEvent(
        new CustomEvent("card-expanded", { detail: product.id })
      );
    }
    setExpanded(!expanded);
  };

  // Listen for other cards expanding and collapse if needed.
  useEffect(() => {
    const handleCardExpanded = (event) => {
      if (event.detail !== product.id) {
        setExpanded(false);
      }
    };
    document.addEventListener("card-expanded", handleCardExpanded);
    return () => {
      document.removeEventListener("card-expanded", handleCardExpanded);
    };
  }, [product.id]);

  // Collapse the expanded view if clicking outside the quantity control.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        expanded &&
        controlRef.current &&
        !controlRef.current.contains(event.target)
      ) {
        setExpanded(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [expanded]);

  return (
    <DivCard
      onClick={(e) => {
        // Close the expanded quantity control if it's open and then open the product modal.
        setExpanded(false);
        onOpenModal(product.id);
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <img
          src={product.imageUrl}
          alt={product?.translations?.[0]?.title}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_URL_PRODUCT; // Fallback image in case of an error
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>{product?.translations?.[0]?.title}</h3>
          <p>{product.price.toFixed(2)} €</p>
        </div>
      </div>
      <QuantityControl
        ref={controlRef}
        onClick={toggleExpanded}
        className={expanded ? "expanded" : ""}
      >
        {expanded ? (
          <>
            <QuantityButton
              onClick={(e) => {
                e.stopPropagation();
                removeFromCart(product.id);
              }}
            >
              <FaCircleMinus size={20} />
            </QuantityButton>
            <QuantityDisplay key={cartItems[product.id]}>
              {cartItems[product.id]}
            </QuantityDisplay>{" "}
            <QuantityButton
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product.id);
              }}
            >
              <FaCirclePlus size={20} />
            </QuantityButton>
            <TrashButton
              onClick={(e) => {
                e.stopPropagation();
                removeAllFromCart(product.id);
              }}
            >
              <FaTrash size={20} />
            </TrashButton>
          </>
        ) : (
          <QuantityDisplay>{cartItems[product.id]}</QuantityDisplay>
        )}
      </QuantityControl>
    </DivCard>
  );
}
