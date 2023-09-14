import { getAndShowAllUsers,removeUser,banUser,createNewUser } from "./func/users.js";
window.removeUser=removeUser
window.banUser=banUser
const AddUser=document.querySelector("#send-User")
AddUser.addEventListener("click",(event)=>{
    event.preventDefault()
createNewUser()
})
window.addEventListener("load",()=>{
    getAndShowAllUsers()
})