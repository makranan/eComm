export const addDecimals = num => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = state => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping price (If order is > 100$ then free, else 10$ shipping)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate tax price (23%)
  state.taxPrice = addDecimals(Number((0.23 * state.itemsPrice).toFixed(2)));

  // Calculate total price
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  );

  // Store the updated state in local storage
  localStorage.setItem('cart', JSON.stringify(state));

  return state; // Return the updated state
};
