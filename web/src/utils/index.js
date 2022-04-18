export function formatPrice(number = 0){
  if(typeof number === "number" || !isNaN(number)){
    return new Intl.NumberFormat().format(number*1)
  }
  return 0
}