import { useState } from "react";
import axios from "axios";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, refreshCart }) {
  const [isEditing, setIsEditing] = useState(false);
  const [quantityInput, setQuantityInput] = useState(cartItem.quantity);
  const [isDeleting, setIsDeleting] = useState(false);

  const startEditing = () => {
    setQuantityInput(cartItem.quantity);
    setIsEditing(true);
  };

  const saveQuantity = async () => {
    const newQuantity = Number(quantityInput);
    if (!Number.isInteger(newQuantity) || newQuantity < 1) {
      return;
    }
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: newQuantity,
    });
    setIsEditing(false);
    await refreshCart();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveQuantity();
    } else if (event.key === "Escape") {
      setIsEditing(false);
    }
  };

  const deleteItem = async () => {
    setIsDeleting(true);
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await refreshCart();
  };

  return (
    <>
    <img className="product-image" src={cartItem.product.image} />

    <div className="cart-item-details">
      <div className="product-name">{cartItem.product.name}</div>
      <div className="product-price">
        {formatMoney(cartItem.product.priceCents)}
      </div>
      <div className="product-quantity">
        {isEditing ? (
          <span className="quantity-edit-container">
            <input
              className="quantity-input"
              type="number"
              min="1"
              max="10"
              value={quantityInput}
              autoFocus
              onChange={(event) => setQuantityInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <span className="update-quantity-link link-primary" onClick={saveQuantity}>
              Save
            </span>
          </span>
        ) : (
          <span>
            Quantity: <span className="quantity-label">{cartItem.quantity}</span>
          </span>
        )}
        {!isEditing && (
          <span className="update-quantity-link link-primary" onClick={startEditing}>
            Update
          </span>
        )}
        <span className="delete-quantity-link link-primary" onClick={deleteItem}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </span>
      </div>
    </div>
    </>
  );
}
