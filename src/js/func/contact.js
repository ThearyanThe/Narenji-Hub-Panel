import { showSwal,getToken } from "./utils.js"
const getAndShowAllContacts = async () => {
    const contactsListTableElem = document.querySelector('#tbody-massage')
    contactsListTableElem.innerHTML = ''

    const res = await fetch(`http://localhost:4000/v1/contact`)
    const contacts = await res.json()

    contacts.forEach((contact, index) => {
        contactsListTableElem.insertAdjacentHTML('beforeend', `
            <tr class="">
                <td>${index + 1}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>${contact.createdAt.slice(0, 10)}</td>
                <td>
                    <button type='button' onclick='showContactBody(${JSON.stringify(contact.body)})' class=' py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-700 w-full'>مشاهده</button>
                </td>
                <td>
                <button type='button'     onclick='answerToContact(${JSON.stringify(contact.email)})' class=' py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-1 w-full'>${contact.answer==0?"پاسخ":"پاسخ دادی"}</button>
            </td>
                <td>
                    <button type='button'  onclick=' removeContact(${JSON.stringify(contact._id)})'  class=' py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-2 w-full'>حذف</button>
                </td>
            </tr>
            <tr class="divider-row">
            <td  colspan="9"><hr class="border-gray-3"></td>
        </tr>
           
        `)
    })

    console.log(contacts);

}
const showContactBody = (body) => {
    showSwal(
        body, 
        undefined,
        "مشاهده کردم",
        () => {}
    )
}
const answerToContact = async (userEmail) => {
    swal({
      title: "متن پاسخ را تایپ کنید:",
      content: "input",
      button: "ثبت پاسخ",
    }).then(async (result) => {
      if (result) {
        const contactAnswerInfos = {
          email: userEmail,
          answer: result,
        };
  
        const res = await fetch(`http://localhost:4000/v1/contact/answer`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactAnswerInfos),
        });
  
        if (res.ok) {
          showSwal(
            "پاسخ مورد نظر برای کاربر ایمیل شد",
            "success",
            "خیلی هم عالی",
            () => {
                getAndShowAllContacts()
            }
          );
        }
      }
    });
  };
  const removeContact = async (contactID) => {
    showSwal(
      "آیا از حذف پیغام اطمینان دارید؟",
      "warning",
      ["نه", "آره"],
      async (result) => {
        if (result) {
          const res = await fetch(
            `http://localhost:4000/v1/contact/${contactID}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            }
          );
          if (res.ok) {
            showSwal(
              "پیغام مورد نظر با موفقیت حذف شد",
              "success",
              "خیلی هم عالی",
              () => {
                getAndShowAllContacts();
              }
            );
          }
        }
      }
    );
  };
export {
    getAndShowAllContacts,showContactBody,answerToContact,removeContact
}