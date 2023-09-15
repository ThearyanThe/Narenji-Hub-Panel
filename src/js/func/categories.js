import { getToken,showSwal } from "./utils.js";

const getAndShowAllCategories = async () => {
    const categoriesListElem = document.querySelector("#tbody-Categories");
    categoriesListElem.innerHTML = "";
  
    const res = await fetch(`http://localhost:4000/v1/category`);
    const categories = await res.json();
  
    categories.forEach((category, index) => {
      categoriesListElem.insertAdjacentHTML(
        "beforeend",
        `
              <tr>
                  <td>${index + 1}</td>
                  <td>${category.title}</td>
                  <td>${category.name}</td>
                  <td>
                  <button type='button' onclick="removeCategory('${
                    category._id
                  }')" class=' py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-1 w-[34%]'>حذف</button>
                  </td>
                  <td>
                  <button type='button' class=' py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-2 w-[32%]'>ویرایش</button>
                    
                  </td>
              </tr>
          `
      );
    });
  
   
  };
  const createCategory = async () => {
    const titleInputElem = document.querySelector("#loc-category");
    const nameInputElem = document.querySelector("#name");
  
    const newCategoryInfos = {
      title: titleInputElem.value.trim(),
      name: nameInputElem.value.trim(),
    };
  
    const res = await fetch('http://localhost:4000/v1/category', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCategoryInfos)
    })
  
    if (res.ok) {
      showSwal(
        "دسته بندی جدید با موفقیت ساخته شد",
        "success",
        "خیلی هم عالی",
        () => {
          getAndShowAllCategories()
          titleInputElem.value=""
          nameInputElem.value="" 
        }
      )
    }
  else{
    showSwal(
        "مقادیر را صحیح وارد کنید",
        "error",
        "  تصحیح اطلاعات",
        () => {}
      )
  }
  
  
  };
  const removeCategory = async (categoryID) => {

    showSwal(
      "آیا از حذف دسته بندی اطمینان دارید؟",
      "warning",
      ["نه", "آره"],
      async (result) => {
        if (result) {
          const res = await fetch(`http://localhost:4000/v1/category/${categoryID}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          })
  
          if (res.ok) {
            showSwal(
              "دسته بندی مورد نظر با موفقیت حذف شد",
              "success",
              "خیلی هم عالی",
              () => {
                getAndShowAllCategories()
              }
            )
          }
        }
      }
    )
  
  };
  
  export { getAndShowAllCategories, removeCategory,createCategory };
  