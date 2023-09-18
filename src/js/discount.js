import { createDiscountCode,getAndShowAllDiscountsCodes,prepareCreateNewDiscountCodeForm } from "./func/discount.js";
const SendDiscountBtn=document.querySelector("#SendDiscount-btn")
SendDiscountBtn.addEventListener("click",(event)=>{
    event.preventDefault()
    createDiscountCode()
})
window.addEventListener("load",()=>{
    getAndShowAllDiscountsCodes()
    prepareCreateNewDiscountCodeForm()
})