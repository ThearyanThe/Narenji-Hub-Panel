import { createNewMenu, getAndShowAllMenus, prepareCreateMenuForm,removeMenu } from "./func/menues.js";
window.removeMenu=removeMenu
window.addEventListener("load", () => {
    const MenuesBtn = document.querySelector("#sendMenue-btn")
    getAndShowAllMenus()
    prepareCreateMenuForm()
    MenuesBtn.addEventListener("click", (event) => {
        event.preventDefault()
        createNewMenu()
    })

})