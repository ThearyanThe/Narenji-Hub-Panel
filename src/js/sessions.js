import { getAndShowAllSessions,prepareCreateNewSessionForm,createSession,removeSession } from "./func/sessions.js";
window.removeSession=removeSession
const SendSessions=document.querySelector("#SendSessions")
window.addEventListener("load",()=>{
    getAndShowAllSessions()
    prepareCreateNewSessionForm()
})
SendSessions.addEventListener("click",(event)=>{
    event.preventDefault()
  createSession()
})