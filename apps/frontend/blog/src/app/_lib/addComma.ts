export const addComma = (price: string | number | null) => {
  if (price) {
    let value: string = typeof price === "number" ? `${price}` : price;
    let returnString = value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  }
  return "";
};
