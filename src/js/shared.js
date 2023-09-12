import { getAdminInfos } from "./func/utils.js";
import { insertNotificationHtmlTemplate,seenNotification } from "./func/notif.js";
window.seenNotification=seenNotification;
window.addEventListener("load",()=>{
    console.log(2);
getAdminInfos().then(admin=>{
 console.log(admin);
    /*protect router */
const userNameAdmin=document.querySelectorAll(".AdminuserName")

  if(admin.role=="ADMIN"){
userNameAdmin.forEach((name)=>{
    name.innerHTML=admin.username
})
  }
  else{
   location.replace("../../../front-Narenji//src/html/index.html")
  }
/*notif */
insertNotificationHtmlTemplate(admin.notifications)


})
})

