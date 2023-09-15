import { showSwal } from "./utils.js"
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
                <button type='button' class=' py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-1 w-full'>پاسخ</button>
            </td>
                <td>
                    <button type='button' class=' py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-3 w-full'>ویرایش</button>
                </td>
                <td>
                    <button type='button' class=' py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-2 w-full'>حذف</button>
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
export {
    getAndShowAllContacts,showContactBody
}