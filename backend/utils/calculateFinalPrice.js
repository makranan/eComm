export function calculateFinalPrice(cartItems) {
  return cartItems.reduce((acc, item) => {
    let finalPrice = item.price;
    if (item.isDiscounted) {
      finalPrice = item.price - (item.price * item.discount) / 100;
    }
    return acc + item.qty * finalPrice;
  }, 0);
}
