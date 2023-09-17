import { getAndShowAllSessions,prepareCreateNewSessionForm,createSession } from "./func/sessions.js";
const SendSessions=document.querySelector("#SendSessions")
window.addEventListener("load",()=>{
    getAndShowAllSessions()
    prepareCreateNewSessionForm()
})
SendSessions.addEventListener("click",(event)=>{
    event.preventDefault()
  createSession()
})