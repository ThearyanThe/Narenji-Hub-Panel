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
export { getAndShowAllUsers,removeUser,banUser };
