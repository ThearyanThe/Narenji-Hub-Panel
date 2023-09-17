import { getAndShowAllContacts,showContactBody,answerToContact,removeContact } from "./func/contact.js";
window.showContactBody=showContactBody
window.answerToContact=answerToContact
window.removeContact=removeContact
window.addEventListener("load",()=>{
    getAndShowAllContacts()
})