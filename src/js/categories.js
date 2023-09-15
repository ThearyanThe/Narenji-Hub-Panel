import { getAndShowAllCategories,removeCategory,createCategory } from "./func/categories.js";
window.removeCategory=removeCategory
const SendCategory=document.querySelector("#SendCategory")
window.addEventListener("load",()=>{
    SendCategory.addEventListener("click",(event)=>{
        event.preventDefault()
        createCategory()
    })
    getAndShowAllCategories()
})