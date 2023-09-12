
import { getToken } from "../../../src/js/func/utils.js";

const insertNotificationHtmlTemplate = (notifications) => {
  const notificationModalListElem = document.querySelector(
    "#notifwrapper"
  );

  if (notifications.length) {
    notifications.forEach((notification) => {
      notificationModalListElem.insertAdjacentHTML(
        "beforeend",
        `
        <li class="py-1 flex justify-between"> 
            <span> ${notification.msg}</span>
            <svg onclick='seenNotification(${JSON.stringify(notifications)},${JSON.stringify(notification._id)})' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-green-800">
                <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
              </svg>
              
           
        </li>
      `
      );
    });
  } 
  else {
    notificationModalListElem.insertAdjacentHTML(
      "beforeend",
      `  <span> پیامی ارسال نشده</span>`
    );
  }
};

const seenNotification = async (notifications,notificationID) => {
  const res = await fetch(
    `http://localhost:4000/v1/notifications/see/${notificationID}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
RemoveSeenNotif(notifications,notificationID)
  const result = await res.json();
 
};
const RemoveSeenNotif=(notifications,notificationID)=>{
  const FilterNotifs=notifications.filter(notif=>notif._id!=notificationID)
  insertNotificationHtmlTemplate(FilterNotifs)
}

export { insertNotificationHtmlTemplate, seenNotification };
