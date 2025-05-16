let cart = [];

document.querySelectorAll(".cart-btn").forEach((btn) => {
  const minusBtn = btn.querySelector(".quantity-minus");
  const plusBtn = btn.querySelector(".quantity-plus");
  const quantityDisplay = btn.querySelector(".quantity");
  const itemContainer = btn.closest(".items");
  const itemName = itemContainer.querySelector(
    ".text p:nth-child(2)"
  ).textContent;
  const itemPrice = parseFloat(
    itemContainer.querySelector(".text a").textContent.replace("$", "")
  );

  let quantity = 1;

  const updateQuantity = () => {
    quantityDisplay.textContent = quantity;
  };

  const addToCart = () => {
    const existingItemIndex = cart.findIndex((item) => item.name === itemName);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity = quantity;
    } else {
      cart.push({
        name: itemName,
        price: itemPrice,
        quantity: quantity,
      });
    }

    updateCartDisplay();
  };

  minusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      quantity--;
      updateQuantity();
    }
  });

  plusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    quantity++;
    updateQuantity();
  });

  btn.addEventListener("click", (e) => {
    if (
      !e.target.closest(".quantity-minus") &&
      !e.target.closest(".quantity-plus")
    ) {
      e.preventDefault();
      addToCart();
    }
  });
});

function updateCartDisplay() {
  const cartTitle = document.querySelector(".cart-container h3");
  const emptyCart = document.querySelector(".empty-cart");
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartFooter = document.querySelector(".cart-footer");

  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTitle.textContent = `Your Cart (${totalItems})`;

  // Clear previous cart items
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartItemsContainer.style.display = "none";
    cartFooter.style.display = "none";
    return;
  }

  // Hide empty cart and show items
  emptyCart.style.display = "none";
  cartItemsContainer.style.display = "block";
  cartFooter.style.display = "block";

  // Add each item to cart display
  let orderTotal = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    orderTotal += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-quantity">Quantity: ${item.quantity}</div>
        
      </div>
      <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Update order total
  document.querySelector(
    ".order-total p:last-child"
  ).textContent = `$${orderTotal.toFixed(2)}`;

  // Confirm order button
  document.querySelector(".confirm-order").addEventListener("click", () => {
    alert("Order confirmed!");
  });
}
