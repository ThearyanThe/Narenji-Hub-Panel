import { getToken,showSwal } from "./utils.js";

let parentMenuID = undefined;

const getAndShowAllMenus = async () => {
  const menusWrapperElem = document.querySelector("#tbody-menues");

  const res = await fetch(`http://localhost:4000/v1/menus/all`);
  const menus = await res.json();
  menusWrapperElem.innerHTML=""
  menus.forEach((menu, index) => {
   
    menusWrapperElem.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
          <td>${index + 1}</td>
          <td>${menu.title}</td>
          <td><a href="#">${menu.href}</a></td>
          <td>
            ${menu.parent ? menu.parent.title : " --- "}
          </td>
          <td>
              <button type="button" class="w-full py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-1">ویرایش</button>
          </td>
          <td>
              <button onclick="removeMenu('${menu._id}')" type="button" class="w-full py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-2">حذف</button>
          </td>
      </tr>
      </tr>
      <tr class="divider-row">
      <td  colspan="9"><hr class="border-gray-3"></td>
  </tr>
    `
    );
  });

  return menus;
};

const prepareCreateMenuForm = async () => {
  const parentMenusElem = document.querySelector("#parent-select");

  parentMenusElem.addEventListener(
    "change",
    (event) => (parentMenuID = event.target.value)
  );

  const res = await fetch("http://localhost:4000/v1/menus");
  const menus = await res.json();

  menus.forEach((menu) => {
    parentMenusElem.insertAdjacentHTML(
      "beforeend",
      `
      <option value=${menu._id}>${menu.title}</option>
    `
    );
  });
};

const createNewMenu = async () => {
  const titleInputElem = document.querySelector("#menue-name");
  const hrefInputElem = document.querySelector("#menue-addres");

  const newMenuInfos = {
    title: titleInputElem.value.trim(),
    href: hrefInputElem.value.trim(),
    parent: parentMenuID,
  };

  const res = await fetch(`http://localhost:4000/v1/menus`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMenuInfos),
  });
  if(res.ok){
    showSwal(
      "منو با موفقیت اضافه شد",
      "success",
      " اوکی",
     ()=> {getAndShowAllMenus () }
    );
  }
  else{
    showSwal(
      "    مشکلی در اضافه کردن منو پیش اومد",
      "error",
      " تصحیح اطلاعات",
     ()=> { }
    );
  }
  /*empty-input-after-send */
titleInputElem.value=""
hrefInputElem.value=""


};
const removeMenu = async (menuID) => {
  showSwal(
    "آیا از حذف منو اطمینان دارید؟",
    "warning",
    ["نه", "آره"],
    async (result) => {
      if (result) {
        const res = await fetch(`http://localhost:4000/v1/menus/${menuID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (res.ok) {
          showSwal(
            "منوی مورد نظر با موفقیت حذف شد",
            "success",
            "خیلی هم عالی",
            () => {
              getAndShowAllMenus();
            }
          );
        }
      }
    }
  );
};
export { getAndShowAllMenus, prepareCreateMenuForm, createNewMenu,removeMenu };
