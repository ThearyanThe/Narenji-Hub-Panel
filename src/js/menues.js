import { createNewMenu, getAndShowAllMenus, prepareCreateMenuForm } from "./func/menues.js";
window.addEventListener("load", () => {
    const MenuesBtn = document.querySelector("#sendMenue-btn")
    getAndShowAllMenus()
    prepareCreateMenuForm()
    MenuesBtn.addEventListener("click", (event) => {
        event.preventDefault()
        createNewMenu()
    })

})