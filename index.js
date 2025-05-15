document.querySelectorAll(".cart-btn").forEach((btn) => {
  const minusBtn = btn.querySelector(".quantity-minus");
  const plusBtn = btn.querySelector(".quantity-plus");
  const quantityDisplay = btn.querySelector(".quantity");

  let quantity = 1;

  minusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  });

  plusBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    quantity++;
    quantityDisplay.textContent = quantity;
  });

  // Prevent button click when interacting with quantity controls
  btn.addEventListener("click", (e) => {
    if (
      e.target.closest(".quantity-minus") ||
      e.target.closest(".quantity-plus")
    ) {
      e.preventDefault();
    }
  });
});
