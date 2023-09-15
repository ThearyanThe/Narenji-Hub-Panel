
const getAndShowAllContacts = async () => {
    const contactsListTableElem = document.querySelector('#tbody-massage')
    contactsListTableElem.innerHTML = ''

    const res = await fetch(`http://localhost:4000/v1/contact`)
    const contacts = await res.json()

    contacts.forEach((contact, index) => {
        contactsListTableElem.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${index + 1}</td>
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>${contact.createdAt.slice(0, 10)}</td>
                <td>
                    <button type='button' class=' py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-1 w-full'>مشاهده</button>
                </td>
                <td>
                    <button type='button' class=' py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-3 w-full'>ویرایش</button>
                </td>
                <td>
                    <button type='button' class=' py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-2 w-full'>حذف</button>
                </td>
            </tr>
        `)
    })

    console.log(contacts);

}

export {
    getAndShowAllContacts
}