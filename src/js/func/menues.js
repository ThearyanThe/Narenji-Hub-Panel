import { getToken,showSwal } from "./utils.js";

let parentMenuID = undefined;

const getAndShowAllMenus = async () => {
  const menusWrapperElem = document.querySelector("#tbody-menues");

  const res = await fetch(`http://localhost:4000/v1/menus/all`);
  const menus = await res.json();

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
              <button type="button" class="w-full py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-2">حذف</button>
          </td>
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

export { getAndShowAllMenus, prepareCreateMenuForm, createNewMenu };
