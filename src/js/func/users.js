import { getToken,showSwal } from "../func/utils.js";

const getAndShowAllUsers = async () => {
  const usersListTableElem = document.querySelector("#tbody-Users");
  usersListTableElem.innerHTML = "";

  const res = await fetch(`http://localhost:4000/v1/users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const users = await res.json();
console.log(users);
  users.forEach((user, index) => {
    usersListTableElem.insertAdjacentHTML(
      "beforeend",
      `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td>${user.role === "ADMIN" ? "مدیر" : "کاربر عادی"}</td>
                <td>
                    <button type='button' class='w-full py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-1'>ویرایش</button>
                </td>
                <td>
                    <button type='button'  onclick="removeUser('${user._id}')" class='w-full py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-2'>حذف</button>
                </td>
                <td>
                    <button type='button' onclick="banUser('${user._id}')" class='w-full py-1 cursor-pointer  rounded-sm text-slate-100 bg-orange-3'>بن</button>
                </td>
            </tr>
        `
    );
  });

  console.log(users);
};
const removeUser = async (userID) => {
    showSwal(
      "آیا از حذف کاربر اطمینان دارید؟",
      "warning",
      ["نه", "آره"],
      async (result) => {
        if (result) {
          const res = await fetch(`http://localhost:4000/v1/users/${userID}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });
          console.log(res);
          if (res.ok) {
            showSwal(
              "کاربر مورد نظر با موفقیت حذف شد",
              "success",
              "خیلی هم عالی",
              () => {
                getAndShowAllUsers();
              }
            );
          }
        }
      }
    );
  };
  const banUser = async (userID) => {
    showSwal(
      "آیا از بن کاربر اطمینان دارید؟",
      "error",
      ["نه", "آره"],
      async (result) => {
        if (result) {
          const res = await fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });
          console.log(res);
          if (res.ok) {
            showSwal(
              "کاربر مورد نظر با موفقیت بن شد",
              "success",
              "خیلی هم عالی",
              () => {}
            );
          }
        }
      }
    );
  }
  const createNewUser = async () => {
    const nameInput = document.querySelector("#name");
    const usernameInput = document.querySelector("#User-Name");
    const emailInput = document.querySelector("#Email");
    const phoneInput = document.querySelector("#phone-number");
    const passwordInput = document.querySelector("#password");
  
    const newUserInfos = {
      name: nameInput.value.trim(),
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      password: passwordInput.value.trim(),
      confirmPassword: passwordInput.value.trim(),
    };
  
    fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    })
      .then((res) => {
        if (res.status === 201) {
          showSwal(
            "کاربر جدید با موفقیت ایجاد شد",
            "success",
            "خیلی هم عالی",
            (result) => {
              getAndShowAllUsers()
            }
          );
        } else if (res.status === 409) {
          showSwal(
            "نام کاربری یا ایمیل قبلا استفاده شده",
            "error",
            "تصحیح اطلاعات",
            () => {}
          );
        } 
        else if (res.status === 400) {
            showSwal(
              "    مقادیر را درست وارد کنید",
              "error",
              "تصحیح اطلاعات",
              () => {}
            );
          } 
        else if (res.status === 403) {
          showSwal(
            "متاسفانه این شماره تماس بن شده",
            "error",
            "تصحیح اطلاعات",
            () => {}
          );
        }
        console.log(res);
        return res.json();
      })
  };
export { getAndShowAllUsers,removeUser,banUser,createNewUser };
