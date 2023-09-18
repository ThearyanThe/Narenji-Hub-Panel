import { createDiscountCode,getAndShowAllDiscountsCodes,prepareCreateNewDiscountCodeForm,removeDiscount } from "./func/discount.js";
window.removeDiscount=removeDiscount
const SendDiscountBtn=document.querySelector("#SendDiscount-btn")
SendDiscountBtn.addEventListener("click",(event)=>{
    event.preventDefault()
    createDiscountCode()
})
window.addEventListener("load",()=>{
    getAndShowAllDiscountsCodes()
    prepareCreateNewDiscountCodeForm()
})